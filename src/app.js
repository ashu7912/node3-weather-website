const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


// console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Defined Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine & Setup locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashutosh Nakhe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ashutosh Nakhe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        phone: '7972375340',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search text!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'No address Found !'
        })
    }
    geocode(address, (error, { latitude, longititude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast({ latitude, longititude }, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        }) 

//     res.send({
//             location: 'Kolhapur',
//             temprature: 36,
//             hummidity: 25
//     })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found'
    })
    // res.send('<h1>Help Sub page not Found</h1>')
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found'
    })
    // res.send('<h1>404</h1>')
})
// app.get('/help', (req, res) => {
//     res.send({string:'Help page'})
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//             location: 'Kolhapur',
//             temprature: 36,
//             hummidity: 25
//     })
// })


app.listen(port, () => {
    console.log(' Server is up on port '+ port)
})