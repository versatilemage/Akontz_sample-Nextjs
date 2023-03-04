import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import {quiz as Quizzes} from '@/models/index';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
);

export default async (req, res) => {
    await cors(req, res)
    const { id } = req.query
    try {
        const quizzes = await Quizzes.findOne({
            where: {courseId: id}
        });

        return res.send({quizzes})
    }catch (err) {
        console.log(err)
    }
}
