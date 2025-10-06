import { createZodDto } from 'nestjs-zod'
import {
  CreateCategoryTransBodySchema,
  GetCategoryTranslationParamSchema,
  GetCategoryTranslationResSchema,
  GetCategoryTranslationsQuerySchema,
  GetCategoryTranslationsResSchema,
  UpdateCategoryTransBodySchema,
  UpdateCategoryTransParamSchema,
  UpdateCategoryTransResSchema,
} from 'src/routes/category/category-translation/category-translation.model'

export class GetCategoryTranslationsQueryDTO extends createZodDto(GetCategoryTranslationsQuerySchema) {}
export class GetCategoryTranslationsResDTO extends createZodDto(GetCategoryTranslationsResSchema) {}
export class GetCategoryTranslationParamDTO extends createZodDto(GetCategoryTranslationParamSchema) {}
export class GetCategoryTranslationResDTO extends createZodDto(GetCategoryTranslationResSchema) {}

export class CreateCategoryTransBodyDTO extends createZodDto(CreateCategoryTransBodySchema) {}

export class UpdateCategoryTransBodyDTO extends createZodDto(UpdateCategoryTransBodySchema) {}
export class UpdateCategoryTransResDTO extends createZodDto(UpdateCategoryTransResSchema) {}
export class UpdateCategoryTransParamDTO extends createZodDto(UpdateCategoryTransParamSchema) {}
