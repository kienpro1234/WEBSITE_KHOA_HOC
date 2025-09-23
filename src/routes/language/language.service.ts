import { Injectable } from '@nestjs/common'
import { LanguageAlreadyExistsException, LanguageNotFoundException } from 'src/routes/language/language.error'
import { CreateLanguageBodyType, UpdateLanguageBodyType } from 'src/routes/language/language.model'
import { LanguageRepo } from 'src/routes/language/language.repo'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helper'

@Injectable()
export class LanguageService {
  constructor(private readonly languageRepo: LanguageRepo) {}
  findAll() {
    return this.languageRepo.findAll()
  }

  async findById(languageId: string) {
    const language = await this.languageRepo.findById(languageId)

    if (!language) {
      throw LanguageNotFoundException
    }
  }

  async create(body: CreateLanguageBodyType) {
    try {
      return await this.languageRepo.create(body)
    } catch (err) {
      if (isUniqueConstraintPrismaError(err)) {
        throw LanguageAlreadyExistsException
      }

      throw err
    }
  }

  async update({ languageId, data }: { languageId: string; data: UpdateLanguageBodyType }) {
    try {
      return await this.languageRepo.update({
        id: languageId,
        data,
      })
    } catch (err) {
      if (isNotFoundPrismaError(err)) {
        throw LanguageNotFoundException
      }

      throw err
    }
  }
}
