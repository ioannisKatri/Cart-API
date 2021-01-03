enum ApiErrorCodes {
    BAD_REQUEST = 'Bad Request',
    INVALID_NUMBER = 'Invalid Number or price below zero',
    INVALID_DISCOUNT = 'Invalid total discount provided',
    INVALID__TOTAL_PRICE = 'Invalid total price',
    INVALID__USER_ID = 'Invalid user ID',
    USER_ID_NOT_PROVIDED = 'User id not provided',
}

enum StatusCodes {
    SUCCESS = "Success",
    BAD_REQUEST = "Bad request"
}

enum DatabaseErrorCodes {
    ERROR_DB_INITIALIZATION = 'Exception During DB initialization',
    DUPLICATE_CONTENT = "Document already exist in database"

}

enum DatabaseCodes {
    INITIALIZING_DB = 'Database Initialization starting',
    SUCCESS_DB_CONNECTION = 'Connected Successfully to DB'
}

enum ProductErrors {
    NAVE_KEY_MISSING = "key -> 'name' is missing.",
    PRODUCT_NOT_FOUND = "ID does not match our records"
}

export  {
    ApiErrorCodes as apiErrCodes,
    DatabaseErrorCodes as dbErrorCodes,
    DatabaseCodes as dbCodes,
    StatusCodes as statusCodes
}
