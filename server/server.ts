import express from "express"


const PORT=5000;
const app=express()



app.listen(PORT,()=>{
    console.log(`your app is listening on http://localhost:${PORT}`)
})



