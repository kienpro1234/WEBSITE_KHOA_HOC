import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'
import { SharedRoleRepo } from 'src/shared/repositories/shared-role.repo'
import { SharedUserRepo } from 'src/shared/repositories/shared-user.repo'

import { EmailService } from 'src/shared/services/email.service'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'

const sharedProviders = [
  PrismaService,
  HashingService,
  TokenService,
  EmailService,
  SharedRoleRepo,
  SharedUserRepo,
  AuthenticationGuard,
  AccessTokenGuard,
]

@Global()
@Module({
  providers: sharedProviders,
  exports: sharedProviders,
  imports: [JwtModule],
})
export class SharedModule {}
