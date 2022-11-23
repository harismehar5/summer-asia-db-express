const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");

const URL = "mongodb://localhost/summer_asia";

const productRouter = require("./routes/productRoutes");
const supplierRouter = require("./routes/supplierRoutes");
const customerRouter = require("./routes/customerRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const saleRouter = require("./routes/saleRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const stockRouter = require("./routes/stockRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
console.log("Database url", process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on("open", function () {
  console.log("connected...");
});


app.use(express.json());
app.use("/customer", customerRouter);
app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/expense", expenseRouter);
app.use("/sale", saleRouter);
app.use("/purchase", purchaseRouter);
app.use("/stock", stockRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);


app.all("*", (req, res) => {
    res.status(404).send("<h1>404! Page not found</h1>");
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
