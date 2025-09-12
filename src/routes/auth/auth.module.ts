import { Module } from '@nestjs/common'
// import { PassportModule } from '@nestjs/passport'
import { AuthController } from 'src/routes/auth/auth.controller'
import { AuthRepo } from 'src/routes/auth/auth.repo'
import { AuthService } from 'src/routes/auth/auth.service'
import { FacebookService } from 'src/routes/auth/facebook.service'
// import { FacebookStrategy } from 'src/routes/auth/facebook.strategy'
import { GoogleService } from 'src/routes/auth/google.service'

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }), // Cấu hình passport
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo, GoogleService, FacebookService],
})
export class AuthModule {}
