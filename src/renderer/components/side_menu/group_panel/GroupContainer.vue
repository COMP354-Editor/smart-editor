<template>
  <div>
    <Group
      v-for="group in groups"
      :key="group.groupId"
      :group-name="group.groupName"
      :group-id="group.groupId"
      :edits="getEditsByGroupId(group.groupId)"
      :ask-for-group-items-emit="askForGroupItemsEmit"
      @drop-edit="onDropEdit"
      @replyForGroupItemsEmit="replyForGroupItems"
      @group-selected="onGroupSelected"
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
    askForGroupItemsEmit:{
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  watch: {
    // askForGroupItemsEmit(newVal, oldVal){
    //   console.log("In GroupContainer: ")
    //   console.log("oldVal = " + oldVal)
    //   console.log("newVal = " + newVal)
    // }
  },
  methods: {
    getEditsByGroupId(groupId) {
      return this.edits.filter(edit => edit.groupId === groupId)
    },
    onDropEdit(groupId, editId) {
      console.log("In groupContainer, editId = " + editId)
      const edit = editManager.getEditById(editId)
      edit.groupId = groupId
    },
    replyForGroupItems(groupName,groupId,groupSelect,edits){
      this.$emit('reply-for-group-items-emit',groupName,groupId,groupSelect,edits)
    },
    onGroupSelected(groupId){
      console.log("In GroupContainer: " + groupId)
      this.$emit('group-selected', groupId)
    }
  },

}
</script>

<style scoped>

</style>
