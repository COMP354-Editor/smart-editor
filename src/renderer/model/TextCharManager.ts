import TextChar from "./TextChar";

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
    createTextChar(position: number, content: string): Array<TextChar> {
        // create textChar instant for each char
        let textCharsToInsert: Array<TextChar> = []
        for (let i = 0; i < content.length; i++) {
            textCharsToInsert.push(new TextChar(content.charAt(i)))
        }
        // get the index in textChars should the new TextChar be inserted
        if (this.visibleTextChars.length === 0) {
            // no visible chars; insert at the head
            this.textChars.splice(0, 0, ...textCharsToInsert)
        } else {
            let index;
            if (position >= this.visibleTextChars.length) {
                // position out of bound; insert in the end
                index = this.visibleTextChars.length
            } else {
                index = this.textChars.indexOf(this.visibleTextChars[position])
            }
            // insert into textChars
            this.textChars.splice(index, 0, ...textCharsToInsert)
        }
        // update visibleTextChars
        this.visibleTextChars = this.textChars.filter(textChar => !textChar.isHidden())
        return textCharsToInsert
    }

    /**
     * @return a string of text to display
     */
    getTextValue(): string {
        this.visibleTextChars = this.textChars.filter(textChar => !textChar.isHidden())
        if (this.visibleTextChars.length === 0) return ''
        return this.visibleTextChars.map(textChar => textChar.content).reduce((str1, str2) => str1.concat(str2))

    }

    /**
     *
     * @param start index of the first textChar (inclusive)
     * @param end index of the last textChar (exclusive)
     */
    getTextCharsByVisiblePosition(start: number, end: number): Array<TextChar> {
        return this.visibleTextChars.slice(start, end);
    }
}

const textCharManager = new TextCharManager()
textCharManager.createTextChar(0, 'edit1 ')
textCharManager.createTextChar(6, 'edit2 ')

export default textCharManager;
