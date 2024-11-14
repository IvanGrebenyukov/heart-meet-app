import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/pages/Login.tsx'
import { SignUpSecond } from './components/pages/SignUpSecond.tsx'
import { WelcomeScreen } from './components/pages/WelcomeScreen.tsx'

function App() {
  
  
  return (
    <BrowserRouter>
      <div className={'flex items-center justify-center h-screen bg-lightPink'}>
        <Routes>
          <Route path={'/'} element={<WelcomeScreen/>}/>
          <Route path={'login'} element={<Login />} />
          <Route path={'signup-first'} element={<Login />} />
          <Route path={'signup-second'} element={<SignUpSecond />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
  
}

export default App
