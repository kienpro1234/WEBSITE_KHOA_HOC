import { HttpStatus, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'

export const EmailNotFoundException = new UnprocessableEntityException({
  message: 'Error.EmailNotFound',
  path: 'email',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const EmailAlreadyExistsException = new UnprocessableEntityException({
  message: 'Error.EmailAlreadyExists',
  path: 'email',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const AccountAlreadyExistsException = new UnprocessableEntityException({
  message: 'Error.AccountAlreadyExists',
  path: 'email',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const InvalidPasswordException = new UnprocessableEntityException({
  message: 'Error.InvalidPassword',
  path: 'password',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const FailedToSendOTPException = new UnprocessableEntityException({
  message: 'Error.FailedToSendOTP',
  path: 'code',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const InvalidVerificationCodeException = new UnprocessableEntityException({
  message: 'Error.InvalidVerificationCode',
  path: 'code',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const OTPExpiredException = new UnprocessableEntityException({
  message: 'Error.OTPExpired',
  path: 'code',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const GoogleUserInfoError = new Error('Error.FailedToGetGoogleUserInfo')

export const InvalidRefreshTokenException = new UnauthorizedException({
  message: 'Error.InvalidRefreshToken',
  path: 'refreshToken',
  statusCode: HttpStatus.UNAUTHORIZED,
})

export const RefreshTokenExpiredException = new UnauthorizedException({
  message: 'Error.RefreshTokenExpired',
  path: 'refreshToken',
  statusCode: HttpStatus.UNAUTHORIZED,
})

export const RefreshTokenNotFoundException = new UnauthorizedException({
  message: 'Error.RefreshTokenNotFound',
  path: 'refreshToken',
  statusCode: HttpStatus.UNAUTHORIZED,
})

export const DeviceNotFoundException = new UnauthorizedException({
  message: 'Error.DeviceNotFound',
  statusCode: HttpStatus.UNAUTHORIZED,
})

export const AbnormalDeviceDetectionException = new UnauthorizedException({
  message: 'Error.AbnormalDeviceDetection',
  statusCode: HttpStatus.UNAUTHORIZED,
})
