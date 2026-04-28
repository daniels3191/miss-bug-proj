const BASE_URL = '/api/user/'

export const userService = {
    query,
    getById,
    remove,
    getEmptyCredentials
}

function query(){
    return axios.get(BASE_URL)
    .then(res => res.data)
}

function getById(bugId){
     return axios.get(BASE_URL + bugId)
        .then(res => res.data)

}
function remove(userId){
    return axios.delete(BASE_URL + userId)
    .then(res => res.data)
}
function getEmptyCredentials(){
    return  {
        username: '',
        password: '',
        fullname: ''
    }
}