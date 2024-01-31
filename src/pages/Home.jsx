import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { React } from 'react'
import addNotification from 'react-push-notification'

import { HomeHeader } from '../cmps/HomeHeader'
import { Users } from "../cmps/Users";
import { Posts } from "../cmps/Posts";
import { NavSide } from '../cmps/NavSide'
import { getActionCommentAdd, getActionCommentRemove, getActionLikePostAdd, getActionLikePostRemove, loadPosts, getActionAddPost, getActionUpdatePost, getActionRemovePost } from '../store/actions/post.actions.js'
import { addFollowing, removeFollowing, logout, loadUsers, loadUser } from '../store/actions/user.actions.js'
import { socketService } from '../services/socket.service.js'


export function Home() {

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
        socketService.on('notification-added', (data) => {
            setNewNotifications(true)
            console.log('data:', data)
            const username = data.miniUser.username
            const msg = data.action
            const comment = data.comment || ''
            addNotification({
                title: 'message',
                message: `${username} ${msg} ${comment}`,
                // theme: 'light',
                native: false,
                position: 'bottom-right',
                duration: 3000,
            });
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

    const orderedUsers = useMemo(() => {
        if (!users.length) return []
        const currUser = users.find(user => user._id === loggedinUser._id)
        const orderedUsers = [currUser, ...users.filter(user => user._id !== loggedinUser._id)]
        return orderedUsers
    }, [users.length])


    const notFollowingUsers = useMemo(() => {
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
    }, [users])


    const onAddFollowing = useCallback(async (userId) => {
        const user = users.find(user => user._id === userId)
        const { _id, username, fullname, imgUrl } = user
        const miniUser = { _id, username, fullname, imgUrl }
        const updatedUser = await addFollowing(miniUser, loggedinUser, 'fromHome')
        setUpdatedUsers(prev => [...prev, updatedUser])
    }, [])

    const onRemoveFollowing = useCallback(async (userId) => {
        await removeFollowing(userId, loggedinUser._id, 'fromHome')
        setUpdatedUsers(prev => prev.filter(u => u._id !== userId))
    }, [])

    const onLogout = useCallback(async () => {
        try {
            await logout()
            console.log('Success Logout')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }, [])


    if (!loggedinUser) return ''
    return (
        <section className="home">
            <HomeHeader newNotifications={newNotifications} loggedinUserId={loggedinUser._id} />
            <div className="main-content">
                <Users users={orderedUsers} />
                <Posts posts={posts} loggedinUser={loggedinUser} />
            </div>
            <NavSide loggedinUser={loggedinUser} users={notFollowingUsers} onAddFollowing={onAddFollowing} onRemoveFollowing={onRemoveFollowing} onLogout={onLogout} updatedUsers={updatedUsers} />
        </section>
    )
}