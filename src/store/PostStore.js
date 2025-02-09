import {makeAutoObservable} from 'mobx'

export default class PostStore {
    constructor(){
        this._posts = []
        this._tags = []
        this._latestPosts = []
        this._limit = 5
        makeAutoObservable(this)
    }

    setPosts(posts){
        this._posts = posts
    }

    setTags(tags){
        this._tags = tags
    }

    setLatestPosts(latestPosts){
        this._latestPosts = latestPosts
    }

    get latestPosts(){
        return this._latestPosts
    }
    get posts(){
        return this._posts
    }

    get tags(){
        return this._tags
    }
}