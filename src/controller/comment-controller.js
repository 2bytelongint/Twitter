import CommentService from "../services/comment-service.js";

const commentService = new CommentService()

export const createComment = async(req,res) => {
    try {
        const response = await commentService.createComment(req.query.modelType, req.query.modelId,
            req.body.userId, req.body.content
        );
        console.log("response,", response);
        
        return res.status(201).json({
            success : true,
            message : "Successfully created new comment",
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