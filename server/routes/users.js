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
        if (err) res.status(400).send("Something went wrong.");
        else {
            res.status(200).send(result);
        }
    });
});

/*Delete user by user_id*/
router.delete("/:id", function (req, res, next) {
    con.query(`DELETE FROM user WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else {
            res.status(200).send("user deleted");
        }
    });
});

/*Get todos by user_id*/
router.get("/:id/todos", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else {
            res.status(200).send(result);
        }
    });
});
router.get("/:id/todos/:todoId", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id} AND id=${req.params.todoId}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        else if (result.length === 0) res.status(400).send("Either Todo doesn't exist, or you do not have permission to get this Todo.", err);
        else res.status(200).send(result);
    });
});

router.post("/:id/todos", function (req, res, next) {
    con.query(
        `INSERT INTO to_do (user_id, title, completed) VALUES (${req.params.id}, '${req.body.title}', ${req.body.completed})`,
        (err, result) => {
            if (err) {
                console.log("err: ", err);
                res.status(500).send("Something went wrong.");
            } else res.status(200).send("Added Successfully");
        }
    );
});

router.put("/:id/todos/:todoId", function (req, res, next) {
    con.query(
        `UPDATE to_do SET title = '${req.body.title}', completed = ${req.body.completed} WHERE id = ${req.params.todoId}  AND user_id = ${req.params.id}`,
        (err, result) => {
            if (err) {
                console.log("err: ", err);
                res.status(500).send("Something went wrong.");
            } else res.status(200).send("Updated Successfully");
        }
    );
});

/*Get posts by user_id*/

router.get("/:id/posts", function (req, res, next) {
    con.query(`SELECT * FROM post WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else {
            res.status(200).send(result);
        }
    });
});

/*Delete posts by user_id*/

router.delete("/:id/posts", function (req, res, next) {
    con.query(`DELETE FROM post WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else {
            2;
            res.status(200).send("posts deleted");
        }
    });
});

router.delete("/:id/todos/:todoId", (req, res) => {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id} AND id=${req.params.todoId}`, (err, result) => {
        console.log("result: ", result);
        if (err) res.status(400).send("Something went wrong.", err);
        else if (result.length === 0) res.status(400).send("Either Todo doesn't exist, or you do not have permission to remove this Todo.", err);
        else {
            con.query(`DELETE FROM to_do WHERE user_id=${req.params.id} AND id=${req.params.todoId}`, (err, result) => {
                res.status(200).send(`DELETED Todo with the ID: ${req.params.todoId} of User with the ID: ${req.params.id}`);
            });
        }
    });
});

module.exports = router;
