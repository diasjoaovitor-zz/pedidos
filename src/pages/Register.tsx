import { Button, TextField } from "@mui/material"
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Auth, Loader } from "../shared/components"
import { authConfig, db } from "../shared/environment/firebase-config"
import { getElementValues, handleFocus } from "../shared/functions"

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [ loader, setLoader ] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ email, password, passwordConfirm ] = getElementValues(e, ['email', 'password', 'passwordConfirm'])
    if (password !== passwordConfirm) return alert('As senhas não conferem')
    setLoader(true)
    try {
      const res = await createUserWithEmailAndPassword(authConfig, email, password)
      await addDoc(collection(db, 'users'), { user: res.user.uid })
      navigate('/')
    } catch (error: unknown) {
      const err = error as AuthError
      setLoader(false)
      switch(err.code) {
        case 'auth/email-already-in-use':
          return alert('Esse usuário já existe!')
        case 'auth/invalid-email':
          return alert('Email inválido')
        default:
          return alert('Algo deu errado.')
      }
    }
  }

  return (
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
      {loader && <Loader />}
    </Auth>
  )
}