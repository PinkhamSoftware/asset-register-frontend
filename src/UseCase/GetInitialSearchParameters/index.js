import qs from "qs";

export default class GetInitialSearchParameters {
  execute(queryString) {
    if (queryString.length === 0) return {};

    let query = qs.parse(queryString, { ignoreQueryPrefix: true });

    let { page, ...searchParameters } = query;

    return { searchParameters, page: parseInt(page) };
  }
}
