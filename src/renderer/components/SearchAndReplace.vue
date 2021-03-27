<template>
  <div id="searchAndReplace">
    <div
      id="search"
      @mouseenter="isSearchEntered=true"
      @mouseleave="isSearchEntered=false"
    >
      <v-icon
        v-if="!isSearchEntered&&!isSearchTyped"
        x-small
        style="padding-left: 3px"
      >
        mdi-magnify
      </v-icon>
      <label for="inputSearch" />
      <input
        id="inputSearch"
        v-model="searchText"
        type="text"
        class="input"
      >
    </div>
    <div id="searchAndReplace_deco" />
    <div
      id="replace"
    >
      <label for="inputReplace" />
      <input
        id="inputReplace"
        v-model="replaceText"
        type="text"
        class="input"
        placeholder="Replace with"
      >
    </div>
    <div class="previous-next">
      <v-btn
        class="no-background-hover"
        x-small
        :ripple="false"
      >
        <v-icon
          size="18px"
          color="#7C7C7C"
          style="bottom: 0"
        >
          mdi-menu-up-outline
        </v-icon>
      </v-btn>
      <div style="height: 1px;width:1px" />
      <v-btn
        class="no-background-hover"
        x-small
        :ripple="false"
      >
        <v-icon
          size="18px"
          color="#7C7C7C"
          style="bottom: 5px"
        >
          mdi-menu-down-outline
        </v-icon>
      </v-btn>
    </div>
    <div id="replaceButtons">
      <v-btn
        icon
        class="no-background-hover"
        x-small
        @click="eraseText();"
      >
        <img
          src="../assets/icons/replace.svg"
          alt="replace"
        >
      </v-btn>
      <v-btn
        icon
        class="no-background-hover"
        x-small
        @click="eraseText();"
      >
        <img
          src="../assets/icons/replaceAll.svg"
          alt="replaceAll"
        >
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAndReplace',
  data() {
    return {
      searchText: '',
      replaceText: '',
      isSearchEntered: false,
    }
  },
  computed: {
    isSearchTyped: function () {
      return this.searchText.length !== 0
    }
  },
  methods: {
    eraseText() {
      this.searchText = ''
      this.replaceText = ''
    }
  }
}
</script>

<style scoped>
#replaceButtons {
  margin-left: 13px;
}

.input {
  overflow: hidden;
  resize: none;
  outline: none;
  height: 95%;
  text-indent: 4px;
  font-size: 12px;
}

.previous-next {
  display: flex;
  flex-direction: column;
  height: 95%;
  justify-content: center;
}

#searchAndReplace {
  width: 231px;
  height: 28px;
  margin-left: auto;
  order: 2;
  background: #E8E8E8;
  border-radius: 36px;
  box-sizing: inherit;
  display: flex;
  align-items: center;
  color: #A6A6A6
}

#search {
  width: 78px;
  height: 20px;
  background: #FFFFFF;
  margin-left: 5px;
  border-radius: 32px;
  z-index: 10;
  display: flex;
  place-items: inherit;
  justify-content: center;
  overflow: hidden;
}

#searchAndReplace_deco {
  width: 33px;
  height: 28px;
  margin-left: -14px;
  background: #E8E8E8;
  border-radius: 36px;
  z-index: 11;
}

#replace {
  width: 77px;
  height: 20px;
  margin-left: -28px;
  background: #FFFFFF;
  border-radius: 36px;
  z-index: 12;
  overflow: hidden;
  place-items: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-background-hover {
  float: right;
  z-index: 13
}

.no-background-hover.v-btn:not(.v-btn--round).v-size--x-small {
  height: 13px;
  min-width: 12px;
  padding: 0;
  background: transparent;
  box-shadow: none;
}


.no-background-hover::before {
  background-color: transparent !important;
}
</style>
