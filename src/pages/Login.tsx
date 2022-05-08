import { Button, TextField } from "@mui/material"
import { AuthError, signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Auth, Loader, NotificationModal } from "../shared/components"
import { authConfig } from "../shared/environment/firebase-config"
import { getElementValues, handleFocus } from "../shared/functions"
import { loginValidation } from "../shared/validation"

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ email, password, ] = getElementValues(e, ['email', 'password'])
    setLoader(true)
    try {
      await signInWithEmailAndPassword(authConfig, email, password)
      navigate('/')
    } catch (error: unknown) {
      const err = error as AuthError
      setLoader(false)
      const message = loginValidation(err.code)
      setMessage(message)
    }
  }

  return (
    <>
    <Auth title="Login" to="/register" handleSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 1 }}>
        Acessar
      </Button>
    </Auth>
    <NotificationModal message={message} handleClose={() => setMessage('')} />
    {loader && <Loader />}
    </>
  )
}