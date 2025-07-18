import { Schema, model, Document, Types } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  subject?: string;
  email: string;
  assignedClasses: Types.ObjectId[];
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  subject: String,
  email: { type: String, required: true, unique: true },
  assignedClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

const Teacher = model<ITeacher>('Teacher', teacherSchema);
export default Teacher;
