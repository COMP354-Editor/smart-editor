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
        // if content is a char
        if (content.length === 1) {
            // insert the new TextChar into textChars
            this.textChars.splice(index, 0, new TextChar(content))
        } else if (content.length > 1) {
            // create TextChar for each char
            let textCharsToInsert: Array<TextChar> = []
            for (let i = 0; i < content.length; i++) {
                textCharsToInsert.push(new TextChar(content.charAt(i)))
            }
            // insert the TextChars into textChars
            this.textChars.splice(index, 0, ...textCharsToInsert)
        }

        // update visibleTextChars
        this.visibleTextChars = this.textChars.filter(textChar => !textChar.isHidden())

    }

    getTextValue(): string {
        if (this.visibleTextChars.length === 0) return ''
        return this.visibleTextChars.map(textChar => textChar.content).reduce((str1, str2) => str1.concat(str2))
    }


}

const textCharManager = new TextCharManager();
textCharManager.createTextChar(0, 'initial data')

export default textCharManager;
