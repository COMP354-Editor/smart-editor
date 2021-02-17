<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col
                :cols="sideMenuCol"
                @mouseover="sideMenuHovered=true"
                @mouseleave="sideMenuHovered=false"
                >
              <SideMenu />
            </v-col>
            <v-col :cols="editorCol">
              <Editor />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer />
    </v-app>
  </div>
</template>

<script>
import Editor from './components/Editor'
import SideMenu from './components/SideMenu'

export default {
  name: 'SmartEditor',
  data(){
    return {
      sideMenuHovered: false
    }
  },
  computed: {
    sideMenuCol(){
      if (this.sideMenuHovered) {
        return 3
      }else{
        return 2
      }
    },
    editorCol(){
      return 12 - this.sideMenuCol
    }
  },
  components: {
    SideMenu,
    Editor
  }
}
</script>

<style>
html {
  overflow: hidden;
}

</style>
