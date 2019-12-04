import axios from 'axios';
const typeMethods = { USER: 'USER', REPOS: 'REPOS', ORGS: 'ORGS' }

const base = axios.create({
    baseURL: 'https://api.github.com/users'
})

const methods = { 
    USER: async user => {
        const res = await base.get(`/${user}`);
        return res.data;
    },

    REPOS: async user => {
        const res = await base.get(`/${user}/repos`);
        return res.data;
    },

    ORGS: async user => {
        const res = await base.get(`/${user}/orgs`);
        return res.data;
    } 
}

const doGet = (user, method) => {
    try {
        const methodCallback = methods[method];
        return methodCallback(user);
    } catch (e) {
        console.error(e);
        return { message: `Network error: ${e}`}
    }
}

export const gitUser = user => {
    return doGet(user, typeMethods.USER);
}

export const gitRepos = user => {
    return doGet(user, typeMethods.REPOS);
}

export const gitOrgs = user => {
    return doGet(user, typeMethods.ORGS);
}

export default { gitUser, gitRepos, gitOrgs }
