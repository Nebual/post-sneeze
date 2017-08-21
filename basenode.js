const ip = require('ip')
const seneca = require('seneca')({
    tag: 'ps-base'
})

let HOST = ip.address()
let PORT = 27074

// Uncomment to get detailed logs
// .test('print')
seneca.use('mesh', {
    isbase: true,
    port: PORT,
    host: HOST,
})
.ready(() => {
    console.log(`Base - ready on ${HOST}:${PORT}`)
})
