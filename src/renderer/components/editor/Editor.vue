<template>
  <div
    id="editor"
  >
    <div id="content-box">
      <div>
        <!-- DO NOT delete div wrapping this, otherwise wired bug will occur-->
        <DocumentHeaderPanel v-if="!isTooTight||!isGroupOn" />
      </div>

      <div
        v-if="!isTooTight||!isGroupOn"
        id="time"
      >
        2021/02/27
      </div>
      <div 
        v-if="!isTooTight||!isGroupOn"
        id="deco_underline"
      />
      <div id="text-area-container">
        <TextArea 
          :is-group-on="isGroupOn" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from './TextArea'
import DocumentHeaderPanel from './DocumentHeaderPanel'
import { remote, ipcRenderer } from 'electron'

export default {
  name: 'Editor',
  components: {TextArea, DocumentHeaderPanel},
  props:{
    isGroupOn:Boolean
  },
  data(){
    return{
      isTooTight:false
    }
  },
  id: 'editor',
  created () {
    this.isTooTight =  1181>remote.getCurrentWindow().getSize()[0]

    ipcRenderer.on('window-resize', (event, message) => {
      this.isTooTight = 1181 > message[0];
    })
  }
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
  display: flex;
  flex-direction: column;
  align-content: stretch;
}
</style>
