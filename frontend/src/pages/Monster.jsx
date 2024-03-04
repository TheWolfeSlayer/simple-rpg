import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Countdown from 'react-countdown';
import { useState } from 'react';
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
  const [userGold, setUserGold] = useState(user.details.Gold)
  
  const [userAttack, setUserAttack] = useState(user.stats.Attack)
  const [userDefense, setUserDefense] = useState(user.stats.Defense)
  const [userSword, setUserSword] = useState(user.stats.Sword)
  const [userArmor, setUserArmor] = useState(user.stats.Armor)
  const [userArea, setUserArea] = useState(user.stats.Area)

  const [healthDisplay, setHealthDisplay] = useState(`Health : ${userHealth} / ${user.details.MaxHealth}`)
  const [goldDisplay, setGoldDisplay] = useState(`Gold : ${userGold}`)
  const [experienceDisplay, setExperienceDisplay] = useState(`${userExperience}XP / ${neededExperience}XP`)
  const [attackDisplay, setAttackDisplay] = useState(`Attack : ${userAttack}`)
  const [defenseDisplay, setDefenseDisplay] = useState(`Defense : ${userDefense}`)
  const [swordDisplay, setSwordDisplay] = useState(`${userSword}`)
  const [armorDisplay, setArmorDisplay] = useState(`${userArmor}`)

  const [huntText, setHuntText] = useState("Hunt");
  const [adventureText, setAdventureText] = useState("Adventure");
  const [trainingText, setTrainingText] = useState("Train");
  const [workText, setWorkText] = useState("Work");
  const [dungeonText, setDungeonText] = useState("Dungeon");
  let huntCooldown = 3000
  let adventureCooldown = 60000
  let trainingCooldown = 20000
  let workCooldown = 20000
  let dungeonCooldown = 300000

  const updateUserData = () => {
    const id = user.id
    const email = user.email
    const password = user.password
    const details = {
      MaxHealth: userMaxHealth,
      Health: userHealth,
      Level: userLevel,
      Experience: userExperience,
      NeededExperience: neededExperience,
      Gold: userGold,
    }
    const stats = {
      Attack : userAttack,
      Defense : userDefense,
      Sword : userSword,
      Armor : userArmor,
      Area : userArea
    }
    const userData = {
      id,
      email,
      password,
      details,
      stats
    }
    dispatch(update(userData))
    
  }

  const calculateDamage = (command) => {
    let difficulty = 0.1
    if (command === "Hunt" ) {
      difficulty = 1
    } else if (command === "Adventure") {
      difficulty = 2.1
    } else {
      difficulty = 0
    }
    let baseDamage = Math.floor(Math.random() * 10) + 25
    let damageDone = (baseDamage * userArea * difficulty) - userDefense
    let updatedHealth = userHealth - damageDone
    if (updatedHealth < 0) {
      setUserHealth(1)
      return false
    }
    setUserHealth(updatedHealth)
    return true
  }

  const calculateGold = () => {
    let baseGold = Math.floor(Math.random() * 5) + 10
    let boostedGold = baseGold * userArea
    setUserGold(userGold + boostedGold)
  } 

  const calculateExp = () => {
    let baseExp = Math.floor(Math.random() * 5) + 10
    let expEarned = baseExp * userArea
    setUserExperience(userExperience + expEarned)

    if (userExperience > neededExperience) {
      setUserLevel(userLevel + 1)
      setUserExperience(userExperience - neededExperience)
      setNeededExperiece(neededExperience * 2.1)
      setUserMaxHealth(userMaxHealth + 5)
      setUserAttack(userAttack + 1)
      setUserDefense(userDefense + 1)
    }
  }

  const updateStatus = (command) => {
    if (calculateDamage(command)){
      calculateGold()
      calculateExp()
    }
  }

  const doHunt = () => {
    const hunting = () => {
      setHuntText("Hunt")
      updateStatus("Hunt")
      
    }

    if (huntText === 'Hunt' && userHealth > 0) {
      setHuntText(<Countdown date={Date.now() + huntCooldown} />);
      
      console.log('hunting')
      setTimeout(hunting, [huntCooldown])
    }
  }

  const doAdventure = () => {
    const adventuring = () => {
      setHuntText("Adventure")
      updateStatus("Adventure")
    }

    setAdventureText(<Countdown date={Date.now() + adventureCooldown} />);
    setTimeout(() => adventuring, [adventureCooldown])
  }

  const doTraining = () => {
    const training = () => {
      setTrainingText("Train")
      updateStatus()
    }

    setTrainingText(<Countdown date={Date.now() + trainingCooldown} />);
    setTimeout(() => training, [trainingCooldown])
  }

  const doWork = () => {
    const working = () => {
      setWorkText("Work")
      updateStatus()
    }

    setWorkText(<Countdown date={Date.now() + workCooldown} />);
    setTimeout(() => working, [workCooldown])
  }

  const doDungeon = () => {
    const dungeonDiving = () => {
      setDungeonText("Dungeon")
      // Dungeon code here

      setUserArea(userArea + 1)
    }

    setDungeonText(<Countdown date={Date.now() + dungeonCooldown} />);
    setTimeout(() => dungeonDiving, [dungeonCooldown])
  }

  const doHeal = () => {
    if (userGold > 5 && userHealth < userMaxHealth) {
      setUserGold(userGold-5)
      setUserHealth(userMaxHealth)
    }
  }

  const GetStatus = () => {
    updateUserData()
    setHealthDisplay(`Health : ${userHealth} / ${user.details.MaxHealth}`)
    setGoldDisplay(`Gold : ${userGold}`)
    setExperienceDisplay(`${userExperience}XP / ${neededExperience}XP`)
    setAttackDisplay(`Attack : ${userAttack}`)
    setDefenseDisplay(`Defense : ${userDefense}`)
    setSwordDisplay(`${userSword}`)
    setArmorDisplay(`${userArmor}`)
    return( 
      <div className='Status-Info'>
        <div className='level'>
          Level : {userLevel}
        </div>
        <div className='health'>
          {healthDisplay}
        </div>
        <div className='gold'>
          {goldDisplay}
        </div>
        <div className='experience'>
          {experienceDisplay}
        </div>
        <div className='attack'>
          {attackDisplay}
        </div>
        <div className='defense'>
          {defenseDisplay}
        </div>
        <div className='sword'>
          {swordDisplay}
        </div>
        <div className='armor'>
          {armorDisplay}
        </div>
      </div>
    )
  }

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
            <Button className='Heal Action-Button' onClick={doHeal}> Heal, 5 gold </Button>
          </div>
          <div className='Shop Action-Button'>
            <Button className='Shop Action-Button' > Shop </Button>
          </div>
        </div>
        <GetStatus />
      </div>
    )
  }
}

export default Monster