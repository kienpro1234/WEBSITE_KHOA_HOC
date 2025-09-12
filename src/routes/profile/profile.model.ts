import { UserSchema } from 'src/shared/model/shared-user.model'
import z from 'zod'

export const GetMeResSchema = UserSchema.omit({
  password: true,
})

export type GetMeResType = z.infer<typeof GetMeResSchema>
