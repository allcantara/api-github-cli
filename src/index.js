import axios from 'axios';
const typeMethods = { USER: 'USER', REPOS: 'REPOS', ORGS: 'ORGS', FOLLOW: 'FOLLOW' }

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
    },

    FOLLOW: async user => {
        const res = await base.get(`/${user}/followers`);
        return res.data;
    }
}

const doGet = (user, method) => {
    try {
        const methodCallback = methods[method];
        const res = methodCallback(user)
        return res;
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

export const gitFollowers = user => {
    return doGet(user, typeMethods.FOLLOW);
}

export default { gitUser, gitRepos, gitOrgs, gitFollowers }
