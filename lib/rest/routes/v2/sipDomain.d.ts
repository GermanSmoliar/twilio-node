/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V2 = require('../V2');
import { SerializableClass } from '../../../interfaces';

/**
 * Initialize the SipDomainList
 *
 * @param version - Version of the resource
 */
declare function SipDomainList(version: V2): SipDomainListInstance;

/**
 * Options to pass to update
 *
 * @property friendlyName - The friendly_name
 * @property voiceRegion - The voice_region
 */
interface SipDomainInstanceUpdateOptions {
  friendlyName?: string;
  voiceRegion?: string;
}

interface SipDomainListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): SipDomainContext;
  /**
   * Constructs a sip_domain
   *
   * @param sipDomain - The sip_domain
   */
  get(sipDomain: string): SipDomainContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface SipDomainPayload extends SipDomainResource, Page.TwilioResponsePayload {
}

interface SipDomainResource {
  account_sid: string;
  date_created: Date;
  date_updated: Date;
  friendly_name: string;
  sid: string;
  sip_domain: string;
  url: string;
  voice_region: string;
}

interface SipDomainSolution {
}


declare class SipDomainContext {
  /**
   * Initialize the SipDomainContext
   *
   * @param version - Version of the resource
   * @param sipDomain - The sip_domain
   */
  constructor(version: V2, sipDomain: string);

  /**
   * fetch a SipDomainInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a SipDomainInstance
   *
   * @param callback - Callback to handle processed record
   */
  update(callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
  /**
   * update a SipDomainInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: SipDomainInstanceUpdateOptions, callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
}


declare class SipDomainInstance extends SerializableClass {
  /**
   * Initialize the SipDomainContext
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param sipDomain - The sip_domain
   */
  constructor(version: V2, payload: SipDomainPayload, sipDomain: string);

  private _proxy: SipDomainContext;
  accountSid: string;
  dateCreated: Date;
  dateUpdated: Date;
  /**
   * fetch a SipDomainInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
  friendlyName: string;
  sid: string;
  sipDomain: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a SipDomainInstance
   *
   * @param callback - Callback to handle processed record
   */
  update(callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
  /**
   * update a SipDomainInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: SipDomainInstanceUpdateOptions, callback?: (error: Error | null, items: SipDomainInstance) => any): Promise<SipDomainInstance>;
  url: string;
  voiceRegion: string;
}


declare class SipDomainPage extends Page<V2, SipDomainPayload, SipDomainResource, SipDomainInstance> {
  /**
   * Initialize the SipDomainPage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V2, response: Response<string>, solution: SipDomainSolution);

  /**
   * Build an instance of SipDomainInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: SipDomainPayload): SipDomainInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { SipDomainContext, SipDomainInstance, SipDomainInstanceUpdateOptions, SipDomainList, SipDomainListInstance, SipDomainPage, SipDomainPayload, SipDomainResource, SipDomainSolution }
