<template>
  <div id="edit-panel">
    <div id="edit-item-holder" />
    <EditItem
      v-for="edit in edits.slice(0, 14)"
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
        {key: 4, content: 'edit 5'},
        {key: 5, content: 'edit 6'},
        {key: 6, content: 'edit 7'},
        {key: 7, content: 'edit 8'},
        {key: 8, content: 'edit 9'},
        {key: 9, content: 'edit 10'},
        {key: 10, content: 'edit 11'},
        {key: 11, content: 'edit 12'},
        {key: 12, content: 'edit 13'},
        {key: 13, content: 'edit 14'},
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
  background: #F4F4F4;
  border-radius: 36px;
  height: 24px;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 4px;
  user-select: none;
  text-indent: 5px;
  padding-top: 3px;
}

#edit-item-holder {
  margin-top: 40px;
}
</style>

