/**
 * 排序方法
 * @param arr
 * @param type
 * @returns {*}
 */
const fileSort = (arr, type) => {
    switch (type) {
        case 'BTAscending': // 创建时间升序
            return arr.sort((a, b) => a.birthtime - b.birthtime)
        case 'BTDescending': // 创建时间降序
            return arr.sort((a, b) => b.birthtime - a.birthtime)
        case 'BTAscending': // 修改时间升序
            return arr.sort((a, b) => a.mtime - b.mtime)
        case 'MTDescending': // 修改时间降序
            return arr.sort((a, b) => b.mtime - a.mtime)
        case 'ATAscending': // 访问时间升序
            return arr.sort((a, b) => a.atime - b.atime)
        case 'ATDescending': // 访问时间降序
            return arr.sort((a, b) => b.atime - a.atime)
        case 'NAscending': // 文件名升序
            return arr.sort((a, b) => a.fileName - b.fileName)
        case 'NDescending': // 文件名降序
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
