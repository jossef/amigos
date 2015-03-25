(function () {
    'use strict';
    var expressPort = 8080;
    var expressIPAddress = '0.0.0.0';
    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';

    var chalk = require('chalk');
    var routing = require('./libs/routing');

    var express = require("express")();

    var http = require('http').Server(express);
    var io = require('socket.io')(http);

    routing.setRouting(express);

    http.listen(expressPort, expressIPAddress);

    console.log(chalk.bold.yellow('LISTENING'), 'express', chalk.cyan(expressIPAddress), chalk.cyan(expressPort));

})();