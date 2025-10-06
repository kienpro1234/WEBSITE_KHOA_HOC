import { ConflictException, ForbiddenException, HttpStatus, NotFoundException } from '@nestjs/common'

export const CategoryTranslationNotFoundException = new NotFoundException({
  message: 'Error.CategoryTranslationNotFound',
  statusCode: HttpStatus.NOT_FOUND,
})

export const CategoryTranslationConflictException = new ConflictException({
  message: 'Error.CategoryTranslationConflict',
  statusCode: HttpStatus.CONFLICT,
})

export const ThisCategoryHasBeenDeletedException = new ForbiddenException({
  message: 'Error.ThisCategoryHasBeenDeleted',
  statusCode: HttpStatus.FORBIDDEN,
})
