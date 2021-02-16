<template>
  <div class="wrapper">
    <TextArea />
  </div>
</template>

<script>
import TextArea from './TextArea'

export default {
  name: 'Editor',
  components: {TextArea},
  id: 'editor'
}
</script>

<style scoped>
.wrapper {
  padding: 3px 3px 3px 0px;
}

</style>
