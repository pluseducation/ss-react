import useAxiosPrivate from "../../hook/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export function GetGeneral() {
    const endpoint = '/setting/general';
    
}



// export async function GetGeneral() {
//     const axiosPrivate = useAxiosPrivate();
//     const endpoint = '/setting/general';

//     try {
//         const axiosPrivate = useAxiosPrivate();

//         let isMounted = true;
//         const controller = new AbortController();

//         const response = await axiosPrivate.get(endpoint, {
//             signal: controller.signal
//         });

//         controller.abort();
//         isMounted = false
//         return response.data.data

//     } catch (err) {
//         console.error(err);
//     }
// }

