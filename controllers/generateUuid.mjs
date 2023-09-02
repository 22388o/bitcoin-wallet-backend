("use strict");
import { v4 as uuidv4 } from "uuid";

export const generateUuid = (req, res) => {
  try {
    const uniqueId = uuidv4();
    res.send(uniqueId);
  } catch (error) {
    res.send(error);
  }
};
