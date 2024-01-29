import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import xmark from '../assets/icons/circle-xmark-solid.svg'
import xmark2 from '../assets/icons/xmark-solid.svg'
import { userService } from '../services/user.service.js'
import { UserPreview } from '../cmps/UserPreview.jsx'
import { SimpleHeader } from '../cmps/SimpleHeader'


export function Search({ onToggleSearchModal, goToChat }) {

  const [innerWidth, setInnerWidth] = useState('')
  const [search, setSearch] = useState({ txt: '' })
  const [users, setUsers] = useState(null)
  const { loggedinUser } = useSelector(storeState => storeState.userModule)

  useEffect(() => {
    if (!search.txt) return
    getResult()
  }, [search])

  useEffect(() => {
    setInnerWidth(window.innerWidth)

  }, [])

  // function isMobile() {
  //   return (window.innerWidth > 700) ? false : true
  // }

  // function getClass() {
  //   return (window.innerWidth > 700) ? 'big-modal' : 'page-mobile'
  // }

  async function onSubmitForm(ev) {
    ev.preventDefault()
    getResult()
  }

  async function getResult() {
    const users = await userService.query(search)
    setUsers(users)
  }

  function onChangeInput(ev) {
    const { name, value } = ev.target
    setSearch(prev => ({ ...prev, [name]: value }))
  }

  function isFollowing(userFollowers) {
    const user = userFollowers.find(u => u._id === loggedinUser._id)
    if (user) return 'Following'
    return userFollowers.length + ' followers'
  }

  function removeUser(userId) {
    setUsers(prev => prev.filter(u => u._id !== userId))
  }


  return (
    <section className={'search ' + ((innerWidth < 700) ? 'page-mobile' : 'big-modal')}>
      {innerWidth < 700 && <SimpleHeader h2Content="Search" onToggleSearchModal={onToggleSearchModal} />}
      {innerWidth > 700 && <h3>Search</h3>}

      <div className="form-container">
        <form onSubmit={onSubmitForm}>
          <input onChange={onChangeInput} type="text" name="txt" value={search.txt} placeholder="Search" />
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