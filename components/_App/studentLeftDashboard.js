import React, { useState } from "react";
import Link from 'next/link';
import Router, { useRouter } from "next/router";
import { handleLogout } from "@/utils/auth";

const StudentLeftDashboard = ({ condition }) => {

  const handleLinkClick = (e, i) => {
    // const a = window.confirm("Do you want to close your quiz, Your changes will not be saved");
    // if(a === true && i !== true ){
    //   Router.push(e)
    // }else if (a === true && i === true){
    //   handleLogout()
    // }
  }
  return (
    <>
      {
      <div className="td-sidebar">
        <ul>
          <li>
            <Link href="/my-courses" activeClassName="active">
              <a>
                Enrolled Courses
              </a>
            </Link>
          </li>
          <li>
            <Link href="/quiz/takeQuiz" activeClassName="active">
              <a>Take Quiz</a>
            </Link>
          </li>
          <li>
            <Link href="/quiz/quizResult" activeClassName="active">
              <a>Score Card</a>
            </Link>
          </li>
          <li>
            <Link href="/" activeClassName="active">
              <a>Your Notes</a>
            </Link>
          </li>
          <li>
            <Link href="/" activeClassName="active">
              <a>Live Session</a>
            </Link>
          </li>
          <li>
            <Link href="/" activeClassName="active">
              <a>Recorded Session</a>
            </Link>
          </li>
          <li>
            <Link href="/courses" activeClassName="active">
              <a>
                Available Courses
              </a>
            </Link>
          </li>
          <li>
            <Link href="/cart" activeClassName="active">
              <a>Your Cart</a>
            </Link>
          </li>
          <li>
            <Link href="/contact" activeClassName="active">
              <a>Contact Us</a>
            </Link>
          </li>
          <li>
            <Link href="/" activeClassName="active">
              <a>Exit Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a onClick={e => {
                e.preventDefault();
                handleLogout()
              }}>
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default StudentLeftDashboard;
