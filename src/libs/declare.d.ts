/// <reference types="declare" />
// 元数据接口定义
export interface MetaData {
  name: string;
  uuid: string;
  baseUrl: string;
  userAgent: string;
  author: string;
  version: string;
  proxy?: {
    host: string;
    port: number;
    proxyType?: "http" | "https" | "socks4" | "socks5";
    username?: string;
    password?: string;
  };
}

// 表单字段类型
export type FormFieldType = "input" | "select" | "checkbox" | "button";

// 表单字段接口
export interface FormField {
  fieldType: FormFieldType;
  field: string;
  label: string;
  placeholder?: string;
  password?: boolean;
}

// 表单接口
export interface Form {
  title: string;
  description?: string;
  fields: FormField[];
}

// 图书状态
export type BookStatus = "0" | "1" | "2" | "3"; // 连载中、已完成、已移除、已停止

// 搜索结果图书
export interface SearchBook {
  id: string;
  name: string;
  author: string;
  cover: string;
  description: string;
  status: BookStatus;
  tags?: string[];
  last_update_time?: string;
}

// 最新章节
export interface BookLatestChapter {
  id: string;
  name: string;
}

// 额外数据
export interface BookExtraData {
  label: string;
  value: string;
}

// 图书详情
export interface BookDetail {
  id: string;
  name: string;
  author: string;
  description: string;
  wordCount?: string;
  cover: string;
  copyright?: string;
  status: BookStatus;
  lastUpdate?: string;
  latestChapter: BookLatestChapter;
  extraDatas?: BookExtraData[];
}

// 章节
export interface Chapter {
  name: string;
  id: string;
  isVip: boolean;
  canRead: boolean;
}

// 卷
export interface Volume {
  id: string;
  name: string;
  chapters: Chapter[];
}

// 请求选项
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  body?: string;
  json?: any;
  form?: Record<string, string>;
  query?: Record<string, string>;
  gbk?: boolean;
}

// 请求响应
export interface Response {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

// 加密类选项
export interface AesOptions {
  cipherMode: "cbc" | "cfb" | "ofb";
  aesType: "aes128" | "aes192" | "aes256";
  paddingType:
    | "nopadding"
    | "pkcs7"
    | "zeropadding"
    | "iso10126"
    | "ansix923"
    | "iso7816";
  encoding: "base64" | "hex";
  key: string;
  iv: string | number[];
}

// HMAC选项
export interface HmacOptions {
  hash: "md5" | "sha1" | "sha256" | "sha384" | "sha512";
  encoding: "base64" | "hex";
  key: string;
}

// 搜索选项
export interface SearchOptions {
  key: string;
  page: number;
  count: number;
}

export type SearchFn = (options: SearchOptions) => SearchBook[];

export type HashType = "1" | "224" | "256" | "384" | "512";

declare global {
  // 全局变量
  const metadata: MetaData;
  const __ENVS__: Record<string, any>;
  // console
  declare var console: {
    log(...args: any[]): void;
  };
  // 请求类
  class JReqwest {
    static get(url: string, options?: RequestOptions): Response;
    static post(url: string, options?: RequestOptions): Response;
    static put(url: string, options?: RequestOptions): Response;
    static delete(url: string, options?: RequestOptions): Response;
    static head(url: string, options?: RequestOptions): Response;
  }

  // 加密类
  class Aes {
    constructor(options: AesOptions);
    encrypt(data: string): string;
    decrypt(data: string): string;
  }

  class Hmac {
    constructor(options: HmacOptions);
    update(data: string): string;
  }

  // HTML解析类
  class JScraper {
    constructor(html: string);
    text(): string;
  }

  // 全局函数
  function xml2Json(xml: string): any;
  function randString(length: number): string;
  function uuid(): string;
  function isUuid(str: string): boolean;

  // 环境变量操作
  function setEnv(key: string, value: any): void;
  function getEnv(key: string): any;
  function setEnvs(envs: Record<string, any>): void;
  function getEnvs(): Record<string, any>;
  function clearEnvs(): void;

  // String 原型扩展
  interface String {
    toGbk(): string;
    toBase64(): string;
    toMd5(): string;
    toAscii(): number[];
    toSha(hash: HashType, toString?: boolean): string;
  }

  // Object 原型扩展
  interface Object {
    toQuery(): string;
  }
}
