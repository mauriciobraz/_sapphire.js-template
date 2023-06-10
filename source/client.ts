import { join } from 'path';

import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';

import { readdirRecursiveSync } from './utilities/_path';

/**
 * Extends {@link SapphireClient} functionalities.
 */
export default class ExtendedSapphireClient extends SapphireClient {
  constructor(options: ClientOptions) {
    super(options);
    this.loadApplicationCommandRegistriesSync();
  }

  /**
   * Loads all application command registries in the custom modules folder.
   *
   * @example
   * ```typescript
   * await client.loadApplicationCommandRegistries();
   * ```
   */
  private loadApplicationCommandRegistriesSync(): void {
    const directories = readdirRecursiveSync(join(__dirname, 'modules'));

    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      const dirname = directory.split('/').pop();

      if (dirname === 'interactions') {
        this.stores.get('interaction-handlers').registerPath(directory);
        continue;
      }

      this.stores.registerPath(directory);
    }
  }
}
