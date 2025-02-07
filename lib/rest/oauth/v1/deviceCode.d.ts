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
 * Initialize the DeviceCodeList
 *
 * @param version - Version of the resource
 */
declare function DeviceCodeList(version: V1): DeviceCodeListInstance;

interface DeviceCodeListInstance {
  /**
   * create a DeviceCodeInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts: DeviceCodeListInstanceCreateOptions, callback?: (error: Error | null, item: DeviceCodeInstance) => any): Promise<DeviceCodeInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

/**
 * Options to pass to create
 *
 * @property audiences - An array of intended audiences
 * @property clientSid - A string that uniquely identifies this oauth app
 * @property scopes - An Array of scopes
 */
interface DeviceCodeListInstanceCreateOptions {
  audiences?: string | string[];
  clientSid: string;
  scopes: string | string[];
}

interface DeviceCodePayload extends DeviceCodeResource, Page.TwilioResponsePayload {
}

interface DeviceCodeResource {
  device_code: string;
  expires_in: number;
  interval: number;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
}

interface DeviceCodeSolution {
}


declare class DeviceCodeInstance extends SerializableClass {
  /**
   * Initialize the DeviceCodeContext
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   */
  constructor(version: V1, payload: DeviceCodePayload);

  deviceCode: string;
  expiresIn: number;
  interval: number;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string;
}


declare class DeviceCodePage extends Page<V1, DeviceCodePayload, DeviceCodeResource, DeviceCodeInstance> {
  /**
   * Initialize the DeviceCodePage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: DeviceCodeSolution);

  /**
   * Build an instance of DeviceCodeInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: DeviceCodePayload): DeviceCodeInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { DeviceCodeInstance, DeviceCodeList, DeviceCodeListInstance, DeviceCodeListInstanceCreateOptions, DeviceCodePage, DeviceCodePayload, DeviceCodeResource, DeviceCodeSolution }
