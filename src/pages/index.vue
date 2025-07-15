<template>
  <v-container
    class="fill-height d-flex justify-center align-start"
    max-width="5000"
  >
    <v-card class="w-full rounded-2xl shadow-md" max-width="1800" width="50%">
      <v-tabs
        v-model="tab"
        align-tabs="center"
        bg-color="primary"
        class="rounded-t-2xl"
        grow
      >
        <v-tab value="one">GENERATE</v-tab>
        <v-tab value="two">VERIFY</v-tab>
      </v-tabs>

      <v-card-text class="p-6">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-tabs
              v-model="signatureType"
              align-tabs="center"
              bg-color="transparent"
              class="mb-4"
              grow
            >
              <v-tab value="access">Access Token</v-tab>
              <v-tab value="trx">Transaction</v-tab>
            </v-tabs>

            <v-tabs-window v-model="signatureType">
              <v-tabs-window-item value="access">
                <v-form>
                  <v-container>
                    <v-row>
                      <!-- Start Form Generate Signature access token -->
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenAccess.clientId"
                            label="Client Id"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenAccess.privateKey"
                            label="Private Key"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenAccess.timestamp"
                            label="Timestamp"
                            required
                          />
                        </v-col>
                      </v-row>
                      <!-- End Form Generate Signature access token -->

                      <v-col class="d-flex justify-center" cols="12">
                        <v-btn color="primary" @click="genSingature">Generate Signature</v-btn>
                      </v-col>

                      <v-col v-if="result.genSingatureAccRes" class="d-flex justify-center" cols="12">
                        <v-text-field
                          v-model="result.genSingatureAccRes"
                          label="Result"
                          readonly
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-form>
              </v-tabs-window-item>

              <v-tabs-window-item value="trx">
                <v-form>
                  <v-container>
                    <v-row>
                      <!-- Start Form Generate Signature Transaction -->
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenTrx.httpMethod"
                            label="Http Method"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenTrx.relativeUrl"
                            label="Relative Url"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenTrx.authorization"
                            label="Authorization"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenTrx.clientSecret"
                            label="Client Secret"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formGenTrx.timestamp"
                            label="Timestamp"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                            v-model="formGenTrx.body"
                            label="Body"
                            required
                          />
                        </v-col>
                      </v-row>
                      <!-- Start Form Generate Signature Transaction -->

                      <v-col class="d-flex justify-center" cols="12">
                        <v-btn color="primary" @click="genSingature">Generate Signature</v-btn>
                      </v-col>

                      <v-col v-if="result.genSingatureTrxRes" class="d-flex justify-center" cols="12">
                        <v-text-field
                          v-model="result.genSingatureTrxRes"
                          label="Result"
                          readonly
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-form>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <v-tabs
              v-model="signatureType"
              align-tabs="center"
              bg-color="transparent"
              class="mb-4"
              grow
            >
              <v-tab value="access">Access Token</v-tab>
              <v-tab value="trx">Transaction</v-tab>
            </v-tabs>

            <v-tabs-window v-model="signatureType">
              <v-tabs-window-item value="access">
                <v-form>
                  <v-container>
                    <v-row>
                      <!-- Start Form Verify Signature access token -->
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifAccess.clientId"
                            label="Client Id"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifAccess.publicKey"
                            label="Public Key"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifAccess.timestamp"
                            label="Timestamp"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifAccess.signature"
                            label="Signature"
                            required
                          />
                        </v-col>
                      </v-row>
                      <!-- End Form Verify Signature access token -->

                      <v-col class="d-flex justify-center" cols="12">
                        <v-btn color="primary" @click="verifSignature">Verify Signature</v-btn>
                      </v-col>

                      <v-col v-if="result.verifSingatureAccRes" class="d-flex justify-center" cols="12">
                        <v-text-field
                          v-model="result.verifSingatureAccRes"
                          label="Result"
                          readonly
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-form>
              </v-tabs-window-item>

              <v-tabs-window-item value="trx">
                <v-form>
                  <v-container>
                    <v-row>
                      <!-- Start Form Verify Signature Transaction -->
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.httpMethod"
                            label="Http Method"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.relativeUrl"
                            label="Relative Url"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.authorization"
                            label="Authorization"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.clientSecret"
                            label="Client Secret"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.timestamp"
                            label="Timestamp"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="formVerifTrx.signature"
                            label="Signature"
                            required
                          />
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                            v-model="formVerifTrx.body"
                            label="Body"
                            required
                          />
                        </v-col>
                      </v-row>
                      <!-- Start Form Verify Signature Transaction -->

                      <v-col class="d-flex justify-center" cols="12">
                        <v-btn color="primary" @click="verifSignature">Verify Signature</v-btn>
                      </v-col>

                      <v-col v-if="result.verifSingatureTrxRes" class="d-flex justify-center" cols="12">
                        <v-text-field
                          v-model="result.verifSingatureTrxRes"
                          label="Result"
                          readonly
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-form>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { getSignatureAccessSnap, getSignatureTrxSnap, verifSignatureAccessSnap, verifSignatureTrxSnap } from '@/api/auth'

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const tab = ref<string | null>('one')
  const signatureType = ref('access')
  const initDate = dayjs().tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ss.SSSZ')

  const formGenAccess = reactive({
    clientId: '',
    privateKey: '',
    timestamp : initDate,
  })

  const formGenTrx = reactive({
    httpMethod: '',
    relativeUrl: '',
    authorization: '',
    clientSecret: '',
    timestamp : initDate,
    body: '',
  })

  const formVerifAccess = reactive({
    clientId: '',
    publicKey: '',
    timestamp : initDate,
    signature: '',
  })

  const formVerifTrx = reactive({
    httpMethod: '',
    relativeUrl: '',
    authorization: '',
    clientSecret: '',
    timestamp : initDate,
    signature: '',
    body: '',
  })

  const result = reactive({
    genSingatureAccRes : '',
    genSingatureTrxRes : '',
    verifSingatureAccRes : '',
    verifSingatureTrxRes : '',
  })

  const genSingature = () => {
    if( signatureType.value === 'access' ) {
      getSignatureAccessSnap(formGenAccess).then(({ data }) => {
        result.genSingatureAccRes = data.signatureKey
      }).catch(e => alert(e.message))
    } else {
      getSignatureTrxSnap(formGenTrx).then(({ data }) => {
        result.genSingatureTrxRes = data.signatureKey
      }).catch(e => alert(e.message))
    }
  }

  const verifSignature = () => {
    if( signatureType.value === 'access' ) {
      verifSignatureAccessSnap(formVerifAccess).then(({ data }) => {
        result.verifSingatureAccRes = data
      }).catch(e => alert(e.message))
    } else {
      verifSignatureTrxSnap(formVerifTrx).then(({ data }) => {
        result.verifSingatureTrxRes = data
      }).catch(e => alert(e.message))
    }
  }
</script>
