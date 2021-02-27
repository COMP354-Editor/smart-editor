<template>
  <div
    v-if="turnSideMenuOn(sideMenuOn)"
    id="side-menu"
  >
    <ToolBar
      :is-side-menu-hovered="isSideMenuHovered"
      @offSideMenu="turnOffSideMenu"
    />
    <EditPanel />
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import EditPanel from './EditPanel'

export default {
  name: 'SideMenu',
  components: {EditPanel, ToolBar},
  props: {
    isSideMenuHovered: Boolean,
    sideMenuOn: Boolean
  },
  data () {
    return {
      sideMenuFlipFlop:true
    }
  },
  methods:{
    turnOffSideMenu: function (offSideMenu) {
      this.sideMenuFlipFlop = offSideMenu
      this.$emit('maximizeEditor', this.sideMenuFlipFlop)
    },
    turnSideMenuOn: function (sideMenuOn){
      if(!sideMenuOn){
        return this.sideMenuFlipFlop
      }else{
      return this.sideMenuFlipFlop=sideMenuOn
      }
    },
  },
}

</script>

<style scoped>

#side-menu {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

</style>
