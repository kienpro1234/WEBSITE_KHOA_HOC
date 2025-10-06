import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import {
  CreateCatBodyDTO,
  CreateCatResDTO,
  GetCatDetailParamDTO,
  GetCatDetailResDTO,
  GetCategoriesQueryDTO,
  GetCategoriesResDTO,
  UpdateCategoryBodyDTO,
  UpdateCategoryParamsDTO,
  UpdateCategoryResDTO,
} from 'src/routes/category/category.dto'

import { CategoryService } from 'src/routes/category/category.service'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ZodResponse({ type: GetCategoriesResDTO })
  findAll(@Query() query: GetCategoriesQueryDTO) {
    return this.categoryService.findAll(query)
  }

  @Get(':categoryId')
  @ZodResponse({ type: GetCatDetailResDTO })
  findById(@Param() params: GetCatDetailParamDTO) {
    return this.categoryService.findById(params.categoryId)
  }

  @Post()
  @ZodResponse({ type: CreateCatResDTO })
  create(@Body() body: CreateCatBodyDTO) {
    return this.categoryService.create(body)
  }

  @Post(':categoryId')
  @ZodResponse({ type: UpdateCategoryResDTO })
  update(@Body() body: UpdateCategoryBodyDTO, @Param() params: UpdateCategoryParamsDTO) {
    return this.categoryService.update({
      data: body,
      id: params.categoryId,
    })
  }
}
