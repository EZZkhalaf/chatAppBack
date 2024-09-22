import express  from 'express';
import Conversation from '../models/conversation.js';
import Message from '../models/messages.js';


export  const sendMessage = async (req,res) =>{
    try{    
        const {message}=req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id


        let conversation =  await Conversation.findOne({
            participants : {$all : [senderId , recieverId]},

        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId , recieverId],
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id); 
        }
        await conversation.save();
        await newMessage.save();//we can run await Promise.all( conversation.save() , newMessage.save()); and run in parallel

        res.status(201).json("message sent successfully ");

    }catch(err){
        console.error(err)
        res.status(400).json("error in senMessage /message/:id");
    }
}


export const getMessages = async (req,res) =>{
    try{

        const {id:userToChatId} = req .params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all : [senderId , userToChatId]}
        }).populate("messages");
        
        res.status(200).json(conversation.messages);

    }catch(err){
        console.error(err)
        res.status(400).json("error in getMEssages /message/:id");
    }
}

