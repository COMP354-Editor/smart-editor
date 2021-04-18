import Edit from "../model/Edit";
import textCharManager from "../model/TextCharManager";

export default {
    // get the ranges of an array of edits
    getRangesFromEdits(edits: Array<Edit>): Array<{ from: number, to: number }> {
        let ranges: Array<{ from: number, to: number }> = []
        edits.forEach(edit => {
            // console.log(edit.getContent())
            ranges = ranges.concat(this.getRangesFromEdit(edit))
        })
        // console.log(JSON.stringify(ranges))
        return ranges
    },

    // get the ranges of one edit
    getRangesFromEdit(edit: Edit): Array<{ from: number, to: number }> {
        // the indices of each textChar of this edit in the visible text
        let indices: number[] = []
        for (let i = 0; i < edit.textChars.length; i++) {
            const position = textCharManager.getVisiblePositionByTextChar(edit.textChars[i])
            if (position !== -1) {
                indices.push(position)
            }
        }
        return this.getRangesFromIndexArray(indices)
    },

    /**
     * @return range array from index array
     * for example, [1,2,3,5,6] will return [{from: 0, to: 3}, {from: 3, to: 5}]
     * @param indices
     */
    getRangesFromIndexArray(indices: number[]): Array<{ from: number, to: number }> {
        if (indices.length === 0) {
            return []
        }
        if (indices.length === 1) {
            return [{ from: indices[0], to: indices[1] }]
        }
        let ranges: Array<{ from: number, to: number }> = []
        let rangeStart = 0
        for (let i = 1; i < indices.length; i++) {
            if (indices[i] - indices[rangeStart] === i - rangeStart) {
                // this means array is continuous from rangeStart to i
                // just continue
            } else {
                // this means we found a discontinue point
                // indices[rangeStart, ..., i-1] should form a range
                ranges.push({
                    from: indices[rangeStart],
                    to: indices[i] // 'to' is exclusive
                })
                // update rangeStart to current index; start detect next range
                rangeStart = i
            }
        }
        // push the remaining part of the array
        ranges.push({
            from: indices[rangeStart],
            to: indices[indices.length - 1] + 1
        })
        return ranges
    }

}
