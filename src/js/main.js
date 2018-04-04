import React from 'react';
import ReactDOM from 'react-dom';
import ThNavigation from './report/ticket_sale/ThNavigation'
import axios from 'axios'
import  request from './base/request'

let params = new URLSearchParams()
params.append('username', 'admin')
params.append('password', 'e10adc3949ba59abbe56e057f20f883e')

axios.post('/member/login',params)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

ReactDOM.render(<ThNavigation/>, document.getElementById("root"))

