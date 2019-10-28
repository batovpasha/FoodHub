export type AppState = {
  user: UserState
}

export type AppInitialState = Partial<AppState>

export type UserState = {
  status: StateStatus
  data?: {
    login: string
  }
  error?: {
    message: string
  }
}

export type StateStatus = 'SUCCESS' | 'LOADING' | 'ERROR'
