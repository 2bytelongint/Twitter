import {UserRepository} from '../repo/index.js';


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            
        }
    }
}

export default UserService;