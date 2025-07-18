import { Schema, model, Document, Types } from 'mongoose';

export interface IClass extends Document {
  name: string;
  course: Types.ObjectId;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Class = model<IClass>('Class', classSchema);
export default Class;
