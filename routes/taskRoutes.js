import express from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import { validateTaskInput } from '../middleware/security.js';

const router = express.Router();

router.route('/')
    .get(getAllTasks)
    .post(validateTaskInput, createTask);

router.route('/:id')
    .get(getTaskById)
    .put(validateTaskInput, updateTask)
    .delete(deleteTask);

export default router;