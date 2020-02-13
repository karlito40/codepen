<template>
  <div class="GoToChiotteScenario">
    <WarScene v-if="$store.ongoingWar" :agence="$store.agence"/>
    <ChiotteScene 
      v-else-if="$store.selectedChiotte" 
      :chiotte="$store.selectedChiotte"/>
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