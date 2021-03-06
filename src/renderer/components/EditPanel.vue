<template>
  <div id="edit-panel">
    <SelectUndoPanel :is-side-menu-folded="isSideMenuFolded" />
    <v-btn
      id="scroll-top-btn"
      :class="{ panel_folded: isSideMenuFolded, panel_unfolded: !isSideMenuFolded }"
      height="18px"
    />
    <div
      id="scroll-panel"
    >
      <EditItem
        v-for="edit in edits"
        :key="edit.key"
        :content="edit.content"
      />
    </div>
    <v-btn
      id="scroll-end-btn"
      height="18px"
    />
  </div>
</template>

<script>
import EditItem from './EditItem'
import SelectUndoPanel from './SelectUndoPanel'

export default {
  name: 'EditPanel',
  components: {EditItem, SelectUndoPanel},
  props: {
    isSideMenuFolded: Boolean,
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
      ],
    }
  },
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
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 0 60px 0;
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

</style>

