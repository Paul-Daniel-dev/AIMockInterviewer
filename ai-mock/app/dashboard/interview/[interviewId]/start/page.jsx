"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    GetInterviewDetails();
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
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!mockInterviewQuestion || !mockInterviewQuestion.questions) {
    return <div>No questions available.</div>; // Show no questions available if data is not properly loaded
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex} // Pass the setter function
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
