const User = require("../models").user;
const helper = require("../helper");
const uuid = require("uuid")

const login = async (req, res, next) => {
    try {
        if (await User.hasAccount(req.signer))
            return res.send({ hasAccount: true });
        else return res.send({ hasAccount: false });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const register = async (req, res, next) => {
    const fromUS = false;
    const { firstName, lastName, email, wallet, phone, ecosystemId } = req.body;

    if (!helper.sameAddresses(req.signer, wallet))
        return res.status(500).json({
            status: "error",
            message: "500 - Signature Error",
        });

    if ((await User.hasAccount(wallet))) {
        return res.status(403).json({
            status: "error",
            messsage: "403 - Already Exists"
        })
    }

    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            wallet,
            phone,
            ecosystemId,
            fromUS,
            nonce: uuid.v4()
        });

        return res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }

}

const signature = async (req, res, next) => {
    const signature = await helper.generateSignature();
    res.send(signature)
}

module.exports = {
    login
}

module.exports = {
    register,
    signature,
    login
}