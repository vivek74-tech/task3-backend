// In-memory data store
let tasks = [
    { id: 1, title: 'Set up Node.js Project', description: 'Initialize repository and install dependencies', status: 'completed' },
    { id: 2, title: 'Build Express REST API', description: 'Create routes and controllers for CRUD operations', status: 'in-progress' }
];

// GET /api/tasks - Retrieve all tasks
export const getAllTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};

// GET /api/tasks/:id - Retrieve single task
export const getTaskById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${id} not found.`
        });
    }

    res.status(200).json({
        success: true,
        data: task
    });
};

// POST /api/tasks - Create a new task
export const createTask = (req, res) => {
    const { title, description, status } = req.body;

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: title.trim(),
        description: description ? description.trim() : '',
        status: status || 'pending'
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: 'Task created successfully.',
        data: newTask
    });
};

// PUT /api/tasks/:id - Update an existing task
export const updateTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${id} not found.`
        });
    }

    const { title, description, status } = req.body;

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(title && { title: title.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(status && { status })
    };

    res.status(200).json({
        success: true,
        message: 'Task updated successfully.',
        data: tasks[taskIndex]
    });
};

// DELETE /api/tasks/:id - Delete a task
export const deleteTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Task with ID ${id} not found.`
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: 'Task deleted successfully.',
        data: deletedTask
    });
};