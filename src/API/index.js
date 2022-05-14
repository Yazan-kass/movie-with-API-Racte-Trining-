import axios from 'axios';

const baseApi = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})
const CRUDReqests ={
    get : async (url) =>{
        return await baseApi.get(url,{})
    }
    // ,
    // post : async (URL) =>{
    //     return await baseApi.post(url,{},{})
    // },
    // delete : async (URL) =>{
    //     return await baseApi.delete(url,{},{})
    // },
    // put : async (URL) =>{
    //     return await baseApi.put(url,{},{})
    // }
   
}
export default CRUDReqests;
