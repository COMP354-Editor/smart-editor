<template>
  <div id="content">
    {{ content }}
  </div>
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
#content {
  place-items: initial;
  font-family: Roboto,sans-serif;
  font-size: 11px;
  color: #545454;
}
</style>
