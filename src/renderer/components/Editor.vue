<template>
  <TextArea ></TextArea>
</template>

<script>
// import { remote } from 'electron'
import TextArea from './TextArea'

export default {
  components: {TextArea},
  id: 'editor',
  name: 'Editor'
  // data () {
  //   return {
  //     height: remote.getCurrentWindow().getSize()[1]
  //   }
  // }

}
</script>

<style scoped>

</style>
