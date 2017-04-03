var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "6be9d92146704edcab7842f097984a91");
  request.onload = callback;
  request.send();
};

var requestCompleteTeams = function(teamId) {
  if(this.status !== 200) {
    return;
  }

  var jsonString1 = this.responseText;
  var teams = JSON.parse(jsonString1).teams;

  showTeams(teams);
  console.log(teams);

  
};

var showTeams = function(teams) { 
  var select = document.getElementById('dropdown-teams');
  select.innerHTML = "";
  teams.forEach(function(team) {
    option = document.createElement('option');
    option.innerText = team.name;
    select.appendChild(option);
  });

  select.onchange = function(){
    var selected = this.value;
    console.log(teams);
    for (team of teams) {
      if (selected === team.name) {
        showTeamInfo(team);
      }
    }
  };
};

var showTeamInfo = function(team) {
  //TODO: clear previous info
  console.log(team._links.players.href);
  var url = team._links.players.href;
  makeRequest(url, requestCompletePlayers);
  // DOM stuff
  var pTag1 = document.querySelector('#select-result1');
  console.log(team.name);
  pTag1.innerText = "Name: " + team.name;

  var pTag2 = document.querySelector('#select-result2');
  pTag2.innerText = "NickName: " + team.shortName;

  var pTag3 = document.querySelector('#select-result3');
  pTag3.innerText = "Team Value: " + team.squadMarketValue;

  var pTag4 = document.querySelector('#select-result4');
  pTag4.innerHTML = '<a href="'+ team.crestUrl + '">badge</a>';
}

var requestCompletePlayers = function() {
  if(this.status !== 200) {
    return;
  }

  var jsonString = this.responseText;
  var players = JSON.parse(jsonString).players;

  showPlayers(players);
  console.log(players);

};


var showPlayers = function(players) { 
  // var div = document.getElementById('players');
  // div.innerHTML = "";
  players.forEach(function(player) {
    var liName = document.createElement('li');
    liName.innerText = player.name;
    var liPosition = document.createElement('li');
    liPosition.innerText = player.position;
    var liJerseyNo = document.createElement('li');
    liJerseyNo.innerText = player.jerseyNumber;
    var liDOB = document.createElement('li');
    liDOB.innerText = player.dateOfBirth;
    var liNationality = document.createElement('li');
    liNationality.innerText = player.dateOfBirth;
    var liWorth = document.createElement('li');
    liWorth.innerText = player.marketValue;
    var ul = document.querySelector('#player-results');
    ul.appendChild(liName);
    ul.appendChild(liPosition);
    ul.appendChild(liJerseyNo);
    ul.appendChild(liDOB);
    ul.appendChild(liNationality);
    ul.appendChild(liWorth);

  });
}

//   select.onchange = function(){
//     var selected = this.value;
//     console.log(players);
//     for (player of players) {
//       if (selected === player.name) {
//         showPlayerInfo(player);
//       }
//     }
//   };
// };


var app = function() {
  var url = "http://api.football-data.org/v1/competitions/426/teams";

  var select = document.querySelector('select');
  select.onclick = function() {
    makeRequest(url, requestCompleteTeams);
  };
}

window.onload = app;