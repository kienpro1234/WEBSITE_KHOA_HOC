import { NotFoundException, UnauthorizedException } from '@nestjs/common'

export const UserNotFoundException = new NotFoundException({
  message: 'Error.UserNotFound',
  statusCode: 404,
})
export const PasswordIncorrectException = new UnauthorizedException({
  message: 'Error.PasswordIncorrect',
  statusCode: 401,
  path: 'oldPassword',
})
