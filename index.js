
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
app.get('/users/:id', (req,res)=>{
    
    const Id = req.params.id;
    const name = users[Id]; 
    
    res.send({Id,name});
});

//post

app.post('/addProduct',(req,res)=>{
  const product = req.body;
  console.log(product)

  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    collection.insertOne(product,(err,result)=>{
       if(err){
           console.log(err)
       }
       else{
        res.send(result.ops[0]);
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
     
