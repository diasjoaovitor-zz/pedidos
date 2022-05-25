import { TProduct } from "./product"

export type TAuthService = (email: string, password: string) => Promise<void>

export type TLogoutService = () => Promise<void>

export type TCreateProductService = (product: TProduct) => Promise<void>

export type TUpdateProductService = (product: TProduct, id: string) => Promise<void>
