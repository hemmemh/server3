class UserDto{
    constructor(user){
        this.id = user.id
        this.email = user.email
        this.role = user.role
        this.rating = user.rating
    }
}

module.exports =  UserDto