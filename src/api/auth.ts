import request from '@/api/request'
import type { bodySnap } from '@/types/auth.types'
import type { formVerif, responseAccessToken, responseAccessTokenBasic, responseSign, responseTrx } from '@/types/verif.types'

// Generate Public Key & Private Key
export function genPK (): Promise<{ data: { publicKey: string, privateKey: string } }> {
  return request({
    url: '/generate/snap-rsa',
    method: 'post',
    data: {},
  })
}

// Generate Client Key & Client Secret Key
export function genCKSK (): Promise<{ data: { clientKey: string, clientSecret: string } }> {
  return request({
    url: '/generate/snap-client',
    method: 'post',
    data: {},
  })
}

// Save SNAP Configuration
export function save (bodySnap: bodySnap): Promise<{ data: { success: boolean, message: string } }> {
  return request({
    url: '/generate/save',
    method: 'post',
    data: bodySnap,
  })
}

// Generate Client Key & Client Secret Key
export function genBasic (): Promise<{ data: { username: string, password: string } }> {
  return request({
    url: '/generate/basic',
    method: 'post',
    data: {},
  })
}

// Generate Access Token SNAP
export function getSignAccessTokenSnap (formVerif : formVerif): Promise<{ data: responseSign }> {
  return request({
    url: '/generate/signature/access-token',
    headers : {
      'X-TIMESTAMP' : formVerif.timestamp,
      'X-PARTNER-ID' : formVerif.partnerId,
    },
    method: 'post',
    data: formVerif,
  })
}

// Get Access Token Verify SNAP
export function getAccessToken (formVerif : formVerif): Promise<{ data: responseAccessToken }> {
  return request({
    url: '/verify/snap/access-token',
    headers : {
      'X-TIMESTAMP' : formVerif.timestamp,
      'X-PARTNER-ID' : formVerif.partnerId,
      'X-CLIENT-KEY' : formVerif.clientKey,
      'X-SIGNATURE' : formVerif.signature,
    },
    method: 'post',
    data: formVerif.body,
  })
}

// Generate Trx Siganture SNAP
export function getSignTrx (formVerif : formVerif): Promise<{ data: responseSign }> {
  return request({
    url: '/generate/signature/transaction',
    headers : {
      'HTTP-METHOD' : formVerif.method,
      'RELATIVE-URL' : formVerif.uri,
      'Authorization' : formVerif.auth,
      'X-TIMESTAMP' : formVerif.timestamp,
      'X-PARTNER-ID' : formVerif.partnerId,
    },
    method: 'post',
    data: formVerif.body,
  })
}

// Get Trx Verify SNAP
export function getTrx (formVerif : formVerif): Promise<{ data: responseTrx }> {
  return request({
    url: '/verify/snap/transaction',
    headers : {
      'HTTP-METHOD' : formVerif.method,
      'RELATIVE-URL' : formVerif.uri,
      'Authorization' : formVerif.auth,
      'X-TIMESTAMP' : formVerif.timestamp,
      'X-PARTNER-ID' : formVerif.partnerId,
    },
    method: 'post',
    data: formVerif.body,
  })
}

// Get Access Token BASIC
export function getAccessTokenBasic (formVerif : formVerif): Promise<{ data: responseAccessTokenBasic }> {
  return request({
    url: '/verify/basic/access-token',
    headers : {
      'Username' : formVerif.username,
      'Password' : formVerif.password,
    },
    method: 'post',
    data: formVerif.body,
  })
}

// Get Access Token BASIC
export function getTrxBasic (formVerif : formVerif): Promise<{ data: responseTrx }> {
  return request({
    url: '/verify/basic/transaction',
    headers : {
      'Authorization' : formVerif.auth,
    },
    method: 'post',
    data: formVerif.body,
  })
}
