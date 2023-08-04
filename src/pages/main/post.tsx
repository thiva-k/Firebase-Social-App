import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import{Post as IPost} from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
interface Props{
    post : IPost
}
interface Like{
    likeId:string
    userId:string;
}
 


export const Post = (props :Props )=>{

    const[user]=useAuthState(auth);
    const{post} = props;
    const likesRef = collection(db, "likes")
    const[like,setLike]=useState<Like[]|null>(null);
    let hasUserLiked=(like?.find((likenum)=>likenum.userId===user?.uid))?true:false
    // const [hasUserLiked,sethasUserLiked]=useState<boolean|null>(like?.find((likenum)=>likenum.userId===user?.uid)?true:false)


    const addLike=async ()=> {
        
        try{
        const newDoc= await addDoc(likesRef,{
            userId:user?.uid,
            postId:post.id
        })
        if(user)
        setLike((prev)=>prev?[...prev,{userId:user?.uid,likeId:newDoc.id}]:[{userId:user?.uid, likeId:newDoc.id}])}
        catch(err){
            console.log(err)
        }
        
        // sethasUserLiked(!hasUserLiked);
    }

    const removeLike = async()=>{

        const likeToDeleteQuery = query(
            likesRef, where("postId","==",post.id),
            where("userId","==",user?.uid)
        )

        const likeToDeleteData = await getDocs(likeToDeleteQuery)
        const likeId =likeToDeleteData.docs[0].id
        const likeToDelete=doc(db,"likes",likeToDeleteData.docs[0].id)
        await deleteDoc(likeToDelete)
        if (user){
            setLike((prev)=>prev && prev.filter((like)=>like.likeId!==likeId))
        }
        
        // sethasUserLiked(!hasUserLiked);
    }

    const likesDoc = query(likesRef, where("postId","==",post.id))
    const getLikes = async()=>{
        
        const data = await getDocs(likesDoc)
        // console.log(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        setLike(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})))
    }

    
      
    useEffect(() => {
        getLikes(); // Call getLikes only when the component mounts
    }, []); // Provide an empty dependency array






    if (user){
        return(

            <div className="postsBOx">
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>

        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={!hasUserLiked? addLike: removeLike}>{hasUserLiked? <>&#128078;</>:<>&#128077;</> }  </button>
           {like &&<p>Likes:{like.length}  </p>}
        </div>
    </div>


        )
    }else{
        return null
    }

       
    
        
    

    



}