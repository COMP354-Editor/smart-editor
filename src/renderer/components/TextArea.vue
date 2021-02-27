<template>
  <div
    id="TextArea"
    ref="editor"
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
  padding:10px;
  width: 100%;
  height: 100%;
  resize: none;
  min-height: 10px;
  color:#545454;
}

.editor:focus {
  /* disable highlight on focus */
  outline: none;
}
#TextArea{
  background: #F7F7F7;
  border-radius: 12px;
}
</style>
