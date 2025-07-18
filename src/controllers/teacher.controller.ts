import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find().populate('assignedClasses');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClasses');
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teacher' });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create teacher' });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTeacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update teacher' });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};
