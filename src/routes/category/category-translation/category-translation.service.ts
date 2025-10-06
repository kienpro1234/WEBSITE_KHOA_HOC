import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { I18nTranslations } from 'src/generated/i18n.generated'
import {
  CategoryTranslationConflictException,
  CategoryTranslationNotFoundException,
  ThisCategoryHasBeenDeletedException,
} from 'src/routes/category/category-translation/category-translation.error'
import {
  CreateCategoryTransBodyType,
  GetCategoryTranslationsQueryType,
  UpdateCategoryTransBodyType,
} from 'src/routes/category/category-translation/category-translation.model'
import { CategoryTranslationRepo } from 'src/routes/category/category-translation/category-translation.repo'
import { CategoryRepo } from 'src/routes/category/category.repo'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helper'

@Injectable()
export class CategoryTranslationService {
  constructor(
    private readonly categoryTranslationRepo: CategoryTranslationRepo,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly categoryRepo: CategoryRepo,
  ) {}

  findAll(query: GetCategoryTranslationsQueryType) {
    console.log(this.i18n.t('error.NOT_FOUND', { lang: I18nContext.current()?.lang }))
    return this.categoryTranslationRepo.findAll(query)
  }

  async findById(id: number) {
    const categoryTrans = await this.categoryTranslationRepo.findById(id)
    if (!categoryTrans) {
      throw CategoryTranslationNotFoundException
    }
    return categoryTrans
  }

  async create(body: CreateCategoryTransBodyType) {
    try {
      // Kiểm tra xem category này đã bị xóa mềm chưa, nếu đã bị xóa thì không cho create translations cho category này nữa
      const category = await this.categoryRepo.findDeletedCatById(body.categoryId)

      if (category) {
        throw ThisCategoryHasBeenDeletedException
      }

      return await this.categoryTranslationRepo.create(body)
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw CategoryTranslationConflictException
      }
      throw err
    }
  }

  async update({ data, id }: { data: UpdateCategoryTransBodyType; id: number }) {
    try {
      return await this.categoryTranslationRepo.update({ id, data })
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw CategoryTranslationConflictException
      }
      throw err
    }
  }

  async delete(id: number) {
    try {
      return await this.categoryTranslationRepo.delete({ id })
    } catch (err) {
      if (isNotFoundPrismaError(err)) {
        throw CategoryTranslationNotFoundException
      }
      throw err
    }
  }
}
