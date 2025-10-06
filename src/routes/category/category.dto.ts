import { createZodDto } from 'nestjs-zod'
import {
  CreateCatBodySchema,
  CreateCatResSchema,
  GetCatDetailParamSchema,
  GetCatDetailResSchema,
  GetCategoriesQuerySchema,
  GetCategoriesResSchema,
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema,
  UpdateCategoryResSchema,
} from 'src/routes/category/category.model'

export class GetCategoriesResDTO extends createZodDto(GetCategoriesResSchema) {}
export class GetCategoriesQueryDTO extends createZodDto(GetCategoriesQuerySchema) {}

export class GetCatDetailParamDTO extends createZodDto(GetCatDetailParamSchema) {}
export class GetCatDetailResDTO extends createZodDto(GetCatDetailResSchema) {}

export class CreateCatBodyDTO extends createZodDto(CreateCatBodySchema) {}
export class CreateCatResDTO extends createZodDto(CreateCatResSchema) {}

export class UpdateCategoryBodyDTO extends createZodDto(UpdateCategoryBodySchema) {}
export class UpdateCategoryResDTO extends createZodDto(UpdateCategoryResSchema) {}
export class UpdateCategoryParamsDTO extends createZodDto(UpdateCategoryParamsSchema) {}
