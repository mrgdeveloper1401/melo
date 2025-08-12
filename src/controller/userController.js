const handleResponse = (res, message, status, data = null) => {
    res.status(status).json(
        status,
        message,
        data
    );
};
