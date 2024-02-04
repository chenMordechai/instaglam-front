
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { SimpleHeader } from '../cmps/SimpleHeader'
import { NotificationPreview } from '../cmps/NotificationPreview'
import { loadUser, updateNotificationSeen } from '../store/actions/user.actions.js'

export function Notification({ loggedinUserId ,onToggleNotificationModal}) {
  const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
  
  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      await loadUser(loggedinUserId)
      await updateNotificationSeen( loggedinUserId)
    } catch (err) {
      console.log('user action -> Cannot load user', err)
    }
  }

  function isMobile() {
    return !(window.innerWidth > 700)
  }

  return (
    <section className="notification">
      {isMobile() && <SimpleHeader h2Content="Notificatios" onToggleModal={onToggleNotificationModal} />}
      {!isMobile() && <h3>Notifications</h3>}

      <ul className="notification-list">
        {notifications?.reverse().map((n, i) => <li key={i}>
          <NotificationPreview userImgUrl={n.miniUser.imgUrl} userId={n.miniUser._id} username={n.miniUser.username} action={n.action} timeStamp={n.timeStamp} isButton={n.button ? true : false} postImgUrl={n.postImgUrl} comment={n.comment} />
        </li>)}
      </ul>
    </section>
  )
}