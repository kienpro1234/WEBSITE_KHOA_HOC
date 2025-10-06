import { Injectable } from '@nestjs/common'
import { CategoryTranslationType } from 'src/routes/category/category-translation/category-translation.model'
import {
  CategoryType,
  CreateCatBodyType,
  CreateCatResType,
  GetCategoriesQueryType,
  GetCategoriesResType,
  UpdateCategoryBodyType,
} from 'src/routes/category/category.model'
import { ALLLANGUAGECODE } from 'src/shared/constants/language.constant'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class CategoryRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ limit, page }: GetCategoriesQueryType, languageCode: string): Promise<GetCategoriesResType> {
    const skip = (page - 1) * limit
    const take = limit
    console.log(languageCode)

    const [totalItems, data] = await Promise.all([
      this.prismaService.category.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.category.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          translations: {
            where:
              languageCode === ALLLANGUAGECODE
                ? { deletedAt: null }
                : {
                    deletedAt: null,
                    languageId: languageCode,
                  },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    } as any
  }

  // Tìm kiếm category đã bị xóa mềm
  findDeletedCatById(id: number): Promise<CategoryType | null> {
    return this.prismaService.category.findUnique({
      where: {
        id,
        deletedAt: {
          not: null,
        },
      },
    }) as any
  }

  findById(
    id: number,
    languageCode: string,
  ): Promise<(CategoryType & { translations: CategoryTranslationType[] }) | null> {
    return this.prismaService.category.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        translations: {
          where:
            languageCode === ALLLANGUAGECODE
              ? { deletedAt: null }
              : {
                  deletedAt: null,
                  languageId: languageCode,
                },
        },
      },
    }) as any
  }

  create(body: CreateCatBodyType): Promise<CreateCatResType> {
    return this.prismaService.category.create({
      data: body,
    }) as any
  }

  update({ id, data }: { id: number; data: UpdateCategoryBodyType }): Promise<CategoryType> {
    return this.prismaService.category.update({
      where: { id },
      data,
    }) as any
  }
}
