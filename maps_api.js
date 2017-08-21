module.exports = function api( options ) {

    this.add( 'domain:map,role:controller,path:id', function( msg, respond ) {
        switch (msg.request$.method) {
            case 'DELETE':
                this.act({
                    domain: 'map',
                    role: 'api',
                    cmd: 'removePoint',
                    id: msg.args.params.id,
                }, respond )
                break
        }
    })
    this.add( 'domain:map,role:controller,path:coord', function( msg, respond ) {
        switch (msg.request$.method) {
            case 'GET':
                this.act({
                    domain: 'map',
                    role: 'api',
                    cmd: 'getPoints',
                    lon: msg.args.params.lon,
                    lat: msg.args.params.lat,
                }, respond)
                break
        }
    })

    this.add( 'init:api', function( msg, respond ) {
        this.act('role:web',{routes:{
            prefix: '/api/map',
            pin:    'role:controller,domain:map,path:*',
            map: {
                id: { GET:true, DELETE:true, suffix:'/:id' },
                coord: { GET:true, suffix:'/:lon/:lat' }
            }
        }}, respond )
    })
}
