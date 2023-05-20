
 

let sectors = ['Security','Network','Analyst']


const getSectors = (req,res)=>{
    res.status(200).json(sectors)
}

const addsectors= (req,res)=>{
    const sector = req.body
    sectors.push(sector.sector)
    res.status(200).json(sectors)
}

const removeSectors = (req,res)=>{
    const sector = req.body.sector
    console.log(sector)
    const index = sectors.findIndex((d)=>d ===sector)

    if(index === -1)
    {
        return res.status(404).json({message:'Sector not found'})
    }
    sectors.splice(index,1)
    res.status(200).json({message:' sector Deleted'})  
   
}

module.exports={sectors, getSectors,addsectors,removeSectors}