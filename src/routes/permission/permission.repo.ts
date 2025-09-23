import { Injectable } from '@nestjs/common'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class PermissionRepo {
  constructor(private readonly prismaService: PrismaService) {}
}
