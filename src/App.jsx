import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { store } from './store/store'
import './assets/style/main.scss'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { UserEdit } from './pages/UserEdit'
import { PostEdit } from './pages/PostEdit'
import { Video } from './pages/Video'
import { Message } from './pages/Message'

import { NavLinks } from './cmps/NavLinks'
import { UserPosts } from './cmps/UserPosts'
import { UserTagged } from './cmps/UserTagged'
import { UserSaved } from './cmps/UserSaved'
import { scrollService } from './services/scroll.service'
import { ScreenOpenContext } from './contexts/ScreenOpenConext'
import { useToggle } from './customHooks/useToggle'


function RouteGuard({ children }) {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
  if (!loggedinUser) return <Navigate to="/" />
  return <>{children}</>
}

export function App() {

  const [navLinksDisplay, setNavLinksDisplay] = useState('')
  // const [isScreenOpen, setIsScreenOpen] = useState(false)
  const [isScreenOpen, setIsScreenOpen] = useToggle(false)


  function onOpenScreen() {
    setIsScreenOpen(true)
    scrollService.disableScroll()
  }

  function onCloseScreen() {
    setIsScreenOpen(false)
    scrollService.enableScroll()
  }

  return (
    <Provider store={store}>
      <Router>
        <ScreenOpenContext.Provider value={{ isScreenOpen, onOpenScreen, onCloseScreen }}>
          <section className={'main-layout ' + (isScreenOpen ? 'screen-open' : '')}>
            <section className="screen" onClick={onCloseScreen}></section>
            <NavLinks isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} navLinksDisplay={navLinksDisplay} />
            <main>
              <div className="main-container">
                <Routes>
                  <Route path="/" element={<Login setNavLinksDisplay={setNavLinksDisplay} />} />
                  <Route path="/home" element={
                    <RouteGuard>
                      <Home />
                    </RouteGuard>
                  } />
                  <Route element={<Profile isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} />} path="/profile/:userId" >
                    <Route path="/profile/:userId/posts" element={<UserPosts />} />
                    <Route path="/profile/:userId/tagged" element={<UserTagged />} />
                    {/* <Route path="/profile/:userId/saved" element={<UserSaved />} /> */}
                    {/* <Route path="/profile/:userId/reals" element={} /> */}
                    {/* <Route path="/profile/:userId/saved" element={} /> */}
                  </Route>
                  <Route element={<UserEdit />} path="/user/edit/:userId" />
                  {/* <Route element={<PostEdit />} path="/post/edit/" />
                  <Route element={<PostEdit />} path="/post/edit/:postId" /> */}
                  <Route element={<PostEdit />} path="/post/edit/:postId?" />
                  <Route element={<Video />} path="/video" />
                  <Route element={<Message />} path="/message" />
                </Routes>
              </div>
            </main>
          </section>
        </ScreenOpenContext.Provider>
      </Router>
    </Provider >
  )
}


