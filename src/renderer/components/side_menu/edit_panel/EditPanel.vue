<template>
  <div
    id="edit-panel"
  >
    <SelectUndoPanel
      v-if="!isGroupOn"
      :is-side-menu-folded="isSideMenuFolded"
      @enable-select-undo="isSelectUndoEnabled=!isSelectUndoEnabled; lockSelectPanel() "
      @delete-selected-edits="$emit('delete-selected-edits')"
      @ensure-select-off="$emit('ensure-select-off')"
    />
    <v-btn
      id="scroll-top-btn"
      :class="{ panel_folded: isSideMenuFolded, panel_unfolded: !isSideMenuFolded&&!isGroupOn, panel_unfolded_GroupOn: !isSideMenuFolded&&isGroupOn}"
      height="18px"
      :ripple="false"
    />
    <div
      id="scroll-panel"
    >
      <EditItem
        v-for="edit in editsToShow"
        ref="editItems"
        :key="edit.id"
        :edit="edit"
        :is-select-undo-enabled="isSelectUndoEnabled"
        :ensure-select-off="ensureSelectOff"
        :draggable="isGroupOn"
        @toggle-select="selectedEditsUpdated"
        @drag-start="onDragStart"
      />
    </div>
    <v-btn
      id="scroll-end-btn"
      :class="{ panel_folded1: !isSelectUndoEnabled, panel_unfolded1: isSelectUndoEnabled }"
      height="18px"
      :ripple="false"
    />
    <v-btn
      v-if="isSelectUndoEnabled"
      id="apply"
      height="32px"
      width="136px"
      @click="applySelectedEdits"
    >
      apply
    </v-btn>
  </div>
</template>

<script>
import EditItem from '../EditItem'
import SelectUndoPanel from './SelectUndoPanel'

export default {
  name: 'EditPanel',
  components: {EditItem, SelectUndoPanel},
  props: {
    isSideMenuFolded: Boolean,
    isGroupOn: Boolean,
    ensureSelectOff: Boolean,
    edits: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      isSelectUndoEnabled: false
    }
  },
  computed: {
    editsToShow() {
      if (this.isGroupOn) {
        return this.edits.filter(edit => edit.groupId === -1).reverse()
      } else {
        return this.edits.slice().reverse()
      }
    }
  },
  watch: {
    isSideMenuFolded: function (val) {
      if (val) {
        this.isSelectUndoEnabled = false
      }
    },
    ensureSelectOff: function () {
      this.isSelectUndoEnabled = false
    }
  },
  methods: {
    lockSelectPanel() {
      if (this.isSelectUndoEnabled) {
        this.$emit('lockFold')
      } else {
        this.$emit('unlockFold')
      }
    },

    selectedEditsUpdated(selectedEdit) {
      this.$emit("selected-edits-updated", selectedEdit)
    },
    onDragStart(){
      // console.log(id)
      // TODO: remove this editItem
    },
    applySelectedEdits(){
      this.$emit('apply-selected-edits');
    }
  }

}
</script>
<style scoped>
/*"Do not remove this, it is actually working"*/
.panel_folded {
  margin-top: 34px;
}

/*"Do not remove this, it is actually working"*/
.panel_unfolded {
  margin-top: 0;
}

.panel_unfolded_GroupOn {
  margin-top: 25px;
}

/*"Do not remove this, it is actually working"*/
.panel_folded1 {
  margin-bottom: 37px;
}

/*"Do not remove this, it is actually working"*/
.panel_unfolded1 {
  margin-bottom: 0;
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
}

#edit-panel {
  margin-top: 10px;
  background: #E9E9E9;
  border-radius: 12px;
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 0 5px 0;
  overflow: hidden;
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

#apply {
  background: #88D9CF;
  border-radius: 36px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  color: #FFFFFF;
  box-shadow: 0 0 0 #c6c6c6;
}

</style>

