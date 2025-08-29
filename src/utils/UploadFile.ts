import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
// import { s3ClientArvanCloud } from "../../test.ts";
import multer from "multer";
import { Request } from 'express';
import path from "path";


// export async function uploadFile(bucket: string, key: string, filePath: string) {
//     const fileStream = fs.createReadStream(filePath);
//     const uploadParams = {
//         Bucket: bucket,
//         key: key,
//         Body: fileStream,
//         ContentType: "application/octet-stream"
//     };

//     const result = await s3ClientArvanCloud.send(
//         new PutObjectCommand(uploadParams)
//     );
//     return result
// }

// config upload in diskStorage
const filePathDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(filePathDir)) {
    fs.mkdirSync(filePathDir, { recursive: true });
}
const configStorage = multer.diskStorage(
    {
        destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
            cb(null, filePathDir)
        },
        filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
            const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqSuffix + path.extname(file.originalname));
        }
        }
);

export const upload = multer(
    {
        storage: configStorage,
        limits: {
            fileSize: 1 * 1024 * 1024
        }
    }
)
