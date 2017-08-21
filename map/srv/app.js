'use strict'
const ip = require('ip')
const seneca = require('seneca')()

const {
    MESH_HOST_BASE = '192.168.0.162',
    MESH_HOST_PORT = '27074'
} = process.env

const MESH_HOST_MAP = ip.address()

seneca.use('mesh', {
    pin: 'domain: map, role: *, cmd: *',
    bases: [`${MESH_HOST_BASE}:${MESH_HOST_PORT}`],
    host: MESH_HOST_MAP
})
seneca.use('parambulator')
seneca.use('../lib/map.js')
.ready(() => {
    console.log('Map - ready')
})
