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

var getCityName = function(city) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=51b22f5daf88b1f52a19bc947c618268";
  
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
    
    var date = moment().format("MM-DD-YYYY")

    var skyStat = weather.weather[0].icon

    //console.log(skyStat)

    citySearchTerm.textContent = citySearch
    
    // if city pulls up
    if (weather) {

    // format repo name
    var searchedCity = weather.name
    console.log(searchedCity)
  
    // create a span element to hold repository name
    var titleEl = document.createElement("h3");
    titleEl.classList = "list-item flex-row justify-space-between align-center";
    titleEl.textContent = searchedCity + " " + date + " "

    var icon = document.createElement("img")
    icon.src = "http://openweathermap.org/img/wn/" + skyStat + "@2x.png";
    // console.log(icon)

    titleEl.appendChild(icon);
    
    
    // // create a status element
    // var statusEl = document.createElement("span");
    // statusEl.classList = "flex-row align-center";

    // // check if current repo has issues or not
    // if (repos[i].open_issues_count > 0) {
    // statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    // } else {
    // statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

    // // append to container
    // repoEl.appendChild(statusEl);

    // append container to the dom
    cityContainerEl.appendChild(titleEl);
    }
  };

cityFormEl.addEventListener("submit", formSubmitHandler);