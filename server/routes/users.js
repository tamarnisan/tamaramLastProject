const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET users listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM user LIMIT 10", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get("/:id/todos", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
});

router.get("/:id/todos/:todoId", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id} AND id=${req.params.todoId}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
});

module.exports = router;
