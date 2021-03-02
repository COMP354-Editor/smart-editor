<template>
  <div id="searchAndReplace">
    <div id="search">
      <v-icon
        x-small
        style="padding-left: 3px"
      >
        mdi-magnify
      </v-icon>
    </div>
    <div id="searchAndReplace_deco" />
    <div id="replace">
      replace with
    </div>
    <v-btn
      class="no-background-hover"
      icon
      x-small
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn
      icon
      class="no-background-hover"
      x-small
    >
      <v-icon>mdi-file-replace-outline</v-icon>
    </v-btn>
    <v-btn
      icon
      class="no-background-hover"
      x-small
    >
      <v-icon>mdi-find-replace</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SearchAndReplace',
}
</script>

<style scoped>
#searchAndReplace {
  width: 231px;
  height: 28px;

  background: #E8E8E8;
  border-radius: 36px;
  box-sizing: inherit;
  display: flex;
  align-items: center;
  float: right !important;
  font-size: 9px;
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
  display: flex;
  place-items: center;
}

.no-background-hover {
  width: 26px;
  height: 26px;
  float: right;
  z-index: 13
}

.no-background-hover::before {
  background-color: transparent !important;
}
</style>
