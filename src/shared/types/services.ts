import { TProduct } from "./product"

export type TAuthService = (email: string, password: string) => Promise<void>

export type TLogoutService = () => Promise<void>

export type TProductService = (product: TProduct) => Promise<void>
