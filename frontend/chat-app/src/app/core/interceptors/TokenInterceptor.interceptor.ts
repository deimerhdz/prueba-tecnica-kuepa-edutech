import type { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('token interceptor');
  const token = localStorage.getItem('token');
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        token: `${token}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
