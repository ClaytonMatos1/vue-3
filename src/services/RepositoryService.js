const axios = require('axios');

exports.getRepositories = async (userName) => {
    const repositories = await axios.get(`https://api.github.com/users/${userName}/repos`);
    return repositories.data;
};
