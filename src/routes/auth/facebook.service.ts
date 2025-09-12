// src/routes/auth/facebook.service.ts
import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import axios from 'axios' // Dùng axios hoặc httpService của NestJS
import { DeviceInfoType } from 'src/shared/decorators/device-info.decorator'
import envConfig from 'src/shared/config'
import { AuthProvider } from 'src/shared/constants/auth.constant'

@Injectable()
export class FacebookService {
  constructor(private readonly authService: AuthService) {}

  getFacebookLink(deviceInfo: DeviceInfoType) {
    const stateString = Buffer.from(JSON.stringify(deviceInfo)).toString('base64')
    const scope = 'email,public_profile'
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${envConfig.FACEBOOK_CLIENT_ID}&redirect_uri=${envConfig.FACEBOOK_REDIRECT_URI}&scope=${scope}&state=${stateString}`
    return { url }
  }

  async facebookCallBack({ code, state }: { code: string; state: string }) {
    const clientInfo = this.parseState(state)

    // 1. Lấy access token từ Facebook
    const tokenResponse = await axios.get(`https://graph.facebook.com/v18.0/oauth/access_token`, {
      params: {
        client_id: envConfig.FACEBOOK_CLIENT_ID,
        client_secret: envConfig.FACEBOOK_CLIENT_SECRET,
        redirect_uri: envConfig.FACEBOOK_REDIRECT_URI,
        code,
      },
    })
    const accessToken = tokenResponse.data.access_token

    // 2. Lấy thông tin user từ Facebook

    type FacebookUserType = {
      id: string
      name: string
      email?: string
    }
    const userResponse = await axios.get<FacebookUserType>(`https://graph.facebook.com/me`, {
      params: {
        fields: 'id,name,email',
        access_token: accessToken,
      },
    })
    console.log(userResponse.data)
    const { email, name, id } = userResponse.data

    // 3. Gọi service chung
    return this.authService.processSocialLogin(
      { email, name, provider: AuthProvider.FACEBOOK, providerUserId: id },
      clientInfo,
    )
  }

  // Copy hàm parseState từ GoogleService vào đây
  private parseState(state: string): DeviceInfoType | null {
    if (!state) return null
    try {
      return JSON.parse(Buffer.from(state, 'base64').toString()) as DeviceInfoType
    } catch (err) {
      console.error('error parsing state', err)
      return null
    }
  }
}
