import { Injectable } from '@nestjs/common'
import { UserNotFoundException } from 'src/routes/profile/profile.error'
import { ChangePasswordBodyType, UpdateMeBodyType } from 'src/routes/profile/profile.model'
import { ProfileRepo } from 'src/routes/profile/profile.repo'
import { isNotFoundPrismaError } from 'src/shared/helper'

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepo: ProfileRepo) {}

  async getMe(userId: number) {
    try {
      const user = await this.profileRepo.getMe(userId)

      return user
    } catch (err) {
      if (isNotFoundPrismaError(err)) {
        throw UserNotFoundException
      }
      throw err
    }
  }

  async updateProfile({ userId, body }: { userId: number; body: UpdateMeBodyType }) {
    try {
      return this.profileRepo.updateMe({ userId, body })
    } catch (err) {
      if (isNotFoundPrismaError(err)) {
        throw UserNotFoundException
      }
      throw err
    }
  }

  async changePassword({ userId, body }: { userId: number; body: ChangePasswordBodyType }) {
    try {
      await this.profileRepo.changePassword({ userId, body })
      return {
        message: 'Change password successfully',
      }
    } catch (err) {
      if (isNotFoundPrismaError(err)) {
        throw UserNotFoundException
      }
      throw err
    }
  }
}
