import React,{useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import "./Sidebar.css"
import IconButton from '@mui/material/IconButton'; 
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
const Sidebar = (props) => { 
    const [sidebarIcon,setSidebarIcon] = useState({comp : <CloseIcon className='sideBarDefaultIcon'/>,isClosed: false})
     const location = useLocation(); 
    const handleSideBar = () =>{
        if(!sidebarIcon.isClosed){
            setSidebarIcon({comp: <MenuIcon className='sideBarDefaultIcon'/>,isClosed:true});

        }
        else {
            setSidebarIcon({comp : <CloseIcon className='sideBarDefaultIcon'/>,isClosed: false})
        }
    }
    function sideBarLink(ele) { 
        ele = ele.replace(/\s+/, "");
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
                            <li className='defaultOptions'><div className='defaultOptionText' hidden={sidebarIcon.isClosed}>{props.mainTab}</div><IconButton className='sideBarDefaultIcon' onClick={handleSideBar}>{sidebarIcon.comp}</IconButton></li>
                             {props.options.map((ele) => {
                                return (<li key={ele}><Link key={ele} className={(location.pathname.includes(ele.replace(/\s+/, ""))) ? 'sidebarItem active' : 'sidebarItem'} to={sideBarLink(ele)}> <div className='icon'>{props.icons[ele]}</div><div style={{display:(sidebarIcon.isClosed)?"none":"block"}}>{ele}</div></Link></li>)
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