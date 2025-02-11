import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService()

export const createTweet = async(req,res) => {
    try {
        const response = await tweetService.create(req.body);
        return res.json({
            success : true,
            message : "Successfully created new tweet",
            data : response,
            err : {}
        })
    } catch (error) {
        return res.status(501).json({
            
            success : false,
            message : error.message,
            data : {},
            err : {}
        })
    }
}