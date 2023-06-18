var express = require('express');
var router = express.Router();
const sendMessage = require('../controller/subscriber');
const consumerData = require('../controller/consumer');

router.get('/subscription', (req, res) => {
         return sendMessage.sendMessage(req, res)
        });

router.get('/consumer',(req,res)=>{
    return consumerData.consumerData(req, res)
})
module.exports = router;