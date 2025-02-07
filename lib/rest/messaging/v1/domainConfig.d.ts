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
 * Initialize the DomainConfigList
 *
 * PLEASE NOTE that this class contains beta products that are subject to change.
 * Use them with caution.
 *
 * @param version - Version of the resource
 */
declare function DomainConfigList(version: V1): DomainConfigListInstance;

/**
 * Options to pass to update
 *
 * @property callbackUrl - URL to receive click events to your webhook whenever the recipients click on the shortened links
 * @property fallbackUrl - We will redirect requests to urls we are unable to identify to this url.
 * @property messagingServiceSids - A list of messagingServiceSids (with prefix MG)
 * @property messagingServiceSidsAction - An action type for messaging_service_sids operation (ADD, DELETE, REPLACE)
 */
interface DomainConfigInstanceUpdateOptions {
  callbackUrl?: string;
  fallbackUrl?: string;
  messagingServiceSids: string | string[];
  messagingServiceSidsAction?: string;
}

interface DomainConfigListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): DomainConfigContext;
  /**
   * Constructs a domain_config
   *
   * @param domainSid - Unique string used to identify the domain that this config should be associated with.
   */
  get(domainSid: string): DomainConfigContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface DomainConfigPayload extends DomainConfigResource, Page.TwilioResponsePayload {
}

interface DomainConfigResource {
  callback_url: string;
  config_sid: string;
  date_created: Date;
  date_updated: Date;
  domain_sid: string;
  fallback_url: string;
  messaging_service_sids: string[];
  url: string;
}

interface DomainConfigSolution {
}


declare class DomainConfigContext {
  /**
   * Initialize the DomainConfigContext
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param domainSid - Unique string used to identify the domain that this config should be associated with.
   */
  constructor(version: V1, domainSid: string);

  /**
   * fetch a DomainConfigInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DomainConfigInstance) => any): Promise<DomainConfigInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a DomainConfigInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts: DomainConfigInstanceUpdateOptions, callback?: (error: Error | null, items: DomainConfigInstance) => any): Promise<DomainConfigInstance>;
}


declare class DomainConfigInstance extends SerializableClass {
  /**
   * Initialize the DomainConfigContext
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param domainSid - Unique string used to identify the domain that this config should be associated with.
   */
  constructor(version: V1, payload: DomainConfigPayload, domainSid: string);

  private _proxy: DomainConfigContext;
  callbackUrl: string;
  configSid: string;
  dateCreated: Date;
  dateUpdated: Date;
  domainSid: string;
  fallbackUrl: string;
  /**
   * fetch a DomainConfigInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DomainConfigInstance) => any): Promise<DomainConfigInstance>;
  messagingServiceSids: string[];
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a DomainConfigInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts: DomainConfigInstanceUpdateOptions, callback?: (error: Error | null, items: DomainConfigInstance) => any): Promise<DomainConfigInstance>;
  url: string;
}


declare class DomainConfigPage extends Page<V1, DomainConfigPayload, DomainConfigResource, DomainConfigInstance> {
  /**
   * Initialize the DomainConfigPage
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: DomainConfigSolution);

  /**
   * Build an instance of DomainConfigInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: DomainConfigPayload): DomainConfigInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { DomainConfigContext, DomainConfigInstance, DomainConfigInstanceUpdateOptions, DomainConfigList, DomainConfigListInstance, DomainConfigPage, DomainConfigPayload, DomainConfigResource, DomainConfigSolution }
