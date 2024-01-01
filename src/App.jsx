import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style/main.scss'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { NavLinks } from './cpms/NavLinks'
// import { Header } from './cpms/Header'
import { UserPosts } from './cpms/UserPosts'
import { UserTagged } from './cpms/UserTagged'
import { UserSaved } from './cpms/UserSaved'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          {/* <Header /> */}
          <NavLinks />
          <main>
            <div className="main-container">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Profile />} path="/profile/:userId" >
                            <Route path="/profile/:userId/posts" element={<UserPosts />} />
                            <Route path="/profile/:userId/tagged" element={<UserTagged />} />
                            <Route path="/profile/:userId/saved" element={<UserSaved />} />
                            {/* <Route path="/profile/:userId/reals" element={} /> */}
                            {/* <Route path="/profile/:userId/saved" element={} /> */}
                 </Route>
              </Routes>
            </div>
          </main>
        </section>
      </Router>
    </Provider>
  )
}


