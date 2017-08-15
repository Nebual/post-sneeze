'use strict'

module.exports = function map(opts) {
    const seneca = this
    const uuid = require('uuid/v4')
    const mc = require('mongodb').MongoClient

    const MONGO_URL = 'mongodb://localhost:27017/mapper'

    /**
     * Add point of interest to the game world
     * @param {string} name - the human friendly name of the point
     * @param {string} game_type - the type of the point in the game
     * @param {number} lon - longitude of the point
     * @param {number} lat - latitude of the point
     */
    seneca.add({
        domain: 'map',
        role: 'api',
        cmd: 'addPoint',
        name: {
            required$: true,
            type$: 'string'
        },
        game_type: {
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

            collection.insertOne(newPoint, (err) => {
                if (err) {
                    db.close()
                    return done(err)
                }

                db.close()
                done(null, {id: result.id})
            })

        })
    })

    /**
     * Remove point from the game world
     * @param {string} id - the unique identifier for the point
     */
    seneca.add({
        domain: 'map',
        role: 'api',
        cmd: 'removePoint',
        id: {
            required$: true,
            type$: 'string'
        }
    }, (msg, done) => {
        const {id} = msg

        mc.connect(MONGO_URL, (err, db) => {
            const collection = db.collection('poi')

            collection.deleteOne({id}, (err) => {
                if (err) {
                    db.close()
                    return done(err)
                }

                db.close()
                done(null, {success: true})
            })
        })

    })

}