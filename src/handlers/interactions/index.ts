import type{ Client } from "discord.js";
import getAllApplicationCommands from "../../commands/applicationCommands";
import config from "../../config";
import mainLogger from "../../utils/logger/main";
import autocompleteHandler from "./autocompletes";
import chatInputCommandHandler from "./chatInputCommands";
import componentHandler from "./components";
import menuCommandHandler from "./menuCommands";
import modalHandler from "./modals";

export default function handleInteractions(client: Client<true>): void {
  client.on("interactionCreate", interaction => {
    if (!interaction.inCachedGuild()) return void mainLogger.warn(`Received interaction ${interaction.id} (guild ${interaction.guildId ?? "n/a"}, channel ${interaction.channelId ?? "n/a"}, user ${interaction.user.id}) from uncached guild.`);
    if (interaction.isModalSubmit()) return modalHandler(interaction);
    if (interaction.isMessageComponent()) return componentHandler(interaction);
    if (interaction.isChatInputCommand()) return chatInputCommandHandler(interaction);
    if (interaction.isContextMenuCommand()) return void menuCommandHandler(interaction);
    if (interaction.isAutocomplete()) return void autocompleteHandler(interaction);
  });

  mainLogger.info("Interaction command listener registered.");

  void client.guilds.cache.get(config.guildId)!.commands.set(getAllApplicationCommands()).then(() => mainLogger.info("Application commands registered."));
}
