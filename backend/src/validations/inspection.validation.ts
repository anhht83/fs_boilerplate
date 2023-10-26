import Joi from "joi";
import { InspectionStatus } from "../models/inspection";

export const changeStatus = {
  params: Joi.object({
    id: Joi.number().required(),
    status: Joi.string().valid(InspectionStatus.resolved, InspectionStatus.unresolved)
  })
};

export const getInspection = {
  params: Joi.object({
    id: Joi.number().required()
  })
};
