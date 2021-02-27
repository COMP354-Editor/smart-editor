<template>
  <div
    v-if="sideMenuFlipFlop"
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
    isSideMenuHovered: Boolean
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
    }
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
