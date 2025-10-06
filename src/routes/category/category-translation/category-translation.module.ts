import { Module } from '@nestjs/common'
import { CategoryTranslationController } from 'src/routes/category/category-translation/category-translation.controller'
import { CategoryTranslationRepo } from 'src/routes/category/category-translation/category-translation.repo'
import { CategoryTranslationService } from 'src/routes/category/category-translation/category-translation.service'
import { CategoryModule } from 'src/routes/category/category.module'

@Module({
  controllers: [CategoryTranslationController],
  providers: [CategoryTranslationService, CategoryTranslationRepo],
  imports: [CategoryModule],
})
export class CategoryTranslationModule {}
