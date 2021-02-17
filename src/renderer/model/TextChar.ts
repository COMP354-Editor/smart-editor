export class TextChar {
    content: string;
    isWritingUndone: boolean;
    isDeleted: boolean;

    constructor(content: string) {
        if (content.length > 1) {
            throw new Error("TextChar should only contain string of length 1")
        }
        this.content = content;
        this.isWritingUndone = false;
        this.isDeleted = false;
    }

    // whether the text should hide
    isHidden(): boolean {
        return this.isWritingUndone || this.isDeleted;
    }
}
