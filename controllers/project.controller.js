const Project = require("../models").project;
const uuid = require("uuid");


const createBasicProjectWithoutShare = async (req, res, next) => {
    try {
        const modelSN = uuid.v4();
        const { projectName, forOnlyUS, about, hasShare } = req.body;

        if(hasShare) {
            return res.status(500).json({
                status: "error",
                message: "Use /api/create-basic-project-with-share",
            });
        }

        const project = await Project.create({
            projectName,
            modelSN,
            forOnlyUS,
            about,
            hasShare,
        });

        return res.status(201).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createBasicProjectWithShare = async (req, res, next) => {
    try {
        const modelSN = uuid.v4();
        const { projectName, forOnlyUS, about, hasShare, shareName, shareSymbol, maxTotalSupply, mintPrice, mnpw, mnpt, endTime, paymentToken } = req.body;

        if(!hasShare) {
            return res.status(500).json({
                status: "error",
                message: "Use /api/create-basic-project-without-share",
            });
        }

        const project = await Project.create({
            projectName,
            modelSN,
            forOnlyUS,
            about,
            hasShare,
            shareName,
            shareSymbol,
            maxTotalSupply,
            mintPrice,
            mnpt,
            mnpw,
            maxTotalSupply,
            endTime,
            paymentToken
        });

        return res.status(201).json({
            status: "success",
            data: {
                project,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    createBasicProjectWithoutShare,
    createBasicProjectWithShare,
}

