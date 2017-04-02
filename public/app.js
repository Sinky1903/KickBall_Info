var makeRequest = function(url, url, callback) {
  var request1 = new XMLHttpRequest();
  request1.open("GET", url1);
  request1.setRequestHeader("X-Auth-Token", "6be9d92146704edcab7842f097984a91");
  request1.onload = callback;
  request1.send();
  var request2 = new XMLHttpRequest();
  request2.open("GET", url2);
  request2.setRequestHeader("X-Auth-Token", "6be9d92146704edcab7842f097984a91");
  request2.onload = callback;
  request2.send();
};

var requestComplete = function() {
  if(this.status !== 200) {
    return;
  }

  var jsonString1 = this.responseText;
  var teams = JSON.parse(jsonString1).teams;
  var jsonString2 = this.responseText;
  var players = JSON.parse(jsonString2).players;

  showTeams(teams);
  console.log(teams);
  showPlayers(players);
  console.log(players);
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

var showTeamInfo = function(teams) {
  console.log(teams);
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

  var pTag5 = document.querySelector('#select-result5');
  pTag5.innerText = "Players: " + team.players;
}


var showPlayers = function(players) { 
  // var div = document.getElementById('players');
  // div.innerHTML = "";
  players.forEach(function(player) {
    var liName = document.createElement('li');
    liName.innerText = player.name;
    var liPosition = document.getElementById('li');
    liPosition.innerText = player.position;
    var liJerseyNo = document.getElementById('li');
    liJerseyNo.innerText = player.jerseyNumber;
    var liDOB = document.getElementById('li');
    liDOB.innerText = player.dateOfBirth;
    var liNationality = document.getElementById('li');
    liNationality.innerText = player.dateOfBirth;
    var liWorth = document.getElementById('li');
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
  var url1 = "http://api.football-data.org/v1/competitions/426/teams";
  var url2 = "http://api.football-data.org/v1/teams/322/players";

  var select = document.querySelector('select');
  select.onclick = function() {
    makeRequest(url1, url2, requestComplete);
  };
}

window.onload = app;