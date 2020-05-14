# BASIC OVERVIEW FOR ASSIGNMENT

1. Data is provided in delimited JSON list.
2. Library used to parse the data :- "ndjson".
3. 5k products are there and can be downloaded from :- "https://greendeck-datasets-2.s3.amazonaws.com/netaporter_gb_similar.json".
4. Common keys used for each data is :- name, brand and price.
5. Some products also have additional field :- similar_product (has info about matching products on competitor website).
6. DB to be used (MONGODB).
7. Insert the data in mongo using appropriate schema and host the app on heroku.

# WORKFLOW OF THE ASSIGNMENT

INSERT THE DATA IN (MONGODB) -----> USE BACKEND TO GET THE DATA USING (NODE/EXPRESS) -----> DISPLAY USING (REACT) -----> APPLY FILTERS ACCORDINGLY(onChange) TO SORT OR DISPLAY THE DATA ACCORDING TO THE FILTERS.

# TASK

- CREATE REACT APP TO DISPLAY DATA WITH THE LISTED FILTER OPTIONS
- SELECTING THE FILTER WILL SHOULD GENERATE THE API CALL TO DISPLAY THE REQUIRED DATA
- NAME, BRAND AND PRICE

1. FILTER 1 (Completed)

- List all products where discount % is >,<,= "n".
- Text field = "enter the integer value" && dropdown = >,<,=.
- eg. enter value 12 and select > will give products greater than discount of 12.
- Selectig the filter will create POST request.
- Backend should return list of products.
  eg. {
  filters: [
  { key: 'discount', value: 10, operator: 'greater_than' }
  ]
  }

NOTE:- FILTER API SHOULD BE SCALABLE THAT IT CAN BE USED FOR OTHER FIELDS WITH MINIMAL CHANGES IN FRONTEND AND BACKEND.

2. FILTER 2 (Completed)

- List all products if the entered string is matched (brand field).
- Text field = "enter the string".
- eg. enter "gucci" and all products with brand name gucci will be displayed.
- need to implement substring matching. Can be done using onChange().
- Searching needs to be insensitive.
- POST request eg : {
  filters: [
  { key: 'brand', value: 'nike', operator: 'contains' }
  ]
  }

NOTE:- THIS ALSO NEEDS TO BE SCALABLE AS CHANGING FIELD WILL WORK WITH ALL OTHER FIELDS IF CHANGED.

3. FILTER 3 (Completed)

- List the producs with are in or out of Stock.
- Can be determined using stock key in the data.
- Filter will contain a boolean indicating wheather to list items in or out of stock.
- POST api eg. {
  filters: [
  { key: 'stock_available', value: true, operator: 'equals' }
  ]
  }

4. FILTER 4 (Working)

- List products created between certain range of dates.
- Use created_at field to display the products in certain range specified by user.
- Can use the calander component.
- POST api eg:- {
  filters: [
  { key: 'created_at', value: ['10 April, 2020', '20 April, 2020'], operator: 'between' }
  ]
  }

can be done using mongo gte,lte

5. COMBINATION OF FILTERS

- Filters can be stackable means can create any combination of filters.
- eg:- {
  filters: [
  { key: 'discount', value: 10, operator: 'greater_than' },
  { key: 'discount', value: 20, operator: 'smaller_than' },
  { key: 'brand', value: 'nike', operator: 'contains' }
  ]
  }
- The above request would list all Nike products whose discount percentage is between 10 and 20.
- eg:- {
  filters: [
  { key: 'discount', value: 5, operator: 'greater_than' },
  { key: 'created_at', value: ['1 April, 2020', '5 April, 2020'], operator: 'between' },
  { key: 'brand', value: 'balenciaga', operator: 'contains' }
  ]
  }
- The above request would list all balenciaga products listed between 1 April and 5 April whose discount percentage is greater than 5.

# DB COLLECTION NAMES

- product = contains the product list.

# TASK FOR TODAY

- GET THE DATA (COMPLETED)
- DISPLAY DATA IN FRONTEND (COMPLETED)
- PAGINATE IN PROPER MANNER API(COMPLETED)
- CREATE COMBINED FILTER API (NOT COMPLETED)

# TASK FOR TODAY

- CREATE COMBINED FILTER API (PAUSED)
- PAGINATION IN THE FRONTEND (WORKING)
- CREATE FILTER IN FRONTEND ()

{
"compareOperator":"greaterThan",
"discountPercentage":50,
"brandName":"prada",
"stockAvailability":true,
"startDate":"2019-10-29",
"endDate":"2019-10-30"
}
