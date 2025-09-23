import { createZodDto } from 'nestjs-zod'
import {
  CreateLanguageBodySchema,
  CreateLanguageResSchema,
  GetLanguageParamSchema,
  GetLanguagesResSchema,
  UpdateLanguageBodySchema,
} from 'src/routes/language/language.model'

export class GetLanguagesResDTO extends createZodDto(GetLanguagesResSchema) {}
export class GetLanguageParamDTO extends createZodDto(GetLanguageParamSchema) {}

export class CreateLanguageBodyDTO extends createZodDto(CreateLanguageBodySchema) {}
export class CreateLanguageResDTO extends createZodDto(CreateLanguageResSchema) {}

export class UpdateLanguageBodyDTO extends createZodDto(UpdateLanguageBodySchema) {}
