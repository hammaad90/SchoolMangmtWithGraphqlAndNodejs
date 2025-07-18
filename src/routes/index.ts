// src/routes/index.ts
import { Express } from 'express';
import studentRoutes from './student.routes';
import teacherRoutes from './teacher.routes';
import classRoutes from './class.routes';
import courseRoutes from './course.routes';

export default function applyRoutes(app: Express) {
  app.use('/students', studentRoutes);
  app.use('/teachers', teacherRoutes);
  app.use('/classes', classRoutes);
  app.use('/courses', courseRoutes);
}
