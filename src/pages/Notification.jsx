
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"

import { SimpleHeader } from '../cpms/SimpleHeader'
import { NotificationPreview } from '../cpms/NotificationPreview'
import { loadUser, updateNotificationSeen } from '../store/actions/user.actions.js'

export function Notification({ loggedinUserId }) {

  const { userId } = useParams()
  const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      await loadUser(userId || loggedinUserId)
      await updateNotificationSeen(userId || loggedinUserId)
    } catch (err) {
      console.log('user action -> Cannot load user', err)
    }
  }

  function isMobile() {
    return (window.innerWidth > 700) ? false : true
  }

  function getClass() {
    return (window.innerWidth > 700) ? 'big-modal' : 'page-mobile'
  }

  return (
    <section className={'notification ' + getClass()}>
      {isMobile() && <SimpleHeader h2Content="Notificatios" />}
      {!isMobile() && <h3>Notifications</h3>}

      <ul className="notification-list">
        {notifications?.reverse().map((n, i) => <li key={i}>
          <NotificationPreview userImgUrl={n.miniUser.imgUrl} userId={n.miniUser._id} username={n.miniUser.username} action={n.action} timeStamp={n.timeStamp} isButton={n.button ? true : false} postImgUrl={n.postImgUrl} comment={n.comment} />
        </li>)}
      </ul>
    </section>
  )
}