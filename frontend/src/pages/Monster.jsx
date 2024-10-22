import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';
import { update } from '../features/auth/authSlice'

function Monster() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  
  const [userMaxHealth, setUserMaxHealth] = useState(user.details.MaxHealth)
  const [userHealth, setUserHealth] = useState(user.details.Health)
  const [userLevel, setUserLevel] = useState(user.details.Level)
  const [userExperience, setUserExperience] = useState(user.details.Experience)
  const [neededExperience, setNeededExperiece] = useState(user.details.NeededExperience)
  
  const [userAttack, setUserAttack] = useState(user.stats.Attack)
  const [userDefense, setUserDefense] = useState(user.stats.Defense)
  const [userSword, setUserSword] = useState(user.stats.Sword)
  const [userArmor, setUserArmor] = useState(user.stats.Armor)
  const [userArea, setUserArea] = useState(user.stats.Area)

  const [userGold, setUserGold] = useState(user.inventory.Gold)
  const [userWoodCount, setUserWoodCount] = useState(user.inventory.Wood)
  const [userFishCount, setUserFishCount] = useState(user.inventory.Fish)
  const [userAppleCount, setUserAppleCount] = useState(user.inventory.Apple)
  const [userRubyCount, setUserRubyCount] = useState(user.inventory.Ruby)

  const [healthDisplay, setHealthDisplay] = useState(`Health : ${userHealth} / ${user.details.MaxHealth}`)
  const [goldDisplay, setGoldDisplay] = useState(`Gold : ${userGold}`)
  const [experienceDisplay, setExperienceDisplay] = useState(`${userExperience}XP / ${neededExperience}XP`)
  const [attackDisplay, setAttackDisplay] = useState(`Attack : ${userAttack}`)
  const [defenseDisplay, setDefenseDisplay] = useState(`Defense : ${userDefense}`)
  const [swordDisplay, setSwordDisplay] = useState(`${userSword}`)
  const [armorDisplay, setArmorDisplay] = useState(`${userArmor}`)
  const [woodDisplay, setWoodDisplay] = useState(`Wood: ${userWoodCount}`)
  const [fishDisplay, setFishDisplay] = useState(`Fish: ${userFishCount}`)
  const [appleDisplay, setAppleDisplay] = useState(`Apple: ${userAppleCount}`)
  const [rubyDisplay, setRubyDisplay] = useState(`Ruby: ${userRubyCount}`)

  const [huntText, setHuntText] = useState("Hunt");
  const [adventureText, setAdventureText] = useState("Adventure");
  const [trainingText, setTrainingText] = useState("Train");
  const [workText, setWorkText] = useState("Work");
  const [dungeonText, setDungeonText] = useState("Dungeon");
  const [healText, setHealText] = useState("Heal, 5 gold")
  let huntCooldown = 3000
  let adventureCooldown = 30000
  let trainingCooldown = 15000
  let workCooldown = 15000
  let dungeonCooldown = 300000

  const [bossHealth, setBossHealth] = useState(0)
  const [bossMaxHealth, setBossMaxHealth] = useState(0)
  const [dungeonButtons, setDungeonButtons] = useState([])

  const calculateDamage = (difficulty) => {
    let baseDamage = Math.floor(Math.random() * 10) + 25
    let damageDone = (baseDamage * userArea * difficulty) - userDefense
    let updatedHealth = Math.round(userHealth - damageDone)
    return updatedHealth
  }

  const calculateGold = (modifier) => {
    let baseGold = Math.floor(Math.random() * 5) + 10
    let boostedGold = baseGold * userArea * modifier
    setUserGold(Math.round(userGold + boostedGold))
  } 

  const calculateExp = (modifier) => {
    let baseExp = Math.floor(Math.random() * 5) + 10
    let expEarned = baseExp * userArea * modifier
    let newUserExperience = Math.round(userExperience + expEarned)

    if (newUserExperience > neededExperience) {
      setUserLevel(userLevel + 1)
      setUserExperience(newUserExperience - neededExperience)
      setNeededExperiece(neededExperience * 2.1)
      setUserMaxHealth(userMaxHealth + 5)
      setUserAttack(userAttack + 1)
      setUserDefense(userDefense + 1)
    } else {
      setUserExperience(newUserExperience)
    }
  }

  const workCommand = () => {
    let decision = Math.floor(Math.random() * 1000) + 1;
    switch (true) {
      case (decision <= 250) :
        setUserWoodCount(userWoodCount + (Math.floor(Math.random() * 6) + 1))
        break
      case (decision <= 500) :
        setUserFishCount(userFishCount + (Math.floor(Math.random() * 6) + 1))
        break
      case (decision <= 750) :
        setUserAppleCount(userAppleCount + (Math.floor(Math.random() * 6) + 1))
        break
      case (decision <= 900) :
        setUserRubyCount(userRubyCount + (Math.floor(Math.random() * 2) + 1))
        break
      case (decision > 900) :
        setUserGold(userGold + (Math.floor(Math.random() * 6) + 20))
        break
      default :
        console.log('work command error')
        break
    }
  }

  const updateStatus = (difficulty) => {
    if (difficulty) {
      let updatedHealth = calculateDamage(difficulty)
      if (updatedHealth < 0) {
        setUserHealth(1)
      } else {
        setUserHealth(updatedHealth)
        calculateGold(difficulty)
        calculateExp(difficulty)
      }
    } else {
      calculateExp(1.3)
    }
  }

  const doHunt = () => {
    const hunting = () => {
      updateStatus(1)
      setTimeout(() => {setHuntText("Hunt")}, [huntCooldown])
    }

    if (huntText === 'Hunt' && userHealth > 0) {
      setHuntText(<Countdown date={Date.now() + huntCooldown} />);
      hunting()
    }
  }

  const doAdventure = () => {
    const adventuring = () => {
      updateStatus(2.1)
      setTimeout(() => {setAdventureText("Adventure")}, [adventureCooldown])
    }

    if (adventureText === 'Adventure' && userHealth > 0) {
      setAdventureText(<Countdown date={Date.now() + adventureCooldown} />);
      adventuring()
    }
    
  }

  const doTraining = () => {
    const training = () => {
      setTrainingText("Train")
      updateStatus('Train')
    }

    if (trainingText === 'Train') {
      setTrainingText(<Countdown date={Date.now() + trainingCooldown} />);
      setTimeout(training, [trainingCooldown])
    }
    
  }

  const doWork = () => {
    const working = () => {
      setWorkText("Work")
      workCommand()
    }
    
    if (workText === 'Work') {
      setWorkText(<Countdown date={Date.now() + workCooldown} />);
      setTimeout(working, [workCooldown])
    }
  }

  const doDungeon = () => {
    const dungeonDiving = () => {
      setBossMaxHealth(300*userArea)
      setBossHealth(300*userArea)
      setDungeonButtons(["Light Attack", "Medium Attack", "Heavy Attack", "Heal, 50 gold", "Escape"])
      setHuntText("Unavailable")
      setAdventureText("Unavailable")
      setTrainingText("Unavailable")
      setWorkText("Unavailable")
      setHealText("Unavailable")
    }
    
    if (dungeonText === 'Dungeon') {
      setDungeonText(<Countdown date={Date.now() + dungeonCooldown} />);
      dungeonDiving()
      setTimeout(() => {setDungeonText("Dungeon")}, [dungeonCooldown])
    }
  }

  const BossHPDisplay = () => {
    if (bossMaxHealth > 0) {
      return(
        <div>
          Boss Health : {bossHealth} / {bossMaxHealth}
        </div>
      )
    } else {
      return
    }
  }

  const resetButtons = () => {
    setHuntText("Hunt")
    setAdventureText("Adventure")
    setTrainingText("Train")
    setWorkText("Work")
    setHealText("Heal, 5 gold")
  }

  const doHeal = () => {
    if (healText === "Heal, 5 gold") {
      if (userGold > 5 && userHealth < userMaxHealth) {
        setUserGold(userGold-5)
        setUserHealth(userMaxHealth)
      }
    } 
  }

  const dungeonButtonFunction = (dungeonAction) => {
    console.log(`user chose ${dungeonAction}`)
    const bossFightDamage = (userMultiplier, bossMultiplier) => {
      setUserHealth(Math.round(calculateDamage(userMultiplier)))
      if (userHealth > 0) {
        setBossHealth(Math.round(bossHealth - userAttack*bossMultiplier))
        if (bossHealth < 0) {
          setUserArea(userArea + 1)
          setDungeonButtons([])
          resetButtons()
        }
      } else {
        setDungeonButtons([])
        setBossHealth()
        setBossMaxHealth()
        setUserHealth(1)
        resetButtons()
      }
    }
    switch (dungeonAction) {
      case "Light Attack" :
        bossFightDamage(.75, 1.5)
        break
      case "Medium Attack":
        bossFightDamage(1.2, 3)
        break
      case "Heavy Attack":
        bossFightDamage(1.7, 5)
        break
      case "Heal, 50 gold":
        setUserHealth(userMaxHealth)
        setUserGold(userGold - 50)
        break
      case "Escape":
        setDungeonButtons([])
        setBossHealth()
        setBossMaxHealth()
        resetButtons()
        break
      default :
        break
    }
  }

  useEffect(() => {
    const GetStatus = () => {
      setHealthDisplay(`Health : ${userHealth} / ${userMaxHealth}`)
      setGoldDisplay(`Gold : ${userGold}`)
      setExperienceDisplay(`${userExperience}XP / ${neededExperience}XP`)
      setAttackDisplay(`Attack : ${userAttack}`)
      setDefenseDisplay(`Defense : ${userDefense}`)
      setSwordDisplay(`${userSword}`)
      setArmorDisplay(`${userArmor}`)
      setWoodDisplay(`Wood: ${userWoodCount}`)
      setFishDisplay(`Fish: ${userFishCount}`)
      setAppleDisplay(`Apple: ${userAppleCount}`)
      setRubyDisplay(`Ruby: ${userRubyCount}`)
      
    }

    const updateUserData = () => {
      const email = user.email
      const details = {
        MaxHealth: userMaxHealth,
        Health: userHealth,
        Level: userLevel,
        Experience: userExperience,
        NeededExperience: neededExperience
      }
      const stats = {
        Attack : userAttack,
        Defense : userDefense,
        Sword : userSword,
        Armor : userArmor,
        Area : userArea
      }
      const inventory = {
        Gold: userGold,
        Wood: userWoodCount,
        Fish: userFishCount,
        Apple: userAppleCount,
        Ruby: userRubyCount
      }
      const userData = {
        email,
        details,
        stats,
        inventory
      }
      dispatch(update(userData))
    }

    updateUserData()
    GetStatus()
  }, [dispatch, neededExperience, user.email, userAppleCount, userArea, userArmor, userAttack, userDefense, userExperience, userFishCount, userGold, userHealth, userLevel, userMaxHealth, userRubyCount, userSword, userWoodCount])

  if(!user){
    navigate('/')
  } else {
    return (
      <div className='Action-Page'>
        <div className='Actions'>
          <div className='Hunt Action'>
            <Button className='Hunt Action-Button' onClick={doHunt}> {huntText} </Button>
          </div>
          <div className='Adventure Action'>
            <Button className='Adventure Action-Button' onClick={doAdventure}> {adventureText} </Button>
          </div>
          <div className='Training Action'>
            <Button className='Training Action-Button' onClick={doTraining}> {trainingText} </Button>
          </div>
          <div className='Work Action'>
            <Button className='Work Action-Button' onClick={doWork}> {workText} </Button>
          </div>
          <div className='Dungeon Action'>
            <Button className='Dungeon Action-Button' onClick={doDungeon}> {dungeonText} </Button>
          </div>
          <div className='Heal Action'>
            <Button className='Heal Action-Button' onClick={doHeal}> {healText} </Button>
          </div>
          <div className='Shop Action'>
            <Button className='Shop Action-Button' > Shop </Button>
          </div>
        </div>
        <div className='dungeon-div'>
          <div className='Boss-HP'>
            <BossHPDisplay />
          </div>
          {dungeonButtons.map((dungeonButton) => (
            <div className='dungeon-button'>
              <Button key={dungeonButton} onClick={() => {dungeonButtonFunction(dungeonButton)}} > {dungeonButton} </Button>
            </div>
          ))}
        </div>
        <div className='Status-Info'>
          <div className='level Status'>
            Level : {userLevel}
          </div>
          <div className='area Status'>
            Area : {userArea}
          </div>
          <div className='health Status'>
            {healthDisplay}
          </div>
          <div className='gold Status'>
            {goldDisplay}
          </div>
          <div className='experience Status'>
            {experienceDisplay}
          </div>
          <div className='attack Status'>
            {attackDisplay}
          </div>
          <div className='defense Status'>
            {defenseDisplay}
          </div>
          <div className='sword Status'>
            {swordDisplay}
          </div>
          <div className='armor Status'>
            {armorDisplay}
          </div>
          <div className='inventory Status'>
            <div>
              {woodDisplay}
            </div>
            <div>
              {fishDisplay}
            </div>
            <div>
              {appleDisplay}
            </div>
            <div>
              {rubyDisplay}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Monster