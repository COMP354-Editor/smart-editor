<template>
  <div
    id="side-menu"
  >
    <ToolBar
      :is-side-menu-hovered="isSideMenuHovered"
      @turnOffSideMenu="$emit('maximizeEditor')"
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
