const PRODUCTDATA = "product"; //collection name

module.exports = function (app, db) {
  /*----------------------------------------------FILTERING THE DATA------------------------------------------------------ */

  // COMBINED FILTER (FILTER USED FOR THE ASSIGNMENT)

  app.post("/api/filter", (req, res) => {
    const {
      discountPercentage,
      compareOperator,
      brandName,
      stockAvailability,
      startDate,
      endDate,
    } = req.body; // REQUESTING THESE DATA FROM THE FRONTEND
    const pageNumber = parseInt(req.query.pageNumber);
    const filter = db.collection(PRODUCTDATA); // SELECTING THE COLLECTION
    let query = {}; // CREATING AN EMPTY QUERY OBJECT FOR PASSING THE COMBINATION OF FILTERS BASED ON USER
    if (
      !discountPercentage &&
      !compareOperator &&
      !brandName &&
      !stockAvailability &&
      !startDate &&
      !endDate
    ) {
      query = {};
    } // CHECKING IF THERE IS NO FILTER PASSED RETURN THE WHOLE DATA
    if (discountPercentage && compareOperator) {
      // CHECKS FOR THE DISCOUNT VALUE AND COMPARAISON OPERATOR SELECTED AND STORE THE QUERY IN QUERY OBJECT
      if (compareOperator == "greaterThan") {
        query["similar_products.meta.avg_discount"] = {
          $gt: discountPercentage / 100,
        };
      } else if (compareOperator == "lessThan") {
        query["similar_products.meta.avg_discount"] = {
          $lt: discountPercentage / 100,
        };
      } else if (compareOperator == "lessThan") {
        query["similar_products.meta.avg_discount"] = {
          $eq: discountPercentage / 100,
        };
      }
      console.log("values: - ", compareOperator, discountPercentage);
    }
    if (brandName) {
      // CHECK FOR THE BRAND NAME TO BE SEARCHED AND STORE THE QUERY IN QUERY OBJECT
      query["brand.name"] = { $regex: brandName };
    }
    if (stockAvailability) {
      // CHECK FOR THE STOCK AVAILABILITY TO BE CHECKED AND STORE THE QUERY IN QUERY OBJECT
      query["stock.available"] = { $eq: stockAvailability };
    }
    if (startDate && endDate) {
      // CHECK FOR THE CREATED PRODUCTS IN THE DATA AND STORE THE QUERY IN QUERY OBJECT
      query["created_at"] = {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      };
    }
    filter
      .find(query) // QUERY OBJECT WILL BE PASSED INSIDE FIND FUNCTION AND THEN DATA WILL BE FETCHED ACCORDINGLY
      .skip(pageNumber > 0 ? (pageNumber - 1) * 12 : 0)
      .limit(12)
      .toArray() // THEN DATA WILL BE STORED INSIDE AN ARRAY AND CAN BE DISPLAYED IN FRONTEND
      .then((result) => {
        res.send({
          status: "success",
          message: "filter applied",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: "db_error",
          message: err,
        });
      });
  });

  /*---------------------------------------------------------INDIVIDUAL FILTERS FOR TESTING PURPOSE------------------------------------------------- */

  // FILTER 1

  app.post("/api/discountBasedFilter", (req, res) => {
    let query;
    const { discountPercentage, compareOperator } = req.body;
    const discountFilter = db.collection(PRODUCTDATA);
    if (compareOperator == "greaterThan") {
      query = {
        "similar_products.meta.avg_discount": { $gt: discountPercentage / 100 },
      };
    } else if (compareOperator == "lessThan") {
      query = {
        "similar_products.meta.avg_discount": { $lt: discountPercentage / 100 },
      };
    } else if (compareOperator == "equalTo") {
      query = {
        "similar_products.meta.avg_discount": { $eq: discountPercentage / 100 },
      };
    }
    discountFilter
      .find(query)
      .limit(2)
      .toArray()
      .then((result) => {
        res.send({
          status: "success",
          message: "filter applied",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: "db_error",
          message: err,
        });
      });
  });

  // FILTER 2

  app.post("/api/search/brand", (req, res) => {
    const { brandName } = req.body;
    const brandFilter = db.collection(PRODUCTDATA);
    brandFilter
      .find({
        "brand.name": {
          $regex: brandName,
        },
      })
      .toArray()
      .then((result) => {
        res.send({
          status: "success",
          message: "filter applied",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: "db_error",
          message: err,
        });
      });
  });

  //FILTER 3

  app.post("/api/stockAvailability", (req, res) => {
    const { stockFlag } = req.body;
    const stockCheck = db.collection(PRODUCTDATA);
    stockCheck
      .find({ "stock.available": { $eq: stockFlag } })
      .count()
      .then((result) => {
        res.send({
          status: "success",
          message: "filter applied",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: "db_error",
          message: err,
        });
      });
  });

  // FILTER 4

  app.post("/api/product/range", (req, res) => {
    const { startDate, endDate } = req.body;
    const rangeFilter = db.collection(PRODUCTDATA);
    rangeFilter
      .find({
        created_at: { $gte: new Date(startDate), $lt: new Date(endDate) },
      })
      .count()
      .then((result) => {
        res.send({
          status: "success",
          message: "filter applied",
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).send({ status: "db_error", message: err });
      });
  });
};
