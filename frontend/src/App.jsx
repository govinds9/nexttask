import {Routes,Route} from 'react-router-dom'
//import {ToastContainer} from 'react-toastify'

import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Protectroute from './router/Protectroute.jsx'

function App() {
  

  return (
 <div>
 


  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route  path='/signup' element={<Signup/>} />
    <Route  path='/home' element={
      <Protectroute>
      <Home/>
    </Protectroute>
    }
     />
  </Routes>

  
 </div>
  )
}

export default App
