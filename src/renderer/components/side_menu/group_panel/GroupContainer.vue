<template>
  <div>
    <Group
      v-for="group in groups"
      :key="group.groupId"
      :group-name="group.groupName"
      :group-id="group.groupId"
      :edits="getEditsByGroupId(group.groupId)"
      @drop-edit="onDropEdit"
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
    }
  },
  data() {
    return {}
  },
  methods: {
    getEditsByGroupId(groupId) {
      return this.edits.filter(edit => edit.groupId === groupId)
    },
    onDropEdit(groupId, editId) {
      console.log("In groupContainer, editId = " + editId)
      const edit = editManager.getEditById(editId)
      edit.groupId = groupId
    }
  },

}
</script>

<style scoped>

</style>
