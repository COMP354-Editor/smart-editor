<template>
  <div id="group-panel">
    <div id="group_addOrDelete">
      <v-tooltip
        bottom
        z-index="99"
        open-on-hover
        open-delay="800"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="btn add"
            :ripple="false"
            v-bind="attrs"
            v-on="on"
            @click="addGroup()"
          >
            Add Group
          </v-btn>
        </template>
        <span>Create a new group tag. (Hint: the edits on the right can be dragged and dropped into the group tag)</span>
      </v-tooltip>
      <v-tooltip
        bottom
        z-index="99"
        open-on-hover
        open-delay="800"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="btn delete"
            :ripple="false"
            v-bind="attrs"
            v-on="on"
            @click="deleteGroupEdit()"
          >
            Delete
          </v-btn>
        </template>
        <span>Deletes edits from groups and makes them non-grouped</span>
      </v-tooltip>
    </div>
    <v-btn
      id="scroll-top-btn"
      class="panel_folded"
      height="18px"
      :ripple="false"
    />
    <div id="scroll-panel">
      <GroupContainer
        :groups="groups"
        :edits="edits"
        @group-selected="onGroupSelected"
        @selected-edits-update="selectedEditsUpdate"
      />
    </div>
    <v-btn
      id="scroll-end-btn"
      height="18px"
      :ripple="false"
    />
    <v-btn
      id="apply"
      height="32px"
      width="136px"
      @click="groupApply"
    >
      apply
    </v-btn>
  </div>
</template>

<script>

import GroupContainer from "./GroupContainer";
import editManager from "../../../model/EditManager";
import { bus } from "../../../main";

export default {
  name: 'GroupPanel',
  components: {GroupContainer},
  props: {
    edits: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      groups: [
        {
          groupId: 0,
          groupName: 'Group 1'
        }, {
          groupId: 1,
          groupName: 'Group 2',
        }
      ],
      askForGroupItemsEmit: false,
      selectedGroupId: -1
    }
  },
  methods: {
    addGroup() {
      this.groups.push({
        groupId: this.groups.length + 1,
        groupName: 'Group ' + (this.groups.length + 1),
      })
    },
    onGroupSelected(groupId) {
      if (this.selectedGroupId === groupId) {
        // this group is already selected. Unselect now
        this.selectedGroupId = -1
        bus.$emit('selected-edits-updated', [])
      } else {
        this.selectedGroupId = groupId
        const selectedEdits = editManager.edits.filter(edit => edit.groupId === this.selectedGroupId)
        bus.$emit('selected-edits-updated', selectedEdits)
      }

    },
    groupApply() {
      // console.log("groupId: " + this.groupId)
      if (this.selectedGroupId !== -1) {
        const editIds = editManager.edits.filter(edit => edit.groupId === this.selectedGroupId).map(edit => edit.id)
        editIds.forEach(id => {
          editManager.getEditById(id).undoRedo()
        })
      }
      bus.$emit('update-text-value')
    },
    deleteGroupEdit() {
      console.log("groupId: " + this.selectedGroupId)
      if (this.selectedGroupId !== -1) {
        const editIds = editManager.edits.filter(edit => edit.groupId === this.selectedGroupId).map(edit => edit.id)
        editIds.forEach(id => {
          editManager.getEditById(id).groupId = -1
        })
      }
    },
    selectedEditsUpdate(selectedEdit){
      console.log("In GroupPanel: " + selectedEdit)
      this.$emit('selected-edits-updated', selectedEdit)
    }
  }
}
</script>

<style scoped>
#group_addOrDelete {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 22px !important;
  flex-shrink: 0;
}

.btn {
  width: 33px;
  height: 22px !important;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  box-shadow: 0 0 0 #c6c6c6;
  margin-right: 8px;
  text-transform: none;
}

.add {
  background: #FBFBFB !important;
  color: #656565 !important;
  width: fit-content !important;
  max-width: 80%;
  min-width: 1%;
  padding: 0 10px !important;
}

.delete {
  background: #FF8989 !important;
  color: #FFFFFF !important;
}

.panel_folded {
  margin-top: 7px;
}

#scroll-top-btn {
  box-shadow: 0 0 0 #c6c6c6;
  background: #909090 !important;
  border-radius: 8px;
  z-index: 99;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4px;
}

#scroll-end-btn {
  box-shadow: 0 0 0 #c6c6c6;
  background: #909090 !important;
  border-radius: 8px;
  z-index: 99;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4px;
}

#scroll-panel {
  overflow: auto;
}

#scroll-panel::-webkit-scrollbar {
  width: 0;
  height: 1px;
}

#scroll-panel::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

#group-panel {
  margin-top: 10px;
  background: #E9E9E9;
  border-radius: 12px;
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 9px 0 5px 0;
  margin-right: 20px;
}

#apply {
  background: #88D9CF;
  border-radius: 36px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  color: #FFFFFF;
  box-shadow: 0 0 0 #c6c6c6;
  align-self: flex-end;
}
</style>

