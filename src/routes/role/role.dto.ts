import { createZodDto } from 'nestjs-zod'
import {
  CreateRoleBodySchema,
  CreateRoleResSchema,
  GetRoleParamsSchema,
  GetRoleResSchema,
  GetRolesResSchema,
} from 'src/routes/role/role.model'

export class GetRolesResDTO extends createZodDto(GetRolesResSchema) {}

export class GetRoleParamsDTO extends createZodDto(GetRoleParamsSchema) {}
export class GetRoleResDTO extends createZodDto(GetRoleResSchema) {}

export class CreateRoleBodyDTO extends createZodDto(CreateRoleBodySchema) {}
export class CreateRoleResDTO extends createZodDto(CreateRoleResSchema) {}
