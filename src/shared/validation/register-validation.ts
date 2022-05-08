export const registerValidation = (error: string): string => {
  switch(error) {
    case 'auth/email-already-in-use':
      return 'Esse usuário já existe!'
    case 'auth/invalid-email':
      return 'Email inválido!'
    default:
      return 'Algo deu errado.'
  }
}
