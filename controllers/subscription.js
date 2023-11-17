const Subscription= require('../models/subscriptionModel');

exports.addSubs=async(req,res)=>{
    try {
        const {name, price}= req.body;

        if(!name || !price){
            return res.status(400).json({
                success:false,
                message:"All the fields are mandatory"
            })
        }

        const subsData= await Subscription.create({
            name, price
        })

        return res.status(200).json({
            success:true,
            message:"subscription added successfully",
            subsData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in adding the subscription",
        });
    }
}

exports.getSubs=async(req,res)=>{
    try {
        const subscriptiondata= await Subscription.find({});

        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:subscriptiondata,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error in fetching the subscription",
        });
    }
}
