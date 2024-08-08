import Link from "next/link";
import CourseForm from "./components/CourseForm/CourseForm";
import CourseDisplay from "./components/CourseDisplay/CourseDisplay";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <CourseDisplay />
    </div>
  );
}
