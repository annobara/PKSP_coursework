import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';


@Catch(QueryFailedError)
export class InternalServerExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 500; 
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message            
        };
        response.status(status).json(errorResponse);
    }
}

