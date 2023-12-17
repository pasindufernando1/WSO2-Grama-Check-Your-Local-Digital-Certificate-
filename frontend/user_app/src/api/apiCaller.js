import { AsgardeoSPAClient } from "@asgardeo/auth-react";

const spaClient = AsgardeoSPAClient.getInstance();

//body and queryParams are optional
//body is a JSON object
//queryParams is a JSON object
//endpoint is a string (should pass the endpoint without the base url, and shouldn't start with a "/")
//method is a string (should be one of "GET", "POST", "PUT", "PATCH", "DELETE")

const apiCaller = async (endpoint, method, body = null, queryParams = null) => {
    let requestConfig = {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
        },
        url: window.configs.resourceServerURLs[0] + endpoint
    };

    if(body){
        requestConfig = {
            ...requestConfig,
            data: body
        }
    }

    if(queryParams){
        requestConfig = {
            ...requestConfig,
            params: queryParams
        }
    }

    console.log("requestConfig", requestConfig);

    return await spaClient.httpRequest(requestConfig);
}

export default apiCaller;