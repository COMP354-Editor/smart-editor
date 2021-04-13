import TextChar from "./TextChar";

export default class Edit {
    // TODO: add id for each edit
    id: number
    textChars: Array<TextChar>
    operation: "writing" | "deletion"

    static idCounter = 0

    constructor(operation: "writing" | "deletion", textChars: Array<TextChar>) {
        this.id = Edit.idCounter++
        this.operation = operation
        this.textChars = textChars
    }

    getContent(): string {
        return this.textChars.map(textChar => textChar.content).reduce((str1, str2) => str1.concat(str2))
    }

    undo() {
        console.log("In edit undo")
        if (this.operation == "writing"){
            this.textChars.forEach(textChar => {
                textChar.isWritingUndone = true;
            })
        } else {
            this.textChars.forEach(textChar => {
                textChar.isDeleted = false;
            })
        }
    }

    // TODO
    redo() {

    }
}
