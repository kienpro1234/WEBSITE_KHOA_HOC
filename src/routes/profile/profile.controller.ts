import { Body, Controller, Get, Put } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import { ChangePasswordBodyDTO, GetMeResDTO, UpdateMeBodyDTO, UpdateMeResDTO } from 'src/routes/profile/profile.dto'
import { ProfileService } from 'src/routes/profile/profile.service'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ZodResponse({ type: GetMeResDTO })
  getMe(@ActiveUser('userId') userId: number) {
    console.log('userId', userId)
    return this.profileService.getMe(userId)
  }

  @Put('update')
  @ZodResponse({ type: UpdateMeResDTO })
  updateProfile(@Body() body: UpdateMeBodyDTO, @ActiveUser('userId') userId: number) {
    return this.profileService.updateProfile({
      userId,
      body,
    })
  }

  @Put('change-password')
  @ZodResponse({ type: MessageResDTO })
  changePassword(@Body() body: ChangePasswordBodyDTO, @ActiveUser('userId') userId: number) {
    return this.profileService.changePassword({
      userId,
      body,
    })
  }
}
