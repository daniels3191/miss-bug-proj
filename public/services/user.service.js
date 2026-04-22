const BASE_URL = '/api/user/'

export const userService = {
    query,
    getById,
    getEmptyCredentials
}

function query(){

}

function getById(){

}
function getEmptyCredentials(){
    return  {
        username: '',
        password: '',
        fullname: ''
    }
}