import { Button, TextField } from "@mui/material"
import { Auth, Loader, NotificationModal } from "../shared/components"
import { handleFocus } from "../shared/functions"
import { useAuthSubmit } from "../shared/hooks"
import { TAuthService } from "../shared/types"

type Props = {
  login: TAuthService
}

export const Login: React.FC<Props> = ({ login }) => {
  const { loader, message, setMessage, handleSubmit } = useAuthSubmit(login)

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