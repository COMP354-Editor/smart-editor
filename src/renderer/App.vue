<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col
              :cols="sideMenuCol"
              @mouseenter="onSideMenuHovered"
            >
              <SideMenu :is-side-menu-hovered="isSideMenuHovered" />
            </v-col>
            <v-col
              :cols="editorCol"
              @mouseenter="onSideMenuNotHovered"
            >
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
  components: {
    SideMenu,
    Editor
  },
  data () {
    return {
      isSideMenuHovered: false,
      ticktock: 0
    }
  },
  computed: {
    sideMenuCol () {
      if (this.isSideMenuHovered) {
        return 3
      } else {
        return 2
      }
    },
    editorCol () {
      return 12 - this.sideMenuCol
    }
  },
  methods: {
    onSideMenuHovered () {
      clearTimeout(this.ticktock)
      this.ticktock = setTimeout(() => {
        this.isSideMenuHovered = true
      }, 800)
    },
    onSideMenuNotHovered () {
      clearTimeout(this.ticktock)
      this.ticktock = setTimeout(() => {
        this.isSideMenuHovered = false
      }, 800)
    },
  },
}
</script>

<style>
html {
  overflow: hidden;
}
#app{
  background: linear-gradient(110.5deg, #C7F3EE 0%, #CFE7E4 7.38%, #F3E9DA 92.91%), #C4C4C4;
}

</style>
