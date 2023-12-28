import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style/main.scss'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { NavLinks } from './cpms/NavLinks'
import { Header } from './cpms/Header'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <Header />
          <NavLinks />
          <main>
            <div className="main-container">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Profile />} path="/profile" />
              </Routes>
            </div>
          </main>
        </section>
      </Router>
    </Provider>
  )
}


