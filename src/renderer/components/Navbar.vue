<template>
  <v-row class="flex">
    <div class="dragBar" />
    <v-btn
      icon
      large
      title="minimize"
      class="minimize noDrag"
      @click="setWin('min')"
    >
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn
      icon
      large
      title="maximize"
      class="maximize noDrag"
      @click="setWin('max')"
    >
      <v-icon>mdi-window-maximize</v-icon>
    </v-btn>

    <v-btn
      icon
      large
      title="close"
      class="close noDrag"
      @click="setWin('close')"
    >
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>

  </v-row>
</template>

<script>
const {ipcRenderer} = require("electron");
export default {
  name: 'Narbar',
  methods:{
    setWin(type){
      ipcRenderer.send(type);
    },
},
}
</script>

<style scoped>

.dragBar{
  flex:2;
  height: 35px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}

.minimize{
  margin-top: 5px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
}
.maximize{
  margin-top: 5px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
}
.close{
  margin-top: 5px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
}

</style>
