const express = require("express");
const router = express.Router();
const codeApi = require('../controller/code')

/**
 * 设置统一过滤器
 */
// router.get('/', (req, res) => {
//     res.writeHead(302, {"Content-Type": "text/html;charset=utf-8", 'Location': 'http://127.0.0.1:3000/test/index.html'});
// })

router.get("/saveCode", async (req, res) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    const data = await codeApi.saveCode(req.query.code);
    res.status(200).send(data);

});


router.get("/getCode", async (req, res) => {
    res.header("Content-Type", "application/json; charset=utf-8");   
    const data = await codeApi.getCode()
    res.status(200).send(data);
});

module.exports = router;