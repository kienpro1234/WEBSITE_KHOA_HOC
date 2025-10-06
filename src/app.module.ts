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
import { LanguageModule } from 'src/routes/language/language.module'
import { RoleModule } from 'src/routes/role/role.module'
import { PermissionModule } from 'src/routes/permission/permission.module'
import { CategoryTranslationModule } from 'src/routes/category/category-translation/category-translation.module'
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import path from 'path'
import { CategoryModule } from 'src/routes/category/category.module'

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ProfileModule,
    LanguageModule,
    RoleModule,
    PermissionModule,
    CategoryTranslationModule,
    CategoryModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve('src/i18n'),
        watch: true,
      },
      typesOutputPath: path.resolve('src/generated/i18n.generated.ts'),

      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
    }),
  ],
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
