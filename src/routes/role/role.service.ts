import { Injectable } from '@nestjs/common'
import { RoleAlreadyExistsException, RoleNotFoundException } from 'src/routes/role/role.error'
import { CreateRoleBodyType } from 'src/routes/role/role.model'
import { RoleRepo } from 'src/routes/role/role.repo'
import { isUniqueConstraintPrismaError } from 'src/shared/helper'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepo: RoleRepo) {}

  findAll() {
    return this.roleRepo.findAll()
  }

  async findById(roleId: number) {
    const role = await this.roleRepo.findById(roleId)

    if (!role) {
      throw RoleNotFoundException
    }

    return role
  }

  async create(body: CreateRoleBodyType) {
    try {
      return await this.roleRepo.create(body)
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw RoleAlreadyExistsException
      }
      throw err
    }
  }

  async update({ roleId, body }: { roleId: number; body: CreateRoleBodyType }) {
    try {
      return await this.roleRepo.update({ roleId, body })
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw RoleAlreadyExistsException
      }
      throw err
    }
  }
}
