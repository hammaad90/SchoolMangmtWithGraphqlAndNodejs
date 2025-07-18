// src/services/sqsClient.ts
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { AWS_REGION, SQS_QUEUE_URL } from '../config';

const sqsClient = new SQSClient({ region: AWS_REGION });

export async function sendMessageToSQS(messageBody: object) {
  const command = new SendMessageCommand({
    QueueUrl: SQS_QUEUE_URL,
    MessageBody: JSON.stringify(messageBody),
  });
  return await sqsClient.send(command);
}
