<template>
  <div id="edit-item-container">
    <v-btn
      id="content"
      :class="{margin_for_select_undo:isSelectUndoEnabled}"
      :ripple="false"
    >
      {{ content }}
    </v-btn>
    <v-btn
      v-if="isGroup||isSelectUndoEnabled"
      id="onSelect"
      class="rounded-circle px-2"
      width="24px"
      height="24px"
      min-width="24px"
      :class="{ is_active:isItemSelected, is_not_active:!isItemSelected}"
      :ripple="false"
      @click="isItemSelected=!isItemSelected"
    >
      <v-icon x-small>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'EditItem',
  props: {
    content: {
      type: String,
      default: ''
    },
    isGroup:Boolean,
    isSelectUndoEnabled:Boolean
  },
  data(){
    return{
      isItemSelected:false
    }
  }
}
</script>

<style scoped>
.margin_for_select_undo{
  margin-left: 24px;
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
#content {
  justify-content: left;
  font-family: Roboto, sans-serif;
  color: #545454;
  background: #F4F4F4;
  border-radius: 36px;
  height: 24px;
  margin-bottom: 4px;
  box-shadow: 0 0 0 #c6c6c6;
  font-size: 13px;
  width: 90%;
  text-transform: none;
}

#edit-item-container {
  display: flex;
  justify-content: center;
}
</style>
