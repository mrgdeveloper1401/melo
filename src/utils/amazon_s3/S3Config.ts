import { S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const envPath = path.join(process.cwd(), ".env")
config({path: envPath});


export const s3ClientConfig = new S3Client({
  region: process.env.AWS_REGION || 'default',
  endpoint: process.env.AWS_BUCKET_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const configStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}`);
  },
});

export const upload = multer(
  {
    storage: configStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 1 * 1024 * 1024
    }
  }
);
