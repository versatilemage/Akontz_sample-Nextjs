import cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import { Op } from 'sequelize';

import {
courses as Course,
users as User,
enroled_courses as EnroledCourses,
} from '@/models/index';

// Initialize the cors middleware
const corsMiddleware = initMiddleware(
cors({
// Only allow requests with GET, POST, PUT, DELETE and OPTIONS
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})
);

export default async (req, res) => {
await corsMiddleware(req, res);

    const { keyword } = req.query;

    try {
        const courses = await Course.findAll({
            where: {
                title: { [Op.iLike]: `%${keyword}%` }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: User, as: 'user',
                attributes: ['name', 'profilePhoto']
            },{
                model: EnroledCourses, as: 'enroled_courses',
                attributes: ['courseId']
            }],
        });
    
        res.send({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while searching for courses' });
    }

}