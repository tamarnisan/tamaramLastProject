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
/*Get info by user_id*/
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM user WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else { res.status(200).send(result); }
    });

});

/*Delete user by user_id*/
router.delete("/:id", function (req, res, next) {
    con.query(`DELETE FROM user WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else { res.status(200).send({ text: "user deleted" }); }
    });

});

/*Get todos by user_id*/
router.get("/:id/todos", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else { res.status(200).send(result); }
    });

});
//get todo by todoId
router.get("/:id/todos/:todoId", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id} AND id=${req.params.todoId}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        res.status(200).send(result);
    });
});

/*Get posts by user_id*/

router.get("/:id/posts", function (req, res, next) {
    con.query(`SELECT * FROM post WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else { res.status(200).send(result); }
    });

});

/*Delete posts by user_id*/

router.delete("/:id/posts", function (req, res, next) {
    con.query(`DELETE FROM post WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else { res.status(200).send({ text: "posts deleted" }); }
    });
});

//add post
router.post("/:id/posts", function (req, res, next) {
    const sql = `INSERT INTO post (body, user_id, title) VALUES ('${req.body.body}', ${req.params.id}, '${req.body.title}')`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send({ text: "something went wrong" });
        else {
            console.log('result: ', result);

            console.log("user inserted");
            return res.status(200).send({ id: result.insertId });
        }

    })


})


module.exports = router;
