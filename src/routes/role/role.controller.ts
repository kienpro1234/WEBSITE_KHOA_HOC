import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import {
  CreateRoleBodyDTO,
  CreateRoleResDTO,
  GetRoleParamsDTO,
  GetRoleResDTO,
  GetRolesResDTO,
} from 'src/routes/role/role.dto'
import { RoleService } from 'src/routes/role/role.service'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ZodResponse({ type: GetRolesResDTO })
  findAll() {
    return this.roleService.findAll()
  }

  @Get(':roleId')
  @ZodResponse({ type: GetRoleResDTO })
  findById(@Param() params: GetRoleParamsDTO) {
    return this.roleService.findById(params.roleId)
  }

  @Post()
  @ZodResponse({ type: CreateRoleResDTO })
  create(@Body() body: CreateRoleBodyDTO) {
    return this.roleService.create(body)
  }

  @Post(':roleId')
  @ZodResponse({ type: CreateRoleResDTO })
  update(@Body() body: CreateRoleBodyDTO, @Param() params: GetRoleParamsDTO) {
    return this.roleService.update({
      body,
      roleId: params.roleId,
    })
  }
}
