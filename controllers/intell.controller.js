const { getShareLength, getInvestmentOpportunities, bigNumberToDecimal, getSharePortfolio, getModels, getModel, getAllModels, ModelMetadata, ShareMetadata } = require("../helper");
const Project = require("../models").project;

const investmentOpportunities = async (req, res, next) => {
    const invs = await getInvestmentOpportunities();
    const result = [];

    for (let inv of invs) {
        inv = inv[0];
        console.log(inv)
        const modelId = bigNumberToDecimal(inv[1]);
        const project = await Project.findByPk(modelId);


        result.push(ModelMetadata(inv, project));
    }
    return res.send(result);
}

const portfolio = async (req, res, next) => {
    const collections = await getSharePortfolio("0x171c8C090511bc95886c9AAc505dB3081FE72F97");
    const result = [];

    for (let i = 0; i < collections.length; i++) {
        let collection = collections[i][0];

        for (let item of collection) {
            const modelId = bigNumberToDecimal(item[2]);
            const project = await Project.findByPk(modelId);

            result.push(ShareMetadata(item, project));
        }


    }

    return res.send(result);
}

const getModelsInDetail = async (_owner) => {
    const models = await getModels(_owner);
    const result = [];

    for (let model of models) {
        console.log(model)
        const project = await Project.findByPk(model[1]);

        result.push(ModelMetadata(model, project));
    }

    return result;
}

const getModelInDetail = async (_tokenId) => {
    const modelInDetail = await getModel(_tokenId);

    return modelInDetail;

}

//Data Scientist
const myModels = async (req, res, next) => {
    const models = await getModelsInDetail("0x171c8C090511bc95886c9AAc505dB3081FE72F97");
    return res.send(models);
}

const myModel = async (req, res, next) => {
    const model = await getModelInDetail(2);
    const project = await Project.findByPk(model[1]);

    return res.send(ModelMetadata(model, project));

}

//Business
const allModels = async (req, res, next) => {
    const models = await getAllModels();
    const result = [];
    for (let model of models) {
        model = model[0];
        console.log(model)
        const project = await Project.findByPk(bigNumberToDecimal(model[1]));

        result.push(ModelMetadata(model, project));
    }

    return res.send(result);
}



module.exports = {
    investmentOpportunities,
    portfolio,
    myModels,
    myModel,
    allModels,
}

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