import { Injectable } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'
import { CategoryAlreadyExistsException, CategoryNotFoundException } from 'src/routes/category/category.error'
import { CreateCatBodyType, GetCategoriesQueryType, UpdateCategoryBodyType } from 'src/routes/category/category.model'
import { CategoryRepo } from 'src/routes/category/category.repo'
import { isUniqueConstraintPrismaError } from 'src/shared/helper'

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  findAll(query: GetCategoriesQueryType) {
    return this.categoryRepo.findAll(query, I18nContext.current()?.lang as string)
  }

  async findById(id: number) {
    const category = await this.categoryRepo.findById(id, I18nContext.current()?.lang as string)
    if (!category) {
      throw CategoryNotFoundException
    }

    return category
  }

  async create(body: CreateCatBodyType) {
    try {
      return await this.categoryRepo.create(body)
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw CategoryAlreadyExistsException
      }

      throw err
    }
  }

  async update({ id, data }: { id: number; data: UpdateCategoryBodyType }) {
    try {
      return await this.categoryRepo.update({ id, data })
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw CategoryAlreadyExistsException
      }

      throw err
    }
  }
}
