import express from 'express'
import {connect} from './config/database.js'
import bodyParser from 'body-parser'
import apiRoutes from './routes/index.js'
import {TweetRepository, UserRepository} from './repo/index.js'
import LikeService from './services/like-service.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


app.use('/api',apiRoutes)



app.listen(3000, async () => {
    await connect();
    console.log("Mongo started")
    
    const userRepo = new UserRepository()
    const tweetRepo = new TweetRepository();

    // const user = await userRepo.create({
    //     email : "12344321@gmail.com",
    //     password : "123"
    // })

    
    
})

