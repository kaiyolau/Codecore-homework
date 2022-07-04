const express = require('express')
const app = express();



// Require method-override middleware
// just GET or POST requests (DELETE, PATCH, etc)
const methodOverride = require('method-override');

//it allows the data to take the shape of arrays and objects
//And puts all the info on req.body.
app.use(express.urlencoded({extend: true}))
//It will modify the request object given to routes by adding a property to it named body
//So request.body will be an object containing the data from our form

//-----------------Method Override Middleware--------------------------
app.use(methodOverride((req,res) => {
    if (req.body && req.body._method) {
        const method = req.body._method;
        return method
    }
})) 

//------Cookie Parser------>
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//will parse cookies and put them on request.cookies available as express properties
//cookie parser reads the headers for us and it will parse out the cookies
//and turns it into a nice JS object for us


//------Custom Middleware-------->

//maybe not needed

//-----STATIC ASSETS-------->
const path = require('path')
//Use 'path.join' to combine string arguments into path
//path.join('/', 'users', 'bob') -> '/users/bob'

//serve the browser those images, css files, browser-side JS files, etc
app.use(express.static(path.join(__dirname, 'public')));
//__dirname is a global variable provided by node that has the value of the path to your root directory

//------Logging Middleware----->

const logger = require('morgan');
const req = require('express/lib/request');
const { request } = require('http')
const { response } = require('express')
app.use(logger('dev'));











//---------------------------ROUTERS--------------------------------->
//Root page
app.get('/', (request, response) => {
    response.render('home')
})

// ---------------cohorts ROUTER ACCESSING POST ROUTES-----------
const cohortsRouter = require('./routes/cohorts');
app.use('/cohorts', cohortsRouter)



//--------------------SET VIEW ENGINE---->
app.set('view engine', 'ejs')
//Create a views directory to refer to all our views
//let express know that should find the templates inside views folder
app.set('views', 'views')

//---------------------------SERVER--------------------------------->
//---Start listening to the server----->
const PORT = 3000;
const DOMAIN = "localhost" //loopback address: 127.0.0.1

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})