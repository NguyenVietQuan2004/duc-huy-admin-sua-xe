interface CustomRequest extends RequestInit {
  body?: any;
}

const ConfigHttp = async <ResType>(method: string, URL: string, option?: CustomRequest) => {
  // const isFormData = option?.body && typeof option.body.append === "function";
  const isFormData = option?.body instanceof FormData;
  const body = !isFormData && method !== "GET" ? JSON.stringify(option?.body) : option?.body;
  const headers = {
    ...option?.headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const response = await fetch(URL, {
    method,
    headers,
    ...(method !== "GET" && { body }),
    credentials: option?.credentials,
    cache: option?.cache,
  });
  const result: ResType = await response.json();
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      body: result,
    };
  }
  return result;
};

export const httpRequest = {
  get<ResType>(URL: string, option?: CustomRequest) {
    return ConfigHttp<ResType>("GET", URL, option);
  },
  post<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("POST", URL, option);
  },
  put<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("PUT", URL, option);
  },
  patch<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("PATCH", URL, option);
  },
  delete<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("DELETE", URL, option);
  },
};

export default httpRequest;
