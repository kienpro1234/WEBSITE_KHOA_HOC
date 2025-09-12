import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import z from 'zod'

dotenv.config({ path: '.env' })

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Khong tim thay file .env')
  process.exit(1)
}

export const configSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  PORT: z.string().optional(),
  OTP_EXPIRES_IN: z.string(),
  RESEND_API_KEY: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_NAME: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
  // GOOGLE_CLIENT_REDIRECT_URI: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_REDIRECT_URI: z.string(),
  // FACEBOOK_CLIENT_REDIRECT_URI: z.string(),
  CLIENT_REDIRECT_URI: z.string(),
})

const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
  console.log('Cac gia tri khai bao trong file .env khong hop le')
  console.error(configServer.error)
  process.exit(1)
}

const envConfig = configServer.data

export default envConfig
