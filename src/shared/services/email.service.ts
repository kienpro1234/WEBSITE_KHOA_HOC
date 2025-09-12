import { Injectable } from '@nestjs/common'
import OTPEmail from 'emails/otp'
import { Resend } from 'resend'
import envConfig from 'src/shared/config'

@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  async sendOTP(payload: { email: string; code: string }) {
    return await this.resend.emails.send({
      from: 'KH_BODOI <no-reply@meomeo.shop>',
      to: [payload.email],
      subject: 'Mã OTP',
      react: OTPEmail({ otpCode: payload.code, title: 'Xác thực email' }),
    })
  }
}
