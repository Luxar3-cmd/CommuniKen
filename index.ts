import {Elysia} from 'elysia'
import {PrismaClient} from '@prisma/client'

interface Post {
    id?: number
    title: string
    path: string
    content: string
}
// Create a new Prisma Client Instance
const prisma = new PrismaClient({
    log: ['info', 'warn','error']
})

//Create a new Elysia instance and pass DB as context
const app = new Elysia().decorate('db',prisma)

//Fetch all Posts
app.get('/posts', ({db}) => {
    return db.post.findMany()
})

//Create a post
app.post('/posts',({db,body}) => {
    return db.post.create({
        data: body as Post
    })
})

// App listening on specified port
app.listen( process.env.API_PORT || 3000,() => {
    console.log(`Server is running on port ${app.server?.port}`)
})


