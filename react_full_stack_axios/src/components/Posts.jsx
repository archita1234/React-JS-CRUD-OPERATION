import {useEffect, useState} from 'react'
import { deletePost, getPost } from '../api/PostApi';
import "../App.css"
import { Form } from './Form';


 export const Posts =() =>{

    const [data ,setData] = useState([]);
    const [updateDataApi, setUpdateApi] = useState({});

    const getPostData =async() =>{
      const res = await getPost();
      console.log(res)
      setData(res.data);
    };
  
    useEffect(() =>{
      getPostData();
    }, []);

    const handleDeletePost = async(id) =>{
        try{
         const res =  await  deletePost(id);
         if(res.status === 200) {
            const newUpdataPosts = data.filter((currPost) =>{
                return currPost.id !== id;
            });
            setData(newUpdataPosts);
         } else {
            console.log("Failed to delete the post" , res.status);
         }
        } catch(error) {

        }

    }
    //handleUpdatePost
    const handleUpdatePost = (curElem) =>{
            setUpdateApi(curElem);
    }

    return (
    <>
    <section className='section-form'>
        <Form data= {data} setData= {setData}  updateDataApi= {updateDataApi} setUpdateApi ={setUpdateApi}/>
    </section>
    <section className='section-post'>
        <ol>
            {
                data.map((curElem) =>{
                    const {id,body,title} = curElem;
                    return (
                        <li key={id}>
                            <p>Title: {title}</p>
                            <p>Body:  {body}</p>
                            <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                            <button className='btn-delete' onClick={() => handleDeletePost(id)}>Delete</button>
                        </li>
                    );
                })
            }
        </ol>
    </section>
    </>
    )
}