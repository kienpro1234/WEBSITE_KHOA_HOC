import { Body, Controller, Get, NotFoundException, Param, Post, Query, Res } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { ZodResponse } from 'nestjs-zod'
import {
  ForgetPasswordBodyDTO,
  GetLinkResDTO,
  LoginBodyDTO,
  LoginResDTO,
  LogoutBodyDTO,
  RegisterBodyDTO,
  RegisterResDTO,
  ResetPasswordBodyDTO,
  SendOTPBodyDTO,
} from 'src/routes/auth/auth.dto'

import { AuthService } from 'src/routes/auth/auth.service'
import { FacebookService } from 'src/routes/auth/facebook.service'
import { GoogleService } from 'src/routes/auth/google.service'
import envConfig from 'src/shared/config'
import { IsPublic } from 'src/shared/decorators/auth.decorator'
import { DeviceInfo, DeviceInfoType } from 'src/shared/decorators/device-info.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
    private readonly facebookService: FacebookService,
  ) {}

  @Post('login')
  @IsPublic()
  @ZodResponse({ type: LoginResDTO })
  login(@Body() body: LoginBodyDTO, @DeviceInfo() deviceInfo: DeviceInfoType) {
    return this.authService.login({
      ...body,
      deviceInfo,
    })
  }

  @Post('logout')
  @ZodResponse({ type: MessageResDTO })
  logout(@DeviceInfo() deviceInfo: DeviceInfoType, @Body() body: LogoutBodyDTO) {
    return this.authService.logout({
      ...body,
      deviceInfo,
    })
  }

  @Post('otp')
  @IsPublic()
  @ZodResponse({ type: MessageResDTO })
  sendOTP(@Body() body: SendOTPBodyDTO) {
    return this.authService.sendOTP(body)
  }

  @Post('register')
  @IsPublic()
  @ZodResponse({ type: RegisterResDTO })
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }

  @Post('forget-password')
  @ZodResponse({ type: MessageResDTO })
  @IsPublic()
  forgetPassword(@Body() body: ForgetPasswordBodyDTO) {
    return this.authService.forgetPassword(body)
  }

  @Post('reset-password')
  @ZodResponse({ type: MessageResDTO })
  @IsPublic()
  resetPassword(@Body() body: ResetPasswordBodyDTO) {
    return this.authService.resetPassword(body)
  }

  // @Get('google/link')
  // // @ZodResponse({ type: GetGoogleLinkResDTO })
  // getGoogleLink(@DeviceInfo() deviceInfo: DeviceInfoType) {
  //   return this.googleService.getGoogleLink(deviceInfo)
  // }

  // @Get('google/callback')
  // async googleCallBack(@Query('code') code: string, @Query('state') state: string, @Res() res: Response) {
  //   try {
  //     const data = await this.googleService.googleCallBack({ code, state })

  //     return res.redirect(
  //       `${envConfig.CLIENT_REDIRECT_URI}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`,
  //     )
  //   } catch (err) {
  //     const message =
  //       err instanceof Error ? err.message : 'Đã xảy ra lỗi khi đăng nhập bằng Google, vui lòng thử lại bằng cách khác'
  //     return res.redirect(`${envConfig.CLIENT_REDIRECT_URI}?errorMessage=${message}`)
  //   }
  // }

  // 👇 Route lấy link động
  @Post(':provider/link')
  @IsPublic()
  @ZodResponse({ type: GetLinkResDTO })
  getSocialLink(
    @Param('provider') provider: string,
    @DeviceInfo() deviceInfo: DeviceInfoType,
    @Body() body: { deviceFingerprint: string },
  ) {
    switch (provider) {
      case 'google':
        return this.googleService.getGoogleLink({ ...deviceInfo, deviceFingerprint: body.deviceFingerprint })
      case 'facebook':
        return this.facebookService.getFacebookLink({ ...deviceInfo, deviceFingerprint: body.deviceFingerprint })
      default:
        throw new NotFoundException('Provider not found')
    }
  }

  // 👇 Route callback động
  @Get(':provider/callback')
  @IsPublic()
  async socialCallBack(
    @Param('provider') provider: string,
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      let data
      switch (provider) {
        case 'google':
          data = await this.googleService.googleCallBack({ code, state })
          break
        case 'facebook':
          data = await this.facebookService.facebookCallBack({ code, state })
          break
        default:
          throw new NotFoundException('Provider not found')
      }

      // Logic redirect giờ là logic chung
      const clientRedirectUri = envConfig.CLIENT_REDIRECT_URI // Dùng một biến env chung
      return res.redirect(`${clientRedirectUri}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`)
    } catch (err) {
      const clientRedirectUri = envConfig.CLIENT_REDIRECT_URI
      const message = err instanceof Error ? err.message : 'An error occurred during social login.'
      return res.redirect(`${clientRedirectUri}?errorMessage=${message}`)
    }
  }

  // --- FACEBOOK ROUTES - dùng AuthGuard - passport-facebook ---

  // @Get('facebook')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookLogin(): Promise<any> {
  //   // KHÔNG CẦN CODE GÌ Ở ĐÂY
  //   // AuthGuard sẽ tự động chuyển hướng người dùng đến trang đăng nhập của Facebook.
  // }

  // @Get('facebook/callback')
  // @UseGuards(AuthGuard('facebook'))
  // facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
  //   // AuthGuard đã xử lý việc trao đổi code, gọi hàm validate() trong strategy.
  //   // Kết quả trả về từ hàm validate (đối tượng user chứa tokens) sẽ được
  //   // gán vào req.user.

  //   const user = req.user as { accessToken: string; refreshToken: string }

  //   // Bây giờ bạn chỉ cần redirect người dùng về client với tokens
  //   const clientRedirectUri = process.env.CLIENT_REDIRECT_URI
  //   return res.redirect(`${clientRedirectUri}?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`)
  // }
}
