/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Supersim = require('../Supersim');
import Version = require('../../base/Version');
import { CommandList } from './v1/command';
import { CommandListInstance } from './v1/command';
import { FleetList } from './v1/fleet';
import { FleetListInstance } from './v1/fleet';
import { NetworkAccessProfileList } from './v1/networkAccessProfile';
import { NetworkAccessProfileListInstance } from './v1/networkAccessProfile';
import { SimList } from './v1/sim';
import { SimListInstance } from './v1/sim';
import { UsageRecordList } from './v1/usageRecord';
import { UsageRecordListInstance } from './v1/usageRecord';


declare class V1 extends Version {
  /**
   * Initialize the V1 version of Supersim
   *
   * @param domain - The twilio domain
   */
  constructor(domain: Supersim);

  readonly commands: CommandListInstance;
  readonly fleets: FleetListInstance;
  readonly networkAccessProfiles: NetworkAccessProfileListInstance;
  readonly sims: SimListInstance;
  readonly usageRecords: UsageRecordListInstance;
}

export = V1;
