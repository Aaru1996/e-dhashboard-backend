const { verifyJwtToken } = require("../middlewares/jwtTokenMiddleware");

const ProductModel = require("../DB/Product");

const express = require("express");
const productsController = express.Router();

productsController.use(verifyJwtToken);
// it will apply this middleware to every route on this page

productsController.get("/", async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 2;
  let search = req.query.search;
  let sort = req.query.sort;
  let filter = req.query.filter;

  if (search) search = search.trim();
  else search = "";

  let sortBy = {};
  if (sort) {
    sort = sort.split(",");
    if (sort[1] === "lth") sortBy[sort[0]] = 1;
    else sortBy[sort[0]] = -1;
  }

  let filterOptions = ["mobile", "laptop", "desktop", "pad"];
  if (filter) {
    filter = filter.split(",");
    filterOptions = filter;
  }
  console.log(filterOptions);
  const caseInsensitiveFilters = filterOptions.map(
    (option) => new RegExp(`^${option}$`, "i")
  );

  let dataCount = await ProductModel.find({
    $and: [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
        ],
      },
      { category: { $in: caseInsensitiveFilters } },
    ],
  }).countDocuments();
  //  it is used to find data in
  // console.log(page,limit,dataCount)
  let data = await ProductModel.find({
    $and: [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
        ],
      },
      { category: { $in: caseInsensitiveFilters} },
    ],
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sortBy);
  if (data.length > 0) {
    res.send({ data, dataCount });
  } else {
    res.send({ error: "No Products Available" });
  }
});

// add data to db

productsController.post("/add-product", async (req, res) => {
  let data = new ProductModel({ ...req.body });
  let result = await data.save();
  res.send(result);
});

//   delete data

productsController.delete("/:id", async (req, res) => {
  let result = await ProductModel.deleteOne({ _id: req.params.id });
  res.send(result);
});

//get data by id

productsController.get("/:id", async (req, res) => {
  let result = await ProductModel.findOne({ _id: req.params.id });
  if (result) res.send(result);
  else res.send({ error: "No Record Found" });
});

// update api

productsController.put("/:id", async (req, res) => {
  console.log(req.body);

  let result = await ProductModel.updateOne(
    { _id: req.params.id },
    {
      $set: { ...req.body },
    }
  );
  res.send(result);
});

module.exports = { productsController };
