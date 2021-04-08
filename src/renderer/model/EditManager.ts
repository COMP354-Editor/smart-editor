import Edit from "./Edit";
import textCharManager from "./TextCharManager";

class EditManager {
    edits: Array<Edit>

    constructor() {
        this.edits = [];
    }

    createEdit(operation: 'writing' | 'deletion') {
        switch (operation) {
            case "writing":
                break;
            case "deletion":
                break;
            default:
                throw "Invalid edit operation"
        }
    }

    deleteEdit(editToDelete: Edit) {
        this.edits.filter(edit => edit != editToDelete)
        console.log(editToDelete)
    }
}

const editManager = new EditManager()
const edit1 = new Edit("writing", textCharManager.textChars.slice(0, 5))
const edit2 = new Edit("writing", textCharManager.textChars.slice(5))
editManager.edits = [edit1, edit2]


export default editManager

