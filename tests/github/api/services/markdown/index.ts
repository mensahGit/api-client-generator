/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MarkdownAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './markdown-api-client.service';
import { GuardedMarkdownAPIClient } from './guarded-markdown-api-client.service';

export { MarkdownAPIClient } from './markdown-api-client.service';
export { MarkdownAPIClientInterface } from './markdown-api-client.interface';
export { GuardedMarkdownAPIClient } from './guarded-markdown-api-client.service';

/**
 * provided options, headers and params will be used as default for each request
 */
export interface DefaultHttpOptions {
  headers?: {[key: string]: string};
  params?: {[key: string]: string};
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface MarkdownAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class MarkdownAPIClientModule {
  /**
   * Use this method in your root module to provide the MarkdownAPIClientModule
   *
   * If you are not providing
   * @param { MarkdownAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: MarkdownAPIClientModuleConfig = {}): ModuleWithProviders<MarkdownAPIClientModule> {
    return {
      ngModule: MarkdownAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: MarkdownAPIClient, useClass: GuardedMarkdownAPIClient }] : [MarkdownAPIClient]),
      ]
    };
  }
}
