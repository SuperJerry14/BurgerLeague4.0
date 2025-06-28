
let burgers = 0;
let bps = 0;
let prestigePoints = 0;
let heroes = [
  { name: 'Arachnid Lad', cost: 50, bps: 1 },
  { name: 'Thore', cost: 150, bps: 3 },
  { name: 'Optimus Subprime', cost: 500, bps: 10 },
  { name: 'Compy Comrade', cost: 2000, bps: 30 },
  { name: 'Irony Man', cost: 10000, bps: 100 }
];
let heroCounts = Array(heroes.length).fill(0);
let achievements = [
  { name: "First Burger", condition: () => burgers >= 1, unlocked: false },
  { name: "Burger Apprentice", condition: () => burgers >= 100, unlocked: false },
  { name: "Hero Buyer", condition: () => heroCounts[0] > 0, unlocked: false },
  { name: "That Guy Slayer", condition: () => burgers >= 50000, unlocked: false },
  { name: "???" , condition: () => prestigePoints >= 1, unlocked: false }
];

function clickBurger() {
  burgers++;
  update();
}

function buyHero(index) {
  if (burgers >= heroes[index].cost) {
    burgers -= heroes[index].cost;
    heroCounts[index]++;
    heroes[index].cost = Math.floor(heroes[index].cost * 1.15);
    update();
  }
}

function update() {
  bps = heroes.reduce((sum, h, i) => sum + h.bps * heroCounts[i], 0);
  document.getElementById('burgers').innerText = `🍔 Burgers: ${Math.floor(burgers)}`;
  document.getElementById('bps').innerText = `BPS: ${bps}`;
  document.getElementById('heroes').innerHTML = heroes.map((h, i) =>
    `<div>${h.name} (${heroCounts[i]}) - ${h.bps} BPS <button onclick="buyHero(${i})">Buy (${h.cost})</button></div>`
  ).join('');
  achievements.forEach((a, i) => {
    if (!a.unlocked && a.condition()) {
      a.unlocked = true;
      document.getElementById('popup').innerText = `Achievement Unlocked: ${a.name}`;
      document.getElementById('popup').classList.remove('hidden');
      setTimeout(() => document.getElementById('popup').classList.add('hidden'), 3000);
    }
  });
  document.getElementById('achievements').innerHTML = achievements.map(a =>
    `<div>${a.unlocked ? a.name : '???'}</div>`
  ).join('');
  if (burgers >= 50000) {
    document.getElementById('finalBoss').classList.remove('hidden');
  }
}

function prestige() {
  if (burgers >= 10000) {
    prestigePoints++;
    burgers = 0;
    heroCounts.fill(0);
    heroes.forEach((h, i) => h.cost = [50, 150, 500, 2000, 10000][i]);
    alert("Prestiged! x2 burger gain activated.");
  }
}

setInterval(() => {
  burgers += bps / 10;
  update();
}, 100);
