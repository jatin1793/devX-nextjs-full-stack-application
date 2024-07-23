import { S3, S3ClientConfig } from "@aws-sdk/client-s3";

const s3ClientConfig: S3ClientConfig = {
  region: process.env.AWS_S3_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY as string,
  },
};

export const s3 = new S3(s3ClientConfig);
