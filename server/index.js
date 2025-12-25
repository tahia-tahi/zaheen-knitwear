const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 3000;
const app = express()
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajyk6la.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db('garmentsDB').collection('users');
    const heroCollection = client.db('garmentsDB').collection('hero')
    const productCollection = client.db('garmentsDB').collection('products')

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

    app.get('/api/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.get('/api/hero', async (req, res) => {
      const heroData = await heroCollection.findOne({})
      res.json(heroData)
    })

    app.put("/api/hero", async (req, res) => {
      const updatedHero = req.body;

      const result = await heroCollection.updateOne(
        {},
        { $set: updatedHero },
        { upsert: true }
      );
      res.send({
        success: true,
        message: "Hero updated successfully",
        result,
      });
    });

    app.get('/api/products', async (req, res) => {
      const productData = await productCollection.find({}).toArray();
      res.json(productData)
    })

    app.post('/api/products', async (req, res) => {
      try {
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);

        res.send({
          success: true,
          message: "Product added successfully",
          productId: result.insertedId
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to add product"
        });
      }
    });

    app.put('/api/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updatedProduct = req.body;

        const result = await productCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedProduct }
        );

        res.send({
          success: true,
          message: "Product updated successfully"
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to update product"
        });
      }
    });

    app.delete('/api/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        await productCollection.deleteOne({ _id: new ObjectId(id) });

        res.send({ success: true, message: "Product deleted successfully" });
      } catch (error) {
        res.status(500).send({ success: false, message: "Failed to delete product" });
      }
    });



    console.log
      ("You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})