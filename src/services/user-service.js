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
            throw {error};
        }
    }

    async getUserByEmail(email){
        try {
            const response = await this.userRepository.getByEmail(email);
            return response;
        } catch (error) {
            throw {error};
        }
    }

    async signin(data){
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user){
                throw {
                    message: 'no user found'
                };
            }
    
            if(!user.comparePassword(data.password)){
                throw {
                    message: 'incorrect password',
                };
            }
    
            const token = await user.genJWT();
            console.log(token);
            
            return token;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;