import { Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../styles/VisuallyHiddenComponent'

export const LayoutLoader = () => {
    return (
        <Grid container height='100vh' columnSpacing={'1rem'} overflow={'hidden'}>
            <Grid item sm={4} md={3} sx={{
              display: { xs: 'none', sm: 'block' },
            }} height={'100%'} >
              <Skeleton variant="rectangular" height={'100vh'} />
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={6} height={'100vh'} >
                <Stack spacing={2}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} variant="rounded" height='4rem' />
                ))}
                </Stack>
            </Grid>
            <Grid item md={4} lg={3} height={'100%'} sx={{
              display: { xs: 'none', md: 'block' },
            }} >
              <Skeleton variant="rectangular" height={'100vh'} />
            </Grid>

          </Grid>
    )
}


const MessageLoader = () => {
  return <Stack
  spacing={"0.5rem"}
  direction={'row'}
  padding={'0.5rem'}
  justifyContent={'center'}
  >
    <BouncingSkeleton variant='circular' width={15} height={15} sx={{
      animationDelay: '0.1s'
    }}/>
    <BouncingSkeleton variant='circular' width={15} height={15} sx={{
      animationDelay: '0.2s'
    }}/>
    <BouncingSkeleton variant='circular' width={15} height={15} sx={{
      animationDelay: '0.4s'
    }}/>
    <BouncingSkeleton variant='circular' width={15} height={15} sx={{
      animationDelay: '0.6s'
    }}/>
  </Stack>
}

export {MessageLoader};