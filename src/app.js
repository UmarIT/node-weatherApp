const path=require('path')
const express =require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast') 

const app =express()
const port = process.env.PORT || 3000
//Define Path for Express Config
const PublicdirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
//setup static directory to serve
app.use(express.static(PublicdirectoryPath))
//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewspath)
hbs.registerPartials(partialpath)
// for Home Page
app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App',
         name:'Umar Abid'
    })
})
//For About Page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Umar Abid'
    })
})

//For Help Page

app.get('/help',(req,res)=>{

    res.render('help',{
        title:" Help Page",
        name:" Umar Abid"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must Provide a Address.!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

})

    // res.send({
    //     forecast:'Hot',
    //     location:'New York',
    //     address:req.query.address
    // })


app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'Page Not Found',
        name:'Ali salman',
        errormessage:'Artical not found'
        
    })
})
app.get('*',(req,res)=>{

    res.render('404page',{

  title:'404 Page',
  name:"Umar Abid",
  errormessage:'Page not found'

    })
})



app.listen(port, () => {
 console.log('Server is up on port ' + port)
})
