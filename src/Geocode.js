const request = require('request')

const geocode =(address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VyeWFwcmFrYXNoMTAyNCIsImEiOiJja2NteTE4MWMwNXl6MnlvYXVsY29na3F4In0.1rfcdpafOFAvZ3gjyLfsbw&limit=1'

    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('coundnt connect to network', undefined)
        }
        else if(body.features.length==0){callback('wrong location')}
        else{
            callback(undefined,{
                lat: body.features[0].center[0],
                lon: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode