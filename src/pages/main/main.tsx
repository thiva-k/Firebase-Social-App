// export default function Main(props:any):any{
//   return (
//    <div> Home page </div>
//   )
// }
import {getDocs, collection} from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post{
    id: string,
    title: string,
    userId:string,
    username: string,
    description: string
}

export const Main =(props:any) => {

const postsRef = collection(db, "posts")
const[postsList, setPostList] = useState<Post[] | null>(null);

const getPosts = async()=>{
    const data = await getDocs(postsRef)
    setPostList(data.docs.map((doc)=> ({...doc.data(), id: doc.id}) ) as Post[])
}

useEffect(()=>{
    getPosts()
},[])
return( 

<div className="posts"> 

 {postsList && postsList.map((post)=> <Post post={post}/>)}


</div>

)

}