<template>
  <div>
    <Group
      v-for="group in groups"
      :key="group.groupId"
      :group-name="group.groupName"
      :group-id="group.groupId"
      :edits="getEditsByGroupId(group.groupId)"
      @drop-edit="onDropEdit"
      @replyForGroupItemsEmit="replyForGroupItems"
      @group-selected="onGroupSelected"
      @selected-edits-update="selectedEditsUpdate"
    />
  </div>
</template>

<script>
import Group from "./Group";
import editManager from "../../../model/EditManager";

export default {
  name: "GroupContainer",
  components: {Group},
  props: {
    edits: {
      default: () => [],
      type: Array
    },
    groups: {
      default: () => [],
      type: Array
    },
  },
  data() {
    return {
    }
  },
  methods: {
    getEditsByGroupId(groupId) {
      return this.edits.filter(edit => edit.groupId === groupId)
    },
    onDropEdit(groupId, editId) {
      const edit = editManager.getEditById(editId)
      edit.groupId = groupId
    },
    replyForGroupItems(groupName,groupId,groupSelect,edits){
      this.$emit('reply-for-group-items-emit',groupName,groupId,groupSelect,edits)
    },
    onGroupSelected(groupId){
      this.$emit('group-selected', groupId)
    },
    selectedEditsUpdate(selectedEdit) {
      console.log("In groupContainer: " + selectedEdit)
      this.$emit('selected-edits-update', selectedEdit)
    }
  },

}
</script>

<style scoped>

</style>
