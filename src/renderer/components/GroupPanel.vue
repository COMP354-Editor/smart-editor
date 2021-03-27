<template>
  <div id="group-panel">
    <div id="group_addOrDelete">
      <v-btn class="btn add">
        Add Group
      </v-btn>
      <v-btn class="btn delete">
        Delete
      </v-btn>
    </div>
    <v-btn
      id="scroll-top-btn"
      class="panel_folded"
      height="18px"
    />
    <div id="scroll-panel">
      <GroupContainer />
    </div>
    <!--      :class="{ panel_folded1: !isSelectUndoAble, panel_unfolded1: isSelectUndoAble }"-->
    <v-btn
      id="scroll-end-btn"
      height="18px"
    />
    <v-btn
      id="apply"
      height="32px"
      width="136px"
    >
      apply
    </v-btn>
  </div>
</template>

<script>

import GroupContainer from "./GroupContainer";

export default {
  name: 'GroupPanel',
  components: {GroupContainer},
  props: {},
  data() {
    return {}
  },

}
</script>
<style scoped>
#group_addOrDelete {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 7px;
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
  width: 50px !important;
}

.delete {
  background: #FF8989 !important;
  color: #FFFFFF !important;
}

.panel_folded {
  margin-top: 0;
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
  justify-content: flex-start;
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
}
</style>

