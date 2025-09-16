import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserType } from 'src/shared/model/shared-user.model'

import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class SharedUserRepo {
  constructor(private prismaService: PrismaService) {}

  findUniqueUser(where: Prisma.UserWhereUniqueInput): Promise<UserType | null> {
    return this.prismaService.user.findUnique({
      where,
    }) as any
  }
}
