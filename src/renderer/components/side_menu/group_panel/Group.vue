<template>
  <div
    @drop="onDrop($event,'text/plain')"
    @dragover.prevent
    @dragenter.prevent 
  >
  <!--@drop="event.preventDefault()" -->
    <GroupHeader
      id="group-Header-appearance"
      :group-name="groupName"
    />
    <EditItem
      v-for="edit in edits"
      id="group-editItem-appearance"
      :key="edit.key"
      :edit="edit"
      :is-group="isGroup"
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
    edits: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return{
      isGroup:true,

      Group1: [
      ]
    }
  },
  method:{
    onDrop(evt) {
      console.log("here")
      const editID = evt.dataTransfer.getData('text/plain')
      //const tempEdit = this.EditManager.edits.find(Edit => Edit.id == editID)
      console.log(editID)
      //groupName.edits = tempEdit
    }
  }
}


</script>

<style scoped>
#onSelect{
  width: 20px;
  height: 20px;
  background: white;
}
#group-Header-appearance{
  font-family: Roboto, sans-serif;
  color: #444444;
  border-radius: 36px;
  background: #D7D7D7;
  height: 30px; /*15*/
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
#group-editItem-appearance{
  width: 89%;
  display: flex;
  margin-left: auto;
}
</style>
