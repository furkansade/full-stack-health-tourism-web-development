const mongoose = require('mongoose');
const express = require('express');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const categoryRoute = require('./routes/categoryRoute');
const healthPackageRoute = require('./routes/healthPackageRoute');
const companyRoute = require('./routes/companyRoute');
const hotelRoute = require('./routes/hotelRoute');
const tourRoute = require('./routes/tourRoute');
const customerRoute = require('./routes/customerRoute');
const blogRoute = require('./routes/blogRoute');
const faqRoute = require('./routes/faqRoute');
const blogCategoryRoute = require('./routes/blogCategoryRoute');

const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');

const adminPageRoute = require('./routes/adminRoute/adminPageRoute');
const adminUserRoute = require('./routes/adminRoute/adminUserRoute');


const AdminUser = require('./models/AdminUser');


mongoose.set('strictQuery', false);

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/utatur-db').then(() => {
  console.log('utatur-db connected successfully');
});

app.set('view engine', 'ejs');

//GLOBALVARIABLES

global.userIN = null;

async (req, res) => {
  global.adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/utatur-db',
    }),
  })
);
app.use(fileUpload());
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/users', userRoute);

app.use('/categories', categoryRoute);
app.use('/healthpackages', healthPackageRoute);
app.use('/companies', companyRoute);
app.use('/hotels', hotelRoute);
app.use('/tours', tourRoute);
app.use('/customers', customerRoute);
app.use('/blogs', blogRoute);
app.use('/faqs', faqRoute);
app.use('/blogcategories', blogCategoryRoute);

app.use('/admin', adminPageRoute);
app.use('/admin/users', adminUserRoute);

port = 9000;
app.listen(port, () => {
  console.log(`listening port: ${port}`);
});
