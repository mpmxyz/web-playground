'use strict';

const  Server = require('fhw-web');

const  config = {
    server: {
        host: 'localhost',
        port: 8080
    },
	routing: {
		magic:  false
	},
    templating: {
        validation: true,
        allowedExtensions: ['html', 'hbs']
    },
    sessions: {
        active: true
    },
    database: {
        fileData: {
            active: true
        }
    }
}

const  app = new  Server(config);
app.start();