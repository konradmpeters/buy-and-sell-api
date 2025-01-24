
import express from 'express'
import cors from 'cors'

// testing

import { 
    get_bsListings, 
    get_bsListing, 
    create_bsListing, 
    update_bsListing, 
    delete_bsListing,

    sp_listing_get,
    sp_listings_get, 
    sp_listing_update, 
    sp_listing_insert,
    sp_listing_delete,

    sp_mylisting_get,
    sp_mylistings_get, 
    sp_mylisting_update, 
    sp_mylisting_insert,
    sp_mylisting_delete

} from './database.js'

const app = express()


app.use(express.json())  // because of the req.body need json format
app.use(cors())



app.get("/listings", async (req,res) => {
    const result = await get_bsListings()
    res.send(result)

    //res.send("this should be the listings")
})

app.get("/listing/:id", async (req,res) => {
    const id = req.params.id
    const result = await get_bsListing(id)
    res.send(result)
})

app.post("/crt_listing", async (req,res) => {
    const {name,description,price} = req.body
    const result = await create_bsListing(name,description,price)
    res.status(201).send(result)
   
})

app.post("/upd_listing", async (req,res) => {
    const {name,description,price,id} = req.body
    const result = await update_bsListing(name,description,price,id)
    res.status(201).send(result)

})

app.post("/del_listing", async (req,res) => {
    //const id = req.params.id
    const {id} = req.body
    const result = await delete_bsListing(id)
    res.status(201).send(result)
})

/*
 ___________________________________
 |  
 |  Store Procedure Call function  |
 ___________________________________

 */

 // ___________ sp for bs_listings ___________

 app.post("/sp_get_listings", async (req,res) => {

    const result = await sp_listings_get()
    res.status(201).send(result)

})

 app.post("/sp_get_listing", async (req,res) => {

    const {id} = req.body
    const result = await sp_listing_get(id)
    res.status(201).send(result)

})

 app.post("/sp_upd_listing", async (req,res) => {

    const {id,name,description,price} = req.body
    const result = await sp_listing_update(id,name,description,price)
    res.status(201).send(result)

})

app.post("/sp_ins_listing", async (req,res) => {

    const {name,description,price} = req.body
    const result = await sp_listing_insert(name,description,price)
    res.status(201).send(result)

})

app.post("/sp_del_listing", async (req,res) => {

    const {id} = req.body
    const result = await sp_listing_delete(id)
    res.status(201).send(result)
})


// ___________ sp for bs_mylistings ___________
 
app.post("/sp_get_mylistings", async (req,res) => {

    const result = await sp_mylistings_get()
    res.status(201).send(result)
})

 app.post("/sp_get_mylisting", async (req,res) => {

    const {id} = req.body
    const result = await sp_mylisting_get(id)
    res.status(201).send(result)
})

 app.post("/sp_upd_mylisting", async (req,res) => {

    const {id,name,description,price} = req.body
    const result = await sp_mylisting_update(id,name,description,price)
    res.status(201).send(result)
})

app.post("/sp_ins_mylisting", async (req,res) => {

    const {name,description,price} = req.body
    const result = await sp_mylisting_insert(name,description,price)
    res.status(201).send(result)  
})

app.post("/sp_del_mylisting", async (req,res) => {

    const {id} = req.body
    const result = await sp_mylisting_delete(id)
    res.status(201).send(result)
})

 /*
 _____________________________
 |  
 |  Handling Error Checking  |
 _____________________________

 */

app.use((err, req, res, next) => {
    console.error(err.stack)
    console.log(err)
    res.status(500).send(err)
  })


 /*
 _____________
 |  
 |  Listener |
 _____________

 */

app.listen(8080,() => {
    console.log('Server is running on port 8080')
})