// src/services/cloudWatchClient.ts
import { CloudWatchLogsClient, PutLogEventsCommand, CreateLogStreamCommand, CreateLogGroupCommand, DescribeLogStreamsCommand } from '@aws-sdk/client-cloudwatch-logs';
import { AWS_REGION } from '../config';

const cloudWatchClient = new CloudWatchLogsClient({ region: AWS_REGION });

const LOG_GROUP_NAME = 'school-management-logs';
const LOG_STREAM_NAME = 'app-log-stream';

async function createLogGroup() {
  try {
    await cloudWatchClient.send(new CreateLogGroupCommand({ logGroupName: LOG_GROUP_NAME }));
  } catch (err: any) {
    if (err.name !== 'ResourceAlreadyExistsException') {
      throw err;
    }
  }
}

async function createLogStream() {
  try {
    await cloudWatchClient.send(new CreateLogStreamCommand({ logGroupName: LOG_GROUP_NAME, logStreamName: LOG_STREAM_NAME }));
  } catch (err: any) {
    if (err.name !== 'ResourceAlreadyExistsException') {
      throw err;
    }
  }
}

let sequenceToken: string | undefined;

export async function logMessageToCloudWatch(message: string) {
  await createLogGroup();
  await createLogStream();

  const params = {
    logEvents: [
      {
        message,
        timestamp: Date.now(),
      },
    ],
    logGroupName: LOG_GROUP_NAME,
    logStreamName: LOG_STREAM_NAME,
    sequenceToken,
  };

  const command = new PutLogEventsCommand(params);

  try {
    const response = await cloudWatchClient.send(command);
    sequenceToken = response.nextSequenceToken;
  } catch (err: any) {
    console.error('Failed to send log to CloudWatch:', err);
  }
}
