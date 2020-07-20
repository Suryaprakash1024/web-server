const express = require('express')
const path = require('path')
const hbs = require('hbs')
const yargs = require('yargs')
const geocode = require(path.join(__dirname,'../src/Geocode.js'))
const weacode = require(path.join(__dirname,'../src/weather.js'))

const app = express()

app.use(express.static(path.join(__dirname,'../public')))


app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        Name: 'Suryaprakash C'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        Name: 'Suryaprakash C'
    })
})
app.get('/help',(req,res)=>{
    
    res.render('help',{
        title: 'Help:',
        Name: 'Suryaprakash C'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
             error: 'Enter the address'
        })
    }
    //--------------------------------------Weather app------------------
    geocode(req.query.address,(error,{lat,lon,place}={})=>{
        if(error){
                return res.send({error})
        }
        else{
            // console.log(place)
            weacode(lat,lon,(error,{temp,hum})=>{
                if(error){
                    return res.send({error})
                }
                else
                {
                    res.send({
                        temp: temp,
                        hum:hum,
                        place:place
                            })
                }
            })
        }
    })
//--------------------------------------------   
})
app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404 error',
    Name: 'Suryaprakash',
    error:'Help page not found'
})
})
app.get('/products',(req,res)=>{
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.send('404 error')
})
app.listen(3000,()=>{
    console.log('Its running')
})