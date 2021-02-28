<template>
  <div id="document-header-panel">
    <div id="title">
      This is title
    </div>
    <v-spacer />
    <SearchAndReplace />
  </div>
</template>

<script>
import SearchAndReplace from './SearchAndReplace'
export default {
  name: 'DocumentHeaderPanel',
  components: {SearchAndReplace},

}
</script>

<style scoped>
#document-header-panel{
  display: flex;
}
#title{
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  letter-spacing: -0.333333px;
}
</style>
