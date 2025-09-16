import { createZodDto } from 'nestjs-zod'
import {
  ForgetPasswordBodySchema,
  GetLinkResSchema,
  LoginBodySchema,
  LoginResSchema,
  LogoutBodySchema,
  RegisterBodySchema,
  RegisterResSchema,
  ResetPasswordBodySchema,
  SendOTPBodySchema,
} from 'src/routes/auth/auth.model'

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}

export class LogoutBodyDTO extends createZodDto(LogoutBodySchema) {}

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

export class GetLinkResDTO extends createZodDto(GetLinkResSchema) {}

export class ForgetPasswordBodyDTO extends createZodDto(ForgetPasswordBodySchema) {}
export class ResetPasswordBodyDTO extends createZodDto(ResetPasswordBodySchema) {}
