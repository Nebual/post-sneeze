const ip = require('ip')
const SenecaWeb = require('seneca-web')
const Express = require('express')
const Router = Express.Router
const context = new Router()


const senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false } // so we can use body-parser
}

const app = Express()
    .use( require('body-parser').json() )
    .use( context )
    .listen(27080)

const seneca = require( 'seneca' )()
    .use('mesh', {
        bases: ['192.168.0.162:27074'],
        host: ip.address(),
    })
    .use( SenecaWeb, senecaWebConfig )
    .use( 'maps_api' )
    .ready(() => {
        console.log("Webserver ready");
    })
