const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFkaGV5YSIsImEiOiJja2RoaHl3Y24yZnVuMnZ0OXVzMWZ6aTB2In0.Dtcq9sUTWSh2AFbED9UmyA&limit=1'
    request({url, json: true}, (error, {body})=>{
        if (error) {
            callback('Unable to connect to Location Service', undefined)
        } else if (body.error){
            callback('Invalid Data', undefined)
        } else {
            if (body.message){
                callback(body.message, undefined)
            } else {
                if(body.features.length>0){
                    const data = {
                        longititude: body.features[0].center[0],
                        latitude: body.features[0].center[1],
                        location: body.features[0].place_name
                    }
                    callback(undefined, data);
                } else {
                    callback('Bad Location Request', undefined);    
                }
            }
        }
    })
}

module.exports = geocode;