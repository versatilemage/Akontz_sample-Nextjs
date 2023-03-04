import React, {useState, useEffect} from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import baseUrl from '@/utils/baseUrl'
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import { useSelector } from 'react-redux'
import Link from '@/utils/ActiveLink'
import {redirectUser} from '@/utils/auth'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard'
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard'

const collectionOfUsers = ({collectionOfUsers}) => {
    // console.log(collectionOfUsers?.users)
    const router = useRouter()
    const userData = useSelector((state) => state.userData)
    const userRole = userData?.userInfo?.role

    const [shownList, setShownList] = useState([]);

    const [selectedRole, setSelectedRole] = useState("")

    const filterData = (e) => {
        if(e.role === selectedRole){
            return e
        }
    };

    const changeRole = (e) => {
        setSelectedRole(e.target.value)
    }

    useEffect(() => {
        if(selectedRole === ""){
            setShownList(collectionOfUsers?.users)
        }else {
            setShownList(collectionOfUsers?.users?.filter(filterData))
        }
    }, [collectionOfUsers, selectedRole]);

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Admin Dashboard" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Admin Dashboard" 
            /> 

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                        {userRole === "superAdmin" 
                            ? 
                            <SuperAdminLeftDashboard/> 
                            : 
                            (userRole === "admin" 
                            ? 
                            <AdminLeftDashboard/> 
                            : 
                            (userRole === "teacher"
                            ? <TeacherLeftDashboard/>
                            :
                            null))}
                        </div>

                        <div className="col-md-8 col-lg-8">
                        <div className="form-group">
                            <label>User Filter</label>
                            <select onChange={changeRole} name="gender" className="form-control">
                                <option value={""}>Select User Role</option>
                                <option value={"superAdmin"}>Super Admin</option>
                                <option value={"admin"}>Admin</option>
                                <option value={"teacher"}>Teacher</option>
                                <option value={"student"}>Student</option>
                            </select>
                        </div>
                            <div className="table-responsive">
                                <table className="table vertical-align-top">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">User Email</th>
                                            <th scope="col" className="text-right">User Role</th> 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {shownList?.length ? (
                                            <>
                                                {shownList.map((request, index) => {
                                                    return (
                                                        <tr key={request.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                {request.name}
                                                            </td>
                                                            <td>
                                                                {request.email}
                                                            </td>
                                                            <td className="text-right">
                                                                {request.role}
                                                            </td> 
                                                        </tr>   
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <tr className="text-center">
                                                <td colSpan="3">No Users Available!</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </React.Fragment>
    )
}

// collectionOfUsers.getInitialProps = async (ctx) => {
//     // console.log(id)
//     const { token } = parseCookies(ctx)
//     if(!token){
//         redirectUser(ctx, '/authentication')
//     }
//     const url = `${baseUrl}/api/v1/user/getalluser`
//     const payload = { headers: {Authorization: token} }
//     const response = await axios.get(url, payload)
//     // console.log(response.data)
//     return response.data
// }

export const getServerSideProps = async () => {
	const url = `${baseUrl}/api/v1/user/getalluser`;
	try{
		const response = await axios.get(url);
		return { props: {collectionOfUsers: response.data} };
	}catch (error) {
		console.error(error);
		return { props: {collectionOfUsers: []} };
	}
};

export default collectionOfUsers
