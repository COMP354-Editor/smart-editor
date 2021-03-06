<template>
  <div
    id="side-menu"
  >
    <ToolBar
      :is-side-menu-folded="isSideMenuFolded"
      @turnOffSideMenu="$emit('maximizeEditor')"
      @foldSideMenu="$emit('foldSideMenu')"
      @turnMenuOn="turnTheMenuOn()"
    />
    <Menu
      v-if="isMenuOn"
    />
    <EditPanel :is-side-menu-folded="isSideMenuFolded" />
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import EditPanel from './EditPanel'
import Menu from './Menu'

export default {
  name: 'SideMenu',
  components: {EditPanel, ToolBar, Menu},
  props: {
    isSideMenuFolded: Boolean,
  },
  data () {
    return {
      isMenuOn: false,
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
    },
  }
}

</script>

<style scoped>

#side-menu {
  display: flex;
  flex-direction: column;
  /*align-items: stretch;*/
}
</style>
