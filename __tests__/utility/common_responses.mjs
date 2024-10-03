export const common_responses = {
    badRequestResponse: () => {
        return [
            400,
            "Bad Request"
        ];
    },
    unAuthorizedResponse: () => {
        return [
            401,
            "Un Authorized"
        ];
    }
}

