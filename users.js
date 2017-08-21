const ip = require('ip');
const db = require('./db')
const seneca = require('seneca')()
seneca
    .use('mesh', {
        pin: 'role:users',
        bases: ['192.168.0.162:27074'],
        host: ip.address(),
    })
    .use('parambulator')
    .add({role: 'users',
            cmd: 'get',
            email: {required$: true, type$: 'string'}
        }, (msg, reply) => {
        db.query('SELECT * FROM profile WHERE email = $1', [msg.email], (db_err, db_res) => {
            if (db_err) {
                reply(db_err)
            } else {
                reply(null, db_res.rows[0])
            }
        })
    })
    .add({role: 'users',
            cmd: 'register',
            email: {required$: true, type$: 'string'},
            nickname: {type$: 'string'},
        }, (msg, reply) => {
        db.query('INSERT INTO profile (email, nickname) VALUES ($1, $2)', [msg.email, msg.nickname], (db_err, db_res) => {
            if (db_err) {
                if (db_err.constraint === 'profile_email_key') {
                    return reply(null, {'code': 409, 'msg': 'Email already exists'})
                }
                return reply(db_err)
            }
            reply(null, {'code': 200})
        })
    })
    .ready(() => {
        console.log("Users ready");
    })
