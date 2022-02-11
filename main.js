const chararters = {
    hero: {
        health: 100,
        emoji: "🦸🏼"
    },
    boss: {
        health: 100,
        emoji: "😈",
        attack: ()=> Math.floor(Math.random()*10),
        level: 1
    }
}

const companions = {
    pikachu: {
        cost: 150,
        emoji: "🐯",
        purchased: false,
        attack: 2

    }
}

let gold = 0
// function healthPercentage() { 
//     return chararters.boss.health / 6
//     console.log(healthPercentage());
// }


// const hero = {
//     health: 100,
//     emoji: "🦸🏼"
// }


// const boss = {
//     health: 100,
//     emoji: "😈"
// }

// levelBoss("boss")

// function levelBoss (boss)   {
//     if(chararters.boss.health < 0) {
//         chararters.boss.health = 100
//         chararters.boss.health * 2
//         chararters.boss.attack * 2
//      //    clearInterval(attackInterval)
//      updateBoss("boss")
//     }
// }


function healthPack() {
    if (gold >= 300) {
        chararters.hero.health = 100
    drawChar()
    gold -= 300
    document.getElementById('gold').innerText = gold

    }
}

function buyCompanion() {
    if (gold >= 150) {
        let heroElm = document.getElementById('hero').innerHTML
         
        heroElm += `
        <div>${companions.pikachu.emoji}</div>
        
        `
        drawChar()
    }
}
       


function attackBoss(name) {
   chararters.boss.health -= 5;
   if (chararters.boss.health == 0) {
       gold += 150
       
       document.getElementById('gold').innerText = gold
   }
   
  
   updateBoss(name)
}

let attackInterval = setInterval(bossAttack, 3000)

function bossAttack() {
    chararters.hero.health -= chararters.boss.attack();
    updateHero()
}

function drawChar() {
    let template = ''
   for(let key in chararters) {
       let character = chararters[key]
       template += `
       <div id="${key}" class="col-6 card">
           <h2 onclick="attackBoss('${key}')">${character.emoji}</h2>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${character.health}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="${character.health}"></div>
            </div>
        </div>
       `
   }
        document.getElementById("peeps").innerHTML = template
}

function updateBoss(name) {
    
    let bossHealthElem = document.getElementById(name)
    let bar = bossHealthElem.querySelector('.progress-bar')
    bar.style.width = chararters[name].health + "%"

    if(chararters.boss.health < 0) {
               if (chararters.boss.level <= 4) {
                chararters.boss.level += 1 } else {
                    alert ("you have defeated the Final Boss!")
                }
                if(chararters.boss.level == 2) {
               chararters.boss.health = 100
               chararters.boss.health *=2
                } if(chararters.boss.level == 3) {
                    chararters.boss.health = 100
                    chararters.boss.health *=3
                     } if(chararters.boss.level == 4) {
                        chararters.boss.health = 100
                        chararters.boss.health *=4
                         } 
         
         
    }
    



}
function updateHero() {
    let heroHealthElem = document.getElementById('hero')
    let bar = heroHealthElem.querySelector('.progress-bar')
    bar.style.width = chararters.hero.health + "%"

}

function resetGame() {
    chararters.boss.health = 100
    chararters.hero.health = 100
    drawChar()
}


drawChar()
