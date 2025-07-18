// src/services/s3Client.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_REGION, S3_BUCKET_NAME } from '../config';

const s3Client = new S3Client({ region: AWS_REGION });

export async function uploadFileToS3(key: string, body: Buffer | Uint8Array | Blob | string, contentType?: string) {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType || 'application/octet-stream',
  });
  await s3Client.send(command);
  return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}