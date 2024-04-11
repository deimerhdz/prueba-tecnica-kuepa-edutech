import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import {Router} from 'express'

const router = Router();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const removeExtension = (filename)=>{
    return filename.split('.').shift();
}

fs.readdirSync(__dirname).filter((file)=>{
    const cleanName = removeExtension(file);
    if(cleanName!='index'){
        import(`./${file}`).then((routerModule)=>{
            router.use(`/${cleanName}`,routerModule.router)
        })
    }
})
export {router};