<template>
  <LayoutSign title="Nouveau compte">
    <template #content>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="form.pseudo"
          :error-messages="$v.form.pseudo.$error ? 'Identifiant requis' : ''"
          label="Identifiant"
          required
          prepend-icon="person"
          @input="$v.form.pseudo.$touch()"
          @blur="$v.form.pseudo.$touch()"
        ></v-text-field>
      </form>
    </template>

    <template #actions>
      <v-spacer/>
      <v-btn text @click="submit">Inscription</v-btn>
    </template>
  </LayoutSign>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { Auth } from '@/core';
import LayoutSign from './LayoutSign';

export default {
  components: { LayoutSign },

  validations: {
    form: { pseudo: { required } }
  },

  data: () => ({
    form: { pseudo: '' }
  }),

  methods: {
     async submit () {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      Auth.register({
        ...this.form,
        password: this.form.pseudo
      });
    }
  }
}
</script>