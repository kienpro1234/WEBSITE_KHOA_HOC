import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  CreateUserAuthProviderBodyType,
  DeviceType,
  RefreshTokenType,
  UserAUthProviderIncludeUserAndRoleType,
  UserAuthProviderType,
  VerificationCodeType,
} from 'src/routes/auth/auth.model'
import { UserNotFoundException } from 'src/routes/profile/profile.error'

import { SerializeAll } from 'src/shared/decorators/serialize.decorator'

import { RoleType } from 'src/shared/model/shared-role.model'
import { UserType } from 'src/shared/model/shared-user.model'

import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class AuthRepo {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueUserIncludeRole(where: Prisma.UserWhereUniqueInput): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findUnique({
      where,
      include: { role: true },
    }) as any
  }

  findUserIncludeRole({ email }: { email: string }): Promise<UserType & { role: RoleType }> {
    return this.prismaService.user.findFirst({
      where: { email },
      include: { role: true },
    }) as any
  }

  findUser({ email }: { email: string }): Promise<UserType> {
    return this.prismaService.user.findFirst({
      where: { email },
    }) as any
  }

  findUsersByEmailIncludeAuthProvider(email: string): Promise<(UserType & { authProvider: UserAuthProviderType })[]> {
    return this.prismaService.user.findMany({
      where: { email },
      include: {
        authProvider: true,
      },
    }) as any
  }

  findUniqueUserAuthProviderIncludeUserAndRole(
    where: Prisma.UserAuthProviderWhereUniqueInput,
  ): Promise<UserAUthProviderIncludeUserAndRoleType | null> {
    return this.prismaService.userAuthProvider.findUnique({
      where,
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    }) as any
  }

  //Phương thức này tìm tài khoản đăng kí trực tiếp trên hệ thống mà không dùng login bằng oauth
  //Đã đánh index email nên lọc qua email nhanh hơn k cần lo
  findUniqueUserLocalIncludeRole(email: string): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findFirst({
      where: { email, authProvider: null, deletedAt: null },
      include: {
        role: true,
      },
    }) as any
  }

  findUniqueVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput): Promise<VerificationCodeType | null> {
    return this.prismaService.verificationCode.findUnique({
      where,
    }) as any
  }

  findUniqueRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput): Promise<RefreshTokenType | null> {
    return this.prismaService.refreshToken.findUnique({
      where,
    }) as any
  }

  findUniqueRefreshTokenIncludeUserRole(
    where: Prisma.RefreshTokenWhereUniqueInput,
  ): Promise<(RefreshTokenType & { user: UserType & { role: RoleType } }) | null> {
    return this.prismaService.refreshToken.findUnique({
      where,
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    }) as any
  }

  findUniqueDevice(where: { id: number } | { deviceFingerprint: string }): Promise<DeviceType | null> {
    return this.prismaService.device.findUnique({
      where,
    }) as any
  }

  //Thiết kế theo user-deviceInfo n-n, nếu chưa có deviceInfo thì tạo mới, và connect deviceInfo đó với user vừa đăng nhập, nếu đã có deviceInfo rồi thì update deviceInfo và connect với user vừa đăng nhập
  async createOrupdateDevice({
    deviceInfo,
    isLogout,
    userId,
  }: {
    userId: number
    deviceInfo: { deviceName: string; deviceType: string; ip: string; userAgent: string; deviceFingerprint: string }
    isLogout?: boolean
  }) {
    const device = await this.prismaService.device.upsert({
      where: {
        deviceFingerprint: deviceInfo.deviceFingerprint,
      },

      create: {
        deviceName: deviceInfo.deviceName,
        deviceType: deviceInfo.deviceType,
        deviceFingerprint: deviceInfo.deviceFingerprint,
        isActive: true,
        ipAddress: deviceInfo.ip,
        userAgent: deviceInfo.userAgent,
        lastLoginAt: new Date(),
      },

      update: {
        isActive: isLogout ? false : true,
        lastLoginAt: new Date(),
        ipAddress: deviceInfo.ip,
        userAgent: deviceInfo.userAgent,
      },
    })

    await this.prismaService.userDevice.upsert({
      where: {
        userId_deviceId: {
          userId,
          deviceId: device.id,
        },
      },
      create: {
        userId,
        deviceId: device.id,
        lastLoginAt: new Date(),
        isActive: true,
      },
      update: {
        isActive: isLogout ? false : true,
        lastLoginAt: new Date(),
      },
    })

    return device
  }

  async createRefreshToken(payload: { userId: number; deviceId: number; expiresAt: Date; token: string }) {
    return this.prismaService.refreshToken.create({
      data: payload,
    })
  }

  createVerificationCode(
    payload: Pick<VerificationCodeType, 'code' | 'email' | 'type' | 'expiresAt'>,
  ): Promise<VerificationCodeType> {
    return this.prismaService.verificationCode.upsert({
      where: {
        email_type: {
          email: payload.email,
          type: payload.type,
        },
      },
      create: {
        code: payload.code,
        email: payload.email,
        type: payload.type,
        expiresAt: payload.expiresAt,
      },
      update: {
        code: payload.code,
        expiresAt: payload.expiresAt,
      },
    }) as any
  }

  createUser(payload: { email: string; password: string; name: string | null; roleId: number }): Promise<UserType> {
    return this.prismaService.user.create({
      data: payload,
    }) as any
  }

  createUserIncludeRole(payload: {
    email: string
    password: string
    name: string | null
    roleId: number
  }): Promise<UserType & { role: RoleType }> {
    return this.prismaService.user.create({
      data: payload,
      include: {
        role: true,
      },
    }) as any
  }

  createUserAuthProviderIncludeUserAndRole(
    payload: CreateUserAuthProviderBodyType,
  ): Promise<UserAUthProviderIncludeUserAndRoleType> {
    return this.prismaService.userAuthProvider.create({
      data: payload,
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    }) as any
  }

  deleteVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput) {
    return this.prismaService.verificationCode.delete({
      where,
    })
  }

  deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prismaService.refreshToken.delete({
      where,
    })
  }

  // Chỉ tài khoản local(tài khoản của hệ thống) mới dùng được tính năng này, tài khoản log từ oauth không dùng được
  async resetPassword({
    email,
    hashedPassword,
    verificationCodeId,
  }: {
    email: string
    hashedPassword: string
    verificationCodeId: number
  }) {
    //Tìm tài khoản local sau đó lấy id của tài khoản local này để update, chứ không update trực tiếp được vì tìm theo email thì có thể có nhiều email, có thể là oauth, nên phải lọc ở đây, tìm id để update
    const user = await this.findUniqueUserLocalIncludeRole(email)

    if (!user) {
      throw UserNotFoundException
    }
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    //3, Xóa otp code
    await this.deleteVerificationCode({
      id: verificationCodeId,
    })

    return {
      message: 'Success.ResetPassword',
    }
  }
}
