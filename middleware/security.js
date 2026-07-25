export const authenticateApiKey = (req, res, next) => {
    // Express automatically lowercases header keys
    const clientKey = req.headers['x-api-key'] || req.headers['secret-api-key'];

    // Retrieve valid keys from .env
    const validKeys = [
        process.env.X_API_KEY,
        process.env.SECRET_API_KEY
    ];

    if (clientKey && validKeys.includes(clientKey)) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing or invalid API key.'
    });
};

export const validateTaskInput = (req, res, next) => {
    const { title, status } = req.body || {};

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