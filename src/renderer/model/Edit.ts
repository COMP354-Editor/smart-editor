import TextChar from "./TextChar";

export default class Edit {
    id: number
    groupId: number
    textChars: Array<TextChar>
    operation: "writing" | "deletion"
    isUndone: boolean

    static idCounter = 0

    constructor(operation: "writing" | "deletion", textChars: Array<TextChar>) {
        this.id = Edit.idCounter++
        this.groupId = -1
        this.operation = operation
        this.textChars = textChars
        this.isUndone = false
    }

    getContent(): string {
        return this.textChars
            .map(textChar => textChar.content == '\n' ? ' ' : textChar.content)
            .reduce((str1, str2) => str1.concat(str2))
    }

    undoRedo() {
        if (this.isUndone) {
            this.redo()
        } else {
            this.undo()
        }
    }

    undo() {
        if (this.operation == "writing") {
            this.textChars.forEach(textChar => {
                textChar.isWritingUndone = true;
            })
        } else {
            this.textChars.forEach(textChar => {
                textChar.isDeleted = false;
            })
        }
        this.isUndone = true;
    }

    redo() {
        if (this.operation == "writing") {
            this.textChars.forEach(textChar => {
                textChar.isWritingUndone = false;
            })
        } else {
            // operation is deletion
            this.textChars.forEach(textChar => {
                textChar.isDeleted = true;
            })
        }
        this.isUndone = false;

    }
}
