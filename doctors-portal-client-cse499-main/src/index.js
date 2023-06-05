//npm install --to install dependency in server and client
//npm start --to start client side project
//nodemon index.js --to start server
//node index.js --if nodemon index.js din't work

const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express()
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://doctors-portal:doctors-portal@cluster0.fdf8ojg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//token
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized access' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' })
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    const serviceCollection = client.db("doctors_portal").collection("services");
    const bookingCollection = client.db("doctors_portal").collection("bookings");
    const userCollection = client.db("doctors_portal").collection("users");
    const doctorCollection = client.db("doctors_portal").collection("doctors");
    const paymentCollection = client.db("doctors_portal").collection("payments");
    const reviewCollection = client.db("doctors_portal").collection("reviews");

    //token
    const verifyAdmin = async (req, res, next) => {
      const requester = req.decoded.email;
      const requesterAccount = await userCollection.findOne({ email: requester });
      if (requesterAccount.role === 'admin') {
        next();
      }
      else {
        res.status(403).send({ message: 'forbidden' });
      }
    }

    //payment
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const service = req.body;
      const price = service.price;
      const amount = price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card'],
      });
      res.send({ clientSecret: paymentIntent.client_secret, })
    });

    //post review
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    //get reviews
    app.get('/review', async (req, res) => {
      const reviews = await reviewCollection.find().toArray();
      res.send(reviews);
    })

    //get bookings
    app.get('/booking', verifyJWT, async (req, res) => {
      const patient = req.query.patient;
      const decodedEmail = req.decoded.email;
      if (patient === decodedEmail) {
        const query = { patient: patient };
        const bookings = await bookingCollection.find(query).toArray();
        return res.send(bookings);
      }
      else {
        return res.status(403).send({ message: 'forbidden access' });
      }
    })

    //get all services
    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // Warning: This is not the proper way to query multiple collection. 
    // After learning more about mongodb. use aggregate, lookup, pipeline, match, group
    app.get('/available', async (req, res) => {
      const date = req.query.date;

      // step 1:  get all services
      const services = await serviceCollection.find().toArray();

      // step 2: get the booking of that day. output: [{}, {}, {}, {}, {}, {}]
      const query = { date: date };
      const bookings = await bookingCollection.find(query).toArray();

      // step 3: for each service
      services.forEach(service => {
        // step 4: find bookings for that service. output: [{}, {}, {}, {}]
        const serviceBookings = bookings.filter(book => book.treatment === service.name);
        // step 5: select slots for the service Bookings: ['', '', '', '']
        const bookedSlots = serviceBookings.map(book => book.slot);
        // step 6: select those slots that are not in bookedSlots
        const available = service.slots.filter(slot => !bookedSlots.includes(slot));
        //step 7: set available to slots to make it easier 
        service.slots = available;
      });

      res.send(services);
    })

    //post booking
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const query = { treatment: booking.treatment, date: booking.date, patient: booking.patient };
      const exists = await bookingCollection.findOne(query);
      if (exists) {
        return res.send({ success: false, booking: exists })
      }
      const result = await bookingCollection.insertOne(booking);
      res.send({ success: true, result });
    })

    //update payment status after payment in booking
    app.patch('/booking/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        }
      }
      const result = await paymentCollection.insertOne(payment);
      const updatedBooking = await bookingCollection.updateOne(filter, updatedDoc);
      res.send(updatedDoc);
    })

    //get specific idd booking
      app.get('/booking/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const booking = await bookingCollection.findOne(query);
      res.send(booking);
    })

    //get users
    app.get('/user', verifyJWT, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    })

    //get admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === 'admin';
      res.send({ admin: isAdmin });
    })

    //make a user admin
    app.put('/user/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: 'admin' },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
///////////////////////
////////////////////
///////////////////
    ////change slot status
    // app.patch('/booking/:id', verifyJWT, async (req, res) => {
    //   const id = req.params.id;
    //   const payment = req.body;
    //   const filter = { _id: ObjectId(id) }
    //   const updatedDoc = {
    //     $set: {
    //       paid: true,
    //       transactionId: payment.transactionId,
    //     }
    //   }
    //   const result = await paymentCollection.insertOne(payment);
    //   const updatedBooking = await bookingCollection.updateOne(filter, updatedDoc);
    //   res.send(updatedDoc);
    // })
    
    //update appointment for treatment status
    app.put('/slot/true/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: { available: 'false' },
      };
      const result = await serviceCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
    ///////////////////// for false
    app.put('/slot/false/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: { available: 'true' },
      };
      const result = await serviceCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

    //upset user
    app.put('/user/:email', async (req, res) => {
      const user = req.body;
      const email = req.params.email;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      //token generate
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ result, token });
    })



    //get doctors
    app.get('/doctor', async (req, res) => {
      const doctors = await doctorCollection.find().toArray();
      res.send(doctors);
    })

    //post doctors
    app.post("/doctor", verifyJWT, verifyAdmin, async (req, res) => {
      const doctor = req.body;
      const result = await doctorCollection.insertOne(doctor);
      res.send(result);
    });

    //delete doctors
    app.delete("/doctor/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await doctorCollection.deleteOne(query);
      res.send(result);
    })

    /**
     * API Naming Convention
     * app.get('/booking') //get all booking in this collection. or get more than one or by filter
     * app.get('/booking/:id') //get a specific booking
     * app.post('/booking') //add a new booking
     * app.patch('/booking/:id') //update specific
     * app.put('/booking/:id') //update or insert => upsert
     * app.delete('/booking/:id') //delete specific
     */
  }

  finally {

  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from doctors portal!')
})

app.listen(port, () => {
  console.log(`Doctors listening on port ${port}`)
})
