import UserService from '../services/user-service.js';

const userService = new UserService();


export const createUser = async(req,res) => {
    try {
        const response = await userService.signUp({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name
        })
        return res.status(201).json({
            success : true,
            message : "Successfully created a user",
            data : response,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({     
            success : false,
            message : "Something went wrong",
            data : {},
            err : error
        })
    }
}