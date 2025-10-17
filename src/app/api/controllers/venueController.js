import DBconnection from "../config/dbconfig.js";
import VenueModel from "../models/venueModel.js";

DBconnection();

export const createVenue = async (venueData) => {
   try {
      let exist = await VenueModel.findOne({ email: venueData.email })
      if (exist) {
         return { message: "Venue Already Exist with email: " + venueData.email, status: 200 }
      }
      let newVenue = new VenueModel(venueData);
      const result = await newVenue.save()
      return { message: "Venue Created Successfully", status: 201, data: result }
   } catch (error) {
      return { message: "Error Creating Venue", status: 500, error: error.message }
   }
}