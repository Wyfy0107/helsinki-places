import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import MapView from './pages/MapView'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/map' component={MapView} />
      </Switch>
    </div>
  )
}

export default App
