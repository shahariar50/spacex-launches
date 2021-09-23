import axios from "axios";

export async function getLaunchesApi() {
  return axios
    .get("https://api.spacexdata.com/v3/launches")
    .then(({ data }) => data)
    .catch((err) => err);
}

export async function getLaunchesByFilterApi() {
  return axios
    .get("https://api.spacexdata.com/v3/launches")
    .then(({ data }) => data)
    .catch((err) => err);
}
