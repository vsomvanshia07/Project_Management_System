import { SupervisorRequest } from "../models/supervisorRequest.js";

export const createRequest = async (requestData) => {
  const exisitingRequest = await SupervisorRequest.findOne({
    student: requestData.student,
    supervisor: requestData.supervisor,
    status: "pending",
  });

  if (exisitingRequest) {
    throw new Error(
      "You already sent a request to this supervisor. Please wait for their response.",
    );
  }

  const Request = await SupervisorRequest.create(requestData);
  return await Request.save();
};
