import z from 'zod'

export const MessageResSchema = z.object({
  message: z.string(),
})
