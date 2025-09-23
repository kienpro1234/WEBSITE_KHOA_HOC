import { ConflictException, HttpStatus, NotFoundException } from '@nestjs/common'

export const RoleNotFoundException = new NotFoundException({
  message: 'Error.RoleNotFound',
  statusCode: HttpStatus.NOT_FOUND,
})

export const RoleAlreadyExistsException = new ConflictException({
  message: 'Error.RoleAlreadyExists',
  statusCode: HttpStatus.CONFLICT,
})
