// Middleware: Custom API Key Authentication
export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Expected key for testing
    if (apiKey && apiKey === 'secret-api-key') {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing or invalid X-API-KEY header.'
    });
};

// Middleware: Task Request Input Validation
export const validateTaskInput = (req, res, next) => {
    const { title, status } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error: "title" is required and must be a non-empty string.'
        });
    }

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: `Validation Error: "status" must be one of: ${validStatuses.join(', ')}.`
        });
    }

    next();
};