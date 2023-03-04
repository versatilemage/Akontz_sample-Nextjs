import React from 'react'
import { useSelector } from 'react-redux';
import baseUrl from '@/utils/baseUrl';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';

const TakeNotes = () => {
  return (
    <>
        <PageBanner 
            pageTitle="Take Notes" 
            homePageUrl="/" 
            homePageText="Home" 
            activePageText="Take Notes" 
        />

        <div>

        </div>
    </>
  )
}

export default TakeNotes;
