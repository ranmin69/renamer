
// deno run --allow-all bitch.js --number 31 --name 100097210_p
// deno run --allow-all bitch.js --number '图片开始的数字' --name '图片名称'

const { args, cwd, exit  } = Deno;

const CWD = cwd();
import config from "./config.js";
const { argArr } = config;
import { readDirFile, reName } from './module/fs.js';
import { fileSort } from "./module/tool.js";

const [
    fileName = '',
    fileStart = 1,
    sortType= '' // todo TDescending
] = getArg();

try {
    console.log('开始读取文件夹中的所有文件', '⌛');
    const fileInfoArr = await readDirFile();
    const fileInfoArrNew = fileSort(fileInfoArr, sortType)
    console.log('所有文件读取完成，开始批量改名', '⌛');
    await reName(fileInfoArrNew, fileName, fileStart);
    console.log(`\u001b[33m完成批量改名\u001b[0m`, '👄👙👠');
} catch (err) {
    console.log(`❌：\u001b[31m ${err} \u001b[0m`)
}



function getArg() {
    return argArr.map((item) => {
        const index = args.indexOf(item);
        return index < 0 ? undefined : args[index + 1];
    })
}
