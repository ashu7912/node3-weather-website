console.log('Client Side Javascript File is Loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })
const getWeather = (address) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+address).then((res) => {
        res.json().then((data) =>{
            if (data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log('WeatherData:>>',data)
            }
        })
    })
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('testing >', location);
    getWeather(location)
})