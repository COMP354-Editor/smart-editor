<template>
  <div id="edit-item-container">
    <div
      id="content-packer"
      :class="{margin_for_select_undo:isSelectUndoEnabled, scroll_panel_not_undone: !undone_UI, scroll_panel_undone: undone_UI}"
    >
      <div
        id="content"
        :ripple="false"
        @click="undoEdit"
      >
        {{ content }}
      </div>
    </div>
    <v-btn
      v-if="isGroup||isSelectUndoEnabled"
      id="onSelect"
      class="rounded-circle px-2"
      width="24px"
      height="24px"
      min-width="24px"
      :class="{ is_active:isItemSelected, is_not_active:!isItemSelected}"
      :ripple="false"
      @click="toggleSelect"
    >
      <v-icon x-small>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import Edit from "../../model/Edit";
import editManager from "../../model/EditManager";
import { bus } from "../../main";

export default {
  name: 'EditItem',
  props: {
    edit: {
      type: Edit,
      default: () => {}
    },
    isGroup:Boolean,
    isSelectUndoEnabled:Boolean,
    ensureSelectOff:Boolean
  },
  data(){
    return{
      isItemSelected:false,
      undone_UI:false,
    }
  },
  computed:{
    content(){
      return this.edit.getContent()
    }
  },
  watch: {
    ensureSelectOff: function () {
        this.isItemSelected = false
    }
  },
  methods: {
    toggleSelect(){
      this.isItemSelected=!this.isItemSelected
      this.$emit('toggle-select', this.edit)
    },
    undoEdit(){
      this.undone_UI=!this.undone_UI
      editManager.getEditById(this.edit.id).undo()
      // tell TextArea to update text value
      bus.$emit('update-text-value')
    }
  }
}
</script>

<style scoped>
.scroll_panel_not_undone{
  background: #F4F4F4 !important;
  color: #626262;
  overflow: hidden;
}
.scroll_panel_undone{
  background: #FFA24D !important;
  color: #F4F4F4;
  overflow: hidden;
}
.margin_for_select_undo{
  margin-left: 18px;
}
.is_not_active{
  background: white !important;
}
.is_active{
  background: #FFA24D !important;
  color: #EFEFEF;
}
#onSelect{
  background: white;
  z-index: 99;
  right:15px;
  box-shadow: 0 0 0 #c6c6c6;
}
#content-packer {
  justify-content: center;
  border-radius: 36px;
  height: 24px;
  margin-bottom: 4px;
  width: 90%;
  overflow: hidden;
}
#content {
  height:100%;
  width: 88%;
  margin:0 auto;
  background: transparent;
  overflow:hidden;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  white-space:nowrap;
  padding-top:1px;
  font-weight: 406;
}

#edit-item-container {
  display: flex;
  justify-content: center;
}
</style>
