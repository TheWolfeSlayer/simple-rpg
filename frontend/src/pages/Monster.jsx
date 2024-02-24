import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Countdown from 'react-countdown';
import { useState } from 'react';

function Monster() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const GetHealth = () => {
    return `${user.details.Health} / ${user.details.MaxHealth}`
  }

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

  const HuntButton = () => {
    return (
      <Button onClick={doHunt}> {huntText} </Button>
    )
  }

  const AdventureButton = () => {
    return (
      <Button onClick={doAdventure}> {adventureText} </Button>
    )
  }

  const TrainingButton = () => {
    return (
      <Button onClick={doTraining}> {trainingText} </Button>
    )
  }

  const WorkButton = () => {
    return (
      <Button onClick={doWork}> {workText} </Button>
    )
  }

  const DungeonButton = () => {
    return (
      <Button onClick={doDungeon}> {dungeonText} </Button>
    )
  }

  const doHunt = () => {
    setHuntText(<Countdown date={Date.now() + huntCooldown} />);
    setTimeout(() => setHuntText("Hunt"), [huntCooldown])
    console.log('Am currently hunting')
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

  if(!user){
    navigate('/')
  } else {
    return (
      <div className='Action-Page'>
        <div className='Actions'>
          <div className='Hunt'>
            <HuntButton />
          </div>
          <div className='Adventure'>
            <AdventureButton />
          </div>
          <div className='Training'>
            <TrainingButton />
          </div>
          <div className='Work'>
            <WorkButton />
          </div>
          <div className='Dungeon'>
            <DungeonButton />
          </div>
        </div>
        <div className='Status-Info'>
          <div className='health'>
            <GetHealth />
          </div>
        </div>
      </div>
    )
  }
}

export default Monster