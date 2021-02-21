<template>
  <span>{{ text }}</span>
</template>

<script>
export default {
  name: 'PlainText',
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
