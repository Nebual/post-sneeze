'use strict'

const seneca = require('seneca')({
    tag: 'ps-map'
})

seneca.use('mesh', {pin: 'domain: map, role: *, cmd: *'})
seneca.use('parambulator')
seneca.use('../lib/map.js')
seneca.listen(8000)
.ready(() => {
    console.log('Map - ready')
})
