"use client"

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();

    return () => {
      // Cleanup function to reset state
      setInterviewData(null);
      setMockInterviewQuestion(null);
      setActiveQuestionIndex(0);
      setLoading(true);
    };
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result && result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log('Fetched mock interview questions:', jsonMockResp);

        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.error("No data found for the given interview ID.");
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mockInterviewQuestion || !mockInterviewQuestion.questions) {
    return (
      <>
    <div>No questions available.Click here to go reload page and try again. This happens when a test was not completed.</div>
    <Link href={'https://ai-mock-interviewer-f445.vercel.app'}>
        <Button>Here</Button>
        </Link>
    </>
    )
    
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {mockInterviewQuestion.questions && activeQuestionIndex < mockInterviewQuestion.questions.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
        )}
        {mockInterviewQuestion.questions && activeQuestionIndex === mockInterviewQuestion.questions.length - 1 && (
          <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
