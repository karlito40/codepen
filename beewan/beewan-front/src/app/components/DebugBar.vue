<template>
  <Store #default="{ battles, nbPlayers, connected }">
    <Socket #default="{ disconnect, connect }">
      <div class="DebugBar">
        [Players] {{ nbPlayers }} 
        | [Battles] 
        <span :key="battle.id" v-for="battle in battles">
          {{ battle.id }}
        </span>

        <button v-if="connected" @click="disconnect">Se deconnecter</button>
        <button v-else @click="connect">Se connecter</button>
      </div>
    </Socket>
  </Store>
</template>

