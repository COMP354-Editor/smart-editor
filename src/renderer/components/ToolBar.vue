<template>
  <div>
<!--      TODO: toolbar not looking good on small screens.-->
<!--    Consider: collapse toolbar into a button on small screens -->
        <v-toolbar
            dense
            v-if="!inSearch"
        >
          <v-spacer/>
          <v-btn icon>
            <v-icon>mdi-playlist-edit</v-icon>
          </v-btn>
          <v-spacer/>
          <v-btn icon>
            <v-icon>mdi-file-tree</v-icon>
          </v-btn>
          <v-spacer/>
          <v-btn icon @click="toggleSearch()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-spacer/>
        </v-toolbar>
<!--    <v-toolbar-->
<!--        dense-->
<!--        class="search-toolbar"-->
<!--    >-->
      <v-text-field
          v-if="inSearch"
          autofocus
          hide-details
          single-line
          solo
          prepend-inner-icon="mdi-magnify"
          @blur="toggleSearch()"
          class="text-field"
      ></v-text-field>
<!--    </v-toolbar>-->
  </div>
</template>


<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      inSearch: false
    }
  },
  methods: {
    toggleSearch () {
      this.inSearch = !this.inSearch
    }
  }
}
</script>

<style scoped>


</style>
