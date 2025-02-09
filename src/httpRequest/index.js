import axios from "axios";


const $host = axios.create({
    baseURL: "http://localhost:9000/"
})

export const fetchPosts = async (tags) => {
    const {data} = await $host.get('api/posts', {params: {
            tags
        }})
    return data
}

export const updatePost = async (id,post) => {
    const {data} = await $host.patch(`api/posts/edit/` + id, post)
    return data;
}

export const createPost = async (post) => {
    const {data} = await $host.post('api/posts/create', post)
    return data;
}

export const fetchLastPosts = async () => {
    const {data} = await $host.get('api/posts/latest')
    return data
}

export const fetchPost = async (id) => {
    try{
       const {data} = await $host.get('api/posts/post/' + id)
       data.tags = data.tags.split(' ')
    return data
    }catch(err){
        return err
    }
    
    
}

export const fetchPostForEdit = async (id) => {
    try{
       const {data} = await $host.get('api/posts/post/' + id)
    return data
    }catch(err){
        return err
    }
    
    
}

export const dropPost = async (id) => {
    await $host.delete('api/posts/delete/' + id)
    return 'post deleted'
}