<template>
  <div id="Layer1-menu">
    <v-btn
      height="25px"
      class="menu-layer1"
    >
      New
    </v-btn>
    <v-btn
      id="selected-file"
      height="25px"
      class="menu-layer1"
      :ripple="false"
      @click="openfile"
    >
      Open
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
      :ripple="false"
      @click="savefile"
    >
      Save
    </v-btn>
    <v-btn
      height="25px"
      class="menu-layer1"
      :ripple="false"
    >
      Save as
    </v-btn>
  </div>
</template>

<script>
//import { fileURLToPath } from 'url';

// Load the File System
const fs = require('fs');

// Load the Dialog
const {dialog} = require('electron').remote;

//import TextCharManager from "../../../model/TextCharManager.ts";

export default {
  name: 'File',
  data () {
    return {
    }
  },
  methods: {
    openfile(){
       dialog.showOpenDialog( { properties: ['openFile', 'openDirectory'] }).then((fileNames) => {
          //console.log("success");
           if(fileNames === undefined){
              console.log("No File Selected");
           }
           else{
              //console.log("success");
              //Test For local file path, it works
              /* fs.readFile("/Users/yuchenguan/Desktop/Github/smart-editor/src/renderer/service/TEST.txt", 'utf-8', function (err, data) { */
              fs.readFile(fileNames, 'utf-8', function (err, data) {
                  if(err){
                      alert("Error Ocurred Reading The File : " + err.message);
                      return;
                  }
                  document.getElementById("text-io").value = data;
                  //createTextChar(0, data);
                  //this.textCharManager.createTextChar(0, data);
              });
           }
         })
     },
     savefile(){
       //Current Text Content
       var content = document.getElementById("text-io").value;
                //Call Dialog Window
                dialog.showSaveDialog({ properties: ['showHiddenFiles'] }).then((fileName) => {
                  //console.log("success");
                    if (fileName === undefined){
                        console.log("You Can Not Save The File.");
                        return;
                    }
                    fs.writeFile(fileName, content, function (err) {
                      //console.log("success");
                        if(err){
                            alert("Error Ocurred Creating The File : "+ err.message)
                        }
                        alert("The File Has Been Saved.");
                    });
                });
     }
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
