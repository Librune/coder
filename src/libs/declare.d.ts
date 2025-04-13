/// <reference types="declare" />
export interface MetaData {
  /**
   * 书源名称
   */
  name: string
  /**
   * 书源ID：UUID-v4格式
   */
  uuid?: string
  /**
   * 基础地址
   */
  baseUrl: string
  /**
   * 用户代理
   */
  userAgent?: string
  /**
   * 作者
   */
  author: string
}

interface SearchOptions {
  key: string
  page?: number
  count?: number
}

interface SearchResultItem {
  id: string
  title: string
  content: string
}

type SearchFn = (options: SearchOptions) => any[]

export type JReqwestOptions = {
  /**
   * 请求头
   */
  headers?: Record<string, string>
  /**
   * 超时时间
   */
  timeout?: number
  /**
   * 请求体 - string
   */
  data?: string
  /**
   * 请求体 - FormData
   */
  form?: Record<string, number | string | boolean>
  /**
   * 请求体 - JSON
   */
  json?: Record<string, number | string | boolean>
  /**
   * URL参数
   */
  query?: Record<string, number | string | boolean>
  /**
   * 是否 gbk 编码
   */
  gbk?: boolean
}

export type FormFieldType = 'input' | 'button'

export type Form = {
  name: string
  desc?: string
  fields: {
    type: FormFieldType
    field: string
    label: string
    placeholder?: string
    password?: boolean
  }[]
}

// 扩展全局命名空间
declare global {
  declare var console: Console
  // 全局环境
  declare var __ENVS__: Record<string, any>
  // JReqwest 类，提供 get、post、put、delete 静态方法
  class JReqwest {
    static get(url: string, options?: JReqwestOptions): any
    static post(url: string, options?: JReqwestOptions): any
    static put(url: string, options?: JReqwestOptions): any
    static delete(url: string, options?: JReqwestOptions): any
  }

  // xml2json 函数
  declare function xml2Json(xml: string): Record<string, any>

  interface Object {
    toQuery(): string
  }

  interface String {
    toBase64(): string
  }
}
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console) */
interface Console {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/assert_static) */
  assert(condition?: boolean, ...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static) */
  clear(): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static) */
  count(label?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static) */
  countReset(label?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static) */
  debug(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static) */
  dir(item?: any, options?: any): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static) */
  dirxml(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static) */
  error(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static) */
  group(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static) */
  groupCollapsed(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static) */
  groupEnd(): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static) */
  info(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static) */
  log(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static) */
  table(tabularData?: any, properties?: string[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static) */
  time(label?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static) */
  timeEnd(label?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static) */
  timeLog(label?: string, ...data: any[]): void
  timeStamp(label?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static) */
  trace(...data: any[]): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static) */
  warn(...data: any[]): void
}

// 导出类型以便使用
export { SearchOptions, SearchResultItem, SearchFn }
