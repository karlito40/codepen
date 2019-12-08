<template>
  <form @submit.prevent="submit">
    <v-card>
      <v-card-title>
        <span class="headline">Kast Form</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-row >
          <v-col cols="8">
            <v-text-field 
              v-model="form.title"
              :error-messages="$v.form.title.$error ? 'Titre requis' : ''"
              label="Titre" 
              required
              @input="$v.form.title.$touch()"
              @blur="$v.form.title.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              #append 
              v-model="form.color"
              :error-messages="$v.form.color.$error ? 'Couleur requise' : ''"
              label="Couleur"
              @input="$v.form.color.$touch()"
              @blur="$v.form.color.$touch()"
            >
              <v-menu 
                v-model="showColorPicker" 
                top 
                nudge-bottom="105" 
                nudge-left="16" 
                :close-on-content-click="false"
              >
                <template #activator="{ on }">
                  <div class="elevation-5" :style="swatchStyle" v-on="on" />
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker v-model="form.color" flat/>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Annuler</v-btn>
        <v-btn text @click="submit">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import CREATE_KAST from '@/graphql/CreateKast.gql';

export default {
  inject: ['$user'],

  validations: {
    form: { 
      title: { required },
      color: { required }
    }
  },

  data: () => ({
    showColorPicker: false,
    form: {
      title: undefined,
      color: '#1976D2FF'
    }
  }),

  computed: {
    swatchStyle () {
      return {
        backgroundColor: this.form.color,
        cursor: 'pointer',
        height: '20px',
        width: '20px',
        borderRadius: this.showColorPicker ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      };
    }
  },

  methods: {
    close () {
      this.$router.push('/u/kasts');
    },

    async submit () {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      try {
        const res = await this.$apollo.mutate({
          mutation: CREATE_KAST,
          variables: { 
            input: {
              userId: this.$user.me.id,
              ...this.form
            }
          },
          awaitRefetchQueries: true,
          refetchQueries: ['getKasts']
        });

        const kast = res.data.createKast;
        this.$router.push(`/u/kast/${kast.id}`);
      } catch (e) {
        console.error('Error on create kast', e);
      }
    }
  }
}
</script>