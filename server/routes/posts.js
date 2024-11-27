const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET posts listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM post LIMIT 10", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

/*Get post by post_id and user_id*/
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM post WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        res.status(200).send(result);
    });
});

router.get("/:id/comments", function (req, res, next) {
    con.query(`SELECT * FROM comment WHERE post_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
});



/*delete post by post_id and user_id*/

router.delete("/:post_id", function (req, res, next) {

    con.query(`DELETE FROM post WHERE id=${req.params.post_id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else { res.status(200).send("post deleted"); }
    });

});
module.exports = router;
