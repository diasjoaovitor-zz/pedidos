import { Button, TextField } from "@mui/material"
import { Auth, Loader, NotificationModal } from "../shared/components"
import { handleFocus } from "../shared/functions"
import { useAuthSubmit } from "../shared/hooks"
import { TAuthService } from "../shared/types"

type Props = {
  register: TAuthService
}

export const Register: React.FC<Props> = ({ register }) => {
  const { loader, message, setMessage, handleSubmit } = useAuthSubmit(register)

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