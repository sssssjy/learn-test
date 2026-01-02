const axios = require('axios');

class User {
    static all = () => {
        // 获取所有的用户
        return axios.get("/users.json").then((resp: { data: any; }) => resp.data);
    }
}

module.exports = User;