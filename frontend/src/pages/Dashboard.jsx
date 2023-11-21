import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const redirect = () => {
    navigate('/monster')
  }

  console.log(user)

  if (user) {
    return(
      <div className='dashboard'>
        <div className='dashboard-header'>
          <h1>Are you ready to hunt?</h1>
        </div>
        <div>
          <button className='start-button' onClick={redirect}>Start Hunting</button>
        </div>
      </div>
    )
    
  } 

  return (
    <div>Dashboard</div>
  )

  
}

export default Dashboard