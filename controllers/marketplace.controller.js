const { OFF_CHAIN_DECIAMLS } = require("../config");
const { getTimestampForNow, getOrderStatus, web3, recoverSignature, sameAddresses, convertArgsIntoItem } = require("../helper");

const Marketplace = require("../models").marketplace;


const listForSale = async (req, res, next) => {
    try {

        // verify signature
        const { abi, itemsForSale, signature } = req.body;
        let orderHash = web3.utils.keccak256(web3.eth.abi.encodeParameters(abi, itemsForSale));
        let { seller, collection, tokenId, price, duration } = convertArgsIntoItem(itemsForSale);
        const startTime = getTimestampForNow();

        if (sameAddresses(recoverSignature(orderHash, signature), req.signer) && sameAddresses(req.signer, seller)) {
            console.log(seller, collection, tokenId, web3.utils.toWei(price.toString(), "ether"), startTime, duration)
            const orderStatus = await getOrderStatus(seller, collection, tokenId, web3.utils.toWei(price.toString(), "ether"), startTime, duration);
            if (orderStatus) {
                await Marketplace.destroy({
                    where: {
                        collection,
                        tokenId
                    }
                })

                //price = 1236.36
                price = 100253.6;

                const item = await Marketplace.create({
                    seller,
                    collection,
                    tokenId,
                    startTime,
                    price,
                    duration
                });

                const _items = await Marketplace.findAll();


                return res.status(201).json({
                    status: "success",
                    data: item,
                    _items
                });
            } else {
                return res.status(201).json({
                    status: "invalid",
                    message: "The sale request is invalid"
                })
            }
        }



    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}


const getNFTListForSale = async () => {
    try {
        const modelSN = uuid.v4();
        const { projectName, forOnlyUS, about, hasShare, shareName, shareSymbol, maxTotalSupply, mintPrice, mnpw, mnpt, endTime, paymentToken } = req.body;

        if (!hasShare) {
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
    listForSale,
    getNFTListForSale,

}