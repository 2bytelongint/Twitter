import { TweetRepository, CommentRepository } from "../repo/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }
    async createComment(modelType, modelId, userId, content) {
        if(modelType === 'Tweet') {
            console.log("inside model type")
            var commentable = await this.tweetRepository.get(modelId);
        } else if(modelType === 'Comment') {
            var commentable = await this.commentRepository.get(modelId);
        } else {
            throw new Error('unknown model type');
        }
        const comment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });

        if (!commentable.comments) {
            commentable.comments = []; // Initialize if undefined
        }
        
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }
}

export default CommentService;