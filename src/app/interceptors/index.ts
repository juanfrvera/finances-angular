import { authInterceptor } from './auth.interceptor';
import { urlInterceptor } from './url.interceptor';

export const httpInterceptors = [urlInterceptor, authInterceptor];
