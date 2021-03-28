<template>
  <div
    id="edit-panel"
  >
    <SelectUndoPanel
      v-if="!isGroupOn"
      :is-side-menu-folded="isSideMenuFolded"
      @enable-select-undo="isSelectUndoEnabled=!isSelectUndoEnabled; lockSelectPanel() "
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
        v-for="edit in edits"
        :key="edit.key"
        :content="edit.content"
        :is-select-undo-enabled="isSelectUndoEnabled"
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
    isGroupOn:Boolean
  },
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
        {key: 19, content: 'edit 20'},
        {key: 20, content: 'edit 21'},
        {key: 21, content: 'edit 22'},
        {key: 22, content: 'edit 23'},
        {key: 23, content: 'edit 24'},
        {key: 24, content: 'edit 25'},
        {key: 25, content: 'edit 26'},
        {key: 26, content: 'edit 27'},
        {key: 27, content: 'edit 28'},

      ],
      isSelectUndoEnabled: false
    }
  },
  watch: {
    isSideMenuFolded: function (val) {
      if (val) {
        this.isSelectUndoEnabled = false
      }
    }
  },
  methods: {
    lockSelectPanel () {
      if (this.isSelectUndoEnabled) {
        this.$emit('lockFold')
      } else {
        this.$emit('unlockFold')
      }
    },
  }
}
</script>
<style scoped>
/*"Do not remove this, it is actually working"*/
.panel_folded{
  margin-top: 34px;
}
/*"Do not remove this, it is actually working"*/
.panel_unfolded{
  margin-top: 0;
}
.panel_unfolded_GroupOn{
  margin-top: 25px;
}
/*"Do not remove this, it is actually working"*/
.panel_folded1{
  margin-bottom: 37px;
}
/*"Do not remove this, it is actually working"*/
.panel_unfolded1{
  margin-bottom: 0;
}
#scroll-top-btn{
  box-shadow: 0 0 0 #c6c6c6;
  background: #909090 !important;
  border-radius: 8px;
  z-index: 99;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  margin-bottom: 4px;
}
#scroll-end-btn{
  box-shadow: 0 0 0 #c6c6c6;
  background: #909090 !important;
  border-radius: 8px;
  z-index: 99;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  margin-top: 4px;
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
#apply{
  background: #88D9CF;
  border-radius: 36px;
  margin-left:auto;
  margin-right:auto;
  margin-top: 5px;
  color:#FFFFFF;
  box-shadow: 0 0 0 #c6c6c6;
}

</style>

