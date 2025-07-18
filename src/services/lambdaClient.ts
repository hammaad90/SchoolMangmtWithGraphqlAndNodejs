// src/services/lambdaClient.ts
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { AWS_REGION, LAMBDA_FUNCTION_NAME } from '../config';

const lambdaClient = new LambdaClient({ region: AWS_REGION });

export async function invokeLambda(payload: object) {
  const command = new InvokeCommand({
    FunctionName: LAMBDA_FUNCTION_NAME,
    Payload: Buffer.from(JSON.stringify(payload)),
  });
  const response = await lambdaClient.send(command);
  if (response.Payload) {
    return JSON.parse(Buffer.from(response.Payload).toString());
  }
  return null;
}
