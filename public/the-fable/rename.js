const fs = require("fs");
const path = require("path");

const BASE_DIR = __dirname;

// cấu hình
const OFFSET = 2;
const START = 112;
const END = 238;
const DRY_RUN = false; // 👉 đổi thành true để test trước
const LOG_FILE = path.join(BASE_DIR, "rename_log.txt");

function log(msg) {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + "\n");
}

// regex match Chap_XXX
const regex = /^Chap_(\d{3})$/;

// đọc folder
let folders = fs.readdirSync(BASE_DIR).filter(name => {
    const fullPath = path.join(BASE_DIR, name);
    return fs.statSync(fullPath).isDirectory() && regex.test(name);
});

log(`==== START ${new Date().toISOString()} ====`);

// lọc theo range
let targets = folders.filter(name => {
    const num = parseInt(name.match(regex)[1], 10);
    return num >= START && num <= END;
});

// STEP 1: rename tạm
targets.forEach(name => {
    const oldPath = path.join(BASE_DIR, name);
    const tmpName = "__tmp__" + name;
    const tmpPath = path.join(BASE_DIR, tmpName);

    log(`TEMP: ${name} -> ${tmpName}`);

    if (!DRY_RUN) {
        fs.renameSync(oldPath, tmpPath);
    }
});

// STEP 2: rename chính thức
let tmpFolders = fs.readdirSync(BASE_DIR).filter(name => name.startsWith("__tmp__Chap_"));

tmpFolders.forEach(name => {
    const match = name.match(/^__tmp__Chap_(\d{3})$/);
    if (!match) return;

    const num = parseInt(match[1], 10);
    const newNum = String(num + OFFSET).padStart(3, "0");
    const newName = `Chap_${newNum}`;

    log(`FINAL: ${name} -> ${newName}`);

    if (!DRY_RUN) {
        fs.renameSync(
            path.join(BASE_DIR, name),
            path.join(BASE_DIR, newName)
        );
    }
});

log(`==== END ${new Date().toISOString()} ====`);

console.log("Done!");