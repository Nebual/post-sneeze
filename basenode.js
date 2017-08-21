const seneca = require('seneca')

seneca()
// Uncomment to get detailed logs
// .test('print')
    .use('mesh', {
        isbase: true,
    })
    .ready(() => {
        console.log('Base - ready')
    })
