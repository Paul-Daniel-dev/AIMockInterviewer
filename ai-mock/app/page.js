import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-end items-center mt-10 ">
        <div>
          <h1 className="font-bold text-6xl">
            Welcome to AI mock interviewer!
          </h1>
        </div>
        <div className="pt-10 pb-10">
          <Link href={"/dashboard"}>
            <Button className="border bg-black text-xl text-white hover:bg-white hover:text-black">
              Click here to start your interview journey!
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="font-bold text-5xl">
            Introducing our AI Mock Interview Platform
          </h1>
        </div>
        <div className="w-6/12 pt-10 pb-10">
          <h1 className="text-lg text-justify">
            {" "}
            – your ultimate companion in software programming interview
            preparation! Our advanced AI-driven tool offers realistic and
            comprehensive mock interviews tailored to your specific programming
            languages, frameworks, and job roles. By simulating real technical
            and behavioral interview scenarios, we help you practice and refine
            your responses, build confidence, and identify areas for
            improvement. With instant feedback and personalized recommendations,
            you can perfect your coding challenges, system design questions, and
            soft skills from the comfort of your home. Whether you’re a recent
            graduate, a seasoned developer, or someone looking to switch careers
            within the tech industry, our platform is designed to enhance your
            readiness and ensure you make a lasting impression. Step into your
            next software programming interview with confidence – practice with
            us today!
          </h1>
          
          
        </div>
        <div>
          <h1 className="font-bold text-5xl">
          Why choose our AI Mock Interview Platform?
          </h1>
        </div>
        <div className="w-6/12 pt-10 pb-10">
          <h1 className="text-lg text-justify">
            {" "}
            In today’s competitive job market, standing out in software
            programming interviews is crucial. Our tool offers unparalleled
            benefits: personalized mock interviews tailored to your expertise
            ensure you face questions relevant to your desired role. Instant
            feedback helps you quickly identify and correct mistakes, while
            detailed performance analytics highlight your strengths and areas
            needing improvement. With the flexibility to practice anytime,
            anywhere, you can fit interview preparation into your busy schedule.
            Moreover, our AI continuously learns and adapts, providing
            up-to-date and challenging scenarios that reflect current industry
            standards. Invest in your future with our AI Mock Interview Platform
            and transform your interview skills into a compelling advantage.
          </h1>
          
          
        </div>
      </div>
    </>
  );
}
