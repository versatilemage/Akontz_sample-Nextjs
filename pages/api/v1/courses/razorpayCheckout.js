import Razorpay from 'razorpay'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import { enroled_courses as Enroled_courses } from '@/models/index'

const razorpay = new Razorpay({
    key_id: "rzp_test_NRSClsMgMg8fwL",
    key_secret: "98cv8fjlZgh3MatAOZ7SqsHv",
})

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

export default async (req, res) => {
    await cors(req, res)
    const { paymentData } = req.body

    const enroledCourse = await Enroled_courses.findOne({
      where: {
        userId: paymentData.userId,
        courseId: paymentData.courseId,
      },
    });
    
    if (enroledCourse) {
      return res.status(401).json({message: "The course has already been bought"});
    }else {
      try {
        // const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const payment = await razorpay.orders.create({
          amount: paymentData.stripeTotal * 100, // convert amount to paise
          currency: 'INR',
          receipt: uuidv4(),
          payment_capture: 1,
        })
        await Enroled_courses.create({
          payment_email: paymentData.email,
          cost: paymentData.stripeTotal,
          userId: paymentData.userId,
          courseId: paymentData.courseId
        })
        res.send({message:"Checkout successful!"})
      } catch (error) {
        console.error(error)
        res.send("Error proccessing charge")
      }
    }
    
  }
