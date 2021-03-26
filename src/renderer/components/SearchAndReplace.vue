<template>
  <div id="searchAndReplace">
    <div
      id="search"
      @mouseenter="isSearchEntering=true"
      @mouseleave="isSearchEntering=false"
    >
      <v-icon
        v-if="!isSearchEntering&&!isSearchTyped"
        small
      >
        mdi-magnify
      </v-icon>
      <textarea
        v-if="isSearchEntering||isSearchTyped"
        id="input-search"
        class="input"
        @keypress="isSearchTyped=true"
      />
    </div>
    <div id="searchAndReplace_deco" />
    <div
      id="replace"
      @mouseenter="isReplaceEntering=true"
      @mouseleave="isReplaceEntering=false"
    >
      <p
        v-if="!isReplaceEntering&&!isReplaceTyped"
        style="z-index:20; font-size: 9px;padding-top:4px; position: fixed;text-indent: 3px;"
      >
        Replace with
      </p>
      <textarea
        v-if="isReplaceEntering||isReplaceTyped"
        id="input-replace"
        class="input"
        style="transform: translate(-10px)"
        @keypress="isReplaceTyped=true"
      />
    </div>
    <div class="whichOne">
      <v-btn
        class="no-background-hover "
        height="50%"
        width="13"
        :ripple="false"
      >
        <v-icon
          style="bottom:5px"
        >
          mdi-menu-up
        </v-icon>
      </v-btn>
      <v-btn
        class="no-background-hover"
        height="50%"
        width="13"
        :ripple="false"
      >
        <v-icon
          style="bottom:5px"
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </div>
    <div style="margin-left: 13px; margin-right: 4px">
      <v-btn
        icon
        class="no-background-hover"
        x-small
        @click="isReplaceTyped=false; isSearchTyped=false; eraseText()"
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
        @click="isReplaceTyped=false; isSearchTyped=false; eraseText()"
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
  data () {
    return {
      isReplaceEntering:false,
      isSearchEntering:false,
      isReplaceTyped:false,
      isSearchTyped:false
    }
  },
  methods: {
      eraseText() {
        document.getElementById("input-search").value = "";
        document.getElementById("input-replace").value = "";
      }
  }
}
</script>

<style scoped>
.input{
  text-indent: 4px;
  resize: none;
  overflow: hidden;
  outline: none;
  height: 100%;
  min-width: 100%;
}
.whichOne{
  display: flex;
  flex-direction: column;
  height:95%;
  margin-left:2px;
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
  color: #A6A6A6;
  text-indent: 5%
}

#search {
  width: 78px;
  height: 20px;
  background: #FFFFFF;
  margin-left: 5px;
  border-radius: 32px;
  z-index: 10;
  display: flex;
  place-items: center;
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
}

.no-background-hover {
  float: right;
  z-index: 13
}
.no-background-hover.v-btn:not(.v-btn--round).v-size--default {
  height: 36px;
  min-width: 20px;
  padding: 0;
  background-color: transparent;
  box-shadow:none;
}
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
