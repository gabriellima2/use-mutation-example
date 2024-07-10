import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { client } from "../../lib/client"

type Post = {
  id: number
  title: string
  completed: boolean
}

type GetAllPosts = Post[]

type CreatePost = Pick<Post, 'title'>

const QUERY_KEYS = {
  POSTS: {
    GET_ALL: ['posts']
  }
}

const posts: Post[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
]

function usePosts() {
  const { data, ...query } = useQuery<GetAllPosts>({
    queryKey: QUERY_KEYS.POSTS.GET_ALL,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(posts)
        }, 1000)
      })
    }
  })
  return { posts: data, ...query }
}

function useCreatePost() {
  return useMutation({
    mutationFn: (post: CreatePost) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const createdPost: Post = { id: Math.random(), completed: false, ...post } 
          posts.push(createdPost)
          resolve(createdPost)
        }, 1000)
      })
    },
    onSettled: () => client.invalidateQueries({ queryKey: QUERY_KEYS.POSTS.GET_ALL }),
  })
}

function CreatePostForm(props: { handleCreate: (title: string) => void }) {
  const [title, setTitle] = useState('')
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.handleCreate(title)
    }}>
      <input
        type="text"
        placeholder="Post title"
        value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  )
}

export function Home() {
  const createPost = useCreatePost()
  const { posts } = usePosts()
  return (
    <div>
      <CreatePostForm handleCreate={(title) => createPost.mutate({ title })} />
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
          {createPost.isPending && (
            <li style={{ opacity: 0.5 }}>{createPost.variables.title}</li>
          )}
        </ul>
      )}
    </div>
  )
}