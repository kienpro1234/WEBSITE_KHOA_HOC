import { Injectable } from '@nestjs/common'
import { ProfileRepo } from 'src/routes/profile/profile.repo'

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepo: ProfileRepo) {}

  getMe() {
    return this.profileRepo.getMe()
  }
}
