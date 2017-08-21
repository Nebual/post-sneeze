const ip = require('ip')
const seneca = require('seneca')

seneca({tag: 'rgb', log: 'silent'})
    .use('mesh', {
        monitor: true,
        bases: ['192.168.0.162:27074'],
        host: ip.address(),
    })
