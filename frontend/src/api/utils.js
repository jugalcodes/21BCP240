import {toast} from 'react-toastify'

export const notify = (message, type) => {
    toast[type](message);
}
export const API_URL = "https://21-bcp-240-back.vercel.app/";
