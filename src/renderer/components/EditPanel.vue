<template>
  <div id="edit-panel">
    <div id="edit-item-holder" />
    <EditItem
      v-for="edit in edits.slice(0, 4)"
      id="edit-item"
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
#edit-panel {
  margin-top: 10px;
  background: #E9E9E9;
  border-radius: 12px;
  flex: 2;
}
#edit-item {
  display: grid;
  place-items: center;
  background: #F4F4F4;
  border-radius: 36px;
  margin-left:13px;
  margin-right:13px;
  margin-bottom:2px;
}
#edit-item-holder{
  margin-top: 50px;
}
</style>

