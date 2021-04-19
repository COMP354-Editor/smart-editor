<template>
  <div
    id="group"
    @dragover.prevent=""
    @drop.prevent="onDrop"
  >
    <GroupHeader
      id="group-Header-appearance"
      :group-name="groupName"
      :on-index="onIndex"
      @group-header-btn-on="groupHeaderBtnOn=!groupHeaderBtnOn"
    />
    <EditItem
      v-for="edit in edits"
      id="group-editItem-appearance"
      :key="edit.key"
      :edit="edit"
      :is-group="isGroup"
      :group-header-btn-on="groupHeaderBtnOn"
      @toggle-select-onIndex="toggleSelectOnIndex"
    />
  </div>
</template>

<script>

import EditItem from "../EditItem";
import GroupHeader from "./GroupHeader";

export default {
  name: 'Group',
  components: {EditItem, GroupHeader},
  props: {
    groupName: {
      type: String,
      default: 'Group'
    },
    groupId: {
      type: Number,
      default: -1
    },
    edits: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isGroup: true,
      groupHeaderBtnOn: false,
      onIndex:0
    }
  },
  methods: {
    onDrop(event) {
      const editId = event.dataTransfer.getData("id")
      this.$emit('drop-edit', this.groupId, parseInt(editId))
      console.log(editId)
    },
    toggleSelectOnIndex(val){
      this.onIndex=this.onIndex+val
    }


  }
}


</script>

<style scoped>
#group {
  width: 100%;
}

#onSelect {
  width: 20px;
  height: 20px;
  background: white;
}

#group-Header-appearance {
  font-family: Roboto, sans-serif;
  color: #444444;
  border-radius: 36px;
  background: #D7D7D7;
  height: 15px;
  width: fit-content;
  max-width: 80%;
  min-width: 1%;
  margin-left: 7%;
  margin-bottom: 4px;
  box-shadow: 0 0 0 #c6c6c6;
  text-transform: none;
  font-size: 11px;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  display: flex;
}

#group-editItem-appearance {
  width: 89%;
  display: flex;
  margin-left: auto;
}
</style>
