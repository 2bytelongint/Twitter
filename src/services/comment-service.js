import { TweetRepository, CommentRepository } from "../repo/index.js";

class CommentService {
    constructor(){
        this.commentRepo = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async createComment(modelType, modelId, userId, content){
        if(modelType == 'Tweet'){
            var commentable = await this.tweetRepository.get(modelId);
        }
        else if(modelType == 'Comment'){
            var commentable = await this.commentRepo.get(modelId);
        }else{
            throw new Error('Unknown model Type')            
        }

        const newComment = await this.commentRepo.create({
            content : content,
            userId : userId,
            onModel : modelType,
            commentable : modelId,
            comments : []
        });
        if (!commentable.comments) {
            commentable.comments = [];
        }
        
        commentable.comments.push(newComment)
        await commentable.save();
        return newComment;
    }
}

export default CommentService;