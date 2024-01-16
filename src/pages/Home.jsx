import { useEffect, useState, useMemo } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { HomeHeader } from '../cpms/HomeHeader'
import { Users } from "../cpms/Users";
import { Posts } from "../cpms/Posts";
import { NavSide } from '../cpms/NavSide'
import { loadPosts } from '../store/actions/post.actions.js'
import { loadUsers } from '../store/actions/user.actions.js'
import { addFollowing, removeFollowing, logout } from '../store/actions/user.actions.js'

export function Home({ isScreenOpen, onOpenScreen, onCloseScreen }) {

    const { posts } = useSelector(storeState => storeState.postModule)
    const { users } = useSelector(storeState => storeState.userModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    // console.log('loggedinUser:', loggedinUser)
    const [updatedUser, setUpdatedUser] = useState(null)
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

    function getOrderedUsers() {
        if (!users.length) return []
        const currUser = users.find(user => user._id === loggedinUser._id)
        const orderedUsers = [currUser, ...users.filter(user => user._id !== loggedinUser._id)]
        return orderedUsers
    }

    function getNotFollowingUsers() {
        const loggedinUserFull = users.find(user => user._id === loggedinUser._id)
        const filteredUsers = users.filter(user => user.followers.every(f => f._id !== loggedinUser._id) && user._id !== loggedinUser._id)
        const filteredUsersWithCommonFollowing = filteredUsers.filter(filteredUser => {
            filteredUser.commonFollowings = []
            return filteredUser.followers.some(user => {
                return loggedinUserFull.following.some(u => {
                    if (u._id === user._id) {
                        filteredUser.commonFollowings.push(u.username)
                        return true
                    }
                })
            })
        })
        return filteredUsersWithCommonFollowing
    }

    // const calculation = useMemo(() =>
    //     getNotFollowingUsers(),
    //     [users]
    // );

    async function onAddFollowing(userId) {
        const user = users.find(user => user._id === userId)
        const miniUser = {
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        }
        const updatedUser = await addFollowing(miniUser, loggedinUser, 'fromHome')
        setUpdatedUser(updatedUser)
    }

    async function onRemoveFollowing(userId) {
        await removeFollowing(userId, loggedinUser._id, 'fromHome')
        setUpdatedUser(null)
    }

    async function onLogout() {
        try {
            await logout()
            console.log('Success Logout')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!loggedinUser) return ''
    return (
        <section className="home">
            <HomeHeader loggedinUserId={loggedinUser._id} />
            <div className="main-content">
                <Users users={getOrderedUsers()} />
                <Posts isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} posts={posts} loggedinUser={loggedinUser} />
            </div>
            <NavSide loggedinUser={loggedinUser} users={getNotFollowingUsers()} onAddFollowing={onAddFollowing} onRemoveFollowing={onRemoveFollowing} onLogout={onLogout} updatedUser={updatedUser} />
        </section>
    )
}