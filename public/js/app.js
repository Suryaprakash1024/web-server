const weatherform = document.querySelector('form')
const search = document.querySelector('input')
// const data = document.getElementById('Error')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const link = '/weather?address='+search.value
    fetch(link).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            document.getElementById("Data").innerHTML=data.error
        }
        else{
            document.getElementById("Data").innerHTML=
            "The temperature in "+data.place+" is "+data.temp+". The Humidity is "+data.hum
        }
    })
})
})

