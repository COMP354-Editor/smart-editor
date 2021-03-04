import TextChar from "./TextChar";

// eslint-disable-next-line no-unused-vars
class TextCharManager {
    private textChars: Array<TextChar>
    private visibleTextChars: Array<TextChar>

    constructor() {
        this.textChars = []
        this.visibleTextChars = []
    }

    /**
     * create a textChar at a position
     * @param position - the index as a visible char
     * @param content - the letter
     */
    createTextChar(position: number, content: string): void {
        // get the index in textChars should the new TextChar being inserted
        let index = this.textChars.indexOf(this.visibleTextChars[position])
        // create the new TextChar
        let textChar = new TextChar(content)
        // insert the new TextChar into textChars
        this.textChars.splice(index, 0, textChar)
        // update visibleTextChars
        this.visibleTextChars = this.textChars.filter(textChar => !textChar.isHidden())

    }

    // TODO: create TextChar in batch and update visibleTextChars once

}

const textCharManager = new TextCharManager();

export default textCharManager;
