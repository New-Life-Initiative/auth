<template>
  <v-container class="fill-height d-flex justify-center align-start" max-width="5000">
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
              v-model="tabVerify"
              align-tabs="center"
              bg-color="transparent"
              class="mb-4"
              grow
            >
              <v-tab value="SNAP">SNAP</v-tab>
              <v-tab value="BASIC">BASIC</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tabVerify">
              <TokenForm
                v-if="tabVerify === 'SNAP'"
                :form="generateTokenForm"
                mode="SNAP"
                :status-options="statusOptions"
                :token-type="tokenType"
                @generate-cksk="onGenerateCKSK"
                @generate-pk="onGeneratePK"
                @save="onSave"
              />
              <TokenForm
                v-if="tabVerify === 'BASIC'"
                :form="generateTokenForm"
                mode="BASIC"
                :status-options="statusOptions"
                @generate-basic="onGenerateBasic"
                @save="onSave"
              />
            </v-tabs-window>
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <v-tabs
              v-model="tabVerify"
              align-tabs="center"
              bg-color="transparent"
              class="mb-4"
              grow
            >
              <v-tab value="SNAP">SNAP</v-tab>
              <v-tab value="BASIC">BASIC</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tabVerify">
              <VerifForm
                v-if="tabVerify === 'SNAP'"
                mode="SNAP"
              />
              <VerifForm
                v-if="tabVerify === 'BASIC'"
                mode="BASIC"
              />
            </v-tabs-window>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import TokenForm from './TokenForm.vue';
  import VerifForm from './VerifForm.vue';
  import { genBasic, genCKSK, genPK, save } from '@/api/auth';

  const generateTokenForm = ref({
    channelId: '',
    authType: '',
    tokenType: '',
    clientKey: '',
    clientSecret: '',
    publicKey: '',
    privateKey: '',
    accessTokenExpiryTime: '',
    refreshTokenExpiryTime: '',
    status: '',
    username: '',
    password: '',
  });

  const tab = ref<string | null>('one');
  const tabVerify = ref<string | null>('SNAP');

  const statusOptions = [
    { text: 'Active', value: 1 },
    { text: 'Inactive', value: 0 },
  ];

  const tokenType = [
    { text: 'Bearer', value: 'BEARER' },
    { text: 'Bearer with Prefix', value: 'BEARERWPREFIX' },
    { text: 'MAC', value: 'MAC' },
  ];

  function onSave (mode: string) {
    generateTokenForm.value.authType = mode;
    save(generateTokenForm.value)
      .then(() => {
        alert(`${mode} saved successfully!`);
        resetForm();
      })
      .catch(console.error);
  }

  function onGenerateCKSK () {
    genCKSK().then(({ data }) => {
      generateTokenForm.value.clientKey = data.clientKey;
      generateTokenForm.value.clientSecret = data.clientSecret;
    }).catch(console.error);
  }

  function onGeneratePK () {
    genPK().then(({ data }) => {
      generateTokenForm.value.publicKey = data.publicKey;
      generateTokenForm.value.privateKey = data.privateKey;
    }).catch(console.error);
  }

  function onGenerateBasic () {
    genBasic().then(({ data }) => {
      generateTokenForm.value.username = data.username;
      generateTokenForm.value.password = data.password;
    }).catch(console.error);
  }

  function resetForm () {
    generateTokenForm.value = {
      channelId: '',
      authType: '',
      tokenType: '',
      clientKey: '',
      clientSecret: '',
      publicKey: '',
      privateKey: '',
      accessTokenExpiryTime: '',
      refreshTokenExpiryTime: '',
      status: '',
      username: '',
      password: '',
    };
  }
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
