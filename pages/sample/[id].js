import React, {useState, useEffect} from "react";
import Link from 'next/link'
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import PageBanner from "@/components/SingleCourses/PageBanner";

const SampleCoursePage = ({course}) => {

	const [state, setState] = useState("");
	const [file, setFile] = useState("");
	const [show, setShow] = useState(0);
	const [url, setUrl] = useState(course?.videos[0]?.PDFfile[0]);
	const [filteredData, setFilteredData] = useState([]);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		const ChapterName = course?.videos.map((i) => (i.chapterName))
		const uniqueChapters = [...new Set(ChapterName)]
		setFilteredData(uniqueChapters)
	}, [])

	const pdfViewer = (Url) => {
		setShow(0)
		setUrl(Url)

		/*// API call, CompletedCourse => id, UserID, ChapterId, link
		// if (link == already present){

		//}else {
			CompletedCOurse.create(userId, ChapterId, Link)
		//}

		findAll => isCourseCompleted => query or params {uniquecourseid, userId, chapterId}
		coursecompelte table cccount = 3

		query findAll => courseMainTable(chapterid)
		smlength = 4
		if(cccount == smlenght){
			api = chptercompelted(userid, chapterid, uniqucourseid), 
		}

		coursemain tbale = select(uniquecourseid)
		return = 7
		if(reurn == api)
		quize enable
		*/


		// API work 
		//coursecompeltetable insert API = userid, 1.ppdf, chapterid - api

			//api
		//select coursecomplete table , userid, chapterid = return 
	}

	const videoViewer = (Url) => {
		setShow(1)
		setUrl(Url)
	}

    return (
        <>
        <PageBanner
				pageTitle={course.title}
				homePageUrl="/"
				homePageText="Home"
				innerPageUrl="/courses-1"
				innerPageText="Courses"
				activePageText={course.title}
				coverPhoto={course.coverPhoto}
		/>
            <div className="sample_course-Container">
				<div className="sample_course-learning_material">
					{show === 1 ? 
					<div className="video-Player_container">
						<video
							width="97%"
							key={url}
							controls="controls" controlsList="nodownload">
							<source src={url} type="video/mp4"/>
						</video>
					</div>
					: 
					<div className="video-Player_container">
						{/* <iframe src={`https://cdn.cloudinary.com/dev-empty/image/upload/fl_format,if_pptx/${url}`} width="100%" height="600px"></iframe> */}
						<iframe 
							src={`${url}#toolbar=0`}
							// src={`https://view.officeapps.live.com/op/view.aspx?src=${url}`}
							key={url}
							controlsList="nodownload"
							width="100%" height="1000vh"
						/>
					</div>}
				</div>

				<div className="sample-course-choose_dashboard">
				{course.videos.reduce((acc, i, index) => {
					const existingChapter = acc.find(c => c.chapterName === i.chapterName);
					if (existingChapter) {
					existingChapter.videos.push(i);
					} else {
					acc.push({
						chapterName: i.chapterName,
						videos: [i],
					});
					}
					return acc;
				}, []).map((c, index) => {
					return (
					<details key={index} className={`main_course-dashboard_container ${expanded ? 'expanded' : ''}`}>
						<summary className="chapter-header_seperator" 
							onClick={() => setExpanded(!expanded)}>
								{`${index + 1}. ${c.chapterName}`}
						</summary>
						{c.videos.map((i, videoIndex) => {
						return (
							<div key={videoIndex} className="study_material-Selecting-Tab">
							<div
								className="video_selecting-Tab"
								onClick={() => videoViewer(i.video_url)}
							>
								{`${videoIndex + 1}. ${i.name}`}
								<i className="flaticon-play"></i>
							</div>
							{i?.PDFfile?.map((v, pdfIndex) => {
								return (
								<div
									key={pdfIndex}
									className="pdf_selecting-Tab"
									onClick={() => pdfViewer(v)}
								>
									{`study note`} <i className="flaticon-brain-process"></i>
								</div>
								);
							})}
							</div>
						);
						})}
					</details>
					);
				})}
				</div>		
            </div>
        </>
    )
}

SampleCoursePage.getInitialProps = async (ctx) => {
	const { id } = ctx.query;
	const url = `${baseUrl}/api/v1/courses/course/${id}`;
	const response = await axios.get(url);
	// console.log(response)
	return response.data;
};

export default SampleCoursePage;
