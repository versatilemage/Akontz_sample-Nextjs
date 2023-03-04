import cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import { users as User } from '@/models/index';

const corsMiddleware = initMiddleware(
    cors({
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
);

const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request for users.' });
};

export default async (req, res) => {
    await corsMiddleware(req, res);
    try {
        const users = await User.findAll({
            order: [['createdAt', 'DESC']],
        });

        res.status(200).send({ users });
    } catch (error) {
        handleError(res, error);
    }
};
