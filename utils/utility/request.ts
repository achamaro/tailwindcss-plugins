import https from "https";

export class RequestError extends Error {
  constructor(
    message: string,
    public url: string | URL,
    public statusCode?: number
  ) {
    super(message);
  }
}

export function get(url: string | URL) {
  return new Promise((resolve, reject) => {
    https
      .get(String(url), (res) => {
        const status = res.statusCode ?? 0;

        let data = "";

        res.on("data", (chunk) => {
          if (chunk) data += chunk;
        });

        res.on("end", () => {
          if (status < 200 || status >= 300) {
            reject(new RequestError(data, url, status));
            return;
          }
          // iconify api returns a "404" string in the response body with status 200 OK
          if (data === "404") {
            reject(new RequestError(data, url, 404));
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
