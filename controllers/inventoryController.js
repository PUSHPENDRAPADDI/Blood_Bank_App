const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Create Inventory 
// const creatInventoryController = async (req, res) => {
//     try {
//         const { email, inventoryType } = req.body
//         const user = await userModel.findOne({ email })
//         if (!user) {
//             throw new Error('User Not Found')
//         }
//         // if (inventoryType === "in" && user.role !== "donar") {
//         //     throw new Error('Not a donar account')
//         // }
//         // if (inventoryType === "out" && user.role !== "hospital") {
//         //     throw new Error('Not a hospital')
//         // }


//         if (req.body.inventoryType == "out") {
//             const requestedBloodGroup = req.body.bloodGroup;
//             const requestedQuantityOfBlood = req.body.quantity;
//             const organisation = new mongoose.Types.ObjectId(req.body.userId);
//             //calculate Blood Quanitity
//             const totalInOfRequestedBlood = await inventoryModel.aggregate([
//                 {
//                     $match: {
//                         organisation,
//                         inventoryType: "in",
//                         bloodGroup: requestedBloodGroup,
//                     },
//                 },
//                 {
//                     $group: {
//                         _id: "$bloodGroup",
//                         total: { $sum: "$quantity" },
//                     },
//                 },
//             ]);
//             const totalIn = totalInOfRequestedBlood[0]?.total || 0
//             // total out
//             const totalOutOfRequestedBlood = await inventoryModel.aggregate([
//                 {
//                     $match: {
//                         organisation,
//                         inventoryType: 'out',
//                         bloodGroup: requestedBloodGroup
//                     }
//                 }, {
//                     $group: {
//                         _id: '$bloogroup',
//                         total: { $sum: '$quantity' }
//                     }
//                 }
//             ])
//             const totalOut = totalOutOfRequestedBlood[0]?.total || 0

//             // In and out 
//             const availableQuantityOfBloodGroup = totalIn - totalOut

//             // Validation for quantity

//             if (availableQuantityOfBloodGroup < requestedBloodGroup) {
//                 return res.status(500).send({
//                     success: false,
//                     message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
//                 })
//             }
//             req.body.hospital = user?._id;
//         }
//        // Save Record
//         const inventory = new inventoryModel(req.body)
//         await inventory.save()
//         return res.status(201).send({
//             success: true,
//             message: "New Blood record Added"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: true,
//             mesaage: 'Error in create Inventory API',
//             error
//         })
//     }
// }



const creatInventoryController = async (req, res) => {
    try {
      const { email } = req.body;
      //validation
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("User Not Found");
      }
      // if (inventoryType === "in" && user.role !== "donar") {
      //   throw new Error("Not a donar account");
      // }
      // if (inventoryType === "out" && user.role !== "hospital") {
      //   throw new Error("Not a hospital");
      // }
  
      if (req.body.inventoryType == "out") {
        const requestedBloodGroup = req.body.bloodGroup;
        const requestedQuantityOfBlood = req.body.quantity;
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        //calculate Blood Quanitity
        const totalInOfRequestedBlood = await inventoryModel.aggregate([
          {
            $match: {
              organisation,
              inventoryType: "in",
              bloodGroup: requestedBloodGroup,
            },
          },
          {
            $group: {
              _id: "$bloodGroup",
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // console.log("Total In", totalInOfRequestedBlood);
        const totalIn = totalInOfRequestedBlood[0]?.total || 0;
        //calculate OUT Blood Quanitity
  
        const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
          {
            $match: {
              organisation,
              inventoryType: "out",
              bloodGroup: requestedBloodGroup,
            },
          },
          {
            $group: {
              _id: "$bloodGroup",
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
  
        //in & Out Calc
        const availableQuanityOfBloodGroup = totalIn - totalOut;
        //quantity validation
        if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
          return res.status(500).send({
            success: false,
            message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
          });
        }
        req.body.hospital = user?._id;
      } else {
        req.body.donar = user?._id;
      }
  
      //save record
      const inventory = new inventoryModel(req.body);
      await inventory.save();
      return res.status(201).send({
        success: true,
        message: "New Blood Record Added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Errro In Create Inventory API",
        error,
      });
    }
  };

// Get All blood records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId })
            .populate('donar')
            .populate('hospital')
            .sort({ createdDt: -1 })
        return res.status(200).send({
            success: true,
            message: "All records fetch successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            mesaage: "Error in get all Inventory"
        })
    }
}

module.exports = { creatInventoryController, getInventoryController }