import React from 'react'
import Link from '@/utils/ActiveLink'
import { handleLogout } from '@/utils/auth'

const SuperAdminLeftDashboard = () => {
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
                    <li>
                        <Link href="/teacher/course/addQuiz" activeClassName="active">
                            <a>Add Quiz</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Active User List</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/allusers" activeClassName="active">
                            <a>User Details</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/superAdmin/createAdminCredentials" activeClassName="active">
                            <a>Create Admin</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/my-courses" activeClassName="active">
                            <a>Manage Courses</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Promotions</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Recorded Sessions</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>User Feedback</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" activeClassName="active">
                            <a>Send Notifications</a>
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

export default SuperAdminLeftDashboard;
