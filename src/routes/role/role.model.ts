import { RoleSchema } from 'src/shared/model/shared-role.model'
import z from 'zod'

export const GetRolesResSchema = z.object({
  data: z.array(RoleSchema),
  totalItems: z.number(),
})

export const GetRoleParamsSchema = z.object({
  roleId: z.coerce.number().int().positive(),
})

export const GetRoleResSchema = RoleSchema

export const CreateRoleBodySchema = RoleSchema.pick({
  name: true,
  description: true,
}).strict()

export const CreateRoleResSchema = RoleSchema

export type RoleType = z.infer<typeof RoleSchema>
export type GetRolesResType = z.infer<typeof GetRolesResSchema>
export type GetRoleParamsType = z.infer<typeof GetRoleParamsSchema>
export type GetRoleResType = z.infer<typeof GetRoleResSchema>
export type CreateRoleBodyType = z.infer<typeof CreateRoleBodySchema>
export type CreateRoleResType = z.infer<typeof CreateRoleResSchema>
