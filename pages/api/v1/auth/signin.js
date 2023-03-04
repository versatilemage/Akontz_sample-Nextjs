import Cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import initMiddleware from '@/lib/init-middleware'
import { users as User } from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

console.log("this is working in signin server")

export default async (req, res) => {
    await cors(req, res)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
    const { email, password } = req.body
    console.log("email", email, password)
    try {
        if (!isEmail(email)){
            console.log({message: "Email should be a valid email address"})
            return res.status(422).send({error: "Email should be a valid email address", message: "Email should be a valid email address"})
        }

        const user = await User.findOne({
            where: { email: email }
        })

        if(!user) {
            console.log({message: "User account does not exist"})
            return res.status(404).send({error: "User account does not exist", message: "User account does not exist"});
        }

        if(!user.active){
            console.log({error: "This account is temporarily disabled, please contact the support email"})
            return res.status(404).send({error: "This account is temporarily disabled, please contact the support email", message: "This account is temporarily disabled, please contact the support email"});
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch){
            const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            console.log({token: token})
            res.status(200).send(token);
        } else {
            console.log({error: "Password is not correct"})
            res.status(401).send({error: "Password is not correct", message: "Password is not correct"});
        }
    } catch (error) {
        // console.error(error)
        console.log({error: "Sign in failed catch"})
        res.status(500).send({error: error, message: "Sign in failed catch"})
    }
}