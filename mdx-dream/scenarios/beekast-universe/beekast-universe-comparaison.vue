<template>
  <div class="GoToChiotteScenario">
    <WarScene v-if="universe.ongoingWar" :universe="universe"/>
    <ChiotteScene 
      v-else-if="universe.me.selectedChiotte" 
      :chiotte="universe.me.selectedChiotte"/>
    <DesktopScene v-else :universe="universe"></DesktopScene>
  </div>
</template>

<script>
export default {
  apollo: {
    universe: {
      query: GET_BEEKAST_UNIVERSE,
      variable () {
        return { poleId: this.poleId };
      },
      update: (data) => data.universe,
      subscribeToMore: {
        document: ON_BEEKAST_UNIVERSE_CHANGE,
        variable () {
          return { poleId: this.poleId };
        },
        updateQuery (previousResult, { data: { changes } }) {
          return merge(previousResult, changes);
        }
      }
    },
  }
}
</script>