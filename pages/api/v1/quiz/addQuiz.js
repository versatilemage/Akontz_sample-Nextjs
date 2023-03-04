import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import jwt from 'jsonwebtoken'
import { quiz as Quiz } from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

export default async (req, res) => {
    await cors(req, res)
    if(!("authorization" in req.headers)){
        return res.status(401).json({message: "No autorization token"});
    }

    const { totalTime, courseId, quizzes, courseName } = req.body;

    try {
        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        await Quiz.create({
            totalTime, 
            courseId, 
            quizzes, courseName,
            userId
        });
        console.log( totalTime, courseId, quizzes, courseName, userId )

        res.send("Congratulations! Successfully created the Quiz.")
    }catch (err) {
        console.log(err)
    }

}

