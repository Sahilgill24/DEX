const express= require("express")
const Moralis = require("moralis").default;
const app =express()
const cors=require("cors")
require("dotenv").config()
const port =3001;


app.use(cors())
app.use(express.json())

app.get("/tokenPrice",async (req,res) => {
  const {query} =req;
  const responseone = await Moralis.EvmApi.token.getTokenPrice({address: query.addressone});
  const responsetwo = await Moralis.EvmApi.token.getTokenPrice({address: query.addresstwo})
  console.log(responseone.raw)
  console.log(responsetwo.raw)
  const usdprices={
    tokenOne : responseone.raw.usdPrice,
    tokentwo : responsetwo.raw.usdPrice,
    ratio :  responseone.raw.usdPrice/responsetwo.raw.usdPrice
  }


    
  
  return res.status(200).json(usdprices)
})



Moralis.start({
  apiKey:process.env.MORALIS_KEY,

}).then(() => {
  app.listen(port,() => {
    console.log("calls accepting ")
  })
})
