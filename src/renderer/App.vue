<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container
          fluid
        >
          <div :style="{height:appHeight + 'px'}">
            <div style="display:inline-block; width:100%">
              <div
                id="sideMenu"
                :style="{
                  width:sideMenuWidthPixel + 'px',
                  height:sideMenuHeightPixel + 'px',
                }"

                @mouseenter="onSideMenuHovered"
              >
                <SideMenu :is-side-menu-hovered="isSideMenuHovered" />
              </div>
              <div
                id="Editor"
                :style="{
                  width:editorWidthPixel + 'px',
                  height:editorHeightPixel + 'px',
                }"
                @mouseenter="onSideMenuNotHovered"
              >
                <Editor />
              </div>
            </div>
          </div>
        </v-container>
      </v-main>
      <v-footer />
    </v-app>
  </div>
</template>

<script>
import Editor from './components/Editor'
import SideMenu from './components/SideMenu'
import { remote, ipcRenderer } from 'electron'

export default {
  name: 'SmartEditor',
  components: {
    SideMenu,
    Editor
  },
  data () {
    return {
      isSideMenuHovered: false,
      ticktock: 0,
      appHeight: 0
    }
  },
  computed: {
    sideMenuWidthPixel () {
      if (this.isSideMenuHovered) {
        return 265
      } else {
        return 176
      }
    },
    sideMenuHeightPixel () {
      if (this.isSideMenuHovered) {
        return 931
      } else {
        return 935
      }
    },
    editorWidthPixel () {
      return 1440 - this.sideMenuWidthPixel
    },
    editorHeightPixel () {
      return 1024 - this.sideMenuHeightPixel
    },
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
  created () {
    // cut textarea height to prevent overflow
    const cutOffSet = 70

    // set textarea height on first open
    this.sideMenuHeight = remote.getCurrentWindow().getSize()[1] - cutOffSet
    // textarea height listen on 'window-resize' channel, message is window height
    ipcRenderer.on('window-resize', (event, message) => {
      this.sideMenuHeight = message - cutOffSet
    })
  },
}
</script>

<style>
html {
  overflow: hidden;
}

#app {
  background: linear-gradient(110.5deg, #C7F3EE 0%, #CFE7E4 7.38%, #F3E9DA 92.91%), #C4C4C4;
}

#sideMenu {
  left: 26px;
  top: 68px;
  float: left
}

#Editor {
  left: 20px;
  top: 20px;
  padding-left: 27px;
  float: left
}

</style>
