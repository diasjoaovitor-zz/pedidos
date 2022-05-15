export type TLoginService = (email: string, password: string) => Promise<void>

export type TRegisterService = (email: string, password: string) => Promise<void>
  