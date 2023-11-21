import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Monster() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const GetGold = () => {
    return user.gold
  }

  if(!user){
    navigate('/')
  } else {
    return (
      <div>
        <div className='gold-count'>
          <GetGold />
        </div>
        <div className='Monster'>
          <img src='' alt='Monster'/>
        </div>
      </div>
    )
  }
}

export default Monster