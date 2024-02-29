import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS SDK with your credentials
const s3 = new S3Client({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});


// Define the S3 bucket name
// const bucketName = "love-craft-gifts";

const s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "love-craft-gifts",
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

export default s3Upload;
