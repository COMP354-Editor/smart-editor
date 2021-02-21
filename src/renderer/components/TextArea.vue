<template>
  <div
    ref="editor"
    :style="{height:textAreaHeight + 'px'}"
  >
    <div
      v-if="highlightView"
      class="editor"
    >
      <component
        :is="textComponent.component"
        v-for="(textComponent,index) in textComponents"
        :key="index"
        v-bind="textComponent.props"
      />
    </div>
    <textarea
      v-else
      v-model="textValue"
      class="editor"
    />
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron'
import HighlightedText from './HighlightedText'
import PlainText from './PlainText'

export default {
  name: 'TextArea',
  components: {HighlightedText, PlainText},
  data () {
    return {
      // response to windows size change
      textAreaHeight: 0,
      // enable text to be highlighted
      // use to preview edits
      highlightView: false,
      textValue: 'initial data',
      textComponents: [
        {
          component: PlainText,
          props: {
            text: 'plain text'
          }
        },
        {
          component: HighlightedText,
          props: {
            text: 'highlight text'
          }
        }

      ]
    }
  },
  created () {
    // cut textarea height to prevent overflow
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
  },
  methods: {
    toggleHighlightView () {
      this.highlightView = !this.highlightView
    },

    // highlight text pieces specified by ranges
    // ranges is an array of object of {from: int, to: int}
    highlight (ranges) {
      if (ranges.length === 0) return
      this.textComponents = []
      let front = 0 // record where to start processing
      for (let i = 0; i < ranges.length; i++) {
        // push components in textComponents

        // --------from-----------to-----from----------to----
        // ..Plain.....Highlight....Plain....Highlight....Plain

        this.textComponents.push({
          component: PlainText,
          props: {
            text: this.textValue.substring(front, ranges[i].from)
          }
        }, {
          component: HighlightedText,
          props: {
            text: this.textValue.substring(ranges[i].from, ranges[i].to)
          }
        })
        front = ranges[i].to
      }
      this.textComponents.push({
        component: PlainText,
        props: {
          text: this.textValue.substring(front)
        }
      })

      this.toggleHighlightView()
    }

  }
}
</script>

<style scoped>
.editor {
  /*remove border*/
  /*border: 0;*/
  border: 1px solid;

  width: 100%;
  height: 100%;

  /* disable resize, hide resize bar*/
  resize: none;
  min-height: 10px;
}

.editor:focus {
  /* disable highlight on focus */
  outline: none;
}

</style>
