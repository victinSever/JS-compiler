const express = require("express");
const router = express.Router();
const fileStreamApi = require('../controller/fileStream')
const compilerApi = require('../controller/compiler')

/**
 * 设置统一过滤器
 */
router.get('/', (req, res) => {
    // res.writeHead(302, {"Content-Type": "text/html;charset=utf-8"});
    res.header("Content-Type", "application/json; charset=utf-8");   
})

router.post("/saveCode", async (req, res) => {
    const { params } = req.body
    const data = await fileStreamApi.saveCode(params.code);
    res.status(200).send(data);

});

router.get("/getCode", async (req, res) => { 
    const { filename } = req.query
    const data = await fileStreamApi.getCode(filename)
    res.status(200).send(data);
});

router.get("/getFolder", async (req, res) => { 
    const data = await fileStreamApi.getFolder()
    res.status(200).send(data);
});

router.post("/getLexical", async (req, res) => { 
    const { params } = req.body
    data = compilerApi.getLexical(params.content)
    console.log(data ? '词法分析解析完成···' : '');
    res.status(200).send(data);

});

router.post("/getSyntax", async (req, res) => { 
    const { params } = req.body
    const data = compilerApi.getLexical(params.tokens)
    console.log(data ? '语法分析解析完成···' : '');
    res.status(200).send(data);
});

module.exports = router;