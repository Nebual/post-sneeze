'use strict'

module.exports = function map(opts) {
    const seneca = this
    const uuid = require('uuid/v4')
    const mc = require('mongodb').MongoClient

    const MONGO_URL = 'mongodb://localhost:27017/mapper'

    seneca.add({
        domain: 'map',
        role: 'api',
        cmd: 'addPoint',
        name: {
            required$: true,
            type$: 'string'
        },
        lon: {
            required$: true,
            type$: 'number',
            min$: -180,
            max$: 180
        },
        lat: {
            required$: true,
            type$: 'number',
            min$: -90,
            max$: 90
        }
    }, (msg, done) => {
        const {name, lon, lat} = msg

        const newPoint = {
            id: uuid(),
            name: name,
            type: 'Point',
            coordinates: [lon, lat]
        }

        mc.connect(MONGO_URL, (err, db) => {
            const collection = db.collection('poi')

            collection.insertOne(newPoint, (err, result) => {
                if (err) {
                    console.log(err)
                }

                console.log('document inserted')
                console.log(result)

                db.close()
                done()
            })

        })
    })

}