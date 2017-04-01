var markRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.setRequestHeader("X-Auth-Token", "6be9d92146704edcab7842f097984a91");
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function() {
  if(this.status !== 200) {
    return;
  }

  var jsonString = this.responseText;
  console.log(this);
  var leagues = JSON.parse(jsonString).teams;

  showLeagueInfo(teams);
  console.log(teams);
};

var showLeagueInfo = function(teams) { 
  // console.log("HI");
  var select = document.getElementById('dropdown-leagues');
  leagues.forEach(function(team) {
    option.innerText = team.name;
    select.appendChild(option);
  })
};

var app = function() {
  var url = "http://api.football-data.org/v1/competitions/426/teams";
};

window.onload = app;