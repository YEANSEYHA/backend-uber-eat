const pool = require("../db");

const getPosts = (req, res) => {
  // Perform CRUD operations or any other necessary business logic
  // Retrieve posts from a database, process data, etc.
  // Example: const posts = await Post.find();

  // Return the response
  res.send("All post here");
};

const createCategoryTable = (req, res) => {
  const tableExistsQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'category'
    )
  `;

  pool
    .query(tableExistsQuery)
    .then((result) => {
      if (result.rows[0].exists) {
        console.log("Table already exists");
        return Promise.reject("Category table already exists");
      } else {
        const createTableQuery = `
          CREATE TABLE category (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            imageUrl VARCHAR(255)
          )
        `;
        return pool.query(createTableQuery);
      }
    })
    .then(() => {
      console.log("Category table created");
      res.status(201).send("Category table created");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};
const addCategory = (req, res) => {
  const { title, description, imageUrl } = req.body;

  const addCategoryQuery = `
    INSERT INTO category (title, description, imageUrl)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  pool
    .query(addCategoryQuery, [title, description, imageUrl])
    .then((result) => {
      const addedCategory = result.rows[0];
      console.log("log result", result);
      console.log(`Category with ID ${addedCategory.id} added successfully`);
      res.status(201).json(addedCategory);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const getAllCategories = (req, res) => {
  const getAllCategoriesQuery = `
    SELECT *
    FROM category
  `;

  pool
    .query(getAllCategoriesQuery)
    .then((result) => {
      const categories = result.rows;
      console.log(`Retrieved ${categories.length} categories successfully`);
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { title, description, imageUrl } = req.body;

  const updateCategoryQuery = `
    UPDATE category
    SET title = $1, description = $2, imageUrl = $3
    WHERE id = $4
    RETURNING *
  `;

  pool
    .query(updateCategoryQuery, [title, description, imageUrl, categoryId])
    .then((result) => {
      const updatedCategory = result.rows[0];
      if (!updatedCategory) {
        console.log(`Category with ID ${categoryId} not found`);
        return res.status(404).json({ error: "Category not found" });
      }
      console.log(`Category with ID ${categoryId} updated successfully`);
      res.status(200).json(updatedCategory);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = {
  getPosts,
  createCategoryTable,
  addCategory,
  getAllCategories,
  updateCategory,
};
