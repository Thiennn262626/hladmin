import { Navigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function PrivateRouter(props) {
    const [userServer, setUser] = useState()  
    const userLocalCall = localStorage.getItem("user")
    var  userLocal = JSON.parse(userLocalCall)
    useEffect(() => {  
            var config = {
                method: 'get',
                url: 'https://backoffice.nodemy.vn/api/users/me',
                headers: {
                    'Authorization': `Bearer ${userLocalCall.jwt} `
                }
            };
            axios(config)
                .then(function (response) {
                     console.log(JSON.stringify(response.data));
                     setUser(response.data)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        
    }, [])
    
    return userLocal? props.children : <Navigate to="/login" />
    //return userLocal? true : false
}
