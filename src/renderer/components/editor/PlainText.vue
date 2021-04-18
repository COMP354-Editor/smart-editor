<template>
  <span>
    <span
      v-for="(line, index) in linesExceptLast"
      :key="index"
    >
      {{ line }}<br>
    </span>
    <span>{{ lastPiece }}</span>
  </span>
</template>

<script>
export default {
  name: 'PlainText',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    linesExceptLast() {
      let lines = this.text.split('\n');
      if (lines.length === 1) {
        return []
      } else {
        return lines.slice(0, lines.length - 1)
      }
    },
    lastPiece() {
      let lines = this.text.split('\n');
      return lines[lines.length - 1]
    }
  }
}
</script>

<style scoped>

</style>
