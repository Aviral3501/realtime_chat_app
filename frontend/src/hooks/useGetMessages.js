import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading,setLoading] =useState(false);
    const {messages,setMessages,selectedConversation}=useConversation();


    useEffect(()=>{
        const getMessages =async()=>{
            setLoading(true);
            try {
                const res =await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.error("Error in useGetMessages hook" ,error);
                toast.error(error.message);
                
            }finally{
                setLoading(false);
            }
        }
        //get messages only when a conversation is selected 
        //selected conversation can also be null
        if(selectedConversation?._id){
        getMessages();
        }
    },[selectedConversation?._id ,setMessages])

    return {messages,loading};
}

export default useGetMessages
