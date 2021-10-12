var cityContainerEl = document.querySelector("#citycontainer");
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
        //   response.json()
        //   .then(function(data) {
        //   console.log(data);
        //   displayRepos(data, user);
        // });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to capture city");
    });
  };

cityFormEl.addEventListener("submit", formSubmitHandler);