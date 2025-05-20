export interface formVerif {
  method?: string,
  uri?: string,
  clientKey?: string,
  auth?: string,
  timestamp?: string,
  partnerId?: string,
  channelId?: string,
  externalId?: string,
  signature?: string,
  body?: string,
  response?: string,
  username?: string,
  password?: string,
}

export interface responseSign {
  signatureKey : string
}

export interface responseAccessToken {
  accessToken : string
  tokenType : string
  expiresIn : string
}

export interface responseTrx {
  message : string
}
