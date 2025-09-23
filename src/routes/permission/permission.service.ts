import { Injectable } from '@nestjs/common'
import { PermissionRepo } from 'src/routes/permission/permission.repo'

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepo) {}
}
