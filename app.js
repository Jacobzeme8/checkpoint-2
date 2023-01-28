
const upgradesBackup = [
  {
    name: "pickaxe",
    value: 5,
    price: 50,
    type: "manual",
    icon: "mdi-pickaxe",
    numberPurchased : 0,
  },
  {
    name: "shovel",
    value: 1,
    price: 10,
    type: "manual",
    icon: "mdi-shovel",
    numberPurchased : 0
  },
  {
    name: "mouseWorkers",
    value: 1,
    price: 75,
    type: "auto",
    icon: "mdi-rodent",
    numberPurchased : 0
  },
  {
    name: "robomouse",
    value: 5,
    price: 125,
    type: "auto",
    icon: "mdi-robot-happy",
    numberPurchased : 0
  }
]

let upgrades = upgradesBackup;

let cheese = 200;
let manualClick = 1;
let autoClick = 0;

function moonClick(){
  cheese += manualClick;
  drawCheese()
}

function drawClicks(){
  let manualMineElem = document.getElementById("manual-mine")
  manualMineElem.innerText = manualClick
  let autoMineElem = document.getElementById("auto-mine")
  autoMineElem.innerText = autoClick
}

function drawCheese(){
  let cheeseElem = document.getElementById("cheese")
  cheeseElem.innerText = cheese
}

function drawUpgrades(){
  let autoUpgradesElem = document.getElementById("auto-upgrades")
  let manualUpgradesElem = document.getElementById("manual-upgrades")
  let manualTemplate = ""
  let  autoTemplate = ''
  upgrades.forEach(u => {
    if(u.type == 'manual'){
      manualTemplate += `<div onclick="buyUpgrade('${u.name}')" class="row d-flex align-items-center p-3 upgrade-row text-yellow">
      <div class="col-4 text-center"><span class="mdi ${u.icon} fs-3"><span class="fs-5">${u.name}</span></span></div>
      <div class="col-4 text-center">Cheese: ${u.price}</div>
      <div class="col-4">+${u.value} per Click</div>
    </div>`

    }
    else{
      autoTemplate += `<div onclick="buyUpgrade('${u.name}')" class="row d-flex align-items-center p-3 upgrade-row text-yellow">
      <div class="col-4 text-center"><span class="mdi ${u.icon} fs-3"><span class="fs-5">${u.name}</span></span></div>
      <div class="col-4 text-center">Cheese: ${u.price}</div>
      <div class="col-4">+${u.value} per Click</div>
    </div>`
    }
  

    
  
})

// @ts-ignore
autoUpgradesElem.innerHTML = autoTemplate
// @ts-ignore
manualUpgradesElem.innerHTML = manualTemplate
//   let manualUpgrades = upgrades.filter(upgrade => upgrade.type == "manual")
//   let manualUpgradesElem = document.getElementById("manual-upgrades")
//   let manualUpgradesTemplate = ` `
//   manualUpgrades.forEach(upgrade => manualUpgradesTemplate+=`
  // <div onclick="buyUpgrade('${upgrade.name}')" class="row d-flex align-items-center p-3 upgrade-row text-yellow">
  //             <div class="col-4 text-center"><span class="mdi ${upgrade.icon} fs-3"><span class="fs-5">${upgrade.name}</span></span></div>
  //             <div class="col-4 text-center">Cheese: ${upgrade.price}</div>
  //             <div class="col-4">+${upgrade.value} per Click</div>
  //           </div>`
            
//             )
            
//   manualUpgradesElem.innerHTML = manualUpgradesTemplate

//   let autoUpgrades = upgrades.filter(upgrade => upgrade.type == "auto")
//   let autoUpgradesElem = document.getElementById("auto-upgrades")
//   let autoUpgradesTemplate = ` `
//   autoUpgrades.forEach(upgrade => autoUpgradesTemplate += `
//   <div onclick="buyUpgrade('${upgrade.name}')" class="row d-flex align-items-center p-3 upgrade-row text-yellow">
//               <div class="col-4 text-center"><span class="mdi ${upgrade.icon} fs-3"><span class="fs-5">${upgrade.name}</span></span></div>
//               <div class="col-4 text-center">Cheese: ${upgrade.price}</div>
//               <div class="col-4">+${upgrade.value} per Click</div>
//             </div>`)
//   autoUpgradesElem.innerHTML = autoUpgradesTemplate
}

function buyUpgrade(upgradeName){
 let purchasedUpgrade = upgrades.find(upgrade => upgrade.name == upgradeName)
 if(purchasedUpgrade.type == "manual" && cheese >= purchasedUpgrade.price){
  manualClick += purchasedUpgrade.value
  cheese-= purchasedUpgrade.price
  upgrades.forEach(upgrade => {if(purchasedUpgrade.name == upgrade.name){upgrade.price = upgrade.price*1.25; upgrade.numberPurchased++}})


 } else if(purchasedUpgrade.type == "auto" && cheese >= purchasedUpgrade.price){
  autoClick+= purchasedUpgrade.value
  cheese -= purchasedUpgrade.price
  upgrades.forEach(upgrade => {if(purchasedUpgrade.name == upgrade.name){upgrade.price = upgrade.price*1.25; upgrade.numberPurchased++}})
 } else {window.alert("Get more Cheesey bits to purchase an upgrade! squeek!!")}
 drawUpgrades()
 drawClicks()
 drawCheese()
 updateUpgradeNumbers()
}

function autoMineClicker(){
  console.log(cheese)
  cheese += autoClick
  drawCheese()
}

function updateUpgradeNumbers(){
  let upgradeRowElem = document.getElementById("upgrade-row")
  upgrades.forEach(upgrade => {let upgradeP = upgradeRowElem.querySelector(`p.${upgrade.icon}`);
   upgradeP.innerHTML = ` X ${upgrade.numberPurchased}`})
}

setInterval(autoMineClicker, 3000)



drawUpgrades()
drawCheese()
drawClicks()
updateUpgradeNumbers()