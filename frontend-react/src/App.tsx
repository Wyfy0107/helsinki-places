import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import Home from './pages/Home'
import MapView from './pages/MapView'

function App() {
  const history = useHistory()
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    let temp = !checked
    setChecked(temp)
    if (temp) {
      history.push('/map')
    } else {
      history.push('/')
    }
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          component={() => (
            <Home checked={checked} handleChange={handleChange} />
          )}
        />
        <Route
          exact
          path='/map'
          component={() => (
            <MapView checked={checked} handleChange={handleChange} />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
