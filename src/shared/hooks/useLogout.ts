import { AuthError } from "firebase/auth"
import { useState } from "react"
import { TLogoutService } from "../types"
import { authValidation } from "../validation"

export const useLogout = (logout: TLogoutService) => {
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState<string>('')

  const handleLogout = async (): Promise<void> => {
    setLoader(true)
    try {
      await logout()
    } catch (error: unknown) {
      setLoader(false)
      const err = error as AuthError
      const message = authValidation(err.code)
      setMessage(message)
    }
  }

  return { loader, message, setMessage, handleLogout }
}