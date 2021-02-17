

function createStartUI() {
    mainElement.innerHTML = createPlayerList()
}

function createPlayerList() {
    return `
    <div>
    <form id="player-info" class="needs-validation" novalidate>
                <div class="form-group">
                    <input type="text" class="form-control" id="input-player"
                        placeholder="Player Name">
                </div>
                    <button id="add-player"  class="btn btn-primary">Add Player</button>
            </form>
        </div>
            ${createPlayerListTable()}
    `
}

function createPlayerListTable() {
    return `
            <div>
           <table class="player-table">
    <tbody>
     ${addPlayer()}
    </tbody>
  </table>
  </div>  `
}

function addPlayer() {
    let storageList = [];
    for (let index = 0; index < localStorage.length; index++) {
        let player = JSON.parse(localStorage.getItem(localStorage.key(index)));
        storageList.push(player);
    }
    return storageList.map((players) =>
        players.map((player, index) =>
            ` <tr>
        <td>Player:</td>
        <td id="${player.playerName}" class="player-name">${player.playerName}</td>
        <td class="player-name">${player.playerPuan}</td>
      </tr>`
        )).join("")
}