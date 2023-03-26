if(process.env.NODE_ENV !== "production"){
    require('dotenv').config(); 
} ///environment variable that is either in dev or production mode

const express = require('express') 
const path = require('path') 
const mongoose = require('mongoose'); ///connection between JS and mongodb
const ejsMate = require('ejs-mate'); ///allows basic boilerplate
const methodOverride = require('method-override') ///allows http verbs other than POST/GET in forms 
const catchAsync = require('./utils/catchAsync.js') ///for handling async route errors
const ExpressError = require('./utils/ExpressError') ///general error handler middleware
const mongoSanitize = require('express-mongo-sanitize') ///for preventing mongo injection
const ContactInfo = require('./models/contactInfo') //require mongoose model campground.js

///creates portfolio database (or connects to it if already made)
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/portfolio';
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

///checks to see if successfully connected to db and handles db connection error
const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error:")); 
db.once("open", () => {
    console.log("Database Connected")
});

///starts express app 
const app = express();

///sets view engine to ejs 
app.set('view engine', 'ejs');  

///so we can run app.js from outside of yelpcamp folder 
app.set('views', path.join(__dirname, 'views')) 

///sets path for static files
app.use(express.static(path.join(__dirname, 'public'))); 

 ///allows us to get req.params 
app.use(express.urlencoded({extended:true}))

///allows requests other than get/post thru forms 
app.use(methodOverride('_method')) 

///prevents users from inputting characters that could result in mongo injection
app.use(mongoSanitize()) 

///Main route
app.get('/', (req,res) =>{
    res.render('portfolio')
})

///creates a ContactInfo mongoose object from form data and saves it to database
app.post('/contact', catchAsync(async(req,res) =>{
    const contact = new ContactInfo(req.body);
    console.log(contact);
    await contact.save()
    res.redirect('/')
}))

///runs for all unrecognized urls 
app.all('*', (req,res,next) => {
    ///passes ExpressError into err param for app.use
    next(new ExpressError('Page Not Found', 404))
})

///this runs if catchAsync catches error and calls next() OR if next(new ExpressError) gets called OR if validation error 
app.use((err,req,res,next) => { 
    ///gets status and message from ExpressError passed as err, else set defaults
    const {status = 500} = err; 
     ///if no error message, set default 
    if(!err.message) err.message = 'Something went wrong!'
    ///sets response status property to status passed in and renders error template 
    res.status(status).render('error',{err})
})

///listen on .env specified port or 3000 in dev environment 
const port = process.env.PORT || 3000;
app.listen(port, () =>{ 
    console.log(`Serving on port ${port}`)
})
