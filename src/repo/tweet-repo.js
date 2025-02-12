import Tweet from '../models/tweet.js'
import CrudRepository from './Crud-Repository.js';


class TweetRepo extends CrudRepository {
    constructor() {
        super(Tweet)
    }

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }


    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepo