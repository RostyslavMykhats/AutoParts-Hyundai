export const getData = async (
    baseUrl: string,
    endpoint: string,
    limit: string | null = null,
    sort: string | null = null
  ) => {
    const url = `${baseUrl}${endpoint}${limit ? `?limit=${limit}` : ""}${
      sort ? `&sort=${sort}` : ""
    }`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };