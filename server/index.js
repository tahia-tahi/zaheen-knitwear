const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors({
  origin: ['zaheen-knitwear.vercel.app'], 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajyk6la.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db('garmentsDB').collection('users');
    const heroCollection = client.db('garmentsDB').collection('hero');
    const productCollection = client.db('garmentsDB').collection('products');

    // --- JWT API ---
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: false, 
          sameSite: 'none'
        })
        .send({ success: true });
    });

    app.post('/logout', async (req, res) => {
      res.clearCookie('token', { maxAge: 0 }).send({ success: true });
    });
    // ----------------

    app.post('/api/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'User already exists' });
      }
      const result = await userCollection.insertOne({
        ...user,
        role: 'user'
      });
      res.send(result);
    });

    app.get('/api/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      let isAdmin = false;
      if (user) {
        isAdmin = user.role === 'admin';
      }
      res.send({ admin: isAdmin });
    });

    app.get('/api/hero', async (req, res) => {
      const heroData = await heroCollection.findOne({});
      res.json(heroData);
    });

  app.put("/api/hero", async (req, res) => {
  try {
    const updatedHero = req.body;
    
    const { _id, ...updateData } = updatedHero;

    const result = await heroCollection.updateOne(
      {}, 
      { $set: updateData },
      { upsert: true } 
    );

    res.send({
      success: true,
      message: "Hero updated successfully",
      result,
    });
  } catch (error) {
    console.error("Hero Update Error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});

    app.get('/api/products', async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.post('/api/products', async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send({ success: true, productId: result.insertedId });
    });

    app.delete('/api/products/:id', async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    console.log("Connected to MongoDB!");
  } finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => { res.send('Server is running'); });
app.listen(port, () => { console.log(`Listening on port ${port}`)});