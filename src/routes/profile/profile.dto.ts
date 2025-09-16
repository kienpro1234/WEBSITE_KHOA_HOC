import { createZodDto } from 'nestjs-zod'
import {
  ChangePasswordBodySchema,
  GetMeResSchema,
  UpdateMeBodySchema,
  UpdateMeResSchema,
} from 'src/routes/profile/profile.model'

export class GetMeResDTO extends createZodDto(GetMeResSchema) {}
export class UpdateMeBodyDTO extends createZodDto(UpdateMeBodySchema) {}
export class UpdateMeResDTO extends createZodDto(UpdateMeResSchema) {}
export class ChangePasswordBodyDTO extends createZodDto(ChangePasswordBodySchema) {}
