import {toast} from 'react-toastify'

export const notify = (message, type) => {
    toast[type](message);
}
export const API_URL = "https://vercel.live/link/21-bcp-240-jugal-chhatriwala-todo-app.vercel.app?via=project-dashboard-alias-list&p=1&page=/";
