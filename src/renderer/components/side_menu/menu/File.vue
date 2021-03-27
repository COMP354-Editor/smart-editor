<template>
  <div id="Layer1-menu">
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      New
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      Open
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      Save
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      Save as
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'File',
  data () {
    return {
    }
  },
  methods: {
  }

}
</script>

<style scoped>

#Layer1-menu {
  display: flex;
  flex-direction: column;
  background: #B4B4B4;
  padding-top: 7px;
  padding-bottom: 7px;
}
.menu-layer1{
  box-shadow: 0 0 0 #c6c6c6;
  margin-bottom: 2px;
  margin-top: 2px;
  background:#858585 !important;
  color: #FEFEFE !important;
  justify-content: inherit;
  border-radius: 0;
}
.menu-layer1::before {
  background-color: transparent !important;
}
</style>
