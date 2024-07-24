import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transformImage } from '../../lib/features'

const AvatarCard = ({
    max=4,
    avatar=[],
}) => {

  return (
    <>
        <Stack direction={'column'} spacing={2} position={'relative'}>
            <AvatarGroup max={max}>
                <Box width={'5rem'} height={'3rem'}>
                    {avatar.map((src,index) => {
                        return <Avatar src={transformImage(src)}
                        alt="Avatar"
                        key={index}
                        style={{
                            width: '3rem',
                            height: '3rem',
                            position: 'absolute',
                            left: {
                               xs: `${index + 0.5}rem`,
                               sm: `${index}rem`,
                            },
                        }}
                         />
                    })}
                </Box>
            </AvatarGroup>
        </Stack>
    </>
  )
}

export default AvatarCard