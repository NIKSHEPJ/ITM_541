
function initialize() {

  }

  navigator.geolocation.getCurrentPosition(success, error);
  //window.addEventListener("load", weatherRes);
  function success(position) {
   console.log(position);
   var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    let str = lat+','+lng;
    getWeatherInfo(str);
  }
  var nextDays;
  function getWeatherInfo(str) {
    
    fetch("https://weatherdbi.herokuapp.com/data/weather/"+str)
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
        currentConditions = json;
        document.getElementById('loc').innerHTML = json.region + " As of "+ json.currentConditions.dayhour;
        //document.getElementById('day').innerHTML = json.currentConditions.dayhour;
        document.getElementById('image').src = json.currentConditions.iconURL;
        document.getElementById('comment').innerHTML = json.currentConditions.comment;
        document.getElementById('humidity').innerHTML = "Humidity: "+ json.currentConditions.humidity;
        document.getElementById('precip').innerHTML = "precip: " + json.currentConditions.precip;
        document.getElementById('temp').innerHTML = "Temp: " + json.currentConditions.temp.c + ' \u2103/' + json.currentConditions.temp.f + ' \u2109';
        document.getElementById('wind').innerHTML = "Wind: " + json.currentConditions.wind.km + ' km/'+ json.currentConditions.wind.mile + ' miles';
        nextDays = json.next_days;
        //createTableForNextDays();
    });
  }
  function createTableForNextDays() {
      const nextDaysTable = document.getElementById('nextInfoTable');
      let tableHeaders = ["Day", "Temp Max", "Temp Min", "Comment"];
      
          while (nextDaysTable.firstChild) nextDaysTable.removeChild(nextDaysTable.firstChild)
          
          let nextTable = document.createElement('table')
          nextTable.className = 'nextTable';

          let nextTableHead = document.createElement('thead')
          nextTableHead.className = 'nextTableHead';

          let nextTableHeaderRow = document.createElement('tr')
          nextTableHeaderRow.className = 'nextTableHeaderRow';

          tableHeaders.forEach( header => {
              let nextHeader = document.createElement('th');
              nextHeader.style.padding='20px'
              //nextHeader.width = "30%"
              nextHeader.innerText = header;
              nextTableHeaderRow.append(nextHeader)
          });
          nextTableHead.append(nextTableHeaderRow);
          nextDaysTable.append(nextTableHead);

          let nextDaysTableBody = document.createElement('tbody')
          nextDaysTableBody.className = "nextDaysTable-body"
          nextTable.append(nextDaysTableBody)
          nextDaysTable.append(nextTable)
          for(let i = 1; i < nextDays.length; i++) {
            assignDataToTable(nextDays[i]);
          }
      
  }

  function assignDataToTable(item) {
      const nextDaysTable = document.querySelector('.nextTable');
      let nextDayTableBodyRow = document.createElement('tr')
      nextDayTableBodyRow.className = 'nextDayTableBodyRow'

      let nextDaysDay = document.createElement('td')
      nextDaysDay.style.padding = '20px'
      nextDaysDay.innerText = item.day;

      let nextDaysTempMin = document.createElement('td')
      nextDaysTempMin.style.padding = '20px'
      nextDaysTempMin.innerText = item.min_temp.c + ' \u2103';

      let nextDaysTempMax = document.createElement('td')
      nextDaysTempMax.style.padding = '20px'
      nextDaysTempMax.innerText = item.max_temp.c + ' \u2103';

      let nextDaysComment = document.createElement('td')
      nextDaysComment.style.padding = '20px'
      nextDaysComment.style.paddingLeft = '30px'
      nextDaysComment.innerText = item.comment;

      nextDayTableBodyRow.append(nextDaysDay, nextDaysTempMin, nextDaysTempMax, nextDaysComment);
      nextDaysTable.append(nextDayTableBodyRow);
  }
  function error(error) {
   console.log(error);
   switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
  }
  function getSearchStringInfo() {
    const search = document.getElementById('searchIn').value;
    getWeatherInfo(search);
  }