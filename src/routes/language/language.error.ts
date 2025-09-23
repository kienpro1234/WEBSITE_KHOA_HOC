import { ConflictException, HttpStatus, NotFoundException } from '@nestjs/common'

export const LanguageNotFoundException = new NotFoundException({
  message: 'Error.LanguageNotFound',
  statusCode: HttpStatus.NOT_FOUND,
})

export const LanguageAlreadyExistsException = new ConflictException({
  message: 'Error.LanguageAlreadyExists',
  statusCode: HttpStatus.CONFLICT,
})
