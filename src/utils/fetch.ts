import qs from 'qs'
import service from '@/utils/service'

type HttpReqUrl = (
  urlEnd?: string,
  method?: 'get' | 'post' | 'delete' | 'put',
  headers?: string
) => HttpReqPromise

type HttpReqPromise<T = any> = (params?: any) => Promise<T>

export default (urlHead?: string): HttpReqUrl => (
  urlEnd?: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  headers?: string
) => (params?: any) => {
  const http: any = service[method]
  let config: object
  if (headers === 'form') {
    params = qs.stringify(params)
    config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return http(
      (urlHead || '') + (urlEnd || ''),
      method === 'get' ? { params: params || {} } : params || '',
      config
    )
  } else if (headers === 'form-data') {
    config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return http(
      (urlHead || '') + (urlEnd || ''),
      method === 'get' ? { params: params || {} } : params || '',
      config
    )
  } else {
    return http(
      (urlHead || '') + (urlEnd || ''),
      method === 'get' ? { params: params || {} } : params || ''
    )
  }
}
