import { TweetRepository, HashtagRepository } from  '../repo/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        console.log(data);
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                        .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags
        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        console.log(alreadyPresentTags);

        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);
        console.log(titleOfPresenttags);
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
        console.log(newTags);
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags);

        
        alreadyPresentTags.forEach((tag) => {
            console.log("tags", tag);
            console.log(tweet.id)
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;

    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}


export default TweetService;

/* this is my #first tweet . I am #excited */
