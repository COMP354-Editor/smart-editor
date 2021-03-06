<template>
  <div
    v-if="!isSideMenuFolded"
    id="select-undo-operator"
  >
    <v-btn id="delete">
      Delete
    </v-btn>
    <v-btn id="select">
      Select
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SelectUndoPanel',
  props: {
    isSideMenuFolded: Boolean,
  },
}
</script>

<style scoped>

#select-undo-operator{
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: 14px;
}
#delete{
  width: 44px;
  height: 22px;
  background: #B9B9B9;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  color: #F4F4F4;
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
  margin-right: 4px;
  text-transform: none;
}
</style>
