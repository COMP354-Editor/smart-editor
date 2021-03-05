import Edit from "./Edit";

class EditManager {
    edits: Array<Edit>

    constructor() {
        this.edits = [];
    }

    createEdit(operation: 'writing' | 'deletion') {
        switch (operation){
            case "writing":
                break;
            case "deletion":
                break;
            default:
                throw "Invalid edit operation"
        }
    }
}

const editManager = new EditManager()


export default editManager

