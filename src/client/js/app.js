/* Global Variables */
//personal API key credentials
const cred = '&appid=c0071ac38646a1b38199175174f333cd&units=metric';
//base url for open weather API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

//async function that uses fetch() to make a GET request to the OpenWeatherMap API.
const getWeather = async (baseURL, zip, cred) => {
    const request = await fetch(baseURL + zip + cred);
    try {
        // Transform into JSON
        const data = await request.json();
        //console.log(data);
        return data;
    }
    // appropriately handle the error
    catch (error) {
        console.log('data can not be fetched', error);
    }
};

//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
//document.getElementById('generate').addEventListener('click', callBack);
//define APICall
function APICall(e) {
    //get user's input from the zip input section
    let zip = document.getElementById('zip').value;
    //get user's input from the feelings input section
    let feeling = document.getElementById('feelings').value;
    //call the retrieveWeather function inside the callBack with updated parameters
    getWeather(baseURL, zip, cred)
    //chain POST promise
    .then(function(data) {
          console.log(data);
          let temp = data.main.temp;
          console.log(temp);
          postData('/add', {
              date: newDate,
              temp: temp,
              feel: feeling
            });
        })
      //chain UI update promise
      .then(function(){
          updateUI()
      });
}


// POST request to add the API data, as well as data entered by the user
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    try {
        const newData = await response.json();
        console.log(newData);
        // appropriately handle the error
    } catch (error) {
        console.log('Unable to POST data', error);
    }
};


//Promise that updates the UI dynamically
const updateUI = async () => {
    try {
        const request = await fetch('/all');
        console.log(request);
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Today is ${allData.date}`;
        document.getElementById('temp').innerHTML = `It is ${allData.temp} degrees outside.`;
        document.getElementById('content').innerHTML = `Your latest journal entry: ${allData.feel}`;
    } catch (error) {
        console.log('Unable to update UI', error);
    }
};

export { APICall }
