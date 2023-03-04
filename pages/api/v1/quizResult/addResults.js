import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import jwt from 'jsonwebtoken'
// import { quizResults as QuizResults } from '@/models/in'
import {quizResults as QuizResults} from '@/models/index'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  })
)

export default async (req, res) => {
  await cors(req, res)

  const { courseId, quizId, courseName, totalMarks, userId } = req.body;

  try {
    // const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    await QuizResults.create({
      courseId,
      quizId,
      userId,
      courseName,
      totalMarks,
    });
    console.log({ courseId, quizId, userId, courseName, totalMarks });

    res.send({ message: "Your answer has been submitted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
}
