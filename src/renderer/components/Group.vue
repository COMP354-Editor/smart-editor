<template>
  <div>
    <GroupHeader
      :group-name="groupName"
    />
    <EditItem
      v-for="edit in edits"
      :key="edit.key"
      :content="edit.content"
    />
  </div>
</template>

<script>

import EditItem from "./EditItem";
import GroupHeader from "./GroupHeader";

export default {
  name: 'Group',
  components: {EditItem, GroupHeader},

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
