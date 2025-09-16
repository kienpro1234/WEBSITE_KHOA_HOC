import { UserSchema } from 'src/shared/model/shared-user.model'
import z from 'zod'

export const GetMeResSchema = UserSchema.omit({
  password: true,
})

export const UpdateMeBodySchema = UserSchema.pick({
  name: true,
  bio: true,
  avatar: true,
})

export const UpdateMeResSchema = UserSchema.omit({
  password: true,
})

export const ChangePasswordBodySchema = z
  .object({
    oldPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ newPassword, oldPassword }, ctx) => {
    if (newPassword === oldPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'New password must be different from old password',
        path: ['newPassword'],
      })
    }
  })

export type GetMeResType = z.infer<typeof GetMeResSchema>
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>
export type UpdateMeResType = z.infer<typeof UpdateMeResSchema>
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBodySchema>
