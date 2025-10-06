import { Injectable } from '@nestjs/common'
import {
  CategoryTranslationType,
  CreateCategoryTransBodyType,
  GetCategoryTranslationResType,
  GetCategoryTranslationsQueryType,
  GetCategoryTranslationsResType,
  UpdateCategoryTransBodyType,
} from 'src/routes/category/category-translation/category-translation.model'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { PrismaService } from 'src/shared/services/prisma.service'

@SerializeAll()
@Injectable()
export class CategoryTranslationRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ limit, page }: GetCategoryTranslationsQueryType): Promise<GetCategoryTranslationsResType> {
    const skip = (page - 1) * limit
    const take = limit

    const [totalItems, data] = await Promise.all([
      this.prismaService.categoryTranslation.count({
        where: {
          deletedAt: null,
        },
      }),

      this.prismaService.categoryTranslation.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
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

  findById(id: number): Promise<GetCategoryTranslationResType | null> {
    return this.prismaService.categoryTranslation.findUnique({
      where: {
        id,
      },
    }) as any
  }

  create(body: CreateCategoryTransBodyType): Promise<CategoryTranslationType> {
    return this.prismaService.categoryTranslation.create({
      data: body,
    }) as any
  }

  update({ id, data }: { id: number; data: UpdateCategoryTransBodyType }): Promise<CategoryTranslationType> {
    return this.prismaService.categoryTranslation.update({
      where: {
        id,
      },
      data,
    }) as any
  }

  async delete({ id, isHard }: { id: number; isHard?: boolean }): Promise<CategoryTranslationType> {
    const result = isHard
      ? await this.prismaService.categoryTranslation.delete({
          where: {
            id,
          },
        })
      : await this.prismaService.categoryTranslation.update({
          where: {
            id,
          },
          data: {
            deletedAt: new Date(),
          },
        })

    return result as any
  }
}
