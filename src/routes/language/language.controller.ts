import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import {
  CreateLanguageBodyDTO,
  CreateLanguageResDTO,
  GetLanguageParamDTO,
  GetLanguagesResDTO,
  UpdateLanguageBodyDTO,
} from 'src/routes/language/language.dto'
import { LanguageService } from 'src/routes/language/language.service'

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}
  @Get()
  @ZodResponse({ type: GetLanguagesResDTO })
  findAll() {
    return this.languageService.findAll()
  }

  @Get(':languageId')
  findById(@Param() params: GetLanguageParamDTO) {
    return this.languageService.findById(params.languageId)
  }

  @Post()
  @ZodResponse({ type: CreateLanguageResDTO })
  create(@Body() body: CreateLanguageBodyDTO) {
    return this.languageService.create(body)
  }

  @Post(':languageId')
  @ZodResponse({ type: CreateLanguageResDTO })
  update(@Body() body: UpdateLanguageBodyDTO, @Param() params: GetLanguageParamDTO) {
    return this.languageService.update({
      languageId: params.languageId,
      data: body,
    })
  }
}
