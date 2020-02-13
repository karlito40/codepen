import stateMerge from 'vue-object-merge';
import Vue from 'vue';

const store = new Vue({
  methods: {
    merge (gameState) {
      stateMerge(this.$data, gameState);
    }
  }
});

// ...some socket init stuff here...

socket.on('change', store.merge.bind(store));

export default store;