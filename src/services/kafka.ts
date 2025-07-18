// src/services/kafka.ts

import { Kafka, Producer, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'school-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const kafkaProducer: Producer = kafka.producer();
export const kafkaConsumer: Consumer = kafka.consumer({ groupId: 'student-group' });

export async function initKafka() {
  await kafkaProducer.connect();
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({ topic: 'student-events', fromBeginning: true });

  kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Kafka message on ${topic}: ${message.value?.toString()}`);
      // Additional processing can go here
    },
  });
}

/*
Explanation:

kafkaProducer lets you send events

kafkaConsumer listens to student-events topic

initKafka() connects both producer & consumer
*/