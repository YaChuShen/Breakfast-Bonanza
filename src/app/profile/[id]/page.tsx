import admin from 'functions/admin';
import Profile from 'Components/Profile';
import { Suspense } from 'react';
import Loading from 'Components/Loading';

interface PageProps {
  params: {
    id: string;
  };
}

interface Score {
  score: number;
  time: string;
}



export const revalidate = 60; 

const Page = async () => {
  return <Profile  />
  } 


export default Page;

