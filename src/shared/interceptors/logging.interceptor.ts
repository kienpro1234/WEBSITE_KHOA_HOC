import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const { method, url, body, query, params, headers } = req
    const start = Date.now()

    console.log(`📥 [REQUEST] ${method} ${url}`)
    console.log('Params:', params)
    console.log('Query:', query)
    console.log('Body:', body)

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse()
        console.log(`✅ [RESPONSE] ${method} ${url}`)
        console.log('Status:', res.statusCode)
        console.log('Response body:', data)
        console.log(`⏱ Time: ${Date.now() - start}ms`)
      }),
      catchError((err) => {
        const res = context.switchToHttp().getResponse()
        console.error(`❌ [ERROR] ${method} ${url}`)
        console.error('Status:', res.statusCode)
        console.error('Error message:', err.message)
        console.error('Error stack:', err.stack)
        console.error(`⏱ Time: ${Date.now() - start}ms`)
        return throwError(() => err)
      }),
    )
  }
}
