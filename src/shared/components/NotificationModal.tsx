import { Button, Dialog, DialogActions, DialogContentText, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  message: string
  handleClose(): void
}
export const NotificationModal: React.FC<Props> = ({ message, handleClose }) => {
  const open = !!message
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      >
      
        <DialogContentText sx={{ padding: 2 }} >
          {message}
        </DialogContentText>
        <DialogActions onClick={handleClose}>
          <Button>OK</Button>
        </DialogActions>
      </Dialog>
  )
}
