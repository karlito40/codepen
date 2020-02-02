<template>
  <div class="GoToChiotteScenario">
    <WarScene v-if="$store.ongoingWar" :agence="$store.agence"/>
    <ChiotteScene 
      v-else-if="$store.me.selectedChiotte" 
      :chiotte="$store.me.selectedChiotte"/>
    <DesktopScene v-else :agence="$store.agence"></DesktopScene>
  </div>
</template>

<script>
export default {
  created () {
    this.$socket.emit('agence.join');
  }
}
</script>