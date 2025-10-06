import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import {
  CreateCategoryTransBodyDTO,
  GetCategoryTranslationParamDTO,
  GetCategoryTranslationResDTO,
  GetCategoryTranslationsQueryDTO,
  GetCategoryTranslationsResDTO,
  UpdateCategoryTransBodyDTO,
  UpdateCategoryTransParamDTO,
  UpdateCategoryTransResDTO,
} from 'src/routes/category/category-translation/category-translation.dto'
import { CategoryTranslationService } from 'src/routes/category/category-translation/category-translation.service'

@Controller('category-translation')
export class CategoryTranslationController {
  constructor(private readonly categoryTranslationService: CategoryTranslationService) {}

  @Get()
  @ZodResponse({ type: GetCategoryTranslationsResDTO })
  findAll(@Query() query: GetCategoryTranslationsQueryDTO) {
    return this.categoryTranslationService.findAll(query)
  }

  @Get(':categoryTransId')
  @ZodResponse({ type: GetCategoryTranslationResDTO })
  findById(@Param() params: GetCategoryTranslationParamDTO) {
    return this.categoryTranslationService.findById(params.categoryTransId)
  }

  @Post()
  @ZodResponse({ type: GetCategoryTranslationResDTO })
  create(@Body() body: CreateCategoryTransBodyDTO) {
    return this.categoryTranslationService.create(body)
  }

  @Put(':categoryTransId')
  @ZodResponse({ type: UpdateCategoryTransResDTO })
  update(@Body() body: UpdateCategoryTransBodyDTO, @Param() params: UpdateCategoryTransParamDTO) {
    return this.categoryTranslationService.update({
      data: body,
      id: params.categoryTransId,
    })
  }

  @Delete(':categoryTransId')
  delete(@Param() params: GetCategoryTranslationParamDTO) {
    return this.categoryTranslationService.delete(params.categoryTransId)
  }
}
