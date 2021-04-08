import TextChar from "./TextChar";

export default class Edit {
    // TODO: add id for each edit
    textChars: Array<TextChar>
    operation: "writing" | "deletion"

    constructor(operation: "writing" | "deletion", textChars: Array<TextChar>) {
        this.operation = operation
        this.textChars = textChars
    }

    getContent() {
        return this.textChars.map(textChar => textChar.content).reduce((str1, str2) => str1.concat(str2))
    }

    // TODO
    undo() {

    }

    // TODO
    redo() {

    }
}
