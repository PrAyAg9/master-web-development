let players = [];
let impostorCount = 1;
let gameStarted = false;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('vote').addEventListener('click', castVote);

function startGame() {
    players = [];
    for (let i = 1; i <= 5; i++) { // Example for 5 players
        players.push({ id: i, role: 'Innocent', votes: 0 });
    }
    const impostorIndex = Math.floor(Math.random() * players.length);
    players[impostorIndex].role = 'Impostor';

    gameStarted = true;
    updatePlayerList();
    document.getElementById('vote').disabled = false;
    document.getElementById('status').innerText = "Game has started! Discuss and vote!";
}

function updatePlayerList() {
    const playerListDiv = document.getElementById('player-list');
    playerListDiv.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement('div');
        div.innerText = `Player ${player.id}: ${player.role}`;
        playerListDiv.appendChild(div);
    });

    setupVotingOptions();
}

function setupVotingOptions() {
    const voteOptionsDiv = document.getElementById('vote-options');
    voteOptionsDiv.innerHTML = '';
    players.forEach(player => {
        if (player.role === 'Innocent') {
            const button = document.createElement('button');
            button.innerText = `Vote Player ${player.id}`;
            button.onclick = () => voteForPlayer(player.id);
            voteOptionsDiv.appendChild(button);
        }
    });
    voteOptionsDiv.style.display = 'block';
}

function voteForPlayer(playerId) {
    players[playerId - 1].votes += 1;
    document.getElementById('status').innerText = `You voted for Player ${playerId}.`;
    checkVotes();
}

function checkVotes() {
    const totalVotes = players.reduce((sum, player) => sum + player.votes, 0);
    if (totalVotes === players.filter(p => p.role === 'Innocent').length) {
        const maxVotes = Math.max(...players.map(p => p.votes));
        const votedOut = players.find(p => p.votes === maxVotes);
        if (votedOut.role === 'Impostor') {
            alert(`Player ${votedOut.id} was an Impostor! You win!`);
        } else {
            alert(`Player ${votedOut.id} was Innocent. The game continues!`);
        }
        resetGame();
    }
}

function resetGame() {
    players = [];
    impostorCount = 1;
    gameStarted = false;
    document.getElementById('vote').disabled = true;
    document.getElementById('status').innerText = "";
    document.getElementById('player-list').innerHTML = "";
    document.getElementById('vote-options').style.display = 'none';
}
