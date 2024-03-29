import ChildProcess from "child_process";

import Command from "../Command";
import Discord, { TextChannel } from "discord.js";

export default class DevServerRestart extends Command {
  constructor(client: Discord.Client) {
    super(client, {
      command: "clear",
      description: "Clear last X messages (up to 100)",
      roles: [
        "administrator"
      ]
    });
  }

  async handle(message: Discord.Message, args: string[]): Promise<void> {
    let count = parseInt(args.slice(this.command.split(" ").length)[0]);
    if (count == 0) {
      count = 11;
    }

    if (count <= 100) {
      (message.channel as TextChannel).bulkDelete(count, true);
    } else {
      while (count > 0) {
        let batch = count;
        if (batch < 100) { batch = 100; }

        (message.channel as TextChannel).bulkDelete(batch, true);

        count -= batch;
        
        await new Promise(r => setTimeout(r, 250));
      }
    }
  }
}