<template>
  <div id="editor">
    <div id="content-box">
      <div>
        <!-- DO NOT delete div wrapping this, otherwise wired bug will occur-->
        <DocumentHeaderPanel />
      </div>

      <div id="time">
        2021/02/27
      </div>
      <div id="deco_underline" />
      <div id="text-area-container">
        <TextArea />
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from './TextArea'
import DocumentHeaderPanel from './DocumentHeaderPanel'

export default {
  name: 'Editor',
  components: {TextArea, DocumentHeaderPanel},
  id: 'editor'
}
</script>

<style scoped>
#editor {
  height: 100%;
  background: #F7F7F7;
  border-radius: 12px;
  padding: 20px;
}

#content-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#time {
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.333333px;
  padding-left: 3px;
  padding-bottom: 3px;
}

#deco_underline {
  width: 427px;
  height: 0;
  border-top: 3px solid #777777;
}

#text-area-container {
  flex: 2;
}
</style>
