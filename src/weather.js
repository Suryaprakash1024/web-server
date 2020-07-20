const request = require('request')

const weacode =(lat,lon,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3dc9005d0ab5bdf1e11cb31867854a13&query='+
    encodeURIComponent(lat)+','+encodeURIComponent(lon)+'&units=f'
    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('coundnt connect to network', undefined)
        }
        else if(body.error){callback(body.error.info)}
        else{
            callback(undefined,{
                temp: body.current.temperature,
                hum: body.current.humidity
            })
        }
    })
}
module.exports = weacode
