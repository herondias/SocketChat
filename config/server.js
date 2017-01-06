/* Importando módulos */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var application = express();

application.set('view engine', 'ejs');
application.set('views', './app/views');

/* Configurando middleware */
application.use(express.static('./app/public'));
application.use(bodyParser.urlencoded({extended : true}));
application.use(expressValidator());

/* Trata o autoload dos arquivos para aplicação */
consign()
    .include('app/routes')
    .include('app/models')
    .include('app/controllers')
    .into(application);

module.exports = application;