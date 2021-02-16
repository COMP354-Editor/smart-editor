<template>
  <div class="wrapper">
    <TextArea></TextArea>
  </div>
</template>

<script>
import TextArea from './TextArea'

export default {
  components: {TextArea},
  id: 'editor',
  name: 'Editor'
}
</script>

<style scoped>
.wrapper {
  padding: 3px 3px 3px 0px;
}

</style>
