const request= require('postman-request')

 const forecast= (longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0d9a971e535a2b2a00dd37516f06ffe4&query='+ longitude +','+ latitude +'&uits=f'
   
    request({url,json:true},(error,{body}={})=>{
 
        if(error){
            callback('Unable to Connact Internet',undefined)
        }else if(body.error){
   
            callback('Unble to find Location..!!',undefined)
        }
        else{
            callback(undefined,'it is Currently' +' '+body.current.temperature +' ' +'degree out . There is a'+' '+body.current.precip+'% chance of rain')
        }

    })


 }


 module.exports=forecast