import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { GoogleUserInfoError } from 'src/routes/auth/auth.error'

import { AuthService } from 'src/routes/auth/auth.service'
import envConfig from 'src/shared/config'
import { AuthProvider } from 'src/shared/constants/auth.constant'
import { DeviceInfoType } from 'src/shared/decorators/device-info.decorator'

//Logic file cũ, khi chỉ có mỗi google oauth
// @Injectable()
// export class GoogleService {
//   private oauth2Client: OAuth2Client
//   constructor(
//     private readonly authRepo: AuthRepo,
//     private readonly sharedRoleRepo: SharedRoleRepo,
//     private readonly hashingService: HashingService,
//     private readonly authService: AuthService,
//   ) {
//     this.oauth2Client = new google.auth.OAuth2(
//       envConfig.GOOGLE_CLIENT_ID,
//       envConfig.GOOGLE_CLIENT_SECRET,
//       envConfig.GOOGLE_REDIRECT_URI,
//     )
//   }

//   getGoogleLink(deviceInfo: DeviceInfoType) {
//     const scope = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

//     //Chuyển object sang string base64 để an toàn bỏ lên url
//     const stateString = Buffer.from(JSON.stringify(deviceInfo)).toString('base64')

//     const url = this.oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope,
//       include_granted_scopes: true,
//       state: stateString,
//     })

//     return { url }
//   }

//   async googleCallBack({
//     code,
//     state,
//   }: {
//     code: string
//     state: string
//   }): Promise<{ accessToken: string; refreshToken: string }> {
//     try {
//       let clientInfo: DeviceInfoType | null = null
//       //1. Lấy state từ url
//       if (state) {
//         try {
//           clientInfo = JSON.parse(Buffer.from(state, 'base64').toString()) as DeviceInfoType
//         } catch (err) {
//           console.error('error parsing state', err)
//         }
//       }

//       //2. Dùng code để lấy token
//       const { tokens } = await this.oauth2Client.getToken(code)
//       this.oauth2Client.setCredentials(tokens)

//       //3. Lấy thông tin google user
//       const oauth2 = google.oauth2({
//         auth: this.oauth2Client,
//         version: 'v2',
//       })

//       const { data } = await oauth2.userinfo.get()
//       if (!data.email) {
//         throw GoogleUserInfoError
//       }

//       // Tìm xong email này đã có trong db chưa
//       let user = await this.authRepo.findUniqueUserIncludeRole(data.email)

//       //Nếu không có email thì tức là người mới, tiến hành đăng kí
//       if (!user) {
//         const learnerRoleId = await this.sharedRoleRepo.getLearnerRoleId()

//         const randomPassword = uuidv4()
//         const hashedPassword = await this.hashingService.hash(randomPassword)

//         user = await this.authRepo.createUserIncludeRole({
//           email: data.email,
//           name: data.name ?? '',
//           password: hashedPassword,
//           roleId: learnerRoleId,
//         })
//       }

//       const device = await this.authRepo.createOrupdateDevice({
//         device: {
//           deviceName: clientInfo?.deviceName ?? 'Unknown',
//           deviceType: clientInfo?.deviceType ?? 'Unknown',
//           ip: clientInfo?.ip ?? 'Unknown',
//           userAgent: clientInfo?.userAgent ?? 'Unknown',
//         },
//         userId: user.id,
//       })

//       const authTokens = await this.authService.generateTokens({
//         deviceId: device.id,
//         roleId: user.roleId,
//         roleName: user.role.name,
//         userId: user.id,
//       })

//       return authTokens
//     } catch (err) {
//       console.error('error in google call back', err)
//       throw err
//     }
//   }
// }

//logic file mới google servcie đã tinh giản khi có thêm phương thức login
@Injectable()
export class GoogleService {
  private oauth2Client: OAuth2Client
  constructor(
    // Bỏ đi các repo không cần thiết, chỉ giữ lại AuthService
    private readonly authService: AuthService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      envConfig.GOOGLE_CLIENT_ID,
      envConfig.GOOGLE_CLIENT_SECRET,
      envConfig.GOOGLE_REDIRECT_URI,
    )
  }

  getGoogleLink(deviceInfo: DeviceInfoType) {
    const scope = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

    //Chuyển object sang string base64 để an toàn bỏ lên url
    const stateString = Buffer.from(JSON.stringify(deviceInfo)).toString('base64')

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
      include_granted_scopes: true,
      state: stateString,
    })

    return { url }
  }

  async googleCallBack({ code, state }: { code: string; state: string }) {
    // 1. Lấy state từ url (giữ nguyên)
    const clientInfo = this.parseState(state)

    // 2. Dùng code để lấy token (giữ nguyên)
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)

    // 3. Lấy thông tin google user (giữ nguyên)
    const oauth2 = google.oauth2({ auth: this.oauth2Client, version: 'v2' })
    const { data } = await oauth2.userinfo.get()

    // 4. Chuẩn hóa dữ liệu và gọi service chung
    if (!data.email) {
      throw GoogleUserInfoError
    }

    // 👇 GỌI PHƯƠNG THỨC CHUNG
    return this.authService.processSocialLogin(
      {
        email: data.email,
        name: data.name ?? '',
        provider: AuthProvider.GOOGLE,
        providerUserId: data.id as string | undefined,
      },
      clientInfo,
    )
  }

  private parseState(state: string): DeviceInfoType | null {
    if (!state) return null
    try {
      return JSON.parse(Buffer.from(state, 'base64').toString()) as DeviceInfoType
    } catch (err) {
      console.error('error parsing state', err)
      return null
    }
  }
}
