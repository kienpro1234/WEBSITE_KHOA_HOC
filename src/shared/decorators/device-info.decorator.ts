import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UAParser } from 'ua-parser-js'

function detectDeviceName(userAgent: string): string {
  const parser = new UAParser(userAgent)
  const os = parser.getOS().name || ''
  const device = parser.getDevice()

  // Android → cố gắng lấy model cụ thể
  if (os.toLowerCase().includes('android')) {
    // eslint-disable-next-line no-useless-escape
    const match = userAgent.match(/Android\s[\d.]+;\s([^;\)]+)/i)
    if (match && match[1]) {
      return match[1].trim() // ví dụ: "Redmi Note 10 Pro"
    }
    return 'Android Device'
  }

  // iOS → chỉ hiển thị chung
  if (os.toLowerCase().includes('ios') || device.vendor === 'Apple') {
    if (device.model) return device.model // "iPhone" / "iPad"
    return 'iPhone'
  }

  // Windows / Mac / Linux
  if (os) return os

  return 'Unknown Device'
}

export const DeviceInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const ip = request.headers['x-forwarded-for'] || request.connection?.remoteAddress || request.socket?.remoteAddress

  const userAgent = request.headers['user-agent'] || ''
  const parser = new UAParser(userAgent)

  return {
    ip,
    userAgent,
    deviceType: parser.getDevice().type || 'desktop',
    deviceName: detectDeviceName(userAgent),
  }
})

export type DeviceInfoType = {
  ip: string
  userAgent: string
  deviceType: string
  deviceName: string
}
