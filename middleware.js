const { NONCE } = require("./config");
const { toCheckSumAddress, recoverSignature, sameAddresses, getAuthMsg } = require("./helper");
const User = require("./models/user").user;


const verifySignatureMiddleware = async (req, res, next) => {
    const signature = req.headers?.signature;
    const address = req.headers?.address;
    const nonce = req.headers?.nonce;

    // console.log(signature, address, nonce)

    req.verifiedSignature = false;

    if (signature && address && nonce) {
        const signer = recoverSignature(getAuthMsg(NONCE), signature);
        if (sameAddresses(signer, address) && nonce === NONCE) {
            req.verifiedSignature = true;
            req.signer = signer;
            next();
        }
    } else {
        return res.status(401).json({
            status: "error",
            message: "401 Unauthorized"
        })
    }


}

const authMiddleware = async (req, res, next) => {
    req.user = await User.findOne({ where: { wallet: toCheckSumAddress(req.signer) } });
    if (req.user && req.verifiedSignature) {
        next();
    }

    return res.status(401).json({
        status: "error",
        message: "401 Unauthorized"
    })
}

module.exports = {
    verifySignatureMiddleware,
    authMiddleware,
}