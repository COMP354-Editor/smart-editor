<template>
  <li>{{ content }}</li>
</template>

<script>
export default {
  name: 'EditItem',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
