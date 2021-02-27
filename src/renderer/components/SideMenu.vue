<template>
  <div id="side-menu">
    <ToolBar
      :is-side-menu-hovered="isSideMenuHovered"
    />
    <EditPanel id="editPanel" />
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
    return {}
  },
}

</script>

<style scoped>
#editPanel {
  position: relative;
  background: #E9E9E9;
  border-radius: 12px;
}

#side-menu {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

</style>
