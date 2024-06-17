"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
  const {error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText} = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results[results.length - 1]?.transcript || "");
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.trim() !== "") {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    if (userAnswer.trim() === "") return; // Prevent empty answer submission

    setLoading(true);
    if (!mockInterviewQuestion || !mockInterviewQuestion.questions) {
      setLoading(false);
      return;
    }

    const feedbackPrompt = `Question: ${mockInterviewQuestion.questions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback for improvement in JSON format.`;
  
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
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
    });
    if (resp) {
      toast("User Answer recorded");
    }
    setUserAnswer(""); // Clear user answer after update
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center mt-20 items-center bg-black rounded-lg p-5">
        <Image src={"/webcam.png"} width={200} height={200} className="absolute" alt="webcam img"/>
        <Webcam mirrored={true} style={{height: 300, width: "100%", zIndex: 10}}/>
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
