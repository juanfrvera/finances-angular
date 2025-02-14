import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

export function urlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const urlReq = req.clone({ url: environment.apiUrl + req.url });
  return next(urlReq);
}
