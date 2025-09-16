import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from 'src/routes/auth/auth.module'
import { SharedModule } from 'src/shared/shared.module'
import CustomZodValidationPipe from 'src/shared/pipes/myZodValidation.pipe'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

import { AllExceptionsFilter } from 'src/shared/filters/all-exception.filter'
import { ProfileModule } from 'src/routes/profile/profile.module'
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'

@Module({
  imports: [SharedModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
