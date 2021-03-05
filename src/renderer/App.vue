<template>
  <v-app>
    <div :class="{ bg_folded: isSideMenuFolded, bg_unfolded: !isSideMenuFolded }">
      <v-main>
        <Navbar id="navbar" />
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
            <img
              src="build/icons/UnFullScreen.svg"
              alt="UnFullScreen"
            >
          </v-btn>
          <div
            id="side-menu-container"
            @mouseenter="onSideMenuHovered()"
          >
            <SideMenu
              v-if="!isEditorFullScreen"
              :is-side-menu-folded="isSideMenuFolded"
              :style="{width:sideMenuWidthPixel + 'px'}"
              style="height: 100%"
              @maximizeEditor="isEditorFullScreen = true"
              @foldSideMenu="isSideMenuFolded = true"
              @lockFold="foldLockHandler()"
              @unlockFold="unfoldLockHandler()"
            />
          </div>
          <div
            id="editor-container"
            :style="{width:editorWidthPixel + 'px'}"
            @mouseenter="onEditorHovered()"
          >
            <Editor />
          </div>
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Editor from './components/Editor'
import SideMenu from './components/SideMenu'
import Navbar from './components/Navbar'
import { remote, ipcRenderer } from 'electron'

export default {
  name: 'SmartEditor',
  components: {
    SideMenu,
    Editor,
    Navbar
  },
  data () {
    return {
      isSideMenuFolded: true,
      // timer to expand sideMenu
      ticktock: 0,
      heightPixel: 0,
      widthPixel: 0,
      isEditorFullScreen: false,
      isFoldLocked: false,
    }
  },
  computed: {
    sideMenuWidthPixel () {
      if (!this.isSideMenuFolded) {
        // sideMenu width when expanded
        return 359
      } else if (this.isEditorFullScreen) {
        // sideMenu hidden when editor is full screen
        return 0
      } else {
        // sideMenu width when folded
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
    const heightCutOffset = 75
    const widthCutOffset = 80

    // set textarea height on first open
    this.widthPixel = remote.getCurrentWindow().getSize()[0] - widthCutOffset
    this.heightPixel = remote.getCurrentWindow().getSize()[1] - heightCutOffset

    // component size listen on 'window-resize' channel, message is window size
    ipcRenderer.on('window-resize', (event, message) => {
      this.widthPixel = message[0] - widthCutOffset
      this.heightPixel = message[1] - heightCutOffset
    })
  },
  methods: {
    onSideMenuHovered () {
      clearTimeout(this.ticktock)
      console.log("onSideMenuHovered hoverLock "+this.isFoldLocked+" sideMenu "+this.isSideMenuFolded)
      if(!this.isFoldLocked) {
        this.ticktock = setTimeout(() => {
          // expand side menu after time out
          this.isSideMenuFolded = false
        }, 800)
      }
    },
    onEditorHovered () {
      clearTimeout(this.ticktock)
      if(!this.isFoldLocked) {
        this.ticktock = setTimeout(() => {
          // fold side menu after time out
          this.isSideMenuFolded = true
        }, 800)
      }
    },
    foldLockHandler(){
      clearTimeout(this.ticktock);
      this.isFoldLocked=true
    },
    unfoldLockHandler(){
      clearTimeout();
      this.isFoldLocked=false
    }
  },

}
</script>

<style>
html {
  overflow: hidden;
}
#app{
  /*"Do not remove this, it is actually working"*/
  background: transparent;
}
#navbar{
  margin-bottom: 1px;
}

.bg_folded {
  /*"Do not remove this, it is actually working"*/
  background: linear-gradient(110.5deg, rgba(199, 243, 238, 0.8) 0%, rgba(207, 231, 228, 0.8) 7.38%, rgba(243, 233, 218, 0.8) 92.91%), rgba(196, 196, 196, 0.8);
  height:100%;
  border-radius: 12px;
}

.bg_unfolded {
  /*"Do not remove this, it is actually working"*/
  background: linear-gradient(110.5deg, rgba(199, 243, 238, 0.8) 0%, rgba(207, 231, 228, 0.8) 7.38%, rgba(243, 233, 218, 0.8) 92.91%), rgba(196, 196, 196, 0.8);
  height:100%;
  border-radius: 12px;
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
