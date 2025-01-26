const config = require("./config/index")
const Web3 = require('web3');
const { Interface } = require('@ethersproject/abi');

const web3 = new Web3(new Web3.providers.HttpProvider(config.INFURA_URL));


const intellTokenContract = new web3.eth.Contract(config.INTELL_TOKEN_ABI, config.INTELL_TOKEN_ADDRESS);
const intellSettingContract = new web3.eth.Contract(config.INTELL_SETTING_ABI, config.INTELL_SETTING_ADDRESS);
const intellModelNFTContract = new web3.eth.Contract(config.CREATOR_NFT_ABI, config.CREATOR_NFT_ADDRESS);
const factoryContract = new web3.eth.Contract(config.FACTORY_ABI, config.FACTORY_ADDRESS);
const intellScanContract = new web3.eth.Contract(config.INTELL_SCAN_ABI, config.INTELL_SCAN_ADDRESS);
const multiCallContract = new web3.eth.Contract(config.MULTICALL_ABI, config.MULTICALL_ADDRESS);
const shareNFTContract = addr => new web3.eth.Contract(config.SHARE_NFT_ABI, addr);
const intellMarketplaceContract = new web3.eth.Contract(config.INTELL_MARKETPLACE_ABI, config.INTELL_MARKETPLACE_ADDRESS);


const getTimestampForNow = () => {
    //return (await web3.eth.getBlock('latest'))['timestamp'];
    return Math.round(Date.now() / 1000);
}

const convertArgsIntoItem = (params) => {
    return {
        seller: params[0],
        collection: params[1],
        tokenId: params[2],
        price: params[3] / Math.pow(10, config.OFF_CHAIN_DECIAMLS),
        duration: params[4]
    }
}

const generateSignature = async () => {
    const authMsg = getAuthMsg(config.NONCE);
    const { signature } = web3.eth.accounts.sign(authMsg, config.USER_PRIVATE_KEY)
    return { signature, address: config.USER_ADDRESS, nonce: config.NONCE }
}

const recoverSignature = (message, signature) => {
    return web3.eth.accounts.recover(message, signature)
}

const multiCall = async (abi, calls) => {
    const itf = new Interface(config.INTELL_SCAN_ABI)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multiCallContract.methods.aggregate(calldata).call();
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res;
}

const getTimeNowInTimestamp = () => {
    let _dateTime = new Date(Date.now());
    _dateTime = _dateTime.getTime() / 1000;
    _dateTime = Math.round(_dateTime);

    return _dateTime;
}

const getAuthMsg = (nonce) => config.MESSAGE + " " + nonce;

const toCheckSumAddress = (_address) => web3.utils.toChecksumAddress(_address)

const sameAddresses = (_address1, _address2) => toCheckSumAddress(_address1) === toCheckSumAddress(_address2)

const getShareLength = async () => {
    const shareLen = await factoryContract.methods.allShareNFTAddrsLength().call();
    return shareLen;
}

const hexToDecimal = hex => parseInt(hex, 16);

const bigNumberToDecimal = bigNumber => hexToDecimal(bigNumber._hex, 16);

const getInvestmentOpportunities = async () => {
    var calls = [];
    var _shareLen = await getShareLength();
    for (let i = 0; i < _shareLen; i++) {
        calls.push({ address: config.INTELL_SCAN_ADDRESS, name: 'singleInvestmentChance', params: [i] })
    }

    const result = await multiCall(config.INTELL_SCAN_ABI, calls);
    return result;
}

const getSharePortfolio = async (_owner) => {
    var calls = [];
    var _shareLen = await getShareLength();
    for (let i = 0; i < _shareLen; i++) {
        calls.push({ address: config.INTELL_SCAN_ADDRESS, name: 'shareNFTCollectionDetail', params: [_owner, i] })
    }

    const result = await multiCall(config.INTELL_SCAN_ABI, calls);
    return result;
}

const getModels = async (_owner) => {
    const models = await intellScanContract.methods.creatorNFTCollectionDetail(_owner).call();
    return models;
}

const getModel = async (_tokenId) => {
    const model = await intellScanContract.methods.singleCreatorNFTDetail(_tokenId).call();
    return model;
}

const allModelLength = async () => {
    return await intellModelNFTContract.methods.totalSupply().call();
}

const getAllModels = async () => {
    var calls = [];
    var _modelsLen = await allModelLength();
    console.log(_modelsLen)
    for (let i = 0; i < _modelsLen; i++) {
        calls.push({ address: config.INTELL_SCAN_ADDRESS, name: 'singleCreatorNFTDetail', params: [i + 1] })
    }

    const result = await multiCall(config.INTELL_SCAN_ABI, calls);
    return result;
}

const getOrderStatus = async (seller, collection, tokenId, price, startTime, duration) => {
    const encodeOrder = web3.eth.abi.encodeParameters(["address", "address", "uint256", "uint256", "uint256", "uint256"],
        [seller, collection, tokenId, price, startTime, duration]);

    const orderHash = web3.utils.keccak256(encodeOrder);
    const orderStatus = await intellMarketplaceContract.methods.getOrderHashStatus([seller, collection, tokenId, price, startTime, duration, orderHash]).call();

    return orderStatus;
}

const ModelMetadata = (onChainModel, offChainModel) => {
    return {
        projectName: offChainModel.projectName,
        about: offChainModel.about,
        progress: offChainModel.progress,
        brand: offChainModel.brand,
        canWithdraw: offChainModel.canWithdraw,
        stopSellingShare: offChainModel.stopSellingShare,
        tokenId: onChainModel[0],
        modelId: onChainModel[1],
        shareName: onChainModel[2],
        shareSymbol: onChainModel[3],
        totalSupply: onChainModel[4],
        maxTotalSupply: onChainModel[5],
        mnpw: onChainModel[6],
        mnpt: onChainModel[7],
        sharePrice: onChainModel[8],
        paymentTokenAddr: onChainModel[9],
        withdrawAmount: onChainModel[10],
        shareNFTAddr: onChainModel[11],
        hasShareLaunched: onChainModel[12],
        forOnlyUS: onChainModel[13],
        endTime: onChainModel[14],
        finished: onChainModel[15],
        countdown: onChainModel[16],
        withdrawn: onChainModel[17],
        blocked: onChainModel[18],

    }
}

const ShareMetadata = (onChainModel, offChainModel) => {
    return {
        projectName: offChainModel.projectName,
        about: offChainModel.about,
        progress: offChainModel.progress,
        brand: offChainModel.brand,
        canWithdraw: offChainModel.canWithdraw,
        stopSellingShare: offChainModel.stopSellingShare,
        shareId: onChainModel[0],
        tokenId: onChainModel[1],
        modelId: onChainModel[2],
        shareName: onChainModel[3],
        shareSymbol: onChainModel[4],
        totalSupply: onChainModel[5],
        maxTotalSupply: onChainModel[6],
        mnpw: onChainModel[7],
        mnpt: onChainModel[8],
        sharePrice: onChainModel[9],
        paymentTokenAddr: onChainModel[10],
        withdrawAmount: onChainModel[11],
        shareNFTAddr: onChainModel[12],
        hasShareLaunched: onChainModel[13],
        forOnlyUS: onChainModel[14],
        endTime: onChainModel[15],
        finished: onChainModel[16],
        countdown: onChainModel[17],
        withdrawn: onChainModel[18],
        blocked: onChainModel[19]

    }
}

module.exports = {
    generateSignature,
    recoverSignature,
    multiCall,
    getTimeNowInTimestamp,
    toCheckSumAddress,
    getAuthMsg,
    sameAddresses,
    web3,
    getShareLength,
    getInvestmentOpportunities,
    hexToDecimal,
    bigNumberToDecimal,
    getSharePortfolio,
    getModels,
    getModel,
    getAllModels,
    ModelMetadata,
    ShareMetadata,
    getTimestampForNow,
    getOrderStatus,
    convertArgsIntoItem
}