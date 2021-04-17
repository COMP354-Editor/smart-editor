<template>
  <div id="Layer1-menu">
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      New
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
      :ripple="false"
      @click="openFile"
    >
      Open
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
      :ripple="false"
      @click="saveFile"
    >
      Save
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
      :ripple="false"
      @click="saveAsFile"
    >
      Save as
    </v-btn>
  </div>
</template>

<script>

import ioService from "../../../service/IOService";
import { bus } from "../../../main";

export default {
  name: 'File',
  data() {
    return {}
  },
  methods: {
    openFile() {
      ioService.open().then(() => {
        bus.$emit('on-open-file')
      })
    },
    saveAsFile() {
      ioService.saveAs()
    },
    saveFile(){
      ioService.save()
    }
  }
}

</script>

<style scoped>

#Layer1-menu {
  display: flex;
  flex-direction: column;
  background: #B4B4B4;
  padding-top: 7px;
  padding-bottom: 7px;
}

.menu-layer1 {
  box-shadow: 0 0 0 #c6c6c6;
  margin-bottom: 2px;
  margin-top: 2px;
  background: #858585 !important;
  color: #FEFEFE !important;
  justify-content: inherit;
  border-radius: 0;
}

.menu-layer1::before {
  background-color: transparent !important;
}
</style>
