"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";
import { db } from "@/utils/db";

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex,interviewData}) => {
    const [userAnswer, setUserAnswer] = useState("");
    const {user} = useUser();
    const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(()=>{
    results.map((result)=>{
        setUserAnswer(prevAns=>prevAns+result?.transcript)
        
    })
  },[results])

  useEffect(()=>{
    if(!isRecording){
       UpdateUserAnswer();
    }
  },[userAnswer])

  const StartStopRecording = () => {
    if(isRecording){
        
        stopSpeechToText();
        
    }else{
        startSpeechToText(UserAnswer);
    }
    


  }

  const UpdateUserAnswer = async () => {
    setLoading(true);
    if (!mockInterviewQuestion || !mockInterviewQuestion.questions) {
      setLoading(false);
      return;
    }
  
    const feedbackPrompt = "Question:" + mockInterviewQuestion.questions[activeQuestionIndex]?.question +
      ", User Answer:" + userAnswer + ", Depending on the the user answer for the given interview question" +
      " please give me a rating out of 10 for the answer and feedback for improvement for the answer if there is any" +
      " in just 3 to 5 lines to improve. Please give this all in JSON format with a rating field for the rating and a feedback field for the feedback";
  
    const result = await chatSession.sendMessage(feedbackPrompt);
  
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    console.log("Received JSON response:", mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion.questions[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion.questions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY")
    })
    if (resp) {
      toast("User Answer recorded")
    }
    setUserAnswer("");
    setLoading(false);
  }
  
  
  
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center mt-20 items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam img"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2 animate-pulse items-center">
            <StopCircle />
            Stop recording
          </h2>
        ) : (
            <h2 className="text-red-500 flex gap-2 animate-pulse items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      
    </div>
  );
};

export default RecordAnswerSection;
