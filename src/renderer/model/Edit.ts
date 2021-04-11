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

    // TODO
    undo() {

    }

    // TODO
    redo() {

    }
}
