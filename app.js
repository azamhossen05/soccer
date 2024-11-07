let data = {
  teams: []
};

// Function to load data from localStorage
function loadData() {
  const storedData = localStorage.getItem('teamData');
  if (storedData) {
      data = JSON.parse(storedData);
      console.log('Loaded data:', data); // Debugging to check loaded data
  } else {
      console.log('No data found in localStorage');
  }
}

// Function to save data to localStorage
function saveData() {
  localStorage.setItem('teamData', JSON.stringify(data));
  console.log('Data saved:', data); // Debugging to check saved data
}

// Function to add a new team
function addTeam() {
  const teamName = document.getElementById('teamName').value;
  if (teamName.trim() !== '') {
      const newTeam = { name: teamName, players: [] };
      data.teams.push(newTeam);
      saveData();
      displayTeams();
      document.getElementById('teamName').value = '';
  } else {
      alert("Please enter a team name.");
  }
}

// Function to add a player to a team
function addPlayer(teamIndex) {
  const playerName = document.getElementById(`playerName${teamIndex}`).value;
  const playerImage = 'default-player.jpg'; // Placeholder image; replace with actual player images if available
  if (playerName.trim() !== '') {
      data.teams[teamIndex].players.push({ name: playerName, image: playerImage });
      saveData();
      displayTeams();
  } else {
      alert("Please enter a player name.");
  }
}

// Function to delete a player from a team
function deletePlayer(teamIndex, playerIndex) {
  data.teams[teamIndex].players.splice(playerIndex, 1);
  saveData();
  displayTeams();
}

// Function to display teams in index.html
function displayTeams() {
  const teamsContainer = document.getElementById('teamsContainer');
  teamsContainer.innerHTML = '';

  data.teams.forEach((team, index) => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'p-4 border rounded bg-white';
      
      teamDiv.innerHTML = `
          <h2 class="text-xl font-semibold mb-2">${team.name}</h2>
          <div class="mb-2">
              <input type="text" id="playerName${index}" placeholder="Enter player name" class="p-2 border rounded">
              <button onclick="addPlayer(${index})" class="bg-green-500 text-white py-1 px-2 rounded ml-2">Add Player</button>
          </div>
          <ul class="list-disc pl-5">
              ${team.players.map((player, playerIndex) => `
                  <li>
                      ${player.name} 
                      <button onclick="deletePlayer(${index}, ${playerIndex})" class="text-red-500 ml-2">Delete</button>
                  </li>
              `).join('')}
          </ul>
      `;

      teamsContainer.appendChild(teamDiv);
  });
}

// Function to display teams and players in teams.html
function displayTeamsOverview() {
  const teamOverview = document.getElementById('teamOverview');
  teamOverview.innerHTML = '';

  data.teams.forEach((team, index) => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'team-section p-4 border rounded bg-white';
      
      teamDiv.innerHTML = `<h2 class="text-xl font-semibold mb-2">${team.name}</h2><div class="player-slider flex overflow-x-auto space-x-4">`;

      // Loop through each player in the team
      team.players.forEach(player => {
          teamDiv.innerHTML += `
              <div class="player-card w-32 h-40 bg-gray-200 flex-shrink-0 rounded overflow-hidden shadow">
                  <img src="${player.image}" alt="${player.name}" class="w-full h-32 object-cover">
                  <p class="text-center mt-2">${player.name}</p>
              </div>
          `;
      });

      teamDiv.innerHTML += '</div>';
      teamOverview.appendChild(teamDiv);
  });
}

// Load data and display teams on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('teamsContainer')) {
      loadData();
      displayTeams();
  }
});
