import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appstate } from "../Context/AppProvider";
import BaseApp from "../Core/Base";
import * as yup from 'yup'
import { useFormik } from "formik";


const userSchemaValidation = yup.object({
    id:yup.string().required("Please specify your ID"),
    TitleofBook: yup.string().required("Please specify the Title of Book....."),
    NameofAuthor: yup.string().required("Please specify the Name of Author....."),
    Publisher:yup.string().required("Please specify the Publisher"),
    Language: yup.string().required("Please specify  your Language"),
    YearofPublication:yup.string().required("Please specify your Year of Publication")


})


export const EditUser=()=>{
    const {id}=useParams()
    const history=useNavigate();
    const{user,setUser}=Appstate();
    console.log(id);
    const {values,handleChange,handleSubmit,handleBlur,errors,touched,setFieldValue}=useFormik({
        initialValues :{
           id:"",
            TitleofBook:"",
            NameofAuthor:"",
            Publisher:"",
            Language:"",
            YearofPublication:"",
        },
        validationSchema : userSchemaValidation,
            onSubmit:(editedData)=>{
                console.log("on sumbit called :",editedData)
                updateUser(editedData)
                
            }
    })   
    useEffect(()=>{
      

        const selectedUser= user.find((per)=>per?.id === id);
        console.log(selectedUser)


        setFieldValue('id',selectedUser?.id)
        setFieldValue('TitleofBook',selectedUser?.TitleofBook)
        setFieldValue('NameofAuthor',selectedUser?.NameofAuthor)
        setFieldValue('Publisher',selectedUser?.Publisher)
        setFieldValue('Language',selectedUser?.Language)
        setFieldValue('YearofPublication',selectedUser?.YearofPublication)
    },[id])


    const updateUser=async(editedData)=>{
        const editIndex=user.findIndex(per =>per?.id === id)

        try{
            const response =await fetch(`https://6429c17100dfa3b547399c05.mockapi.io/BOOKS/${id}`,{
                method:"PUT",
                body:JSON.stringify(editedData),
                headers:{
                    "Content-Type":"application/json",
                }
            })
            const data= await response.json();
            console.log(data)

            
        user[editIndex]=data
        setUser([...user]);
        history("/")

        }catch(error){
            console.log(error)
        }

  



    }

     return(
        <BaseApp
        title={"Edit the Books Details"}>
           <div className="new" >
           <form onSubmit={handleSubmit}>
                <input placeholder="Id" className="id" type="number" name="id" onBlur={handleBlur}
                    value={values?.id}
                    onChange={handleChange}
                /> 
                {touched.id && errors?.id ? <p style={{color:"crimson"}}>{errors.id}</p>:""}
                <br></br>

                <input placeholder="Title of Book" className="TitleofBook" type="text" name="TitleofBook" onBlur={handleBlur}
                    value={values?.TitleofBook}
                    onChange={handleChange}
                />
                 {touched.TitleofBook && errors?.TitleofBook ? <p style={{color:"crimson"}}>{errors.TitleofBook}</p>:""}
                 <br></br>

                <input placeholder="Name of Author" className="NameofAuthor" type="text"name="NameofAuthor" onBlur={handleBlur}
                 value={values?.NameofAuthor}
                 onChange={handleChange}
                />
                 {touched.NameofAuthor && errors?.NameofAuthor ? <p style={{color:"crimson"}}>{errors.NameofAuthor}</p>:""}
                <br></br>

                <input placeholder="Publisher" className="Publisher" type="text" name="Publisher" onBlur={handleBlur}
                 value={values?.Publisher}
                 onChange={handleChange}
                />
                 {touched.Publisher && errors?.Publisher ? <p style={{color:"crimson"}}>{errors.Publisher}</p>:""}
                <br></br>

                <input placeholder="Language" className="Language" type="text" name="Language" onBlur={handleBlur}
                 value={values?.Language}
                 onChange={handleChange}
                />
                 {touched.Language && errors?.Language ? <p style={{color:"crimson"}}>{errors.Language}</p>:""}
                <br></br>

                <input placeholder="Year of Publication" className="YearofPublication" type="number" name="YearofPublication" onBlur={handleBlur}
                 value={values?.YearofPublication}
                 onChange={handleChange}
                />
                 {touched.YearofPublication && errors?.YearofPublication ? <p style={{color:"crimson"}}>{errors.YearofPublication}</p>:""}
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