import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express';


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Validation error'            
        };
        response.status(status).json(errorResponse);
    }
}

