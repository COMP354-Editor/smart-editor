<template>
  <textarea
    v-model="textValue"
    autofocus
    v-bind:style="{height:textAreaHeight + 'px'}"
  />

</template>

<script>
import { remote, ipcRenderer } from 'electron'

export default {
  name: 'TextArea',
  data () {
    return {
      textValue: 'initial data',
      textAreaHeight: 0
    }
  },
  computed: {
  },
  created () {
    // cut textarea height to prevent overflow
    const cutOffset = 50
    // set textarea height on first open
    this.textAreaHeight = remote.getCurrentWindow().getSize()[1] - cutOffset
    // textarea height listen on 'window-resize' channel, message is window height
    ipcRenderer.on('window-resize', (event, message) => {
      this.textAreaHeight = message - cutOffset
    })
  }
}
</script>

<style scoped>
textarea {
  /*remove border*/
  /*border: 0;*/
  border: 1px solid;

  width: 100%;

  /* disable resize, hide resize bar*/
  resize: none;
  min-height:10px;
}

textarea:focus {
  /* disable highlight on focus */
  outline: none;
}

</style>
