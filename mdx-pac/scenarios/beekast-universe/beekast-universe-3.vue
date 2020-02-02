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
  data: () => ({ universe: {} }),
  apollo: {
    $subscribe: {
      query: ON_BEEKAST_UNIVERSE,
      variable () {
        return { poleId: this.poleId };
      },
      result: ({ data: universeState }) => {
        return merge(this.universe, universeState);
      }
    }
  }
}
<script>