export interface IUserPayload {
  email: string | null
  password: string | null
}

export interface IUserRegister {
  email: string | null
  password: string | null
  reenteredPassword: string | null
}
