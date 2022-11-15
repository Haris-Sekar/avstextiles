import React from 'react';
import {Link,useLocation} from 'react-router-dom';
import "./Sidebar.css"
 
const Sidebar = (props) => { 
     const location = useLocation(); 
    function sideBarLink(ele) {
        ele = ele.replace(/\s+/, "") 
         if(location.pathname.endsWith(ele)){
            return "#"
        }
        else {
            let isUsed = false;
            props.options.forEach((option)=>{
                option = option.replace(/\s+/, "")
                if(location.pathname.endsWith(option)){
                    isUsed = true;
                }
            })
            if(isUsed) {
                let baseLocation = location.pathname.split("/")[1];
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
                                return (<li key={ele}><Link key={ele} className={(location.pathname.includes(ele.replace(/\s+/, ""))) ? 'sidebarItem active' : 'sidebarItem'} to={sideBarLink(ele)}>{ele}</Link></li>)
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