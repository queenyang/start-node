import axios from "@/http/request";

export function getGeoFile(data) {
  const adcode = String(data.adcode);
  return axios({
    url: `/file/map_json_data/${adcode.slice(0, 4)}/${adcode.padEnd(
      12,
      0
    )}.json`,
    method: "GET"
  });
}
