import TextChar from "./TextChar";

// eslint-disable-next-line no-unused-vars
class TextCharManager {
    textChars: Array<TextChar>
    private visibleTextChars: Array<TextChar>

    constructor() {
        this.textChars = []
        this.visibleTextChars = []
    }

    /**
     * create a textChar at a position
     * @param position - the index as a visible char
     * @param content - a char or string
     */
    createTextChar(position: number, content: string): void {
        // get the index in textChars should the new TextChar being inserted
        // TODO: when visibleTextChars.length === 0
        if (this.visibleTextChars.length === 0) {
            let textCharsToInsert: Array<TextChar> = []
            for (let i = 0; i < content.length; i++) {
                textCharsToInsert.push(new TextChar(content.charAt(i)))
            }
            this.textChars.splice(0, 0, ...textCharsToInsert)
        } else {
            let index;
            if (position >= this.visibleTextChars.length) {
                index = this.visibleTextChars.length
            } else {
                index = this.textChars.indexOf(this.visibleTextChars[position])
            }
            // create TextChar for each character
            let textCharsToInsert: Array<TextChar> = []
            for (let i = 0; i < content.length; i++) {
                textCharsToInsert.push(new TextChar(content.charAt(i)))
            }
            // insert into textChars
            this.textChars.splice(index, 0, ...textCharsToInsert)
        }
        // update visibleTextChars
        this.visibleTextChars = this.textChars.filter(textChar => !textChar.isHidden())
    }

    /**
     * @return a string of text to display
     */
    getTextValue(): string {
        if (this.visibleTextChars.length === 0) return ''
        return this.visibleTextChars.map(textChar => textChar.content).reduce((str1, str2) => str1.concat(str2))

    }
}

const textCharManager = new TextCharManager()
textCharManager.createTextChar(0, 'edit1 ')
textCharManager.createTextChar(6, 'edit2 ')
console.log(textCharManager.textChars)

export default textCharManager;
