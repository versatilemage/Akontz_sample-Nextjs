import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import {quizResults as QuizResults} from '@/models/index'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
);

export default async (req, res) => {
    await cors(req, res)
    const {id} = req.query
    console.log("identity", id)
    try {
        const getResults = await QuizResults.findAll({
            where: {userId: id}
        });

        return res.send({getResults})
    }catch (err) {
        console.log(err)
    }
}
