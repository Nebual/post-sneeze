const seneca = require('seneca')()
seneca
    .use('mesh', {
        pin: 'role:users',
    })
    .add('role:users,cmd:get', (msg, reply) => {
        if (msg.id === 1) {
            reply(null, {'name': 'One Guy'})
        } else {
            reply(null, {'error': {'code': 404, 'msg': 'User not found'}})
        }
    })
    .ready(() => {
        console.log("Users ready");
    })
