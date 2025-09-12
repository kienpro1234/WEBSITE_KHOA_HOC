import { Controller, Get, Param } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import { GetMeResDTO } from 'src/routes/profile/profile.dto'
import { ProfileService } from 'src/routes/profile/profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ZodResponse({ type: GetMeResDTO })
  getMe() {
    return this.profileService.getMe()
  }
}
