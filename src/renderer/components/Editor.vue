<template>
  <div id="editor">
    <div id="content-box">
      <DocumentHeaderPanel />
      <div id="time">
        2021/02/27
      </div>
      <div id="deco_underline" />
      <TextArea />
    </div>
  </div>
</template>

<script>
import TextArea from './TextArea'
import DocumentHeaderPanel from './DocumentHeaderPanel'

export default {
  name: 'Editor',
  components: {TextArea,DocumentHeaderPanel},
  id: 'editor'
}
</script>

<style scoped>
#editor{
  height: 100%;
  background: #F7F7F7;
  border-radius: 12px;
}
#content-box{
  padding: 20px;
}
#time{
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.333333px;
  padding-left: 3px;
  padding-bottom: 3px;
}
#deco_underline{
  width: 427px;
  height: 0;
  border: 1px solid #777777;
}
</style>
