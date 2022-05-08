export const loginValidation = (error: string): string => {
  switch(error) {
    case 'auth/user-not-found':
      return 'Esse usuário não existe. Faça seu cadastro.'
    case 'auth/wrong-password':
      return 'Senha incorreta.'
    default:
      return 'Algo deu errado.'
  }
}