import z from 'zod'

export const CategoryTranslationSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  languageId: z.string(),
  name: z.string().max(500),
  description: z.string().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),

  deletedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const GetCategoryTranslationsResSchema = z.object({
  data: z.array(CategoryTranslationSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export const GetCategoryTranslationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
})

export const GetCategoryTranslationParamSchema = z
  .object({
    categoryTransId: z.coerce.number().int().positive(),
  })
  .strict()

export const GetCategoryTranslationResSchema = CategoryTranslationSchema

export const CreateCategoryTransBodySchema = CategoryTranslationSchema.pick({
  categoryId: true,
  languageId: true,
  name: true,
  description: true,
})

export const UpdateCategoryTransBodySchema = CreateCategoryTransBodySchema.extend({
  deletedAt: z.iso.datetime().nullable().optional(),
})
export const UpdateCategoryTransParamSchema = GetCategoryTranslationParamSchema
export const UpdateCategoryTransResSchema = GetCategoryTranslationResSchema

export type CategoryTranslationType = z.infer<typeof CategoryTranslationSchema>
export type GetCategoryTranslationsQueryType = z.infer<typeof GetCategoryTranslationsQuerySchema>
export type GetCategoryTranslationsResType = z.infer<typeof GetCategoryTranslationsResSchema>
export type GetCategoryTranslationResType = z.infer<typeof GetCategoryTranslationResSchema>
export type CreateCategoryTransBodyType = z.infer<typeof CreateCategoryTransBodySchema>

export type UpdateCategoryTransBodyType = z.infer<typeof UpdateCategoryTransBodySchema>
export type UpdateCategoryTransParamType = z.infer<typeof UpdateCategoryTransParamSchema>
export type UpdateCategoryTransResType = z.infer<typeof UpdateCategoryTransResSchema>
