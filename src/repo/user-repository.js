import User from "../models/user.js";
import CrudRepository from "./Crud-Repository.js";


class UserRepository extends CrudRepository{
    constructor(){
        super(User)
    }

}

export default UserRepository;