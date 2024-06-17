import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();
    

    const onStart = () => {
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackClick = () => {
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
    if (!interview) {
        return <div>Loading...</div>; 
      }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-600'>Created At:{interview?.createAt || 'N/A'}</h2>
        <h2>{interview.createdAt}</h2>
        <Button onClick={onFeedbackClick} size="sm" variant="outline">Feedback</Button>
        
        <Button onClick={onStart} size="sm">Start</Button>
    </div>
  )
}

export default InterviewItemCard