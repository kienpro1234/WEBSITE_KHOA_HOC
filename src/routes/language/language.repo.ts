import { Injectable } from '@nestjs/common'
import {
  CreateLanguageBodyType,
  CreateLanguageResType,
  GetLanguagesResType,
  LanguageType,
  UpdateLanguageBodyType,
} from 'src/routes/language/language.model'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class LanguageRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<GetLanguagesResType> {
    const languages = await this.prismaService.language.findMany({
      where: {
        deletedAt: null,
      },
    })

    return {
      data: languages,
      totalItems: languages.length,
    } as any
  }

  findById(id: string): Promise<LanguageType | null> {
    return this.prismaService.language.findUnique({
      where: {
        id,
      },
    }) as any
  }

  create(body: CreateLanguageBodyType): Promise<CreateLanguageResType> {
    return this.prismaService.language.create({
      data: body,
    }) as any
  }

  update({ id, data }: { id: string; data: UpdateLanguageBodyType }): Promise<LanguageType> {
    return this.prismaService.language.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    }) as any
  }
}
