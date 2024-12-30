'use client'
// import Form from './_component/Form';
import dynamic from "next/dynamic";
const Form = dynamic(() => import('./_component/Form'), { ssr: false });

export default function Home() {
  return (
    <div>

        <Form />


    </div>
  );
}