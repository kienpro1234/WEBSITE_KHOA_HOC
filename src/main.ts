import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import envConfig from 'src/shared/config'

import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
  })

  app.enableCors()
  await app.listen(envConfig.PORT ?? 3000)
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter))

  console.log(`Server is running on http://localhost:${envConfig.PORT ?? 3000}`)
}
bootstrap()
