<template>
  <div>
    <Group
      v-for="group in groups"
      :key="group.groupName"
      :group-name="group.groupName"
      :edits="group.edits"
    />
  </div>
</template>

<script>
import Group from "./Group";

export default {
  name: "GroupContainer",
  components: {Group},
  data() {
    return {
      groups: [
        {
          groupName: 'Group 1',
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
          ]
        }, {
          groupName: 'Group 2',
          edits: [
            {key: 0, content: 'edit 14'},
            {key: 1, content: 'edit 15'},
            {key: 2, content: 'edit 16'},
            {key: 3, content: 'edit 17'},
            {key: 4, content: 'edit 18'},
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
