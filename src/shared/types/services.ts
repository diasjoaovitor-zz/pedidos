export type TAuthService = (email: string, password: string) => Promise<void>

export type TLogoutService = () => Promise<void>
