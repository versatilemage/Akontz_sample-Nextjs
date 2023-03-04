import React, {useState, useEffect} from "react";
import Link from 'next/link'
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import PageBanner from "@/components/Common/PageBanner";

const StudentDashboard = ({}) => {
    const [state, setState] = useState("");

    return (
        <>
            <PageBanner
                    pageTitle={`student dashboard`}
                    homePageUrl="/"
                    homePageText="Home"
                    activePageText={`student dashboard`}
            />

            <div className="student_dashboard-container">
                <div className="show_what-data_Pressed"></div>
                <div className="studentpage-toggle">
                    <h1>Student Dashboard</h1>
                    <div>Your Profile</div>
                    <div>Active Courses</div>
                    <div>Take Quiz</div>
                    <div>Score Card</div>
                    <div>Your Notes</div>
                    <div>Live Session</div>
                    <div>Recorded session</div>
                    <div>Your Notification</div>
                    <div>Available Courses</div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default StudentDashboard;
