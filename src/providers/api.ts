import axios from "axios";



// const token = () => {
//   try {
//     return localStorage?.getItem('Token')
//   } catch {
//     return ''
//   }
// }


export const api = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage?.getItem('Token')}`
  }

});

