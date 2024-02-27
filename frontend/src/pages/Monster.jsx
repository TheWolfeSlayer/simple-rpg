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
  
  const [userHealth, setUserHealth] = useState(user.details.Health)
  const [userMaxHealth, setUserMaxHealth] = useState(user.details.MaxHealth)
  const [userGold, setUserGold] = useState(user.details.Gold)
  const [userExperience, setUserExperience] = useState(user.details.Experience)
  const [userLevel, setUserLevel] = useState(user.details.Level)
  const [userSword, setUserSword] = useState(user.details.Sword)
  const [userArmor, setUserArmor] = useState(user.details.Armor)
  const [userArea, setUserArea] = useState(user.details.Area)

  const [huntText, setHuntText] = useState("Hunt");
  const [adventureText, setAdventureText] = useState("Adventure");
  const [trainingText, setTrainingText] = useState("Training");
  const [workText, setWorkText] = useState("Work");
  const [dungeonText, setDungeonText] = useState("Dungeon");
  let huntCooldown = 60000
  let adventureCooldown = 3600000
  let trainingCooldown = 300000
  let workCooldown = 300000
  let dungeonCooldown = 43200000

  const updateStatus = (damage, gold) => {
    setUserHealth(userHealth - damage)
    if (userHealth > 0) {
      setUserGold(userGold + gold)
    }
  }

  const updateUserData = () => {
    const id = user.id
    const email = user.email
    const password = user.password
    const details = {
      MaxHealth: userMaxHealth,
      Health: userHealth,
      Level: userLevel,
      Experience: userExperience,
      Gold: userGold,
      Sword: userSword,
      Armor: userArmor,
      Area: userArea
    }
    const userData = {
      id,
      email,
      password,
      details
    }
    dispatch(update(userData))
  }

  const doHunt = () => {
    const hunting = () => {
      setHuntText("Hunt")
      updateStatus(10, 10)
      updateUserData()
    }

    if (huntText === 'Hunt' && userHealth > 0) {
      setHuntText(<Countdown date={Date.now() + 500} />);
      setTimeout(hunting, [500])
    }
  }

  const doAdventure = () => {
    setAdventureText(<Countdown date={Date.now() + adventureCooldown} />);
    setTimeout(() => setHuntText("Adventure"), [adventureCooldown])
  }

  const doTraining = () => {
    setTrainingText(<Countdown date={Date.now() + trainingCooldown} />);
    setTimeout(() => setTrainingText("Training"), [trainingCooldown])
  }

  const doWork = () => {
    setWorkText(<Countdown date={Date.now() + workCooldown} />);
    setTimeout(() => setWorkText("Work"), [workCooldown])
  }

  const doDungeon = () => {
    setDungeonText(<Countdown date={Date.now() + dungeonCooldown} />);
    setTimeout(() => setDungeonText("Dungeon"), [dungeonCooldown])
  }

  const doHeal = () => {
    if (userGold > 5 && userHealth < userMaxHealth) {
      setUserGold(userGold-5)
      setUserHealth(userMaxHealth)
    }
  }

  const GetHealth = () => {
    return `${userHealth} / ${user.details.MaxHealth}`
  }
  
  const GetGold = () => {
    return `${userGold}`
  }

  if(!user){
    navigate('/')
  } else {
    return (
      <div className='Action-Page'>
        <div className='Actions'>
          <div className='Hunt'>
            <Button onClick={doHunt}> {huntText} </Button>
          </div>
          <div className='Adventure'>
            <Button onClick={doAdventure}> {adventureText} </Button>
          </div>
          <div className='Training'>
            <Button onClick={doTraining}> {trainingText} </Button>
          </div>
          <div className='Work'>
            <Button onClick={doWork}> {workText} </Button>
          </div>
          <div className='Dungeon'>
            <Button onClick={doDungeon}> {dungeonText} </Button>
          </div>
          <div className='Heal'>
            <Button onClick={doHeal}> Heal, 5 gold</Button>
          </div>
        </div>
        <div className='Status-Info'>
          <div className='health'>
            <GetHealth />
          </div>
          <div className='gold'>
            <GetGold />
          </div>
        </div>
      </div>
    )
  }
}

export default Monster