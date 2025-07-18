import { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description?: string;
  durationWeeks?: number;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: String,
  durationWeeks: Number,
});

const Course = model<ICourse>('Course', courseSchema);
export default Course;
