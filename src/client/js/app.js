/* Global Variables */
//personal API key credentials
const cred = '&country=DE=&maxRows=10&username=esnue';
//base url for open weather API
const baseURL = 'http://api.geonames.org/postalCodeSearchJSON?postalcode=';


//async function that uses fetch() to make a GET request to the Geonames API 
const getGeonames = async (baseURL, zip, cred) => {
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

//define APICall
function APICall() {
    //get user's input from the zip input section
    let zip = document.getElementById('zip').value;
    //call the retrieveWeather function inside the callBack with updated parameters
    getGeonames(baseURL, zip, cred)
    //chain POST promise
    .then(function(data) {
          console.log(data);
          let temp = data.main.temp;
          console.log(temp);
          postData('/add', {
              place: placeName,
              lng: lng,
              lat: lat
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
        document.getElementById('place').innerHTML = `Today is ${allData.placeName}`;
        document.getElementById('lng').innerHTML = `It is ${allData.lng} degrees outside.`;
        document.getElementById('lat').innerHTML = `Your latest journal entry: ${allData.lat}`;
    } catch (error) {
        console.log('Unable to update UI', error);
    }
};

export { APICall }
