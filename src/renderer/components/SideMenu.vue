<template>
  <div>
    <ToolBar
      :is-side-menu-hovered="isSideMenuHovered"
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
  }
}
</script>

<style scoped>

</style>
