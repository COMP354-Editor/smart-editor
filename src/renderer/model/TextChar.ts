class TextChar {
    content: string;
    isWritingUndone: boolean;
    isDeleted: boolean;

    constructor(content: string) {
        this.content = content;
        this.isWritingUndone = false;
        this.isDeleted = false;
    }

    isHidden(): boolean {
        return this.isWritingUndone || this.isDeleted;
    }
}
