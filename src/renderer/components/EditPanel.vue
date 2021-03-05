<template>
  <div id="edit-panel">
    <div id="scroll-panel">
      <EditItem
        v-for="edit in edits"
        :key="edit.key"
        :content="edit.content"
      />
    </div>
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
        {key: 14, content: 'edit 15'},
        {key: 15, content: 'edit 16'},
        {key: 16, content: 'edit 17'},
        {key: 17, content: 'edit 18'},
        {key: 18, content: 'edit 19'},
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
  display: flex;
  flex-direction: column;
  padding: 40px 0 40px 0;
}

#scroll-panel {
  overflow: auto;
}

</style>

