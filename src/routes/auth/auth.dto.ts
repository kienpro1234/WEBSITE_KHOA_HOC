import { createZodDto } from 'nestjs-zod'
import {
  GetLinkResSchema,
  LoginBodySchema,
  LoginResSchema,
  LogoutBodySchema,
  RegisterBodySchema,
  RegisterResSchema,
  SendOTPBodySchema,
} from 'src/routes/auth/auth.model'

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}

export class LogoutBodyDTO extends createZodDto(LogoutBodySchema) {}

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

export class GetLinkResDTO extends createZodDto(GetLinkResSchema) {}
