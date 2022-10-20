import React, { useState } from 'react';
import {Link,useLocation} from 'react-router-dom';
import "./Sidebar.css"
const Sidebar = (props) => { 
    const location = useLocation(); 
    function sideBarLink(ele) {
        if(location.pathname.endsWith(ele)){
            return "#"
        }
        else {
            let isUsed = false;
            props.options.forEach((option)=>{
                if(location.pathname.endsWith(option)){
                    isUsed = true;
                }
            })
            if(isUsed) {
                let baseLocation = location.pathname.split("/")[1];
                console.log(baseLocation);
                return "../"+baseLocation+"/"+ele;
            }
            else {
                return location.pathname+"/"+ele;
            }
        }
    }
      return (
        <div className='container'>
            <div className='sidebar'>
                <div className='sidebarContent'>
                    <div className='sidebarItems'>
                        <ul>
                             {props.options.map((ele) => {
                                return (<li key={ele}><Link key={ele} className={(location.pathname.endsWith(ele)) ? 'sidebarItem active' : 'sidebarItem'} to={sideBarLink(ele)}>{ele}</Link></li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='content'>{props.children}</div>

        </div>
    )
}

export default Sidebar