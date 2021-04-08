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
        @selectedEditsUpdated="selectedEditsUpdated"
      />
      <EditPanel
        :is-group-on="isGroupOn"
        :is-side-menu-folded="isSideMenuFolded"
        :ensure-select-off="ensureSelectOff"
        :edits="allEdits"
        @unlockFold="$emit('unlockFold')"
        @lockFold="$emit('lockFold')"
        @selectedEditsUpdated="selectedEditsUpdated"
        @deleteSelectedEdits="deleteSelectedEdits"
      />
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import EditPanel from './edit_panel/EditPanel'
import Menu from './menu/Menu'
import GroupPanel from './group_panel/GroupPanel'
import editManager from "../../model/EditManager";

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
      ensureSelectOff: false,
      selectedEdits: []
    }
  },
  computed: {
    allEdits() {
      return editManager.edits
    },
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
    selectedEditsUpdated(selectedEdit) {
      let index = this.selectedEdits.indexOf(selectedEdit)
      if (index === -1) {
        this.selectedEdits.push(selectedEdit)
      } else {
        this.selectedEdits.splice(index, 1);
      }
      console.log(this.selectedEdits)
    },
    deleteSelectedEdits(){
      for (let i = 0; i < this.selectedEdits.length; i++) {
        console.log(this.selectedEdits[i])
        editManager.deleteEdit(this.selectedEdits[i])
      }
    }
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
