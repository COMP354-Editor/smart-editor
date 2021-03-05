<template>
  <v-row
    class="flex"
    style="right:20px"
  >
    <div class="dragBar" />
    <div v-if="isWindows">
      <v-btn
        icon
        medium
        title="minimize"
        class="minimize noDrag"
        @click="setWin('min')"
      >
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn
        icon
        medium
        title="maximize"
        class="maximize noDrag"
        @click="setWin('max')"
      >
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>

      <v-btn
        icon
        medium
        title="close"
        class="close noDrag"
        @click="setWin('close')"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
const {ipcRenderer} = require('electron')
export default {
  name: 'Navbar',
  data(){
    return{
      isWindows: process.platform==='win32'
    }
  },
  methods:{
    setWin(type){
      ipcRenderer.send(type);
    },
  },
}
</script>

<style scoped>

.dragBar {
  flex: 2;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  left: 2px;
  background: linear-gradient(110.5deg, rgba(122, 131, 125, 0), rgba(199, 243, 238, 0.8) 15%, rgba(207, 231, 228, 0.8) 7.38%, rgba(122, 131, 125, 0));
  height: 40px;
  width: 100%;
  position: sticky;
  top: 0;
}

.minimize {
  margin-top: 15px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
  right: 10px;
  position: sticky;
  top: 0;
}

.maximize {
  margin-top: 15px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
  right: 10px;
  position: sticky;
  top: 0;
}

.close {
  margin-top: 15px;
  width: 40px;
  height: 26px;
  border-radius: 2px;
  right: 10px;
  position: sticky;
  top: 0;
}

</style>
