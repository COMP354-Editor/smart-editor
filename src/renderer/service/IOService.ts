const  fs  = require('fs')
const { dialog } = require('electron').remote
const path = require('path')

import {SaveDialogReturnValue, OpenDialogReturnValue} from 'electron'
import textCharManager from "../model/TextCharManager";

class IOService {

    selectedFilePath: string;
    selectedFileName: string;

    constructor() {
        this.selectedFilePath = "";
        this.selectedFileName = "";
    }

    open() {
        return new Promise ((resolve) => {
            
            dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] })
            .then((fileNames: OpenDialogReturnValue) => {
                if (fileNames === undefined) {
                    alert("No File Selected");
                } else {
                    //store File Path
                    this.selectedFilePath = fileNames.filePaths[0]; 
                    //store Name Path
                    this.selectedFileName = path.basename(this.selectedFilePath);
                    //Set File Name replace Title
                    (document.getElementById('title') as HTMLFormElement).textContent = this.selectedFileName.split('.').slice(0, -1).join('.');
                    //Set File Created Data
                    const info = fs.statSync(this.selectedFilePath);
                    //console.log(info.birthtime);
                    (document.getElementById('time') as HTMLFormElement).textContent = "Creation Date: " + info.birthtime.toJSON().slice(0,10).replace(/-/g,'/');

                    //Node JS call reading file method
                    fs.readFile(fileNames.filePaths[0], 'utf-8', function (err: { message: string; }, data: string) {
                        if (err) {
                            console.error("Error Occurred Reading The File : " + err.message);
                            return;
                        }
                        textCharManager.createTextChar(0, data)
                        resolve(data);
                    });
                }
            })
        })
    }
    //save as NEW file
    saveAs() {
        const content = textCharManager.getTextValue();
        //Call Dialog Window
        dialog.showSaveDialog({ properties: ['showHiddenFiles'] })
            .then((fileName:SaveDialogReturnValue) => {
                if (fileName === undefined) {
                    alert("You Can Not Save The File.");
                    return;
                }
                //Node JS call reading file method
                fs.writeFile(fileName.filePath, content, function (err: { message: string; }) {
                    if (err) {
                        console.error("Error occurred creating the file : " + err.message)
                    }
                    alert("The File Has Been Saved.");
                });
            });
    }
    //open exist file and edited, then save to same file
    save(){
        //get content
        const content = textCharManager.getTextValue();

        if(this.selectedFilePath.length > 0){
            //Node JS call File Method
            fs.writeFile(this.selectedFilePath, content, function (err: { message: string;}) {

            if(err){
                console.error("Error ocurred updating the file : "+ err.message);
                console.log(err);
                return;
            }
            //Set Title back to Original one
            (document.getElementById('title') as HTMLFormElement).textContent = ("This is the title.");
            //Set Time back to Current Date
            (document.getElementById('time') as HTMLFormElement).textContent = "Date: " + new Date().toJSON().slice(0,10).replace(/-/g,'/');

            alert("The File Has Been Saved.");
            }); 
        }else{
            alert("Please Select A File.");
        }      
    }
}

const ioService = new IOService();
export default ioService;
