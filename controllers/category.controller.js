const Category = require("../models").category;


const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const category = await Category.create({
            name
        });

        res.status(201).json({
            status: "success",
            data: {
                category,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    createCategory
}