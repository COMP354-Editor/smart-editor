<template>
  <div
    id="side-menu"
  >
    <ToolBar
      :is-side-menu-folded="isSideMenuFolded"
      @turnOffSideMenu="$emit('maximizeEditor')"
      @foldSideMenu="$emit('foldSideMenu')"
      @turnMenuOn="turnTheMenuOn()"
      @turnGroupOn="isGroupOn=true; $emit('turnGroupOn')"
    />
    <Menu
      id="menu"
      v-if="isMenuOn"
    />
    <div id="ContentFamily">
      <Group
        v-if="isGroupOn"
      />
      <EditPanel
        :is-side-menu-folded="isSideMenuFolded"
        @unlockFold="$emit('unlockFold')"
        @lockFold="$emit('lockFold')"
      />
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import EditPanel from './EditPanel'
import Menu from './Menu'
import Group from './Group'

export default {
  name: 'SideMenu',
  components: {EditPanel, ToolBar, Menu,Group},
  props: {
    isSideMenuFolded: Boolean,
  },
  data () {
    return {
      isMenuOn: false,
      isGroupOn:false
    }
  },
  watch:{
    isSideMenuFolded: function (val) {
      if(val) {
        this.isGroupOn = false
      }
    }
  },
  methods:{
    turnTheMenuOn(){
      if(this.isMenuOn){
        this.isMenuOn=false
        this.$emit('unlockFold')
      }else{
        this.isMenuOn=true
        this.$emit('lockFold')
      }
    }
  }
}

</script>

<style scoped>
#ContentFamily{
  display: flex;
  flex-direction: row;
}

#menu {
  flex: 0 0 auto;
}

#side-menu {
  display: flex;
  flex-direction: column;
  /*align-items: stretch;*/
}
</style>
