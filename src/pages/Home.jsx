import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { React } from 'react'

import { HomeHeader } from '../cmps/HomeHeader'
import { Users } from "../cmps/Users";
import { Posts } from "../cmps/Posts";
import { NavSide } from '../cmps/NavSide'
import { getActionCommentAdd, getActionCommentRemove, getActionLikePostAdd, getActionLikePostRemove, loadPosts, getActionAddPost, getActionUpdatePost, getActionRemovePost } from '../store/actions/post.actions.js'
import { addFollowing, removeFollowing, logout, loadUsers, loadUser } from '../store/actions/user.actions.js'
import { socketService } from '../services/socket.service.js'

import instagram from '../assets/icons/instaglam.svg'

export function Home() {

    const  posts  = useSelector(storeState => storeState.postModule.posts)
    const  users = useSelector(storeState => storeState.userModule.users)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
    
    const [newNotifications, setNewNotifications] = useState(false)
    const [updatedUsers, setUpdatedUsers] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            setIsLoading(true)
            await loadPosts()
            await loadUsers()
            await loadUser(loggedinUser._id)
        } catch (err) {
            console.log('err:', err)
            navigate('/')
        }finally{
            setIsLoading(false)
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

    // useMemo for calaulation
    const orderedUsers = useMemo(() => {
        if (!users.length) return []
        const loggedinUserFull = users.find(user => user._id === loggedinUser._id)
        // loggedinUser first then all others 
        const orderedUsers = [loggedinUserFull, ...users.filter(user => user._id !== loggedinUser._id)]
        return orderedUsers
    }, [users,loggedinUser])


    const notFollowingUsers = useMemo(() => {
        // find loggedinUser
        const loggedinUserFull = users.find(user => user._id === loggedinUser._id)
        // check every user if in his followers there's no the loggedinUser && the user is not the loggedinUser
        const usersIdontFollow = users.filter(user => user.followers.every(f => f._id !== loggedinUser._id) && user._id !== loggedinUser._id)
        // found users that we have common followings (we follow after the same users)
        const usersWithCommonFollowing = usersIdontFollow.filter(userIdontFollow => {
            // save the commonFollowings on the user
            userIdontFollow.commonFollowings = []
            return userIdontFollow.followers.some(user => {
                return loggedinUserFull.following.some(u => {
                    // compare between my followings to user followers
                    if (u._id === user._id) {
                        userIdontFollow.commonFollowings.push(u.username)
                        return true
                    }
                })
            })
        })
        if (!usersWithCommonFollowing.length) return usersIdontFollow
        return usersWithCommonFollowing
    }, [users])

    // useCallback for functions we dont want to redefined 
    const onAddFollowing = useCallback(async (userId) => {
        const user = users.find(user => user._id === userId)
        const { _id, username, fullname, imgUrl } = user
        const miniUser = { _id, username, fullname, imgUrl }
        const updatedUser = await addFollowing(miniUser, loggedinUser, 'fromHome')
        setUpdatedUsers(prev => [...prev, updatedUser])
    }, [users,loggedinUser])

    const onRemoveFollowing = useCallback(async (userId) => {
        await removeFollowing(userId, loggedinUser._id, 'fromHome')
        setUpdatedUsers(prev => prev.filter(u => u._id !== userId))
    }, [loggedinUser])

    const onLogout = useCallback(async () => {
        try {
            await logout()
            console.log('Success Logout')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }, [])


    if(isLoading)  return <section className="loader-container"><img src={instagram} /></section>
    return (
        <section className="home">
            {/* HomeHeader just in mobile */}
            <HomeHeader newNotifications={newNotifications} loggedinUserId={loggedinUser._id} />
            <div className="main-content">
                <Users users={orderedUsers} />
                <Posts posts={posts} loggedinUser={loggedinUser} />
            </div>
            <NavSide loggedinUser={loggedinUser} users={notFollowingUsers} onAddFollowing={onAddFollowing} onRemoveFollowing={onRemoveFollowing} onLogout={onLogout} updatedUsers={updatedUsers} />
        </section>
    )
}