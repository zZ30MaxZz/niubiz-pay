import { TokenSessionReturn } from "../components/types";
import { fetcher } from "./fetcher";

const GetNiubizTokenSession = async (
    url: string,
    authorization: string,
    params: any
): Promise<TokenSessionReturn> => {
    let tokenSession: TokenSessionReturn;

    const options = { method: "POST" };

    try {
        const response = await fetcher(url, options, params, authorization);

        tokenSession = response;

        return tokenSession;

    } catch (error) {
        console.error("Error fetching Niubiz token:", error);
        return tokenSession = { sessionKey: "", expirationTime: 0 };
    }
};

export default GetNiubizTokenSession;
