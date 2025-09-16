import z from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  password: z.string().min(6).max(100),
  name: z.string().max(100).nullable(),
  bio: z.string().max(500).nullable(),
  avatar: z.string().nullable(),

  stripeCustomerId: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  deletedById: z.number().nullable(),
  roleId: z.number(),
})

export type UserType = z.infer<typeof UserSchema>
