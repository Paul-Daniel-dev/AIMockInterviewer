"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  useEffect(() => {
    if (interviewData) {
      console.log(interviewData);
    }
  }, [interviewData]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
          <h2 className="text-lg">
            <strong>Job Position: </strong>
            {interviewData ? interviewData.jobPosition : "Loading"}
          </h2>
          <h2 className="text-lg">
            <strong>Tech Stack: </strong>
            {interviewData ? interviewData.jobDesc : "Loading"}
          </h2>
          <h2 className="text-lg">
            <strong>Years of Experience: </strong>
            {interviewData ? interviewData.jobExperience : "Loading"}
          </h2>
        </div>
        <div className="p-5 border rounded-lg border-red-600 bg-red-300">
         <h2 className="flex gap-2 items-center text-red-600"><Lightbulb/><strong>Important information</strong></h2>
          <h2>Enable Webcam and microphone to start your AI generated mock interview. It has 5 questions which you can answer and afterwards you will get a report based on your answers. NOTE: We never record your video. Webcam and microphone access can be disabled at any time.</h2>
        </div>
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebcamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
        
      </div>
      
      <div className="flex justify-end items-end">
        <Link href={''+params.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
      
      </div>
    </div>
  );
};

export default Interview;
