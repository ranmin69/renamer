
const { readDir, cwd, rename } = Deno;

/**
 * 读取文件所有 子文件，并返回子文件信息。
 * @returns {Promise<*[]>}
 */
const  readDirFile = async () => {
     const fileInfoArr = [];
    for await (const { name, isFile } of readDir(cwd())) {
        if (!isFile) break;
        const file = await Deno.open(`${cwd()}/${name}`, { read: true });
        const fileInfo = await Deno.fstat(file.rid);
        fileInfoArr.push({
            name,
            ...fileInfo,
            atime: new Date(fileInfo.atime).getTime(),
            mtime: new Date(fileInfo.mtime).getTime(),
            birthtime: new Date(fileInfo.birthtime).getTime(),
        });
        file.close();
    }
    return fileInfoArr;
}

const reName = async (arr, name, start ) => {
    for await (const [index, value] of arr.entries()) {
        const { name: fileName } = value;
        const oldPath = `${cwd()}/${fileName}`;
        const newPath = `${cwd()}/${index}.rar`;
        await rename(oldPath, newPath);
    }
    /*for (const {name, fileIndex} of fileInfoArr) {
        const extension = name.split('.').at(-1);
        const fileExtension = extension === 'jpg' ? 'jpeg' : extension;
        const oldPath = `${CWD}/${name}`;
        const newName = `${fileName}${fileIndex}.${fileExtension}`;
        const newPath = `${CWD}/${newName}`
        console.log(`📄：\u001b[33m${name}\u001b[0m ——> \u001b[33m${newName}\u001b[0m`, '✅');
        await rename(oldPath, newPath);
    }*/
}

const fs = {
    readDirFile,
    reName
}

export {
    fs as default,
    readDirFile,
    reName
}
