<template>
  <span>
    <mark
      v-for="(line, index) in linesExceptLast"
      :key="index"
    >
      {{ line }}<br>
    </mark>
    <mark>{{ lastPiece }}</mark>
  </span>
</template>

<script>
export default {
  name: 'HighlightedText',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    linesExceptLast() {
      let lines = this.text.split('\n');
      if (lines.length === 1){
        return []
      } else {
        return lines.slice(0, lines.length - 1)
      }
    },
    lastPiece(){
      let lines =  this.text.split('\n');
      return lines[lines.length - 1]
    }
  }
}

</script>

<style scoped>

</style>
