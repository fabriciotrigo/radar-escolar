export class InvalidCredentialsError extends Error {
  constructor() {
    super('Usuário e/ou Senha Incorreto(s)')
  }
}