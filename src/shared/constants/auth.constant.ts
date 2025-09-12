export const TypeOfVerificationCode = {
  REGISTER: 'REGISTER',
  FORGET_PASSWORD: 'FORGET_PASSWORD',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
} as const

export const AuthProvider = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
} as const

export type TypeOfVerificationCodeType = keyof typeof TypeOfVerificationCode
export type AuthProviderType = keyof typeof AuthProvider
