import { useEffect ,useState} from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { HomeHeader } from '../cpms/HomeHeader'
import { Users } from "../cpms/Users";
import { Posts } from "../cpms/Posts";
import { NavSide } from '../cpms/NavSide'
import { loadPosts } from '../store/actions/post.actions.js'
import { loadUsers } from '../store/actions/user.actions.js'

export function Home({isScreenOpen,onOpenScreen,onCloseScreen}) {

    const { posts } = useSelector(storeState => storeState.postModule)
    const { users } = useSelector(storeState => storeState.userModule)
    // console.log('users:', users)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    // console.log('loggedinUser:', loggedinUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (!loggedinUser) navigate('/')
        try {
            loadPosts()
            loadUsers()
        } catch (err) {
            console.log('err:', err)
        }

    }, [])

        function getOrderedUsers(){
            console.log('users:', users)
            const currUser = users.find(user=> user._id === loggedinUser._id)
            const orderedUsers = [currUser , ...users.filter(user=> user._id !== loggedinUser._id)]
            return orderedUsers
        }
  

   
    return (
        <section className="home">
            <HomeHeader loggedinUserId={loggedinUser._id} />
            <div className="main-content">
              {users.length &&  <Users users={getOrderedUsers()} />}
                <Posts isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} posts={posts} loggedinUser={loggedinUser}  />
            </div>
            <NavSide />
        </section>
    )
}