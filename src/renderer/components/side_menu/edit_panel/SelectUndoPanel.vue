<template>
  <div
    v-if="!isSideMenuFolded"
    id="select-undo-operator"
  >
    <v-btn
      id="delete"
      :class="{unlockedDelete: enableSelectUndo, lockedDelete: !enableSelectUndo}"
      :ripple="false"
      @click="$emit('delete-selected-edits')"
    >
      Delete
    </v-btn>
    <v-btn
      id="select"
      :ripple="false"
      @click="ToggleSelectUndoPanel"
    >
      Select
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SelectUndoPanel',
  props: {
    isSideMenuFolded: Boolean
  },
  data(){
    return{
      enableSelectUndo:false
    }
  },
  watch:{
    isSideMenuFolded: function (val) {
      if(val) {
        this.enableSelectUndo = false
      }
    }
  },
  methods:{
    ToggleSelectUndoPanel(){
      this.enableSelectUndo=!this.enableSelectUndo;
      this.$emit('enable-select-undo', this.enableSelectUndo);
      if(this.enableSelectUndo===false){
       this.$emit('ensure-select-off')
      }
    }
  }

}
</script>

<style scoped>

#select-undo-operator{
  margin-bottom: 7px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: right;
}
/*"Do not remove this, it is actually working"*/
.unlockedDelete{
  background: #FA9A9A !important;
  color: #F4F4F4 !important;
}
/*"Do not remove this, it is actually working"*/
.lockedDelete{
  background: #B9B9B9 !important;
  color: #F4F4F4 !important;
}
#delete{
  width: 44px;
  height: 22px;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  box-shadow: 0 0 0 #c6c6c6;
  margin-right: 4px;
  text-transform: none;
}
#select{
  width: 44px;
  height: 22px;
  background: #C2DCD9;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  color: #656565;
  box-shadow: 0 0 0 #c6c6c6;
  text-transform: none;
}
</style>
