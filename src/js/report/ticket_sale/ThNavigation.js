import React from 'react'
import axios from 'axios'


export default class ThNavigation extends React.Component {
    constructor(){
        super()
        this.state={
            permissions:[]
        }
        let session = sessionStorage.getItem('permissions');
        let permissions = JSON.parse(session);
        if(!permissions){
            axios.get('/user/permissionList').then(function (response) {
                let permissions = response.data.data;
                sessionStorage.setItem('permissions', JSON.stringify(permissions));
                for(let index in permissions){
                    permissions[index].xxx = false;
                }
                this.setState({
                    permissions:permissions
                })
            }.bind(this)).catch(function (error) {
                console.log(error);
            });
        }
    }
    componentDidMount(){
        let session = sessionStorage.getItem('permissions');
        let permissions = JSON.parse(session);
        if(permissions) {
            this.setState({
                permissions: permissions
            })
        }
    }
    getUlStyle(){
        return liStyle;
    }
    ulHandleClick(e,index){
        let state =  this.state;
        let curDisplay= state.permissions[index].xxx
        state.permissions[index].xxx=!curDisplay;
        this.setState(state)
    }
    render() {
        return (<div className='sidebar-nav navbar-collapse'>
            <ul className='nav' id='side-menu'>
                <li className='sidebar-search'>
                    <div className='input-group custom-search-form'>
                        <input type='text' className='form-control' placeholder='Search...'/>
                        <span className='input-group-btn'>
                                        <button className='btn btn-default' type='button'>
                                            <i className='fa fa-search'/>
                                        </button>
                        </span>
                    </div>
                </li>
                {
                    this.state.permissions.map(function (item, index) {
                        let liStyle={
                            display:item.xxx?"block":"none"
                        }
                        return (
                            <li key={item.id} onClick={(e)=>this.ulHandleClick(e,index)}>
                                <a href='#'>{item.permissionName}<span className='fa arrow'/></a>
                                <ul className='nav nav-second-level' style={liStyle}>
                                    {
                                        item.childrens.map(function (item, index) {
                                            return (
                                                <li key={item.id}>
                                                    <a href='#'>{item.permissionName}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    }.bind(this))
                }

            </ul>
        </div>)
    }
}