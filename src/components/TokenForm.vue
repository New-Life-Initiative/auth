<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col v-if="mode === 'SNAP'" cols="12" md="6">
          <v-text-field v-model="form.channelId" label="Channel Name" variant="outlined" />
        </v-col>
        <v-col v-else cols="6">
          <v-text-field v-model="form.channelId" label="Channel Name" variant="outlined" />
        </v-col>

        <v-col v-if="mode === 'SNAP'" cols="12" md="6">
          <v-select
            v-model="form.tokenType"
            item-title="text"
            item-value="value"
            :items="tokenType"
            label="Token Type"
            variant="outlined"
          />
        </v-col>
        <v-col v-if="mode === 'BASIC'" cols="12" md="6">
          <v-select
            v-model="form.status"
            item-title="text"
            item-value="value"
            :items="statusOptions"
            label="Status"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-row v-if="mode === 'SNAP'">
        <v-col cols="12" md="6">
          <v-textarea v-model="form.clientKey" label="Client Key" variant="outlined" />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea v-model="form.clientSecret" label="Client Secret" variant="outlined" />
        </v-col>
        <v-btn color="primary" variant="flat" class="mx-auto" @click="$emit('generate-cksk')">Generate Client Key & Client Secret</v-btn>
      </v-row>

      <v-row v-if="mode === 'SNAP'" class="pt-4">
        <v-col cols="12" md="6">
          <v-textarea v-model="form.publicKey" label="Public Key" variant="outlined" />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea v-model="form.privateKey" label="Private Key" variant="outlined" />
        </v-col>
        <v-btn class="mx-auto" color="primary" variant="flat" @click="$emit('generate-pk')">Generate Public Key & Private Key</v-btn>
      </v-row>

      <v-row class="pt-4">
        <v-col cols="12" md="6">
          <v-text-field v-model="form.accessTokenExpiryTime" label="Expire Time" type="number" variant="outlined" />
        </v-col>
        <v-col v-if="mode === 'SNAP'" cols="12" md="6">
          <v-select
            v-model="form.status"
            item-title="text"
            item-value="value"
            :items="statusOptions"
            label="Status"
            variant="outlined"
          />
        </v-col>
        <v-col v-if="mode === 'BASIC'" cols="12" md="6">
          <v-text-field v-model="form.refreshTokenExpiryTime" label="Refresh Token Expiry Time" type="number" variant="outlined" />
        </v-col>
      </v-row>

      <v-row v-if="mode === 'BASIC'">
        <v-col cols="12" md="6">
          <v-text-field v-model="form.username" label="Username" variant="outlined" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.password" label="Password" variant="outlined" />
        </v-col>
        <v-btn class="mx-auto" color="primary" variant="flat" @click="$emit('generate-basic')">Generate Username & Password</v-btn>
      </v-row>

      <v-row class="justify-center mt-6">
        <v-btn color="success" variant="flat" @click="$emit('save', mode)">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps<{ form: object, mode: string, statusOptions?: { text: string, value: number }[], tokenType?: { text: string, value: string }[] }>();
</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
