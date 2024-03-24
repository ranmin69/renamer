/**
 * 排序方法
 * @param arr
 * @param type
 * @returns {*}
 */
const fileSort = (arr, type) => {
    switch (type) {
        case 'BTAscending':
            return arr.sort((a, b) => a.birthtime - b.birthtime)
        case 'BTDescending':
            return arr.sort((a, b) => b.birthtime - a.birthtime)
        case 'BTAscending':
            return arr.sort((a, b) => a.mtime - b.mtime)
        case 'MTDescending':
            return arr.sort((a, b) => b.mtime - a.mtime)
        case 'ATAscending':
            return arr.sort((a, b) => a.atime - b.atime)
        case 'ATDescending':
            return arr.sort((a, b) => b.atime - a.atime)
        case 'NAscending':
            return arr.sort((a, b) => a.fileName - b.fileName)
        case 'NDescending':
            return arr.sort((a, b) => b.fileName - a.fileName)
        default:
            return arr
    }
}

const tool = {
    fileSort,
}

export {
    tool as default,
    fileSort
}
