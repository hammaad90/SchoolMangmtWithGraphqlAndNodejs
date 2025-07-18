import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';


export const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';
export const LAMBDA_FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME || '';
export const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL || '';
export const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN || '';
export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || '';
export const CLOUDFRONT_KEY_PAIR_ID = process.env.CLOUDFRONT_KEY_PAIR_ID || '';
export const CLOUDFRONT_PRIVATE_KEY = process.env.CLOUDFRONT_PRIVATE_KEY || '';

