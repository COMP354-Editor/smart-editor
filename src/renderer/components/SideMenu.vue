<template>
  <ToolBar
    :is-that-hovered="isThatHovered"
  />
</template>

<script>
import ToolBar from './ToolBar'

export default {
  name: 'SideMenu',
  components: {ToolBar},
  props: {
    isThatHovered: Boolean
  }
}
</script>

<style scoped>

</style>
