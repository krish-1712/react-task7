import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import * as yup from 'yup'
import { useFormik } from "formik";

const userSchemaValidation = yup.object({
    id:yup.string().required("Please specify your ID"),
    TitleofBook: yup.string().required("Please specify the Book Name....."),
    NameofAuthor: yup.string().required("Please specify the Author Name....."),
    Publisher:yup.string().required("Please specify the Publisher"),
    Language: yup.string().required("Please specify  your Language"),
    YearofPublication:yup.string().required("Please specify your Year of Publication")


})


export function AddUser(){

        const {values,handleChange,handleSubmit,handleBlur,errors,touched}=useFormik({
            initialValues :{
                id:"",
                TitleofBook:"",
                NameofAuthor:"",
                Publisher:"",
                Language:"",
                YearofPublication:"",
            },
            validationSchema : userSchemaValidation,
                onSubmit:(newUSer)=>{
                    console.log("on sumbit called :",newUSer)
                    addNewUser(newUSer)
                }
        })


    const{user,setUser}=Appstate();
    const history=useNavigate();

    const addNewUser=async(newUSer)=>{

        try{
            const response =await fetch(`https://6429c17100dfa3b547399c05.mockapi.io/BOOKS`,{
                method:"POST",
                body:JSON.stringify(newUSer),
                headers:{
                    "Content-Type":"application/json",
                }
            })
            const data= await response.json();
            console.log(data);

            setUser([...user, data])
            history("/")

        }catch(error){
            console.log("error")
        }




    }
  


    return(
        <BaseApp
        title={"Add a New Books"}>
         <div className="new" >
           <form onSubmit={handleSubmit}>
                <input placeholder="Id" className="id" type="number" name="id" onBlur={handleBlur}
                    value={values.id}
                    onChange={handleChange}
                /> 
                {touched.id && errors.id ? <p style={{color:"crimson"}}>{errors.id}</p>:""}
                <br></br>

                <input placeholder="Title of Book" className="TitleofBook" type="text" name="TitleofBook" onBlur={handleBlur}
                    value={values.TitleofBook}
                    onChange={handleChange}
                />
                 {touched.TitleofBook && errors.TitleofBook ? <p style={{color:"crimson"}}>{errors.TitleofBook}</p>:""}
                 <br></br>

                <input placeholder="Name of Author" className="NameofAuthor" type="text"name="NameofAuthor" onBlur={handleBlur}
                 value={values.NameofAuthor}
                 onChange={handleChange}
                />
                 {touched.NameofAuthor && errors.NameofAuthor ? <p style={{color:"crimson"}}>{errors.NameofAuthor}</p>:""}
                <br></br>

                <input placeholder="Publisher" className="Publisher" type="text" name="Publisher" onBlur={handleBlur}
                 value={values.Publisher}
                 onChange={handleChange}
                />
                 {touched.Publisher && errors.Publisher ? <p style={{color:"crimson"}}>{errors.Publisher}</p>:""}
                <br></br>

                <input placeholder="Language" className="Language" type="text" name="Language" onBlur={handleBlur}
                 value={values.Language}
                 onChange={handleChange}
                />
                 {touched.Language && errors.Language ? <p style={{color:"crimson"}}>{errors.Language}</p>:""}
                <br></br>

                <input placeholder="Year of Publication" className="YearofPublication" type="number" name="YearofPublication" onBlur={handleBlur}
                 value={values.YearofPublication}
                 onChange={handleChange}
                />
                 {touched.YearofPublication && errors.YearofPublication ? <p style={{color:"crimson"}}>{errors.YearofPublication}</p>:""}
                <br></br>

                <button
                className="add"
                type="submit"
                >Add</button>
                </form>
        
         
        </div>
        </BaseApp>
       
    )
}
