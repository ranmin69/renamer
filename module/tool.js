
const fileSort = (arr, type) => {
    switch (type) {
        case 'TAscending':
            return arr.sort((a, b) => a.birthtime - b.birthtime)
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
