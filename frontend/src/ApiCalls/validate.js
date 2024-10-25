import axios from "axios";
import { BACKEND_URL } from "../url";

export const validateUser = async ({ token }) => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/user/validate`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
