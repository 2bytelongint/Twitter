import User from "../models/user.js";
import CrudRepository from "./Crud-Repository.js";


class UserRepository extends CrudRepository{
    constructor(){
        super(User)
    }

    async getByEmail(email){
        try {
            const res = await User.findOne({email});
            return res;
        } catch (error) {
            console.log("Something went wrong in user repo");
            throw {error};
        }
    }

}

export default UserRepository;