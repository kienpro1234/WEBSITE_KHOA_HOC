import { ConflictException, HttpStatus, NotFoundException } from '@nestjs/common'

export const CategoryNotFoundException = new NotFoundException({
  message: 'Error.CategoryNotFound',
  statusCode: HttpStatus.NOT_FOUND,
})

export const CategoryAlreadyExistsException = new ConflictException({
  message: 'Error.CategoryAlreadyExists',
  statusCode: HttpStatus.CONFLICT,
})
