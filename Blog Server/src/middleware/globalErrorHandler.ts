import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = err;

    //? PrismaClientValidationError
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "You provided invalid data";
        errorDetails = err;
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 400;
            errorMessage =
                "An operation failed because it depends on one or more records that were required but not found.";
        }

		if(err.code === "P2002"){
			statusCode = 400;
			errorMessage = "Duplicate key error";
		}
    }

    // const statusCode = err.statusCode || 500;
    // const message = err.message || "Internal Server Error";
    // const errors = err || [];

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errors: errorDetails,
    });
}

export default globalErrorHandler;
