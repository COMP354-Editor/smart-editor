<template>
  <div
    id="side-menu"
  >
    <ToolBar
      :is-side-menu-folded="isSideMenuFolded"
      @turnOffSideMenu="$emit('maximizeEditor')"
      @foldSideMenu="$emit('foldSideMenu')"
      @turnMenuOn="turnTheMenuOn()"
      @turnGroupOn="isGroupOn=true; $emit('turnGroupOn');$emit('lockFold')"
      @turnGroupOff="isGroupOn=false; $emit('turnGroupOff');$emit('unlockFold')"
      @unlockFold="$emit('unlockFold')"
      @lockFold="$emit('lockFold')"
      @ensureSelectOff="ensureSelectOff=!ensureSelectOff;"
    />
    <Menu
      v-if="isMenuOn"
      id="menu"
    />
    <div id="ContentFamily">
      <GroupPanel
        v-if="isGroupOn"
      />
      <EditPanel
        :is-group-on="isGroupOn"
        :is-side-menu-folded="isSideMenuFolded"
        :ensure-select-off="ensureSelectOff"
        @unlockFold="$emit('unlockFold')"
        @lockFold="$emit('lockFold')"
      />
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import EditPanel from './edit_panel/EditPanel'
import Menu from './menu/Menu'
import GroupPanel from './group_panel/GroupPanel'

export default {
  name: 'SideMenu',
  components: {EditPanel, ToolBar, Menu, GroupPanel},
  props: {
    isSideMenuFolded: Boolean,
  },
  data() {
    return {
      isMenuOn: false,
      isGroupOn: false,
      ensureSelectOff: false
    }
  },
  watch: {
    isSideMenuFolded: function (val) {
      if (val) {
        this.isGroupOn = false
      }
    }
  },
  methods: {
    turnTheMenuOn() {
      if (this.isMenuOn) {
        this.isMenuOn = false
        this.$emit('unlockFold')
      } else {
        this.isMenuOn = true
        this.$emit('lockFold')
      }
    },
  }
}

</script>

<style scoped>
#ContentFamily {
  display: flex;
  flex-direction: row;
  overflow: auto;
  flex: 2;
}

#menu {
  flex: 0 0 auto;
}

#side-menu {
  display: flex;
  flex-direction: column;
}
</style>
