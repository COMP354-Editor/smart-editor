<template>
  <div>
    <!--      TODO: toolbar not looking good on small screens.-->
    <!--    Consider: collapse toolbar into a button on small screens -->
    <v-toolbar
      v-if="!inSearch"
      id="ToolBar"
      height="40px"
    >
      <v-btn id="menu">
        menu
      </v-btn>
      <v-btn
        v-show="!isSideMenuFolded"
        id="group"
      >
        group
      </v-btn>
      <v-spacer />
      <!-- search button -->
      <v-btn
        v-show="!isSideMenuFolded"
        class="no-background-hover"
        style="right:20px"
        icon
        large
        @click="toggleSearch()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        v-if="!isSideMenuFolded"
        icon
        class="no-background-hover"
        large
        @click="$emit('turnOffSideMenu')"
      >
        <v-icon>mdi-arrow-top-left-thick</v-icon>
      </v-btn>
      <!-- fold sideMenu button -->
      <v-btn
        v-if="!isSideMenuFolded"
        icon
        class="no-background-hover"
        large
        @click="$emit('foldSideMenu')"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- search clicked: show search bar -->
    <v-text-field
      v-if="inSearch"
      autofocus
      hide-details
      filled
      rounded
      dense
      placeholder="Search Edits"
      prepend-inner-icon="mdi-magnify"
      class="text-field"
      @blur="toggleSearch()"
    />
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    isSideMenuFolded: Boolean,
  },
  data () {
    return {
      inSearch: false,
    }
  },
  watch: {
    isThatHovered: function (val) {
      console.log(val)
    }
  },
  methods: {
    toggleSearch () {
      this.inSearch = !this.inSearch
    },
    turnOffSideMenu () {
      this.$emit('turnOffSideMenu')
    },
    unHoverSideMenu () {
      this.$emit('unHoverSideMenu')
    }
  }

}
</script>

<style scoped>
#group {
  width: 65px;
  height: 26px;
  background: #FFA24D;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  color: #F4F4F4;
  box-shadow: 0 0 0 #c6c6c6;
  left: 6px
}

#menu {
  width: 65px;
  height: 26px;
  background: #858585;
  border-radius: 36px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: -0.333333px;
  color: #F4F4F4;
  box-shadow: 0 0 0 #c6c6c6;
}

#ToolBar {
  background: #E9E9E9;
  border-radius: 36px;
  box-shadow: 0 0 0 #c6c6c6;
}

.text-field {
  border-radius: 36px;
}

.no-background-hover {
  width: 26px;
  height: 26px;
  right: 10px;
}

.no-background-hover::before {
  background-color: transparent !important;
}
</style>
