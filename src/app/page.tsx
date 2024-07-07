import Link from "next/link";
import SimpleRepo from "@/lib/database/simple-repo";
import Course from "@/lib/model/course";
import CourseForm from "./components/CourseForm/CourseForm";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      {/* <Link href="/about">About</Link> */}
      <CourseForm />
    </div>
  );
}

// classes with many sections
// CSE 120 - TuTh
// CSE 110 - lots of labs
// COGS 108 - many labs, two sections
// CSE 170 - Lots of ST classes
// MATH 20C - lots of lectures, discussions, exams
// MATH 20D - lots of lectures, labs, discussions
