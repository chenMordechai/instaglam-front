import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useState, useRef } from 'react'
import { store } from './store/store'
import './assets/style/main.scss'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { UserEdit } from './pages/UserEdit'
import { PostEdit } from './pages/PostEdit'
import { Notification } from './pages/Notification'
import { Search } from './pages/Search'
import { Video } from './pages/Video'

import { NavLinks } from './cpms/NavLinks'
import { UserPosts } from './cpms/UserPosts'
import { UserTagged } from './cpms/UserTagged'
import { UserSaved } from './cpms/UserSaved'
import { scrollService } from './services/scroll.service'

export function App() {

  const [navLinksDisplay, setNavLinksDisplay] = useState('')
  const [isScreenOpen, setIsScreenOpen] = useState(false)

  let screen = useRef()

  function onOpenScreen() {
    setIsScreenOpen(true)
    scrollService.disableScroll()
    // screen.current
  }

  function onCloseScreen() {
    setIsScreenOpen(false)
    scrollService.enableScroll()
  }


  return (
    <Provider store={store}>
      <Router>
        <section className={'main-layout ' + (isScreenOpen ? 'screen-open' : '')}>
          <section ref={screen} className="screen" onClick={onCloseScreen}></section>
          <NavLinks navLinksDisplay={navLinksDisplay} />
          <main>
            <div className="main-container">
              <Routes>
                <Route element={<Login setNavLinksDisplay={setNavLinksDisplay} />} path="/" />
                <Route element={<Home isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} />} path="/home" />
                <Route element={<Profile isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} />} path="/profile/:userId" >
                  <Route path="/profile/:userId/posts" element={<UserPosts />} />
                  <Route path="/profile/:userId/tagged" element={<UserTagged />} />
                  {/* <Route path="/profile/:userId/saved" element={<UserSaved />} /> */}
                  {/* <Route path="/profile/:userId/reals" element={} /> */}
                  {/* <Route path="/profile/:userId/saved" element={} /> */}
                </Route>
                <Route element={<UserEdit />} path="/user/edit/:userId" />
                <Route element={<PostEdit />} path="/post/edit/" />
                <Route element={<PostEdit />} path="/post/edit/:postId" />
                <Route element={<Notification />} path="/notification/:userId" />
                <Route element={<Search />} path="/Search" />
                <Route element={<Video />} path="/Video" />
              </Routes>
            </div>
          </main>
        </section>
      </Router>
    </Provider>
  )
}


