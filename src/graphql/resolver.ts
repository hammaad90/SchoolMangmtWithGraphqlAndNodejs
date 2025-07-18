// src/graphql/resolver.ts
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';
import Course from '../models/course.model';
import Classroom from '../models/class.model';
import { uploadFileToS3 } from '../services/s3Client';
import { invokeLambda } from '../services/lambdaClient';
import { sendMessageToSQS } from '../services/sqsClients';
import { publishToSNS } from '../services/snsPublisher';
import { logMessageToCloudWatch } from '../services/cloudWatchClient';
import { getSignedCloudFrontUrl } from '../services/cloudFrontService';

export const resolvers = {
  Query: {
    students: async () => await Student.find(),
    teachers: async () => await Teacher.find(),
    courses: async () => await Course.find().populate('teacher'),
    classrooms: async () => await Classroom.find().populate('teacher').populate('students'),
  },
  Mutation: {
    addStudent: async (_: any, args: { name: string; age?: number; grade?: string }) => {
      const student = new Student(args);
      await student.save();

      // Send SQS message
      await sendMessageToSQS({ event: 'student_created', studentId: student.id });

      // Publish to SNS
      await publishToSNS(`New student added with id: ${student.id}`);

      // Invoke Lambda (e.g. async processing)
      await invokeLambda({ studentId: student.id, action: 'postCreation' });

      // Log to CloudWatch
      await logMessageToCloudWatch(`Added student with ID: ${student.id}`);

      return student;
    },
    addTeacher: async (_: any, args: { name: string; subject: string }) => {
      const teacher = new Teacher(args);
      await teacher.save();
      return teacher;
    },
    addCourse: async (_: any, args: { name: string; teacherId: string }) => {
      const course = new Course({ name: args.name, teacher: args.teacherId });
      await course.save();
      return course.populate('teacher');
    },
    addClassroom: async (_: any, args: { name: string; teacherId: string }) => {
      const classroom = new Classroom({ name: args.name, teacher: args.teacherId, students: [] });
      await classroom.save();
      return classroom.populate('teacher');
    },
  },

  uploadFile: async (
    _: any,
    args: { filename: string; fileData: string; contentType: string }
  ) => {
    // Convert base64 string to Buffer
    const buffer = Buffer.from(args.fileData, 'base64');
    
    // Call the upload function
    const url = await uploadFileToS3(args.filename, buffer, args.contentType);

    const signedUrl = getSignedCloudFrontUrl(args.filename);
      return { url: signedUrl };
    
    // Return the URL of the uploaded file
  },
};


/*
Final Integration Flow
Client uploads file contents via GraphQL.

App uses uploadFileToS3() to send file to S3.

App calls getSignedCloudFrontUrl() to generate a CloudFront signed URL.

Client receives the URL and can access the file secure through CDN.
*/