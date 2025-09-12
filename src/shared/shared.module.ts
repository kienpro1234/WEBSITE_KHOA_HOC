import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SharedRoleRepo } from 'src/shared/repositories/shared-role.repo'

import { EmailService } from 'src/shared/services/email.service'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'

const sharedProviders = [PrismaService, HashingService, TokenService, EmailService, SharedRoleRepo]

@Global()
@Module({
  providers: sharedProviders,
  exports: sharedProviders,
  imports: [JwtModule],
})
export class SharedModule {}
