<template>
  <div
    id="text-area"
  >
    <div
      v-if="highlightView"
      class="text-area-editable"
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
      ref="textarea"
      v-model="textValue"
      class="text-area-editable"
      @input="onInput"
      @select="onSelect"
    />
  </div>
</template>

<script>
import HighlightedText from './HighlightedText'
import PlainText from './PlainText'
import textCharManager from '../../model/TextCharManager.ts'
import editManager from "../../model/EditManager";

export default {
  name: 'TextArea',
  components: {HighlightedText, PlainText},
  data() {
    return {
      // *********** data for preview ***********
      // enable text to be highlighted
      // use to preview edits
      highlightView: false,
      // TODO: this is a UI data; should have another variable to receive data from backend
      textValue: textCharManager.getTextValue(),
      // used in highlight view
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
      ],
      // *********** data for type handling ***********
      // position of a continuous typing/deleting at the start
      startPosition: 0,
      // text buffer for continuous typing
      textBuffer: [],
      // count num of chars in a continuous deleting
      deleteCount: 0,
      // we have three states: type, delete, select
      typeState: 'type',
    }
  },
  mounted() {
    // auto focus
    this.$refs.textarea.focus()
    setInterval(this.refreshState, 2000);
  },
  methods: {
    // *********** methods for preview ************
    toggleHighlightView() {
      this.highlightView = !this.highlightView
    },

    // highlight text pieces specified by ranges
    // ranges is an array of object of {from: int, to: int}
    // TODO: in application, user add highlight one by one, not as a whole
    highlight(ranges) {
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
    },

    // ************ methods for type handling *********
    onInput(inputEvent) {
      if (inputEvent.inputType === 'insertText' && this.typeState === 'type'){
        // we are in a continuous typing
        if (this.textBuffer.length === 0){
          // this is the first type in a continuous typing, update position
          this.startPosition = inputEvent.target.selectionStart
        }
        // push the new text into buffer
        this.textBuffer.push(inputEvent.data)
      }
      console.log(inputEvent.target.selectionStart)
      console.log(inputEvent.inputType)
      console.log(inputEvent.data)
    },
    onSelect(selectEvent) {
      console.log("Selection start:")
      console.log(selectEvent.target.selectionStart)
      console.log("Selection end:")
      console.log(selectEvent.target.selectionEnd)
    },
    refreshState() {
      if (this.textBuffer.length > 0) {
        // continuous typing: create textChars and add to an edit
        const textChars = textCharManager.createTextChar(this.startPosition, this.textBuffer.join(""))
        editManager.createEdit('writing', textChars)
        this.textBuffer = []
      }

    }

  }
}
</script>

<style scoped>
#text-area {
  height: 100%;
}

.text-area-editable {
  padding-top: 5px;
  width: 100%;
  height: 100%;
  resize: none;
  min-height: 10px;
  color: #545454;
  font-size: 18px;
}

.text-area-editable:focus {
  /* disable highlight on focus */
  outline: none;
}

.text-area-editable::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.text-area-editable::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #909090;
}

.text-area-editable::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
