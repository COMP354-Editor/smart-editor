<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col
              :cols="sideMenuCol"
              @mouseenter="sideMenuHovered"
            >
              <SideMenu />
            </v-col>
            <v-col :cols="editorCol"
                   @mouseenter="sideMenuNotHovered">
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

let ticktock
export default {
  name: 'SmartEditor',
  components: {
    SideMenu,
    Editor
  },
  data () {
    return {
      isHovered: false
    }
  },
  methods:{
    sideMenuHovered(){
      clearTimeout(ticktock)
      ticktock=setTimeout(() => { this.isHovered = true }, 800)
    },
    sideMenuNotHovered(){
      clearTimeout(ticktock)
      ticktock=setTimeout(() => { this.isHovered = false }, 800)
    }

  },
  computed: {
    sideMenuCol () {
      if (this.isHovered) {
        return 4
      } else {
        return 2
      }
    },
    editorCol () {
      return 12 - this.sideMenuCol
    }
  },
}
</script>

<style>
html {
  overflow: hidden;
}

</style>
