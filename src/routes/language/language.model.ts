import z from 'zod'

export const LanguageSchema = z.object({
  id: z.string().max(15),
  name: z.string().max(500),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const GetLanguagesResSchema = z.object({
  data: z.array(LanguageSchema),
  totalItems: z.number(),
})

export const GetLanguageParamSchema = z.object({
  languageId: z.string().max(15),
})

export const CreateLanguageBodySchema = LanguageSchema.pick({
  id: true,
  name: true,
})

export const CreateLanguageResSchema = LanguageSchema

export const UpdateLanguageBodySchema = CreateLanguageBodySchema.pick({
  name: true,
})

export type LanguageType = z.infer<typeof LanguageSchema>
export type GetLanguagesResType = z.infer<typeof GetLanguagesResSchema>
export type GetLanguageParamType = z.infer<typeof GetLanguageParamSchema>
export type CreateLanguageBodyType = z.infer<typeof CreateLanguageBodySchema>
export type CreateLanguageResType = z.infer<typeof CreateLanguageResSchema>
export type UpdateLanguageBodyType = z.infer<typeof UpdateLanguageBodySchema>
