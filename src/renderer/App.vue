<template>
  <div id="app">
    <Editor></Editor>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage'
import Editor from './components/Editor'

export default {
  name: 'smart-editor',
  components: {
    Editor,
    LandingPage
  }
}
</script>

<style>
#app{
  /*overflow-x: hidden;*/
}

</style>
