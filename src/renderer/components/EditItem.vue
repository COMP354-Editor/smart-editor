<template>
  <div id="edit-item-container">
    <v-btn id="content">
      {{ content }}
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
    }
  }
}
</script>

<style scoped>
#content {
  justify-content: left;
  font-family: Roboto, sans-serif;
  color: #545454;
  background: #F4F4F4;
  border-radius: 36px;
  height: 24px;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 4px;
  box-shadow: 0 0 0 #c6c6c6;
  font-size: 13px;
  width: 90%;
}

#edit-item-container {
  display: flex;
  justify-content: center;
}
</style>
