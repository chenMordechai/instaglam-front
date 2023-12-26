import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style/main.scss'


import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { NavLinks } from './cpms/NavLinks'
import { NavSide } from './cpms/NavSide'


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <NavLinks />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Profile />} path="/profile" />
            </Routes>
          </main>
          <NavSide />
        </section>
      </Router>
    </Provider>
  )
}


