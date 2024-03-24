
const { readDir, cwd, rename } = Deno;

/**
 * 读取文件所有 子文件，并返回子文件信息。
 * @returns {Promise<*[]>}
 */
const  readDirFile = async () => {
    const fileInfoArr = [];
    for await (const { name, isFile } of readDir(cwd())) {
        if (!isFile) break;
        const nameArr =  name.split('.');
        const fileType = nameArr.at(-1);
        const fileName = nameArr.slice(0, -1).join('.');
        const file = await Deno.open(`${cwd()}/${name}`, { read: true });
        const fileInfo = await Deno.fstat(file.rid);
        fileInfoArr.push({
            name,
            fileName: isNaN(Number(fileName)) ? fileName : Number(fileName),
            fileType,
            ...fileInfo,
            atime: new Date(fileInfo.atime).getTime(),
            mtime: new Date(fileInfo.mtime).getTime(),
            birthtime: new Date(fileInfo.birthtime).getTime(),
        });
        file.close();
    }
    return fileInfoArr;
}

/**
 * 重命名方法
 * @param fileArr
 * @param baseName
 * @param start
 * @param type
 * @returns {Promise<void>}
 */
const reName = async (fileArr, baseName, start, type) => {
    for (const [index, file] of fileArr.entries()) {
        const { fileType, name } = file;
        const extension = fileType === 'jpg' ? 'jpeg' : fileType;
        const oldPath = `${cwd()}/${name}`;
        const newName = `${baseName}${Number(start) + index}.${extension}`;
        const newPath = `${cwd()}/${newName}`
        console.log(`📄：\u001b[33m${name}\u001b[0m => \u001b[33m${newName}\u001b[0m`, '✅');
        if (type !== 'test') {
            await rename(oldPath, newPath);
        }

    }
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
