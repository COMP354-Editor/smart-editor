<template>
  <div id="menu">
    <v-btn
      height="25px"
      :class="{ menu_layer0: !isFileListOn, file_layer0_unfolded: isFileListOn }"
      @click="turnOnFileList()"
    >
      File
      <v-spacer />
      <div
        v-if="isFileListOn"
        class="onNotification"
      />
    </v-btn>
    <File v-if="isFileListOn" />
    <v-btn
      height="25px"
      :class="{ menu_layer0: !isEditListOn, edit_layer0_unfolded: isEditListOn }"
      @click="turnOnEditList()"
    >
      Edits
      <v-spacer />
      <div
        v-if="isEditListOn"
        class="onNotification"
      />
    </v-btn>
    <Edit v-if="isEditListOn" />
    <v-btn
      height="25px"
      class="menu_layer0"
    >
      Help
    </v-btn>
    <v-btn
      height="25px"
      class="menu_layer0"
    >
      Exit
    </v-btn>
  </div>
</template>

<script>
import File from "./File"
import Edit from "./Edit"
export default {
  name: 'Menu',
  components:{
    File,
    Edit
  },
  data () {
    return {
      isFileListOn:false,
      isEditListOn:false,
    }
  },
  methods: {
    turnOnFileList(){
      this.isFileListOn=!this.isFileListOn
      this.isEditListOn=false
    },
    turnOnEditList(){
      this.isEditListOn=!this.isEditListOn
      this.isFileListOn=false
    }
  }

}
</script>

<style scoped>
.onNotification{
  width: 7px;
  height: 7px;
  background: #FFA24D;
  border-radius: 12px;
}

#menu {
  display: flex;
  flex-direction: column;
  background: #E9E9E9;
  border-radius: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 11px;
  padding-bottom: 24px;
}
.menu_layer0{
  box-shadow: 0 0 0 #c6c6c6;
  margin-bottom: 4px;
  justify-content: inherit;
  border-radius: 0;
}
.file_layer0_unfolded{
  /*"Do not remove this, it is actually working"*/
  box-shadow: 0 0 0 #c6c6c6;
  justify-content: inherit;
  border-radius: 0;
}
.edit_layer0_unfolded{
  /*"Do not remove this, it is actually working"*/
  box-shadow: 0 0 0 #c6c6c6;
  justify-content: inherit;
  border-radius: 0;
}
.menu_layer0::before {
  background-color: transparent !important;
}
</style>
