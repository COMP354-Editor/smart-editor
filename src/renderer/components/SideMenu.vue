<template>
  <div>
    <ToolBar
      :is-side-menu-hovered="isSideMenuHovered"
    />
    <EditPanel id="editPanel"/>
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
  data(){
    return {
    }
  },
}

</script>

<style scoped>
#editPanel{
  top: 16px;
  position: relative;
  background: #E9E9E9;
  border-radius: 12px;
}
</style>
