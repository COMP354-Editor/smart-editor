import TextChar from "./TextChar";

export default class Edit {
    textChars: Array<TextChar>
    operation: "writing" | "deletion"

    constructor(operation: "writing"| "deletion", textChars: Array<TextChar>) {
        this.operation = operation
        this.textChars = textChars
    }
}
