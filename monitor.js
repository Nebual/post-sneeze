const seneca = require('seneca')

seneca({tag: 'rgb', log: 'silent'})
    .use('mesh', {
        monitor: true
    })
