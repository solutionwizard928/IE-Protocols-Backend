const Ecosystem = require("../models").ecosystem;


const createEcosystem = async (req, res, next) => {
    try {
        const { name, logo, about, verified } = req.body;

        const ecosystem = await Ecosystem.create({
            name, logo, about, verified
        });

        res.status(201).json({
            status: "success",
            data: {
                ecosystem,
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
    createEcosystem
}