var cityContainerEl = document.querySelector("#citycontainer");
var citySearchTerm = document.querySelector("#city-search-term");
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#cityname");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = nameInputEl.value.trim();

    if (cityName) {
    getCityName(cityName);

    // //clear old content
    // cityContainerEl.textContent = '';
    // nameInputEl.value = '';
    // } else {
    // alert("Please enter a real city");
}
};

function uvAPI(lat, lon) { 
  // "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=51b22f5daf88b1f52a19bc947c618268";
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=51b22f5daf88b1f52a19bc947c618268`)
        .then(function(response) {
            //response was successful
            if (response.ok) {
                console.log(response);
                response.json()
                .then(function(data) {
                console.log(data);
                var uVI = data.current.uvi
                console.log(uVI)
                  // return data;
                  var uvEL = document.createElement("p");
                  
                  // UVI background determinded by the UVI #
                  if (parseInt(uVI) < 3) {
                    uvEL.style.backgroundColor = "green";
                    // make UVI an interger 
                    //compare UVI to a certain threshold
                    // if passes a certain threshold, up to another threshold, it is a certain background color
                    //how would i background color?
                    // uvEL.style.backgroundColor = green, red, orange based on UVI index #
                  }
                  else if (parseInt(uVI) < 6) {
                    uvEL.style.backgroundColor = "yellow";
                  }
                  else {
                    uvEL.style.backgroundColor = "red";
                  }
                  uvEL.classList = 'list-item flex-row justify-space-between align-center';
                  uvEL.textContent = `UV Index: ${uVI}`;
                  cityContainerEl.appendChild(uvEL)
              });
            } else {
              alert('Error: ' + response.statusText);
            }
          })
          .catch(function(error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to capture city");
          });
    }; 

var getCityName = function(city) {
    // format the github api url
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=51b22f5daf88b1f52a19bc947c618268&units=imperial";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51b22f5daf88b1f52a19bc947c618268&units=imperial`;
    // make a request to the url
    fetch(apiUrl)
      .then(function(response) {
      //response was successful
      if (response.ok) {
          console.log(response);
          response.json()
          .then(function(data) {
          console.log(data);
          displayCityInfo(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to capture city");
    });
  };

  var displayCityInfo = function(weather, citySearch) {
    
    //had to figure out to get moment back in here, wtheck, how do i keep up with this? but I do??
    var date = moment().format("MM-DD-YYYY")

    //this was an wierd one to figure out.
    var skyStat = weather.weather[0].icon

    //console.log(skyStat)

    citySearchTerm.textContent = citySearch

    // if city pulls up
    if (weather) {

    // format city name 
    var searchedCity = weather.name
    console.log(searchedCity)
  
    // create a span element to hold repository name
    var titleEl = document.createElement("h3");
    titleEl.classList = "list-item flex-row justify-space-between align-center";
    titleEl.textContent = searchedCity + " " + date + " "

    //this made me so so mad
    var icon = document.createElement("img")
    icon.classList = 'list-item flex-row justify-space-between align-center';
    icon.src = "http://openweathermap.org/img/wn/" + skyStat + "@2x.png";
    // console.log(icon)

    titleEl.appendChild(icon);
    
    //psuedo code I need, to get the tempertature to the page as well
    var tempVal = weather.main.temp;
    var humidity = weather.main.humidity;
    var windSpeed = weather.wind.speed;
    
    // var uvAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + weather.coord.lat + "&lon=" + weather.coord.lon + "&exclude=minutely,hourly,alerts&appid=51b22f5daf88b1f52a19bc947c618268";
    //     fetch(uvAPI)
    //     .then(function(response) {
    //         //response was successful
    //         if (response.ok) {
    //             console.log(response);
    //             response.json()
    //             .then(function(data) {
    //             console.log(data);
    //             uVI = data.current.uvi
    //             console.log(uVI)
    //             var uvEL = document.createElement("p");
    //             uvEL.classList = 'list-item flex-row justify-space-between align-center';
    //             console.log(uVI, "uvi");
    //             titleEl.appendChild(uvEL)
    //           });
    //         } else {
    //           alert('Error: ' + response.statusText);
    //         }
    //       })
    //       .catch(function(error) {
    //         // Notice this `.catch()` getting chained onto the end of the `.then()` method
    //         alert("Unable to connect to capture city");
    //       });
    
    console.log(uvAPI)
    console.log(humidity)
    console.log(windSpeed);

    var tempertature = document.createElement("p");
     tempertature.classList = 'list-item flex-row justify-space-between align-center';
     tempertature.textContent = tempVal + "° F"

     

     //since temp worked out so well, i'm going ot save and figure out wind
     var windEL = document.createElement("p");
     windEL.classList = 'list-item flex-row justify-space-between align-center';
     windEL.textContent = "Wind: " + windSpeed + " MPH"
     
     var humidityEl = document.createElement("p");
     humidityEl.classList = 'list-item flex-row justify-space-between align-center';
     humidityEl.textContent = "Humidity " + humidity + " %"
    

    //  var uvEL = document.createElement("p");
    //  uvEL.classList = 'list-item flex-row justify-space-between align-center';
    //  console.log(uVI, "uvi");
    // uvEL.textContent = uvAPI(weather.coord.lat, weather.coord.lon);
    // console.log(uvAPI(weather.coord.lat, weather.coord.lon));

    titleEl.appendChild(tempertature);
    titleEl.appendChild(windEL);
    titleEl.appendChild(humidityEl);
    // titleEl.appendChild(uvEL)
    cityContainerEl.appendChild(titleEl);
    uvAPI(weather.coord.lat, weather.coord.lon);
    }
  };

cityFormEl.addEventListener("submit", formSubmitHandler);