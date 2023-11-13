const { Router } = require("express");

const userContoller = require("../controller/userController");

const router = Router();

router.post("/createusertable", userContoller.createUserTable);
router.post("/login", userContoller.handleLogin);

router.post("/protect", userContoller.handleLogin);

module.exports = router;
