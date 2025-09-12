import { createZodDto } from 'nestjs-zod'
import { GetMeResSchema } from 'src/routes/profile/profile.model'

export class GetMeResDTO extends createZodDto(GetMeResSchema) {}
