import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Store/store'

const Message = ({el}) => {
    const receiverID = useSelector((state: RootState)=>state?.chat?.currentChatUser?.id)

  return (
   <Box sx={{display:'flex', flexDirection:'column', gap:'1px', padding:'5px', borderRadius:'10px', backgroundColor:el.receiverId != receiverID ? '#a9b2f5' : '#a9d2f5', width:'fit-content', alignSelf:el.receiverId != receiverID ? 'flex-start' : 'flex-end'}}>
    <Typography variant="h6">{el.content}</Typography>
    <Typography variant="caption">{new Date(Number(el.createdAt)).toLocaleDateString("en-GB")}</Typography>
   </Box>
  )
}

export default Message