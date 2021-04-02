const { shell } = require('electron')

export default {

    open(): void {
        const success = shell.showItemInFolder('~/Desktop/text.txt')
        console.log(success)
    }

}
