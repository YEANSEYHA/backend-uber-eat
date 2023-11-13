const { Router } = require("express");

const userContoller = require("../controller/userController");

const router = Router();

router.post("/createusertable", userContoller.createUserTable);

module.exports = router;
