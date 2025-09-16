import { Injectable } from '@nestjs/common'

import { PasswordIncorrectException, UserNotFoundException } from 'src/routes/profile/profile.error'
import { ChangePasswordBodyType, UpdateMeBodyType } from 'src/routes/profile/profile.model'
import { SerializeAll } from 'src/shared/decorators/serialize.decorator'
import { UserType } from 'src/shared/model/shared-user.model'

import { SharedUserRepo } from 'src/shared/repositories/shared-user.repo'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
@SerializeAll()
export class ProfileRepo {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly sharedUserRepo: SharedUserRepo,
  ) {}

  getMe(userId: number): Promise<UserType> {
    return this.prismaService.user.findUnique({ where: { id: userId } }) as any
  }

  updateMe({ userId, body }: { userId: number; body: UpdateMeBodyType }): Promise<UserType> {
    return this.prismaService.user.update({ where: { id: userId }, data: body }) as any
  }

  async changePassword({ userId, body }: { userId: number; body: ChangePasswordBodyType }): Promise<UserType> {
    //Kiểm tra password cũ có đúng không

    const user = await this.sharedUserRepo.findUniqueUser({ id: userId })

    if (!user) {
      throw UserNotFoundException
    }
    const isPasswordMatch = await this.hashingService.compare(body.oldPassword, user.password)

    if (!isPasswordMatch) {
      throw PasswordIncorrectException
    }

    const hashedNewPassword = await this.hashingService.hash(body.newPassword)

    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    }) as any
  }
}
