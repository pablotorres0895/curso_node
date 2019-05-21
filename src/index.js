const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash')
// initializer
const app = express();
require('./database');
//settings

// en esta configuracion se configura el puerto que escucha, valida contra el puerto 3000, si este esta disponible lo va a utilizar
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname,'views'));

// configuracion del motor de plantillas
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
//middleware

//goblal variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    
    next();
});
//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//static files
app.use(express.static(path.join(__dirname, 'public')));
//server listen
app.listen(app.get('port'),()=>{
    console.log(`servidor iniciado en el puerto ${app.get('port')}`);
});