<template>
  <div id="app">
    <v-app>
      <v-main>
        <div
          id="container"
          :style="{height:heightPixel + 'px'}"
        >
          <v-btn
            v-if="isEditorFullScreen"
            id="cancel-full-screen"
            icon
            large
            @click="isEditorFullScreen = false"
          >
            <v-icon>mdi-arrow-bottom-right-thick</v-icon>
          </v-btn>
          <div
            id="side-menu-container"
            @mouseenter="onSideMenuHovered()"
          >
            <SideMenu
              v-if="!isEditorFullScreen"
              :is-side-menu-hovered="isSideMenuHovered"
              :is-side-menu-on="!isEditorFullScreen"
              :style="{width:sideMenuWidthPixel + 'px'}"
              style="height: 100%"
              @maximizeEditor="isEditorFullScreen = true"
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
      // timer to expand sideMenu
      ticktock: 0,
      heightPixel: 0,
      widthPixel: 0,
      isEditorFullScreen: false
    }
  },
  computed: {
    sideMenuWidthPixel () {
      if (this.isSideMenuHovered) {
        // sideMenu width when hovered
        return 359
      } else if (this.isEditorFullScreen) {
        // sideMenu folded when editor is full screen
        return 0
      } else {
        // sideMenu width when not hovered
        return 177
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
    const widthCutOffset = 80

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
  display: inline-block;
}

#side-menu-container {
  margin-left: 20px;
  top: 68px;
  height: 100%;
  float: left;
}

#editor-container {
  margin-left: 20px;
  height: 100%;
  float: left;
}

#cancel-full-screen {
  width: 26px;
  height: 26px;
  position: absolute;
  transform: translate(5px, -15px);
}

#cancel-full-screen::before {
  background-color: transparent !important;
}

</style>
