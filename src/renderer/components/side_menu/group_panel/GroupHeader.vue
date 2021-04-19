<template>
  <div>
    <v-btn
      id="GroupHeaderBtn"
      x-small
      :class="{ is_active:isGroupSelected, is_not_active:!isGroupSelected }"
      :ripple="false"
      @click=" toggleGroupSelected() "
    >
      {{ groupName }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "GroupHeader",
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
    },
    onIndex:{
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      isGroupSelected:false,
    }
  },
  methods:{
    toggleGroupSelected(){
      if(this.onIndex===0){
        this.isGroupSelected = !this.isGroupSelected;
        this.$emit('group-header-btn-on')
      }
    }
  }
}
</script>

<style scoped>
.is_not_active{
  background: #D7D7D7 !important;
}
.is_active{
  background: #FFA24D !important;
  color: #EFEFEF;
}
#GroupHeaderBtn.v-btn:not(.v-btn--round).v-size--x-small {
  height: 15px;
  min-width: 5px;
  padding: 0 8px;
  background: transparent;
}
</style>
