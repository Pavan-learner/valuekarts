import eventModel from "../models/eventModel.js";

export const createEventController = async(req,res) =>{
    try {
        const {name , description , image , price} = req.body;

        if(!name || !price || !description){
            return res.status(401).send({
                success:false,
                message:"All fields are required"
            })
        }

        const event = await eventModel.create({
            name,description,price
        })

        if(image){
            const parseData = JSON.parse(image);
            event.image = parseData;
        }

        await event.save();
        res.status(201).send({
            success:true,
            message:"Event created successfully",
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getEventsController =  async(req,res) =>{    
    try {
        const events = await eventModel.find().sort({createdAt:-1});

        res.status(200).send({
            success:true,
            message:"Events fetched successfully",
            events
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}


export const getSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure 'id' is valid and 'eventModel' is correctly defined and imported
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Event ID is required"
            });
        }

        const event = await eventModel.findById(id);

        if (!event) {
            return res.status(404).send({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).send({
            success: true,
            event
        });
    } catch (error) {
        console.error(error); // Better logging
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};


export const updateEventController = async(req,res) =>{ 
        try {
            const {id} = req.params;
            const {name , description , image , price} = req.body;

            if(!name || !price || !description){
                return res.status(401).send({
                    success:false,
                    message:"All fields are required"
                })
            }

            const event = await eventModel.findByIdAndUpdate(id,{
                name,description,price
            },{
                new:true
            });

            if(image){
                const parseData = JSON.parse(image);
                event.image = parseData;
            }

            await event.save();
            res.status(201).send({
                success:true,
                message:"Event updated successfully",
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Internal server error"
            })
        }
}

export const deleteEventController = async(req,res) =>{
    try {
        const {id} = req.params;
        await eventModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Event deleted successfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}