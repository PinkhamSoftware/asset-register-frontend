export default class GetURLForSearchParameters {
  execute({ parameters }) {
    return Object.entries(parameters)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
  }
}
