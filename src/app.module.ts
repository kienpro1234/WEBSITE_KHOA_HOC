import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from 'src/routes/auth/auth.module'
import { SharedModule } from 'src/shared/shared.module'
import CustomZodValidationPipe from 'src/shared/pipes/myZodValidation.pipe'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

import { AllExceptionsFilter } from 'src/shared/filters/all-exception.filter'

@Module({
  imports: [SharedModule, AuthModule],
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
  ],
})
export class AppModule {}
