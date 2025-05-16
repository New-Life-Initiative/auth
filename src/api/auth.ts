import request from '@/api/request'
import type { bodySnap } from '@/types/auth.types'

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
