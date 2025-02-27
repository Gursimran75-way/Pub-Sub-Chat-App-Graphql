import { Box, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import Conversation from '../components/Conversation'
import Footer from '../components/Footer'

const ChatScreenPage = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} width={'80%'} >
      <Header />
      <Conversation />
      <Footer />
</Box>
  )
}

export default ChatScreenPage