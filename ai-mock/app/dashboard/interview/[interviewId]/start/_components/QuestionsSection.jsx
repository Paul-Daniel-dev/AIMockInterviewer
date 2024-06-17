import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  if (!mockInterviewQuestion) {
    return <div>Loading...</div>;
  }

  const currentQuestion = mockInterviewQuestion.questions?.[activeQuestionIndex];

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.questions &&
          mockInterviewQuestion.questions.map((item, index) => (
            <h2
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? "text-red-600" : ""
              }`}
              key={index}
            >
              Question # {index + 1}
            </h2>
          ))}
      </div>
      {currentQuestion ? (
        <>
          <h2 className="my-5 text-md md:text-lg">
            {currentQuestion.question}
          </h2>
          <Volume2 className="cursor-pointer" onClick={() => textToSpeech(currentQuestion.question)} />
        </>
      ) : (
        <div>No questions available.</div>
      )}
      <div className="border rounded-lg p-5 bg-blue-600 mt-20">
        <h2 className="flex gap-2 items-center text-white">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-white text-sm my-2">
        Please wait until you get a popup that your response has been saved before you continue to the next question. Click on Record Answer when you are ready to answer the question. Make sure to speak clearly into your mic. At the end of the interview we will give you feedback along with the correct answer for each question and your answer so you can compare it.
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
