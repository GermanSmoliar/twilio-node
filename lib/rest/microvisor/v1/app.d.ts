/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V1 = require('../V1');
import { SerializableClass } from '../../../interfaces';

/**
 * Initialize the AppList
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 */
declare function AppList(version: V1): AppListInstance;

interface AppListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): AppContext;
  /**
   * Streams AppInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Function to process each record
   */
  each(callback?: (item: AppInstance, done: (err?: Error) => void) => void): void;
  /**
   * Streams AppInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Function to process each record
   */
  each(opts?: AppListInstanceEachOptions, callback?: (item: AppInstance, done: (err?: Error) => void) => void): void;
  /**
   * Constructs a app
   *
   * @param sid - A string that uniquely identifies this App.
   */
  get(sid: string): AppContext;
  /**
   * Retrieve a single target page of AppInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  getPage(callback?: (error: Error | null, items: AppPage) => any): Promise<AppPage>;
  /**
   * Retrieve a single target page of AppInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param targetUrl - API-generated URL for the requested results page
   * @param callback - Callback to handle list of records
   */
  getPage(targetUrl?: string, callback?: (error: Error | null, items: AppPage) => any): Promise<AppPage>;
  /**
   * Lists AppInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  list(callback?: (error: Error | null, items: AppInstance[]) => any): Promise<AppInstance[]>;
  /**
   * Lists AppInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  list(opts?: AppListInstanceOptions, callback?: (error: Error | null, items: AppInstance[]) => any): Promise<AppInstance[]>;
  /**
   * Retrieve a single page of AppInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  page(callback?: (error: Error | null, items: AppPage) => any): Promise<AppPage>;
  /**
   * Retrieve a single page of AppInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  page(opts?: AppListInstancePageOptions, callback?: (error: Error | null, items: AppPage) => any): Promise<AppPage>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

/**
 * Options to pass to each
 *
 * @property callback -
 *                         Function to process each record. If this and a positional
 *                         callback are passed, this one will be used
 * @property done - Function to be called upon completion of streaming
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         each() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no pageSize is defined but a limit is defined,
 *                         each() will attempt to read the limit with the most efficient
 *                         page size, i.e. min(limit, 1000)
 */
interface AppListInstanceEachOptions {
  callback?: (item: AppInstance, done: (err?: Error) => void) => void;
  done?: Function;
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to list
 *
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         list() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no page_size is defined but a limit is defined,
 *                         list() will attempt to read the limit with the most
 *                         efficient page size, i.e. min(limit, 1000)
 */
interface AppListInstanceOptions {
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to page
 *
 * @property pageNumber - Page Number, this value is simply for client state
 * @property pageSize - Number of records to return, defaults to 50
 * @property pageToken - PageToken provided by the API
 */
interface AppListInstancePageOptions {
  pageNumber?: number;
  pageSize?: number;
  pageToken?: string;
}

interface AppPayload extends AppResource, Page.TwilioResponsePayload {
}

interface AppResource {
  account_sid: string;
  date_created: Date;
  date_updated: Date;
  hash: string;
  sid: string;
  unique_name: string;
  url: string;
}

interface AppSolution {
}


declare class AppContext {
  /**
   * Initialize the AppContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param sid - A string that uniquely identifies this App.
   */
  constructor(version: V1, sid: string);

  /**
   * fetch a AppInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: AppInstance) => any): Promise<AppInstance>;
  /**
   * remove a AppInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: AppInstance) => any): Promise<boolean>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class AppInstance extends SerializableClass {
  /**
   * Initialize the AppContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param sid - A string that uniquely identifies this App.
   */
  constructor(version: V1, payload: AppPayload, sid: string);

  private _proxy: AppContext;
  accountSid: string;
  dateCreated: Date;
  dateUpdated: Date;
  /**
   * fetch a AppInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: AppInstance) => any): Promise<AppInstance>;
  hash: string;
  /**
   * remove a AppInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: AppInstance) => any): Promise<boolean>;
  sid: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  uniqueName: string;
  url: string;
}


declare class AppPage extends Page<V1, AppPayload, AppResource, AppInstance> {
  /**
   * Initialize the AppPage
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: AppSolution);

  /**
   * Build an instance of AppInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: AppPayload): AppInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { AppContext, AppInstance, AppList, AppListInstance, AppListInstanceEachOptions, AppListInstanceOptions, AppListInstancePageOptions, AppPage, AppPayload, AppResource, AppSolution }
