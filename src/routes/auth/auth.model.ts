import { AuthProvider, TypeOfVerificationCode } from 'src/shared/constants/auth.constant'
import { RoleSchema } from 'src/shared/model/shared-role.model'
import { UserSchema } from 'src/shared/model/shared-user.model'
import z from 'zod'

export const DeviceSchema = z.object({
  id: z.number(),
  deviceFingerprint: z.string().min(1).max(255),
  deviceName: z.string().min(1).max(255).nullable(),
  deviceType: z.string().min(1).max(255).nullable(),
  ipAddress: z.string().min(1).max(255).nullable(),
  userAgent: z.string().min(1).max(255).nullable(),
  lastLoginAt: z.iso.datetime().nullable(),
  isActive: z.boolean().default(true),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({
  deviceFingerprint: z.string().min(1).max(255),
})

export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const RefreshTokenBodySchema = z.object({
  refreshToken: z.string(),
  deviceFingerprint: z.string().min(1).max(255),
})
export const RefreshTokenResSchema = LoginResSchema

export const LogoutBodySchema = z.object({
  refreshToken: z.string(),
  deviceFingerprint: z.string().min(1).max(255),
})

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
}).extend({
  code: z.string().length(6),
})

export const RegisterResSchema = UserSchema.omit({
  password: true,
})

export const VerificationCodeSchema = z.object({
  id: z.number(),
  email: z.email(),
  code: z.string().length(6),
  type: z.enum([
    TypeOfVerificationCode.REGISTER,
    TypeOfVerificationCode.FORGET_PASSWORD,
    TypeOfVerificationCode.VERIFY_EMAIL,
  ]),
  expiresAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
})

export const SendOTPBodySchema = VerificationCodeSchema.pick({
  email: true,
  type: true,
})

export const GetLinkResSchema = z.object({
  url: z.url(),
})

export const RefreshTokenSchema = z.object({
  id: z.number(),
  userId: z.number(),
  deviceId: z.number(),
  token: z.string(),
  expiresAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
})

export const UserAuthProviderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  provider: z.enum([AuthProvider.GOOGLE, AuthProvider.FACEBOOK, AuthProvider.LOCAL]),
  providerUserId: z.string(),
  emailFromProvider: z.string().nullable().optional(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  expiresAt: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime(),
})

export const UserAUthProviderIncludeUserAndRole = UserAuthProviderSchema.extend({
  user: UserSchema.extend({
    role: RoleSchema,
  }),
})

export const CreateUserAuthProviderBodySchema = UserAuthProviderSchema.pick({
  userId: true,
  provider: true,
  providerUserId: true,
  emailFromProvider: true,
  accessToken: true,
  refreshToken: true,
  expiresAt: true,
})

export const ForgetPasswordBodySchema = UserSchema.pick({
  email: true,
})

export const ResetPasswordBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({
  code: z.string().length(6),
})

export type LoginBodyType = z.infer<typeof LoginBodySchema>
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>
export type GetLinkResType = z.infer<typeof GetLinkResSchema>
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>
export type UserAuthProviderType = z.infer<typeof UserAuthProviderSchema>
export type CreateUserAuthProviderBodyType = z.infer<typeof CreateUserAuthProviderBodySchema>
export type UserAUthProviderIncludeUserAndRoleType = z.infer<typeof UserAUthProviderIncludeUserAndRole>
export type ForgetPasswordBodyType = z.infer<typeof ForgetPasswordBodySchema>
export type ResetPasswordBodyType = z.infer<typeof ResetPasswordBodySchema>
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>
export type DeviceType = z.infer<typeof DeviceSchema>
