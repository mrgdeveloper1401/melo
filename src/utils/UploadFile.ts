// import fs from "fs";
import multer from "multer";
// import { Request } from 'express';
// import path from "path";


// upload in disk
// const filePathDir = path.join(process.cwd(), "uploads")
// if (!fs.existsSync(filePathDir)) {
//     fs.mkdirSync(filePathDir, { recursive: true });
// }
// const ConfigDiskStorage = multer.diskStorage(
//     {
//         destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//             cb(null, filePathDir)
//         },
//         filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//             const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//             cb(null, file.fieldname + '-' + uniqSuffix + path.extname(file.originalname));
//         }
//         }
// );

// export const upload = multer(
//     {
//         storage: ConfigDiskStorage,
//         limits: {
//             fileSize: 1 * 1024 * 1024
//         }
//     }
// )
