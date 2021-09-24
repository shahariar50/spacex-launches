import axios from "axios";

// Fetching launches api
export async function getLaunchesApi() {
  return axios
    .get("https://api.spacexdata.com/v3/launches")
    .then(({ data }) => data)
    .catch((err) => err);
}
