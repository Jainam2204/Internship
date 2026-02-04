const allowedFields = (allowedKeys = []) => {
    return (req, res, next) => {
        const requestKeys = Object.keys(req.body);

        const extraFields = requestKeys.filter(
            key => !allowedKeys.includes(key)
        );

        if (extraFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Extra fields are not allowed",
                extraFields,
            });
        }

        next();
    };
};

module.exports = allowedFields;