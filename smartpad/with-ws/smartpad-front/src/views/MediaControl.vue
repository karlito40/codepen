<template>
  <div class="MediaControl">
    <div class="audio fl">
      <button @click="tap('audio_vol_down')">-</button>
      <button @click="tap('audio_mute')">(un)mute</button>
      <button @click="tap('audio_vol_up')">+</button>
    </div>
    <div class="player fl">
      <button @click="tap('audio_prev')">&lt;&lt;</button>
      <button @click="tap('audio_play')">play/pause</button>
      <button @click="tap('audio_next')">&gt;&gt;</button>
    </div>
    <div class="fl">
      <button @click="click">click</button>
    </div>
  </div>  
</template>

<script>
export default {
  methods: {
    tap (key) {
      this.$socket.send(JSON.stringify({
        subject: 'keyboard:tap',
        data: { key }
      }));
    },

    click () {
      this.$socket.send(JSON.stringify({
        subject: 'mouse:click',
        data: { }
      }));
    }
  }
}
</script>


<style lang="scss" scoped>
.MediaControl {
  .fl {
    display: flex;
  }
  

  button {
    flex: 1;
    margin: 0.5rem;
    padding: 0.5rem;
  }
}
</style>

