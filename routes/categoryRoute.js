const { Router } = require("express");

const categoryController = require("../controller/categoryController");

const router = Router();

router.get("/", categoryController.getPosts);
router.post("/createtable", categoryController.createCategoryTable);
router.post("/addcategory", categoryController.addCategory);
router.get("/getallcategory", categoryController.getAllCategories);
router.put("/updatecategory/:id", categoryController.updateCategory);

module.exports = router;
