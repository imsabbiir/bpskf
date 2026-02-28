/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();
    useEffect(()=>{
        router.push("/user/profile")
    }, [])
  return <div></div>;
}

export default page;
