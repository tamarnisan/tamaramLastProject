const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET users listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM post LIMIT 10", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
