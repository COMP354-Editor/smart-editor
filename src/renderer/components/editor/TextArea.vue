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
      @keydown="onKeyDown"
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
import { bus } from "../../main";

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
      // start position of a continuous typing/deleting
      startPosition: 0,
      // end position of a continuous typing/deleting
      endPosition: 0,
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
    // setInterval(this.refreshState, 30000)
    this.startPosition = this.$refs.textarea.selectionStart
    this.endPosition = this.$refs.textarea.selectionStart
  },
  created() {
    // emitted from EditItem
    bus.$on('update-text-value', () => {
      this.textValue = textCharManager.getTextValue()
    })
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

    // used to handle tabs, since tab will not be handled by onInput
    onKeyDown(keyEvent) {
      if (keyEvent.keyCode === 9) { // tab pressed
        keyEvent.preventDefault();
        const textArea = this.$refs.textarea
        const start = textArea.selectionStart
        const end = textArea.selectionEnd

        // set textarea value to: text before caret + tab + text after caret
        textArea.value = textArea.value.substring(0, start) + "\t" + textArea.value.substring(end);

        // put caret at right position again
        textArea.selectionStart = textArea.selectionEnd = start + 1;

        // call onInput to handle this as an input
        this.onInput({
          inputType: 'insertText',
          data: '\t',
          target: textArea,
        })
      }
    },
    onInput(inputEvent) {
      console.log(inputEvent.inputType)
      if (this.typeState === 'type') {
        // we are in a continuous typing state
        if (inputEvent.inputType === 'insertText' || inputEvent.inputType === 'insertLineBreak') {
          this.handleType(inputEvent)
        } else if (inputEvent.inputType === 'deleteContentBackward') {
          this.typeState = 'delete'
          // state transition happens; refresh state first
          this.refreshState()
          // refresh state will put startPosition and endPosition to the current caret position
          // however, we have deleted one char, the end position should be the place before this deletion
          this.startPosition++
          this.endPosition++
          this.handleDelete()
        }
      } else if (this.typeState === 'delete') {
        if (inputEvent.inputType === 'deleteContentBackward') {
          this.handleDelete();
        } else if (inputEvent.inputType === 'insertText' || inputEvent.inputType === 'insertLineBreak') {
          this.typeState = 'type'
          // state transition happens; refresh state
          this.refreshState()
          // refresh state will put startPosition and endPosition to the current caret position
          // however, we have inserted one char, the start position should be one before
          this.startPosition--
          this.endPosition--
          this.handleType(inputEvent)
        }
      }
      // console.log(textArea.selectionStart)
      // console.log(inputEvent.data)
      // console.log(this.$refs.textarea.selectionStart)
      // console.log(this.endPosition)
    },
    onSelect(selectEvent) {
      console.log("Selection start:")
      console.log(selectEvent.target.selectionStart)
      console.log("Selection end:")
      console.log(selectEvent.target.selectionEnd)
    },
    handleType(inputEvent) {
      console.log("%cHandle type", "color: green")
      const textArea = this.$refs.textarea
      console.log("inputType = " + inputEvent.inputType)
      console.log("data = " + inputEvent.data)
      // console.log("caret index: " + textArea.selectionStart)
      // console.log("end position: " + this.endPosition)
      if (textArea.selectionStart !== this.endPosition + 1) {
        // current caret isn't at one position after the last edit position
        // this means user moved the caret (by mouse or arrow key)
        // in this case, refresh state before continue
        // the first refresh is to clear the buffer to the last space/linebreak
        // the second refresh is to clear the remaining in the buffer
        this.refreshState()
        this.refreshState()
        // refresh state will reset startPosition and endPosition to current caret position
        // but one char has typed, hence, these two positions are one step forward than what they should be
        this.startPosition--
        this.endPosition--
      }
      if (inputEvent.inputType === 'insertLineBreak' || inputEvent.data === null) {
        this.textBuffer.push('\n')
      } else {
        this.textBuffer.push(inputEvent.data)
      }
      // push the new text into buffer
      this.endPosition++
      console.log("end position: " + this.endPosition)
    },
    handleDelete() {
      console.log("%cHandle delete", "color: red")
      const textArea = this.$refs.textarea
      console.log("caret index: " + textArea.selectionStart)
      console.log("end position: " + this.endPosition)
      if (textArea.selectionStart !== this.endPosition - 1) {
        // current caret isn't at one position before the last edit position
        // this means user moved the cared (by mouse or arrow key)
        // in this case, refresh state twice:
        // the first refresh is to clear the buffer to the last space/linebreak
        // the second refresh is to clear the remaining in the buffer
        this.refreshState()
        this.refreshState()
        // refresh state will reset startPosition and endPosition to current caret position
        // but one char has deleted, hence, these two positions are one step back than what they should be
        this.startPosition++
        this.endPosition++
      }
      this.deleteCount++
      this.endPosition--
    },
    refreshState() {
      console.log("%cRefresh state", "color: blue")
      console.log("textBuffer length: " + this.textBuffer.length)
      console.log("deleteCount: " + this.deleteCount)
      if (this.textBuffer.length > 0) {
        // if buffer contains space/linebreak, flush out the the last space/linebreak
        let textToFlush = []
        const lastSpaceIndex = this.textBuffer.lastIndexOf(' ')
        const lastLinebreakIndex = this.textBuffer.lastIndexOf('\n')
        if (lastSpaceIndex === -1 && lastLinebreakIndex === -1) {
          // no space or line break in the buffer
          textToFlush = this.textBuffer.slice()
          this.textBuffer = []
        } else {
          let lastIndex = lastSpaceIndex > lastLinebreakIndex ? lastSpaceIndex : lastLinebreakIndex
          textToFlush = this.textBuffer.slice(0, lastIndex + 1)
          this.textBuffer = this.textBuffer.slice(lastIndex + 1)
        }
        // continuous typing: create textChars and add to an edit
        const textChars = textCharManager.createTextChar(this.startPosition, textToFlush.join(""))
        editManager.createEdit('writing', textChars)
        this.startPosition = this.endPosition = this.$refs.textarea.selectionStart

      } else if (this.deleteCount > 0) {
        // get textChars, create delete edit
        const textChars = textCharManager.getTextCharsByVisiblePosition(this.endPosition, this.startPosition);
        editManager.createEdit('deletion', textChars)
        this.deleteCount = 0;
        this.startPosition = this.endPosition = this.$refs.textarea.selectionStart
      }
    },
    // ********* other methods ******

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
