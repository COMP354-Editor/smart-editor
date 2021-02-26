<template>
  <div>
    <EditItem
      v-for="edit in edits.slice(0, 4)"
      :key="edit.key"
      :content="edit.content"
    />
  </div>
</template>

<script>
import EditItem from './EditItem'

export default {
  name: 'EditPanel',
  components: {EditItem},
  data () {
    return {
      edits: [
        {key: 0, content: 'edit 1'},
        {key: 1, content: 'edit 2'},
        {key: 2, content: 'edit 3'},
        {key: 3, content: 'edit 4'},
      ]
    }
  }
}
</script>

<style scoped>

</style>
