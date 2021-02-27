<template>
  <div id="editor">
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
#editor{
  height: 100%;
}

</style>
