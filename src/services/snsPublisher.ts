// src/services/snsClient.ts
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { AWS_REGION, SNS_TOPIC_ARN } from '../config';

const snsClient = new SNSClient({ region: AWS_REGION });

export async function publishToSNS(message: string) {
  const command = new PublishCommand({
    TopicArn: SNS_TOPIC_ARN,
    Message: message,
  });
  return await snsClient.send(command);
}
