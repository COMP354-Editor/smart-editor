<template>
  <textarea contenteditable v-model="textValue" :style="{height:textAreaHeight + 'px'}"></textarea>
</template>

<script>
export default {
  name: 'TextArea',
  data () {
    return {
      textValue: 'initial data'
    }
  },
  computed: {
    textAreaHeight () {
      let numberOfLineBreaks = (this.textValue.match(/\n/g) || []).length
      // min-height + offset + lines x line-height
      return 20 + 40 + numberOfLineBreaks * 20
    }
  }
}
</script>

<style scoped>
textarea {
  /*remove border*/
  /*border: 0;*/
  border: 1px solid;

  width: 75%;
  margin-left: 3%;

  /* disable resize, hide resize bar*/
  resize: none;

  overflow: hidden;

  /* used by auto grow */
  min-height: 40px;
  line-height: 20px;

}

textarea:focus {
  /* disable highlight on focus */
  outline: none;
}

</style>
