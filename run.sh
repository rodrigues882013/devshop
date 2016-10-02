## Automatic way to install dependencies, run tests and running application

# Put document in collection, this document have a coupon SHIPIT
mongoimport --db devshop --collection coupons < app/models/coupon.json

# Put document in collection, this document have a coupon SHIPIT
mongoimport --db test --collection coupons < app/models/coupon.json

# Install general dependencie
npm install

# Install app client dependencie
bower install

# Running unit tests
npm test

# Running application
npm start

