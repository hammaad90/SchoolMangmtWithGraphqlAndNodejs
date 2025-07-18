// src/graphql/schema.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    age: Int
    grade: String
  }

  type Teacher {
    id: ID!
    name: String!
    subject: String!
  }

  type Course {
    id: ID!
    name: String!
    teacher: Teacher
  }

  type Classroom {
    id: ID!
    name: String!
    teacher: Teacher
    students: [Student!]!
  }

  type Query {
    students: [Student!]!
    teachers: [Teacher!]!
    courses: [Course!]!
    classrooms: [Classroom!]!
  }

  type FileUploadResponse {
  url: String!
}

  type Mutation {
    addStudent(name: String!, age: Int, grade: String): Student!
    addTeacher(name: String!, subject: String!): Teacher!
    addCourse(name: String!, teacherId: ID!): Course!
    addClassroom(name: String!, teacherId: ID!): Classroom!
    uploadFile(filename: String!, fileData: String!, contentType: String!): FileUploadResponse!
  }
`;
