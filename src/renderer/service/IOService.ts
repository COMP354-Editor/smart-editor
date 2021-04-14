const  fs  = require('fs')
const { dialog } = require('electron').remote

import {SaveDialogReturnValue, OpenDialogReturnValue} from 'electron'
import textCharManager from "../model/TextCharManager";

class IOService {

    constructor() {
    }
    open() {
        dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] })
            .then((fileNames: OpenDialogReturnValue) => {
                if (fileNames === undefined) {
                    console.log("No File Selected");
                } else {
                    //Test For local file path, it works
                    fs.readFile(fileNames.filePaths[0], 'utf-8', function (err: { message: string; }, data: string) {
                        if (err) {
                            alert("Error Occurred Reading The File : " + err.message);
                            return;
                        }
                        textCharManager.createTextChar(0, data)
                    });
                }
            })
    }

    saveAs() {
        const content = textCharManager.getTextValue();
        //Call Dialog Window
        dialog.showSaveDialog({ properties: ['showHiddenFiles'] })
            .then((fileName:SaveDialogReturnValue) => {
                if (fileName === undefined) {
                    console.log("You Can Not Save The File.");
                    return;
                }
                fs.writeFile(fileName.filePath, content, function (err: { message: string; }) {
                    if (err) {
                        console.error("Error occurred creating the file : " + err.message)
                    }
                    console.log("The File Has Been Saved.");
                });
            });
    }
}

const ioService = new IOService();
export default ioService;
