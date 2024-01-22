import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { HomeHeader } from '../cpms/HomeHeader'
import { Users } from "../cpms/Users";
import { Posts } from "../cpms/Posts";
import { NavSide } from '../cpms/NavSide'
import { getActionCommentAdd, getActionCommentRemove, getActionLikePostAdd, getActionLikePostRemove, loadPosts, getActionAddPost, getActionUpdatePost, getActionRemovePost } from '../store/actions/post.actions.js'
import { addFollowing, removeFollowing, logout, loadUsers, loadUser } from '../store/actions/user.actions.js'
import { socketService } from '../services/socket.service.js'

export function Home({ isScreenOpen, onOpenScreen, onCloseScreen }) {

    const { posts } = useSelector(storeState => storeState.postModule)
    const { users } = useSelector(storeState => storeState.userModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
    const [newNotifications, setNewNotifications] = useState(false)
    const [updatedUsers, setUpdatedUsers] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        if (!loggedinUser) navigate('/')
        try {
            await loadPosts()
            await loadUsers()
            await loadUser(loggedinUser._id)

        } catch (err) {
            console.log('err:', err)
            navigate('/')
        }
    }

    useEffect(() => {
        socketService.on('post-added', post => {
            dispatch(getActionAddPost(post))
        })
        socketService.on('post-updated', post => {
            dispatch(getActionUpdatePost(post))
        })
        socketService.on('post-removed', postId => {
            dispatch(getActionRemovePost(postId))
        })
        socketService.on('like-post-added', ({ postId, likedBy }) => {
            dispatch(getActionLikePostAdd(postId, likedBy))
        })
        socketService.on('like-post-removed', ({ postId, likeById }) => {
            dispatch(getActionLikePostRemove(postId, likeById))
        })
        socketService.on('comment-added', ({ postId, comment }) => {
            dispatch(getActionCommentAdd(postId, comment))
        })
        socketService.on('comment-removed', ({ postId, commentId }) => {
            dispatch(getActionCommentRemove(postId, commentId))
        })

        socketService.emit('user-watch', loggedinUser._id)
        socketService.on('notification-added', () => {
            setNewNotifications(true)
        })

        return () => {
            socketService.off('post-added')
            socketService.off('post-updated')
            socketService.off('post-removed')
            socketService.off('like-post-added')
            socketService.off('like-post-removed')
            socketService.off('comment-added')
            socketService.off('comment-removed')
            socketService.off('notification-added')
        }

    }, [])

    useEffect(() => {
        // const notSeen = notifications?.some(n => !n.seen)
        // if (notSeen) setNewNotifications(true)

    }, [notifications])

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
        if (!filteredUsersWithCommonFollowing.length) return filteredUsers
        return filteredUsersWithCommonFollowing
    }

    // const calculation = useMemo(() =>
    //     getNotFollowingUsers(),
    //     [users]
    // );

    async function onAddFollowing(userId) {
        const user = users.find(user => user._id === userId)
        const {_id,username,fullname,imgUrl} = user
        const miniUser = {_id,username,fullname,imgUrl}
        const updatedUser = await addFollowing(miniUser, loggedinUser, 'fromHome')
        setUpdatedUsers(prev=> [...prev , updatedUser])
    }

    async function onRemoveFollowing(userId) {
        await removeFollowing(userId, loggedinUser._id, 'fromHome')
        setUpdatedUsers(prev=> prev.filter(u => u._id !== userId))
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
            <HomeHeader newNotifications={newNotifications} loggedinUserId={loggedinUser._id} />
            <div className="main-content">
                <Users users={getOrderedUsers()} />
                <Posts isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} posts={posts} loggedinUser={loggedinUser} />
            </div>
            <NavSide loggedinUser={loggedinUser} users={getNotFollowingUsers()} onAddFollowing={onAddFollowing} onRemoveFollowing={onRemoveFollowing} onLogout={onLogout} updatedUsers={updatedUsers} />
        </section>
    )
}