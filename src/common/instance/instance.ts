import axios from 'axios';

const token = 'aa939b1d-4e98-4ed0-86d2-e20763cf7640'
const apiKey = 'ca314bcf-3ffa-44f6-9353-483494de9fe9'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})