import Edit from "./Edit";
import TextChar from "./TextChar";
import textCharManager from "./TextCharManager";

class EditManager {
    edits: Array<Edit>

    constructor() {
        this.edits = [];
    }

    createEdit(operation: 'writing' | 'deletion', textChars: Array<TextChar>): void {
        switch (operation) {
            case "writing":
                this.edits.push(new Edit(operation, textChars));
                break;
            case "deletion":
                break;
            default:
                throw "Invalid edit operation"
        }
    }

    deleteEdit(editId: number): void {
        this.edits = this.edits.filter(edit => edit.id != editId)
    }

    getEditById(editId: number): Edit{
        const editFound = this.edits.find(edit => edit.id === editId)
        if (editFound != undefined){
            return editFound;
        } else {
            throw "Edit not found by id"
        }
    }
}

const editManager = new EditManager()
const edit1 = new Edit("writing", textCharManager.textChars.slice(0, 5))
const edit2 = new Edit("writing", textCharManager.textChars.slice(5))
editManager.edits = [edit1, edit2]


export default editManager

