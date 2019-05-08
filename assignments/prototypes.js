/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject (gameData){
  this.createdAt = gameData.createdAt;
  this.name = gameData.name;
  this.dimensions = gameData.dimensions;
  }

  GameObject.prototype.destroy = function(){return `${this.name} was removed from the game.`};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats (gameData){
  GameObject.call(this, gameData);
  this.healthPoints = gameData.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function(){return `${this.name} took damage.`};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
function Humanoid (gameData){
CharacterStats.call(this, gameData);
this.team = gameData.team;
this.weapons = gameData.weapons;
this.language = gameData.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function(){return `${this.name} offers a greeting in ${this.language}.`};
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
 

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!
// Hero  ==========================================================================================================
  function Hero (gameData){
    Humanoid.call(this, gameData);
    this.attackPower = gameData.attackPower;    // Base damage done
    this.critStrike = gameData.critStrike;      // Has a chance for an attack to do double damage
    this.armor = gameData.armor;                // Flat % damage reduction
  }
  Hero.prototype = Object.create(Humanoid.prototype);
  Hero.prototype.hDamageDone = function(){
    // Random number is generated to determine whether the attack will trigger a critical strike for double damage.
    let critRand = Math.random();
    if (critRand > 1-(this.critStrike/10)){return this.attackPower*2}
    else {return this.attackPower}
  }

  Hero.prototype.hDamageTaken = function(dmgTaken){
    let damage = Math.round(dmgTaken - ((dmgTaken/100)*this.armor));  // Calculate damage reduction from armor
    this.healthPoints = this.healthPoints - damage;                   // Re-calculate HP after hit
    console.log(`${this.name} took ${damage} damage! They have ${this.healthPoints}HP remaining...`);
  }
// Villain   ========================================================================================================
  function Villain (gameData){
    Humanoid.call(this, gameData);
    this.attackPower = gameData.attackPower;  // Base damage done
    this.strength = gameData.strength;        // Flat % dmg increase
    this.leech = gameData.leech;              // Has a chance to heal when taking damage for their leech amount.
  }

  Villain.prototype = Object.create(Humanoid.prototype);

  
  Villain.prototype.vDamageDone = function(){return this.attackPower + ((this.attackPower/100)*this.strength);}

  Villain.prototype.vDamageTaken = function(dmgTaken){
   let damage = dmgTaken;
   // Random number is generated to determine whether the hit will trigger their leech effect.
   let leechRand = Math.random();
    if (leechRand > 1-(this.leech/10)){damage = Math.round(dmgTaken - this.leech);}
    this.healthPoints = this.healthPoints - damage;
    console.log(`${this.name} took ${damage} damage! They have ${this.healthPoints}HP remaining...`);
  }

  // Characters created =================================================================================================

const SuperDave = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 100,
  name: 'SuperDave',
  team: 'PowerPuff Girls',
  weapons: [
    'Staff of Friendship',
  ],
  language: 'Common Tongue',
  attackPower: 4,
  critStrike: 4,
  armor:7,
})

const EvilErik = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 100,
  name: 'EvilErik',
  team: 'Order of the Wrong Side Pedestrian',  
  weapons: [
    'Club of Clubbing', 'Bulwark of a Silent Front'
  ],
  language: 'Common Tongue',
  attackPower: 4,
  strength: 6,
  leech: 3,
})

// FIGHT!!

function epicBattle(fighter1, fighter2){
  console.log(`${fighter1.name} and ${fighter2.name} are ready to battle! 3... 2.... 1...... FIGHT!`);
  let winner = '';
  while (fighter1.healthPoints > 0 && fighter2.healthPoints > 0){
    f1DmgDone = fighter1.hDamageDone();
    fighter2.vDamageTaken(f1DmgDone);
    f2DmgDone = fighter2.vDamageDone();
    fighter1.hDamageTaken(f2DmgDone);
  
  }
  winner = fighter1.healthPoints > 0 ? fighter1.name : fighter2.name;
  console.log(`${winner} has defeated their opponent! They are the winner!`);
}

// Un-comment the below to see who will win!

// epicBattle(SuperDave, EvilErik)