import axios from "axios";

export async function getLaunchesApi() {
  return axios
    .get("https://api.spacexdata.com/v3/launches")
    .then(({ data }) => data)
    .catch((err) => err);
}

export async function getLaunchesByFilterApi(filters) {
  let endpoint = `/orders?order_status=${filters.status}&search=${
    filters.search ? filters.search : ""
  }`;

  return axios
    .get(`https://api.spacexdata.com/v3/launches/?`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return false;
    });
}
