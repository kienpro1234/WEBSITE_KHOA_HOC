import { Injectable } from '@nestjs/common'
import { CreateRoleBodyType, GetRolesResType } from 'src/routes/role/role.model'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { RoleType } from 'src/shared/model/shared-role.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class RoleRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<GetRolesResType> {
    const roles = await this.prismaService.role.findMany({
      where: {
        deletedAt: null,
      },
    })

    return {
      data: roles,
      totalItems: roles.length,
    } as any
  }

  findById(roleId: number): Promise<RoleType | null> {
    return this.prismaService.role.findUnique({
      where: {
        id: roleId,
      },
    }) as any
  }

  create(body: CreateRoleBodyType): Promise<RoleType> {
    return this.prismaService.role.create({
      data: body,
    }) as any
  }

  update({ roleId, body }: { roleId: number; body: CreateRoleBodyType }): Promise<RoleType> {
    return this.prismaService.role.update({
      where: {
        id: roleId,
      },
      data: body,
    }) as any
  }
}
