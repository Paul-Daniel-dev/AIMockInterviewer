"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const Feedback = ({params}) => {
    const [feedbackList, setFeedBackList] = useState([]);
    useEffect(()=>{
        GetFeedback();
    },[])
    const router = useRouter()
    const GetFeedback = async() => {
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        setFeedBackList(result);
    }
  return (
    <div className='p-10 m-5'>
        
       
        {feedbackList?.length == 0 ?
        <h2 className='font-bold text-xl'>No interview feedback found</h2>
          :
          <>
        <h2 className='text-3xl font-bold text-gray-700 pb-3'>Congratulations!</h2>
        <h2 className='font-bold text-2xl pb-3'>Here is your interview feedback</h2>
        <h2 className='text-sm text-gray-600'>Find the interview questions below with the correct answer aswell as your answer , feedback and the rating you got for your answer.</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index}>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left gap-7'>
                {item.question}<ChevronsUpDown/><span className='text-gray-500 text-sm'>Click to see information</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'>
                   <strong >Rating:</strong>{item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm'><strong>Your answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm'><strong>Correct answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-yellow-50 text-sm'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </>}
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback