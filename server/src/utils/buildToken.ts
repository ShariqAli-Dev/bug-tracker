import jwt from "jsonwebtoken";
import { __tokenSecret__ } from "../constants";

export default (payload: {
  email: string;
  role: string;
  id: number;
}): string => {
  const options = {
    expiresIn: "10h",
  };

  return jwt.sign(payload, __tokenSecret__, options);
};
