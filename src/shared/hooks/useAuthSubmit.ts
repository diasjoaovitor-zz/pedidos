import { AuthError } from "firebase/auth"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getElementValues } from "../functions"
import { TAuthService } from "../types"
import { authValidation } from "../validation"

export const useAuthSubmit = (auth: TAuthService) => {
  const navigate = useNavigate()
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoader(true)
    try {
      const [ email, password, passwordConfirm ] = getElementValues(e, ['email', 'password', 'passwordConfirm'])

      if(passwordConfirm && (password !== passwordConfirm)) {
        setMessage('As senhas não conferem!')
        return
      }

      await auth(email, password)
      navigate('/')
    } catch (error: unknown) {
      setLoader(false)
      const err = error as AuthError
      const message = authValidation(err.code)
      setMessage(message)
    }
  }

  return { loader, message, setMessage, handleSubmit }
}