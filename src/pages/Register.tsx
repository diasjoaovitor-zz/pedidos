import { Button, TextField } from "@mui/material"
import { AuthError } from "firebase/auth"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Auth, Loader, NotificationModal } from "../shared/components"
import { getElementValues, handleFocus } from "../shared/functions"
import { TRegisterService } from "../shared/types"
import { registerValidation } from "../shared/validation"

type Props = {
  register: TRegisterService
}

export const Register: React.FC<Props> = ({ register }) => {
  const navigate = useNavigate()
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ email, password, passwordConfirm ] = getElementValues(e, ['email', 'password', 'passwordConfirm'])
    if (password !== passwordConfirm) return setMessage('As senhas não conferem!')
    setLoader(true)
    try {
      await register(email, password)
      navigate('/')
    } catch (error: unknown) {
      setLoader(false)
      const err = error as AuthError
      const message = registerValidation(err.code)
      setMessage(message)
    }
  }

  return (
    <>
    <Auth title="Criar conta" to="/login" handleSubmit={handleSubmit}>
      <TextField
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        required
        onFocus={handleFocus}
      />
      <TextField
        type="password"
        name="password"
        label="Senha"
        variant="outlined"
        fullWidth
        required
        onFocus={handleFocus}
      />
      <TextField
        type="password"
        name="passwordConfirm"
        label="Repita sua senha"
        variant="outlined"
        required
        fullWidth
        onFocus={handleFocus}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 1 }}>
        Registrar
      </Button>
    </Auth>
    <NotificationModal message={message} handleClose={() => setMessage('')} />
    {loader && <Loader />}
    </>
  )
}