import { HttpStatus, UnprocessableEntityException } from '@nestjs/common'

export const EmailNotFoundException = new UnprocessableEntityException({
  message: 'Error.EmailNotFound',
  path: 'email',
  statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const EmailNotFoundOrInvalidPasswordException = new UnprocessableEntityException({
  message: 'Error.EmailNotFoundOrInvalidPassword',
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
