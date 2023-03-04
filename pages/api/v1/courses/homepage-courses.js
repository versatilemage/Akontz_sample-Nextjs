import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import { 
    courses as Course,
    users as User,
    enroled_courses as Enroled_courses
} from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

const handleError = (res, error) => {
    console.log(error)
    res.status(500).json({error: 'An error occurred while processing the courses fetching request.'})
}

export default async (req, res) => {

    await cors(req, res)

    res.setHeader('Content-Type', 'application/json');

    try {
        const courses = await Course.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 4,
            include: [{
                model: User, as: 'user',
                attributes: ['name', 'profilePhoto']
            },{
                model: Enroled_courses, as: 'enroled_courses',
                attributes: ['courseId']
            }],
        })

        res.send({courses})

    } catch (error) {
        handleError(res, error)
    }
}

