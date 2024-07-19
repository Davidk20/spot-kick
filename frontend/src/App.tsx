import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import HomeView from './views/home-view'
import GameView from './views/game-view'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView/>} />
        <Route path="/game" element={<GameView/>} />
      </Routes>
    </Router>
  )
}

export default App
