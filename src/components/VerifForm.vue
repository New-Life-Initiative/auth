<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="authMode" class="d-flex justify-space-between" inline>
            <v-radio label="Access Token" value="access" />
            <v-radio label="Transaction" value="trx" />
          </v-radio-group>
        </v-col>
      </v-row>

      <p class="pb-4 pt-4">Header</p>

      <!-- Access Token SNAP Headers -->
      <v-row v-if="authMode === 'access' && mode === 'SNAP'">
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.partnerId" label="X-PARTNER-ID" variant="outlined" />
        </v-col>
        <v-col cols="10">
          <v-text-field v-model="hitFormSnap.timestamp" label="X-TIMESTAMP" variant="outlined" />
        </v-col>
        <v-col class="py-6" cols="2">
          <v-btn color="primary" variant="flat" @click="onGenerateTimestamp">Get Timestamp</v-btn>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.clientKey" label="X-CLIENT-KEY" variant="outlined" />
        </v-col>
        <v-col cols="10">
          <v-text-field v-model="hitFormSnap.signature" label="X-SIGNATURE" variant="outlined" />
        </v-col>
        <v-col class="py-6" cols="2">
          <v-btn color="primary" variant="flat" @click="generateSignatureAccess">Get Signature</v-btn>
        </v-col>
      </v-row>

      <!-- Transaction Headers -->
      <p v-if="authMode === 'trx' && mode === 'SNAP'" class="pb-4 pt-4">Method</p>
      <v-row v-if="authMode === 'trx' && mode === 'SNAP'">
        <v-col cols="12">
          <v-select
            v-model="hitFormSnap.method"
            item-title="text"
            item-value="value"
            :items="httpMethod"
            label="HTTP Method"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.uri" label="Relative URL" placeholder="/v1/example" variant="outlined" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.auth" label="Authorization" variant="outlined" />
        </v-col>
        <v-col cols="10">
          <v-text-field v-model="hitFormSnap.timestamp" label="X-TIMESTAMP" variant="outlined" />
        </v-col>
        <v-col class="py-6" cols="2">
          <v-btn color="primary" variant="flat" @click="onGenerateTimestamp">Get Timestamp</v-btn>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.partnerId" label="X-PARTNER-ID" variant="outlined" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.channelId" label="CHANNEL-ID" variant="outlined" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.externalId" label="X-EXTERNAL-ID" variant="outlined" />
        </v-col>
        <v-col cols="10">
          <v-text-field v-model="hitFormSnap.signature" label="X-SIGNATURE" variant="outlined" />
        </v-col>
        <v-col class="py-6" cols="2">
          <v-btn color="primary" variant="flat" @click="generateSignatureTrx">Get Signature</v-btn>
        </v-col>
      </v-row>

      <!-- Acess Token BASIC Header -->
      <v-row v-if="mode === 'BASIC' && authMode === 'access'">
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.username" label="Username" variant="outlined" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.password" label="Password" variant="outlined" />
        </v-col>
      </v-row>

      <v-row v-if="mode === 'BASIC' && authMode === 'trx'">
        <v-col cols="12">
          <v-text-field v-model="hitFormSnap.auth" label="Authorization" variant="outlined" />
        </v-col>
      </v-row>

      <p class="pb-4 pt-4">Body</p>
      <v-textarea v-model="hitFormSnap.body" variant="outlined" />

      <v-row class="justify-center mb-5">
        <v-btn color="success" variant="flat" @click="sendRequest">Send</v-btn>
      </v-row>

      <p class="pb-4 pt-4">Response</p>
      <v-textarea v-model="hitFormSnap.response" readonly variant="outlined" />
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
  import { defineProps, ref } from 'vue'
  import { getAccessToken, getAccessTokenBasic, getSignAccessTokenSnap, getSignTrx, getTrx,getTrxBasic } from '@/api/auth'
  import type { formVerif } from '@/types/verif.types'

  const props = defineProps<{ mode: string }>()
  const mode = props.mode

  const httpMethod = [
    { text: 'POST', value: 'POST' },
    { text: 'GET', value: 'GET' },
    { text: 'PATCH', value: 'PATCH' },
    { text: 'DELETE', value: 'DELETE' },
    { text: 'PUT', value: 'PUT' },
    { text: 'HEAD', value: 'HEAD' },
    { text: 'OPTIONS', value: 'OPTIONS' },
  ]

  const hitFormSnap = ref<formVerif>({
    partnerId: '',
    timestamp: '',
    clientKey: '',
    signature: '',
    method: 'POST',
    uri: '',
    auth: '',
    channelId: '',
    externalId: '',
    username: '',
    password: '',
    body: '',
    response: '',
  })

  const authMode = ref<'access' | 'trx'>('access')

  const getTimestamp = (): string => {
    const date = new Date()
    const offset = -date.getTimezoneOffset()
    const sign = offset >= 0 ? '+' : '-'
    const pad = (num: number) => String(num).padStart(2, '0')
    const hours = Math.floor(Math.abs(offset) / 60)
    const minutes = Math.abs(offset) % 60

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
      `${sign}${pad(hours)}${pad(minutes)}`
  }

  const onGenerateTimestamp = () => {
    hitFormSnap.value.timestamp = getTimestamp()
  }

  const generateSignatureAccess = () => {
    console.log('Generate access token signature')
    getSignAccessTokenSnap(hitFormSnap.value).then(({ data }) => {
      hitFormSnap.value.signature = data.signatureKey
    }).catch(console.error)
  }

  const generateSignatureTrx = () => {
    console.log('Generate transaction signature')

    console.log('Send request with payload:', hitFormSnap.value)

    const parsedBody = JSON.parse(hitFormSnap.value.body || '{}')
    const payload = {
      ...hitFormSnap.value,
      body: parsedBody,
    }

    getSignTrx(payload).then(({ data }) => {
      hitFormSnap.value.signature = data.signatureKey
    }).catch(console.error)
  }

  const sendRequest = () => {
    console.log('Send request with payload:', hitFormSnap.value)

    const parsedBody = JSON.parse(hitFormSnap.value.body || '{}')
    const payload = {
      ...hitFormSnap.value,
      body: parsedBody,
    }

    if (authMode.value === 'access' && mode === 'SNAP') {
      getAccessToken(payload).then(({ data }) => {
        hitFormSnap.value.response = JSON.stringify(data, null, 2)
      }).catch(console.error)
    } else if (authMode.value === 'access' && mode === 'BASIC') {
      getAccessTokenBasic(payload).then(({ data }) => {
        hitFormSnap.value.response = JSON.stringify(data, null, 2)
      }).catch(console.error)
    } else if (authMode.value === 'trx' && mode === 'SNAP') {
      getTrx(payload).then(({ data }) => {
        hitFormSnap.value.response = data.message
      }).catch(console.error)
    } else if (authMode.value === 'trx' && mode === 'BASIC') {
      getTrxBasic(payload).then(({ data }) => {
        hitFormSnap.value.response = data.message
      }).catch(console.error)
    }
  }

</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
