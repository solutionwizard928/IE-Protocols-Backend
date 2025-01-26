const Web3 = require("web3");
const config = require("./config/index")
const uuid = require("uuid");
const { getTimeNowInTimestamp, getShareLength, investmentOpportunities, getTimestampForNow, getOrderStatus } = require("./helper");
const { web3 } = require("./helper");

// console.log(web3.utils.toWei('1', 'ether'))
// const params = {
//     "seller": "0xC13f763977E5072Aa1c3B8ADD94917085c8f69F5",
//     "collection": "0x3ea4B2f7E44eb1132588118Cd710596328Fe1672",
//     "tokenId": 1,
//     "price": 10025,
//     "duration": 3600
// }

// getTimestampForNow().then(t => {
//     getOrderStatus(params.seller, params.collection, params.tokenId, web3.utils.toWei(params.price.toString(), "ether"), t,params.duration)
// });


console.log(getTimeNowInTimestamp());