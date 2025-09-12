import { Injectable } from '@nestjs/common'
import { RoleName } from 'src/shared/constants/role.constant'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class SharedRoleRepo {
  private learnerRoleId: number | null = null
  private instructorRoleId: number | null = null
  private adminRoleId: number | null = null
  constructor(private readonly prismaService: PrismaService) {}

  private async getRole(roleName: string) {
    const role = await this.prismaService.role.findFirst({
      where: { name: roleName, deletedAt: null },
    })

    if (!role) {
      throw new Error('Role not found')
    }

    return role
  }

  async getLearnerRoleId() {
    if (this.learnerRoleId) {
      return this.learnerRoleId
    }

    const role = await this.getRole(RoleName.LEARNER)

    this.learnerRoleId = role.id
    return role.id
  }

  async getInstructorRoleId() {
    if (this.instructorRoleId) {
      return this.instructorRoleId
    }

    const role = await this.getRole(RoleName.INSTRUCTOR)

    this.instructorRoleId = role.id
    return role.id
  }

  async getAdminRoleId() {
    if (this.adminRoleId) {
      return this.adminRoleId
    }

    const role = await this.getRole(RoleName.Admin)

    this.adminRoleId = role.id
    return role.id
  }
}
