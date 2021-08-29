let modInfo = {
	name: "接力树",
	id: "接力",


	//记得加上作者名
	author: "QwQe308",


	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "",
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.1</h3><br>
		- QwQe308制作.<br>
		- 添加p1~p4,当前endgame:1e500点数.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	for(i=1;i<=4;i++){
		for(i2=11;i2<=15;i2++) if(hasUpgrade(`p${i}`,i2)) gain = gain.mul(upgradeEffect(`p${i}`,i2))
		if(hasUpgrade(`p${i}`,24)) gain = gain.mul(upgradeEffect(`p${i}`,24))
	}
	gain = powsoftcap(gain,e(1e80),2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return `当前endgame:1e500点数`}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("1e500")
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(0.1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}