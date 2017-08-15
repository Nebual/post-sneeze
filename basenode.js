const seneca = require('seneca')({
    tag: 'ps-base'
})

// Uncomment to get detailed logs
// .test('print')
seneca.use('mesh', {
    isbase: true,
})
.ready(() => {
    console.log('Base - ready')
})
