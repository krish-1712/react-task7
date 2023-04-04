import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

 export const  Appcontext= createContext()





export default function BaseApp({ title,children }) {
 
    const history = useNavigate();
    return (
        <div>
            <div>
                <div className="nav-styles">
                    <span>
                        <button
                            className="nav-buttons"
                            onClick={() => history("/add/user")}
                        > Add Books</button>
                    </span>
                  
                    <span>
                        <button
                            className="nav-buttons"
                            onClick={() => history("/")}
                        > Books Details</button>
                    </span>
                   
                </div>
                <div className="title">{title}</div>
            </div>
            <div className="childred">
              
                    {children}
                   
                <footer>
                    Contact us
                    <div>Email : Books@gmail.com</div>
                    <div>Phone : 86*****743</div>
                </footer>
            </div>

        </div>
    )
} 