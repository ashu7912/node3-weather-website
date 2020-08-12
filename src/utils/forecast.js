const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52ef14122fa25ebd87178029a2c0ac07&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if (body.error){
            callback('Unable to find Location', undefined);
        } else {
            const temprature = body.current.temperature
            const feelsLikeTemp = body.current.feelslike
            const deprication = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined,deprication+'. It is currently '+temprature+' degrees out. It feels like '+feelsLikeTemp+' degrees out. Humidity: '+humidity)
        }
    })
}

module.exports = forecast