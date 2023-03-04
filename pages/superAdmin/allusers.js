import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import baseUrl from '@/utils/baseUrl'
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import {redirectUser} from '@/utils/auth'

const collectionOfUsers = ({collectionOfUsers}) => {
    // console.log(collectionOfUsers?.users)
    const router = useRouter()

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
                            <div className="td-sidebar">
                                <ul>
                                    <li>
                                        <Link href="/admin/pending-requests" activeClassName="active">
                                            <a>Pending Requests</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/allusers" activeClassName="active">
                                            <a>User Details</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" activeClassName="active">
                                            <a>Dumy Text</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8">

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
                                        {collectionOfUsers?.users?.length ? (
                                            <>
                                                {collectionOfUsers.users.map((request, index) => {
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
