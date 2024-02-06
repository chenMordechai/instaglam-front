import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import xmark from '../assets/icons/circle-xmark-solid.svg'
import xmark2 from '../assets/icons/xmark-solid.svg'
import { userService } from '../services/user.service.js'
import { UserPreview } from '../cmps/UserPreview.jsx'
import { SimpleHeader } from '../cmps/SimpleHeader'
import { useForm } from '../customHooks/useForm'


export function Search({ onToggleSearchModal, goToChat }) {

  const [users, setUsers] = useState(null)
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
  const [search, setSearch, handleChange] = useForm({ txt: '' })

  useEffect(() => {
    if (!search.txt) return
    getResult()
  }, [search])

  async function onSubmitForm(ev) {
    ev.preventDefault()
    getResult()
  }

  async function getResult() {
    const users = await userService.query(search)
    setUsers(users)
  }

  function isFollowing(userFollowers) {
    const user = userFollowers.find(u => u._id === loggedinUser._id)
    if (user) return 'Following'
    return userFollowers.length + ' followers'
  }

  function removeUser(userId) {
    setUsers(prev => prev.filter(u => u._id !== userId))
  }

  function isMobile() {
    return !(window.innerWidth > 700)
  }


  return (
    <section className="search">
      {isMobile() && <SimpleHeader h2Content="Search" onToggleModal={onToggleSearchModal} />}
      {!isMobile() && <h3>Search</h3>}

      <div className="form-container">
        <form onSubmit={onSubmitForm}>
          <input autoComplete="off" onChange={handleChange} type="text" name="txt" value={search.txt} placeholder="Search" />
          <img onClick={() => setSearch({ txt: '' })} src={xmark} />
        </form>
      </div>

      {users && <div className="result-container">
        <ul>
          {users.map(user => <li key={user._id}>
            <UserPreview goToChat={goToChat} userId={user._id} imgUrl={user.imgUrl} username={user.username} spanContent={user.fullname + ' ' + isFollowing(user.followers)} btnContent={<img src={xmark2} />} func={removeUser} />
          </li>)}
        </ul>
      </div>}
    </section>
  )
}