
const id= 'bappeeDb'
const pass= 'gkfC5pCOTjalHiks'



const express = require ('express')
const cors= require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;


const app = express ()
app.use(cors());
app.use(bodyParser.json());


const users = ["asad","Moin", "Shabed","Susmita", "Sohana"];
const uri = "mongodb+srv://bappeeDb:gkfC5pCOTjalHiks@cluster0-4uwvr.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true });
//database connection




// 1st get
app.get ('/products', (req,res)=>{
      const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
          const collection = client.db("onlineStore").collection("products");
          collection.find().toArray((err,documents)=>{
             if(err){
                 console.log(err)
             }
             else{
              res.send(documents);
             }
                  
         })
          client.close();
        });
     
});

// //2nd get
// app.get('/fruit' , (req,res)=> {
//     res.send({
//         fruit: "banana",
//         quantity: 200,
//         price: 10000
//     })
// });
 
// //3rd get
app.get('/product/:key', (req,res)=>{
    
    const key = req.params.key;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("onlineStore").collection("products");
      collection.find({key}).toArray((err,documents)=>{
         if(err){
             console.log(err)
         }
         else{
          res.send(documents[0]);
         }
              
     })
      client.close();
    });
});
//review post
app.post('/getProductKey', (req,res)=>{
    
  const key = req.params.key;
  const productKeys = req.body;
  console.log(productKeys);

  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.find({key:{$in:productKeys}}).toArray((err,documents)=>{
       if(err){
           console.log(err)
       }
       else{
        res.send(documents);
       }
            
   })
    client.close();
  });
});
//post for amazon
app.post('/addProduct',(req,res)=>{
  const product = req.body;
  console.log(product)

  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.insert(product,(err,result)=>{
       if(err){
           console.log(err)
       }
       else{
        res.send(result.ops[0]);
       }
            
   })
   client.close();
  });
   
});

//place order
app.post('/placeOrder',(req,res)=>{
  const totalInfo = req.body;
  totalInfo.orderTime= new Date();
  console.log(totalInfo);

  client.connect(err => {
    const collection = client.db("onlineStore").collection("orders");
    collection.insertOne(totalInfo,(err,result)=>{
       if(err){
           console.log(err)
       }
       else{
        res.send(result.ops[0]);
        res.status(500).send({message:err})
       }
            
   })
   client.close();
  });
   
})











app.listen(3000 ,()=> console.log('Listening to port 3000'))






// send data to server

// app.post('/addProduct',(req,res)=>{
//     const product = req.body;
//     console.log(product)
  
//     client.connect(err => {
//       const collection = client.db("onlineStore").collection("products");
//       collection.insertOne(product,(err,result)=>{
//          if(err){
//              console.log(err)
//          }
//          else{
//           res.send(result.ops[0]);
//          }
              
//      })
//       client.close();
//     });
     
