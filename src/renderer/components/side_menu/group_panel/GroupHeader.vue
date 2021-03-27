<template>
  <div>
    <div>
      {{ groupName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupHeader",
  props: {
    groupName: {
      type: String,
      default: 'Group'
    },
    edits: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
