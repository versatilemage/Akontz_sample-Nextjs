import React from 'react';
import Link from 'next/link';
import { handleLogout } from '@/utils/auth';

const TeacherLeftDashboard = () => {
    return (
        <React.Fragment>
            <div className="td-sidebar">
                <ul>
                    <li>
                        <Link href="/teacher/courses" activeClassName="active">
                            <a>My Courses</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/teacher/course/create" activeClassName="active">
                            <a>Create A Course</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/teacher/courses/course-edit" activeClassName="active">
                            <a>Edit My Course</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/teacher/course/upload-course-video" activeClassName="active">
                            <a>Upload Study Material</a>
                        </Link>
                    </li>
                    {/* <li>
                                        <Link href="/teacher/course/pdf-viewer" activeClassName="active">
                                            <a>pdf notes</a>
                                        </Link>
                                    </li> */}
                    <li>
                        <Link href="/teacher/course/addQuiz" activeClassName="active">
                            <a>Add Quiz</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Active user list</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Start Live Session</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>User's feedback</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" activeClassName="active">
                            <a>Exit Dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" activeClassName="active">
                            <a onClick={e => {
                                e.preventDefault();
                                handleLogout()
                            }}>
                                Logout
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default TeacherLeftDashboard;
