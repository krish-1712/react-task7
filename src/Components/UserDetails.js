import React from "react";
import { useParams } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";


 export function UserDetails(){

    const{user}=Appstate();
    
    const{id}=useParams();
    const person =user[id];

    return(
        <BaseApp
        title={"Books Details"}>
            <div className="user-content">
          
                <div  className="user-card">
                    <h1>{person.TitleofBook}</h1>
                    <p>NameofAuthor         :   {person.NameofAuthor}</p>
                    <p>Publisher      :   {person.Publisher}</p>
                    <p>Language :   {person.Language}</p>
                    <p>YearofPublication    :   {person.YearofPublication}</p>
                    
                 </div>
                 </div>
           
        </BaseApp>
    )

 }