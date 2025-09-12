import { Injectable } from '@nestjs/common'
import {
  AccountAlreadyExistsException,
  EmailNotFoundException,
  EmailNotFoundOrInvalidPasswordException,
  FailedToSendOTPException,
  InvalidVerificationCodeException,
  OTPExpiredException,
} from 'src/routes/auth/auth.error'
import {
  LoginBodyType,
  RefreshTokenType,
  RegisterBodyType,
  SendOTPBodyType,
  UserAUthProviderIncludeUserAndRoleType,
} from 'src/routes/auth/auth.model'
import { AuthRepo } from 'src/routes/auth/auth.repo'
import {
  AuthProviderType,
  TypeOfVerificationCode,
  TypeOfVerificationCodeType,
} from 'src/shared/constants/auth.constant'
import { DeviceInfoType } from 'src/shared/decorators/device-info.decorator'
import { generateOTP } from 'src/shared/helper'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.type'

import { addMilliseconds } from 'date-fns'
import envConfig from 'src/shared/config'
import ms, { StringValue } from 'ms'
import { EmailService } from 'src/shared/services/email.service'
import { SharedRoleRepo } from 'src/shared/repositories/shared-role.repo'
import { v4 as uuidv4 } from 'uuid'
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly sharedRoleRepo: SharedRoleRepo,
  ) {}

  // function này để tạo tokens khi đăng nhập
  async generateTokens({ deviceId, roleId, roleName, userId }: AccessTokenPayloadCreate) {
    // 1, Kiểm tra trên device này đã có refreshToken chưa, nếu chưa hoặc refreshTOken hết hạn thì xóa cũ tạo mới, nếu đã có thì lấy ra dùng.
    let refreshToken: RefreshTokenType['token'] | null = null
    const refreshTokenDb = await this.authRepo.findUniqueRefreshToken({
      deviceId,
    })

    // Nếu có và chưa hết hạn thì dùng refreshToken cũ
    if (refreshTokenDb?.token && new Date(refreshTokenDb.expiresAt) > new Date()) {
      refreshToken = refreshTokenDb.token
    }

    // Nếu đã hết hạn thì xóa cũ
    if (refreshTokenDb?.token && new Date(refreshTokenDb.expiresAt) < new Date()) {
      await this.authRepo.deleteRefreshToken({ id: refreshTokenDb.id })
    }

    const [accessToken, newRefreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ deviceId, roleId, roleName, userId }),
      this.tokenService.signRefreshToken({ userId }),
    ])

    // Nếu đến đây vẫn chưa có refreshToken thì dùng refreshToken mới
    if (!refreshToken) {
      refreshToken = newRefreshToken

      const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)

      await this.authRepo.createRefreshToken({
        userId,
        deviceId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
        token: refreshToken,
      })
    }

    return { accessToken, refreshToken }
  }

  //Phương thức login này dành cho đăng nhập local, đăng nhập bằng oauth thì k cần
  async login(body: LoginBodyType & { deviceInfo: DeviceInfoType }) {
    //1, Lấy thông tin user, kiểm tra user có tồn tại hay không, mật khẩu có  đúng hay không

    const { deviceName, deviceType, ip, userAgent } = body.deviceInfo

    // Do 1 user có thể có nhiều email(oauth, local), nên truy vấn unique theo email, password
    const hashedPassword = await this.hashingService.hash(body.password)
    const user = await this.authRepo.findUniqueUserIncludeRole({
      email_password: {
        email: body.email,
        password: hashedPassword,
      },
    })

    if (!user) {
      throw EmailNotFoundOrInvalidPasswordException
    }

    //2, Tạo mới device
    const device = await this.authRepo.createOrupdateDevice({
      userId: user.id,
      device: { deviceName, deviceType, ip, userAgent },
    })

    const tokens = await this.generateTokens({
      deviceId: device.id,
      roleId: user.roleId,
      roleName: user.role.name,
      userId: user.id,
    })

    return tokens
  }

  async sendOTP(body: SendOTPBodyType) {
    //1, Kiểm tra email đã tồn tại hay chưa
    // Ở đây có thể có nhiều tài khoản có cùng email nhưng k sao, cứ gửi đến email đấy, chỗ nào đang ở giao diện xác thực thì mới lấy được mã otp để xác thực tài khoản
    // Nhưng mà phải check xem đã tồn tại tài khoản local chưa, nếu có rồi và type là register thì mới báo lỗi là đã tồn tại, còn nếu check chỉ tồn tại các tài khoản oauth, mà chưa tồn tại local và type là register thì k quăng lỗi cho gửi otp như thường
    // Giờ làm sao để biết đúng email này , thì đã tồn tại oauth hay chưa, ví dụ trường hợp trong db có 2 tài khoản 1 oauth và 1 local , nhưng findFirst chỉ tìm thằng oauth thì nó báo có oauth rồi, thì vẫn gửi otp dù đã có local, vậy làm sao để bỏ qua mấy thằng oauth mà chỉ tìm kiếm mỗi thằng local cho việc send otp cho local này
    // cách 1: findMany, kiểm tra trong danh sách những user có cùng email này xem có tài khoản nào không có UserAuthProvider hay không , nếu toàn bộ đều có tức là chưa có tài khoản nào đăng kí với local, có thể tiếp tục sendotp
    // Trường hợp sendOtp còn áp dụng với tài khoản mà khi đăng nhập oauth mà chưa có email, thì bắt xác thực email bằng otp -> thêm type là verify_email trong verification code, điều này bắt xác thực email, giảm thiểu được tài khoản với các email rác
    const users = await this.authRepo.findUsersByEmailIncludeAuthProvider(body.email)

    //Nếu không tìm thấy tài khoản nào thì báo lỗi
    if (users.length === 0) {
      throw EmailNotFoundException
    }

    // lọc ra thằng user mà chưa có tài khoản oauth, tức là đã đăng kí với local
    const user = users.find((user) => user.authProvider === null)

    // Nếu user đã đăng kí với local rồi mà type là register thì báo lỗi
    if (user && body.type === TypeOfVerificationCode.REGISTER) {
      throw AccountAlreadyExistsException
    }

    // Nếu user chưa đăng kí với local rồi mà type là forget password thì báo lỗi(chỉ cho phép đổi mật khẩu nếu tài khoản đó đăng kí với local, còn nếu đăng nhập với oauth thì không có chức năng này)
    if (!user && body.type === TypeOfVerificationCode.FORGET_PASSWORD) {
      throw EmailNotFoundException
    }

    // Trường hợp type là VERIFY_EMAIL thì tiếp tục cho send otp, ở bên FE sẽ check mỗi lần người dùng đăng nhập vào tài khoản bằng oauth, nếu tài khoản đó chưa được xác thực thì redirect đến trang add email để xác thực email, do đó ở đây không làm gì cho tiếp tục nếu type là verify_email

    //2, Tạo mã OTP và lưu vào db
    const code = generateOTP()
    await this.authRepo.createVerificationCode({
      code,
      email: body.email,
      type: body.type,
      expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN as StringValue)).toISOString(),
    })

    //3, Gửi má OTP
    const { error } = await this.emailService.sendOTP({ email: body.email, code })
    if (error) {
      throw FailedToSendOTPException
    }
    return { message: 'OTP sent successfully' }
  }

  async validateVerificationCode({
    email,
    type,
    code,
  }: {
    email: string
    type: TypeOfVerificationCodeType
    code: string
  }) {
    const verificationCode = await this.authRepo.findUniqueVerificationCode({
      email_type: {
        email: email,
        type,
      },
    })

    if (!verificationCode) {
      throw InvalidVerificationCodeException
    }

    if (verificationCode && verificationCode.code !== code) {
      throw InvalidVerificationCodeException
    }

    if (new Date(verificationCode.expiresAt) < new Date()) {
      throw OTPExpiredException
    }

    return verificationCode
  }

  async register(body: RegisterBodyType) {
    //1, check otp code có hợp lệ hay không
    const verificationCode = await this.validateVerificationCode({
      email: body.email,
      code: body.code,
      type: TypeOfVerificationCode.REGISTER,
    })

    //2, Tạo user với role learner
    const learnerRoleId = await this.sharedRoleRepo.getLearnerRoleId()

    const hashedPassword = await this.hashingService.hash(body.password)

    const newUser = await this.authRepo.createUser({
      email: body.email,
      name: body.name,
      password: hashedPassword,
      roleId: learnerRoleId,
    })

    //3, Xóa otp code
    await this.authRepo.deleteVerificationCode({
      id: verificationCode.id,
    })

    return newUser
  }

  // 👇 PHƯƠNG THỨC CHUNG MỚI
  async processSocialLogin(
    profile: { email?: string; name: string; providerUserId?: string; provider: AuthProviderType },
    deviceInfo: DeviceInfoType | null,
  ) {
    // Tìm xem UserAuthProvider này có trong db chưa, nếu chưa tạo mới user sau đó tạo mới UserAuthProvider
    //kiểm tra xem nếu email tồn tại thì tìm kiếm unique theo emailFromProvider và provider
    let userAuthProvider: UserAUthProviderIncludeUserAndRoleType | null = null
    if (profile.email) {
      userAuthProvider = await this.authRepo.findUniqueUserAuthProviderIncludeUserAndRole({
        emailFromProvider_provider: {
          emailFromProvider: profile.email,
          provider: profile.provider,
        },
      })
    }

    // Kiểm tra nếu providerUserId tồn tại thì tìm kiếm unique theo providerUserId và provider
    if (!userAuthProvider && profile.providerUserId) {
      userAuthProvider = await this.authRepo.findUniqueUserAuthProviderIncludeUserAndRole({
        provider_providerUserId: {
          providerUserId: profile.providerUserId,
          provider: profile.provider,
        },
      })
    }

    //  Nếu UserAuthProvider này đã tồn tại thì dùng UserAuthProvider cũ, đăng nhập luôn, chưa có thì tạo User mới và tạo UserAuthProvider mới rồi mới đăng nhập

    if (!userAuthProvider) {
      //Hiện tại đã code đến đây, đây là trường hợp nếu định danh đăng nhập oauth này chưa có thì tạo mới user và tạo mới userAuthProvider, còn nếu có rồi thì dùng cũ đăng nhập luôn, k phải tạo user và userAuthProvider mới
      const learnerRoleId = await this.sharedRoleRepo.getLearnerRoleId()
      const randomPassword = uuidv4()
      const hashedPassword = await this.hashingService.hash(randomPassword)

      const user = await this.authRepo.createUserIncludeRole({
        email: profile.email ?? '', // Nếu đến đây mà vẫn chưa có email thì tạo user với email rỗng, cuối cùng ở BE kiểm tra nếu user.email mà rỗng thì redirect đến trang thêm email và xác thực email
        name: profile.name ?? '',
        password: hashedPassword,
        roleId: learnerRoleId,
      })

      // Tạo userAuthProvider
      userAuthProvider = await this.authRepo.createUserAuthProviderIncludeUserAndRole({
        provider: profile.provider,
        providerUserId: profile.providerUserId ?? '',
        userId: user.id,
        emailFromProvider: profile.email ?? '',
      })
    }

    // Giờ là dù userAUthProvider đã tồn tại hoặc tạo mới thì đến đây thì tính là đã có userAuthProvider , thì tạo device, tạo token để đăng nhập
    const device = await this.authRepo.createOrupdateDevice({
      device: {
        deviceName: deviceInfo?.deviceName ?? 'Unknown',
        deviceType: deviceInfo?.deviceType ?? 'Unknown',
        ip: deviceInfo?.ip ?? 'Unknown',
        userAgent: deviceInfo?.userAgent ?? 'Unknown',
      },
      userId: userAuthProvider.userId,
    })

    // Trả về token giống như phương thức login bình thường
    return this.generateTokens({
      deviceId: device.id,
      roleId: userAuthProvider.user.roleId,
      roleName: userAuthProvider.user.role.name,
      userId: userAuthProvider.userId,
    })
  }
}
