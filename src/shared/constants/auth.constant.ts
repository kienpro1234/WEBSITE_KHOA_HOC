export const REQUEST_USER_KEY = 'user'
export const REQUEST_ROLE_PERMISSIONS = 'role_permissions'

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

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
  PaymentAPIKey: 'PaymentAPIKey',
} as const

export const ConditionGuard = {
  And: 'And',
  Or: 'Or',
} as const

export type TypeOfVerificationCodeType = keyof typeof TypeOfVerificationCode
export type AuthProviderType = keyof typeof AuthProvider
export type AuthTypeType = keyof typeof AuthType
export type ConditionGuardType = keyof typeof ConditionGuard
