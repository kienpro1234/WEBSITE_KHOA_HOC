import { CategoryTranslationSchema } from 'src/routes/category/category-translation/category-translation.model'
import z from 'zod'

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  parentId: z.number().nullable().optional(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const GetCategoriesResSchema = z.object({
  data: z.array(
    CategorySchema.extend({
      translations: z.array(CategoryTranslationSchema),
    }),
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export const GetCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
})
export const GetCatDetailParamSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
})
export const GetCatDetailResSchema = CategorySchema.extend({
  translations: z.array(CategoryTranslationSchema),
})

export const CreateCatBodySchema = CategorySchema.pick({
  name: true,
  parentId: true,
})
export const CreateCatResSchema = CategorySchema

export const UpdateCategoryBodySchema = CreateCatBodySchema.partial()
export const UpdateCategoryResSchema = CategorySchema
export const UpdateCategoryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
})

export type CategoryType = z.infer<typeof CategorySchema>
export type GetCategoriesResType = z.infer<typeof GetCategoriesResSchema>
export type GetCategoriesQueryType = z.infer<typeof GetCategoriesQuerySchema>

export type GetCatDetailParamType = z.infer<typeof GetCatDetailParamSchema>
export type GetCatDetailResType = z.infer<typeof GetCatDetailResSchema>

export type CreateCatBodyType = z.infer<typeof CreateCatBodySchema>
export type CreateCatResType = z.infer<typeof CreateCatResSchema>

export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>
export type UpdateCategoryResType = z.infer<typeof UpdateCategoryResSchema>
export type UpdateCategoryParamsType = z.infer<typeof UpdateCategoryParamsSchema>
