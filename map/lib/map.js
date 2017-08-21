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
                db.close()
                if (err) {
                    return done(err)
                }

                done({id: result.id})
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
                db.close()
                if (err) {
                    return done(err)
                }

                done({success: true})
            })
        })

    })

    /**
     * Get all nearby points
     * @param {number} lon - longitude of the client
     * @param {number} lat - latitude of the client
     */
    seneca.add({
        domain: 'map',
        role: 'web',
        cmd: 'getPoints',
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
        const {lon, lat} = msg
        mc.connect(MONGO_URL, (err, db) => {
            const collection = db.collection('poi')

            collection.find({$geoWithin: { $centerSphere: [[lon, lat], 10/3963.2]}}).toArray((err, docs) => {
                db.close()

                if (err) {
                    return done(err)
                }


                done({poi: docs})
            })
        })
    })

    /**
     * Validate that a client is within range of a point
     * @param {number} lon - longitude of the client
     * @param {number} lat - latitude of the client
     * @param {string} id - the identifier for the point your validating against
     */
    seneca.add({
        domain: 'map',
        role: 'api',
        cmd: 'checkDistance',
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
        },
        id: {
            required$: true,
            type$: 'string'
        }
    }, (msg, done) => {
        //TODO add more stuff so this works
        done()
    })

}