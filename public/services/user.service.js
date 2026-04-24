const BASE_URL = '/api/user/'

export const userService = {
    query,
    getById,
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
function getEmptyCredentials(){
    return  {
        username: '',
        password: '',
        fullname: ''
    }
}