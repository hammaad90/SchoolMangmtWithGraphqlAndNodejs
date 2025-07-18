import { Request, Response } from 'express';
import Class from '../models/class.model';

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find()
      .populate('course')
      .populate('teacher')
      .populate('students');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const _class = await Class.findById(req.params.id)
      .populate('course')
      .populate('teacher')
      .populate('students');
    if (!_class) return res.status(404).json({ error: 'Class not found' });
    res.json(_class);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch class' });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create class' });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedClass) return res.status(404).json({ error: 'Class not found' });
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update class' });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ error: 'Class not found' });
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
};
