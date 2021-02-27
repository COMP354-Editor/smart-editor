<template>
  <div id="app">
    <v-app>
      <v-main>
        <div
          id="container"
          :style="{height:heightPixel + 'px'}"
        >
          <div
            id="side-menu-container"
            @mouseenter="onSideMenuHovered()"
          >
            <SideMenu
              :is-side-menu-hovered="isSideMenuHovered"
              :style="{width:sideMenuWidthPixel + 'px'}"
              style="height: 100%"
            />
          </div>
          <div
            id="editor-container"
            :style="{width:editorWidthPixel + 'px'}"
            @mouseenter="onSideMenuNotHovered()"
          >
            <Editor />
          </div>
        </div>
      </v-main>
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
      heightPixel: 0,
      widthPixel: 0
    }
  },
  computed: {
    sideMenuWidthPixel () {
      if (this.isSideMenuHovered) {
        // sideMenu width when hovered
        return 265
      } else {
        // sideMenu width when not hovered
        return 176
      }
    },
    editorWidthPixel () {
      // cut width to prevent overflow
      return this.widthPixel - this.sideMenuWidthPixel
    },
  },
  created () {
    // cut textarea height to prevent overflow
    const heightCutOffset = 70
    const widthCutOffset = 55

    // set textarea height on first open
    this.widthPixel = remote.getCurrentWindow().getSize()[0] - widthCutOffset
    this.heightPixel = remote.getCurrentWindow().getSize()[1] - heightCutOffset
    // textarea height listen on 'window-resize' channel, message is window height
    ipcRenderer.on('window-resize', (event, message) => {
      this.widthPixel = message[0] - widthCutOffset
      this.heightPixel = message[1] - heightCutOffset
    })
  },
  methods: {
    onSideMenuHovered () {
      console.log('on side menu hovered')
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

#app {
  background: linear-gradient(110.5deg, #C7F3EE 0%, #CFE7E4 7.38%, #F3E9DA 92.91%), #C4C4C4;
}

#container {
  width: 100%;
  padding-top: 20px;
}

#side-menu-container {
  margin-left: 10px;
  top: 68px;
  height: 100%;
  float: left;
}

#editor-container {
  margin-left: 10px;
  height: 100%;
  float: left;
}

</style>
