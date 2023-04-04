import React from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";


export default function UserComponents(){
    const{user,setUser}=Appstate();
    const history=useNavigate();
    const deleteUser=async (idx)=>{
        try{

            const response= await fetch(`https://6429c17100dfa3b547399c05.mockapi.io/BOOKS/${idx}`,{
                method:"Delete"
            })
            const data = await response.json()
            console.log("after the data",data);


            const alterList =user.filter((per)=> per.id!== idx)
            console.log(alterList)
            setUser(alterList);
            if(!data){
                console.log("Could not delete data");
            }
        }
        catch(error){
            console.log(error)
        }      
    }

    return(
     
        <BaseApp  
        title="Books Details">
        <div className="user-content">

            {
            user &&(
            
            user?.map((person,idx)=>(   
                <div key={idx} className="user-card">
                    <h1>{person.TitleofBook}</h1>
                    <p>NameofAuthor       :   {person.NameofAuthor}</p>
                    <p>Publisher      :   {person.Publisher}</p>
                    <p>Language :   {person.Language}</p>
                    <p>YearofPublication    :   {person.YearofPublication}</p>
                    
                    <div className="btn-group">
                        <button className="btn edit-btn"
                        onClick={()=>history(`/edit/${person.id}`)}
                        >Edit</button>
                        <button className="btn view-btn"
                        onClick={()=>history(`/user/${idx}`)}
                        >View</button>
                        <button 
                        className="btn del-btn"
                        onClick={()=>deleteUser(person.id)}
                        >Delete</button>
                    </div>
                
                </div>
            )))}
          
        </div>
        </BaseApp>
    )
}
 