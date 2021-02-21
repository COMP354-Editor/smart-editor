<template>
  <mark>{{ text }}</mark>
</template>

<script>
export default {
  name: 'HighlightedText',
  props: {
    text: {
      type: String,
      default: ''
    }
  }


}

</script>

<style scoped>

</style>
