import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  CreateUserAuthProviderBodyType,
  RefreshTokenType,
  UserAUthProviderIncludeUserAndRoleType,
  UserAuthProviderType,
  UserType,
  VerificationCodeType,
} from 'src/routes/auth/auth.model'

import { SerializeAll } from 'src/shared/decorators/serialize.decorator'

import { RoleType } from 'src/shared/model/shared-role.model'

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

  findUniqueUser(where: Prisma.UserWhereUniqueInput): Promise<UserType | null> {
    return this.prismaService.user.findUnique({
      where,
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

  //Tạo hoặc update device, nếu nhận thấy cùng 1 người dùng, cùng 1 thiết bị, thì update lại thông tin, nếu khác thì tạo mới
  async createOrupdateDevice({
    userId,
    device,
  }: {
    userId: number
    device: { deviceName: string; deviceType: string; ip: string; userAgent: string }
  }) {
    return this.prismaService.device.upsert({
      where: {
        userId_deviceName_deviceType: {
          userId,
          deviceName: device.deviceName,
          deviceType: device.deviceType,
        },
      },
      create: {
        userId,
        deviceName: device.deviceName,
        deviceType: device.deviceType,
        isActive: true,
        ipAddress: device.ip,
        userAgent: device.userAgent,
        lastLoginAt: new Date(),
      },
      update: {
        isActive: true,
        lastLoginAt: new Date(),
        ipAddress: device.ip,
        userAgent: device.userAgent,
      },
    })
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
}
