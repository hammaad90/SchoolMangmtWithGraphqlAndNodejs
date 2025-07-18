import { Schema, model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  age?: number;
  email: string;
  enrolledClasses: Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true, unique: true },
  enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

const Student = model<IStudent>('Student', studentSchema);
export default Student;
