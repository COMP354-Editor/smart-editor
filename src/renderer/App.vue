<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid >
          <v-row>
            <v-col cols="2">
              <SideMenu/>
            </v-col>
            <v-col cols="10">
              <Editor/>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer></v-footer>
    </v-app>
  </div>
</template>

<script>
import Editor from './components/Editor'
import SideMenu from './components/SideMenu'

export default {
  name: 'smart-editor',
  components: {
    SideMenu,
    Editor
  }
}
</script>

<style>
html {
  overflow: hidden;
}

</style>
