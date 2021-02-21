<template>
  <div
    ref="editor"
    class="editor"
    contenteditable
    :style="{height:textAreaHeight + 'px'}"
  >
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron'

export default {
  name: 'TextArea',
  data () {
    return {
      textValue: `initial <mark>data</mark>`,
      textAreaHeight: 0
    }
  },
  created () {
    // cut textarea height to prevent overflow
    // these two number are from experiment
    // const cutRatio = 1.005
    // const cutRatio = 1
    const cutOffSet = 70

    // set textarea height on first open
    this.textAreaHeight = remote.getCurrentWindow().getSize()[1] - cutOffSet
    // textarea height listen on 'window-resize' channel, message is window height
    ipcRenderer.on('window-resize', (event, message) => {
      this.textAreaHeight = message - cutOffSet
    })
  },
  mounted () {
    // auto focus
    this.$refs.editor.focus()
  }
}
</script>

<style scoped>
.editor {
  /*remove border*/
  /*border: 0;*/
  border: 1px solid;

  width: 100%;

  /* disable resize, hide resize bar*/
  resize: none;
  min-height: 10px;
}

.editor:focus {
  /* disable highlight on focus */
  outline: none;
}

</style>
