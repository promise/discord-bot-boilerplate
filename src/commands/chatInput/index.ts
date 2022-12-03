import type{ ApplicationCommandAutocompleteNumericOptionData, ApplicationCommandAutocompleteStringOptionData, ApplicationCommandBooleanOptionData, ApplicationCommandChannelOptionData, ApplicationCommandMentionableOptionData, ApplicationCommandNonOptionsData, ApplicationCommandNumericOptionData, ApplicationCommandRoleOptionData, ApplicationCommandStringOptionData, ApplicationCommandUserOptionData, Awaitable, ChatInputCommandInteraction } from "discord.js";
import type{ Autocomplete } from "../../handlers/interactions/autocompletes";
import commandPing from "./ping";

export interface ChatInputCommand {
  name: string;
  description: string;
  options?: [ChatInputCommandOptionData, ...ChatInputCommandOptionData[]];
  execute(interaction: ChatInputCommandInteraction<"cached">): Awaitable<void>;
}

export type ChatInputSubcommand = ChatInputCommand;
export type ChatInputGroup = Omit<ChatInputCommand, "execute" | "options"> & { subcommands: [(ChatInputSubcommand | ChatInputSubcommandGroup), ...Array<ChatInputSubcommand | ChatInputSubcommandGroup>]};
export type ChatInputSubcommandGroup = Omit<ChatInputGroup, "subcommands"> & { subcommands: [ChatInputSubcommand, ...ChatInputSubcommand[]]};

export type ChatInput = ({ public?: true }) & (ChatInputCommand | ChatInputGroup);

export type ChatInputCommandOptionDataAutocomplete =
  | (Omit<ApplicationCommandAutocompleteNumericOptionData, "autocomplete"> & { autocomplete: Autocomplete<number> })
  | (Omit<ApplicationCommandAutocompleteStringOptionData, "autocomplete"> & { autocomplete: Autocomplete<string> });

export type ChatInputCommandOptionDataNoAutocomplete =
| ApplicationCommandBooleanOptionData
| ApplicationCommandChannelOptionData
| ApplicationCommandMentionableOptionData
| ApplicationCommandNonOptionsData
| ApplicationCommandRoleOptionData
| ApplicationCommandUserOptionData
| Omit<ApplicationCommandNumericOptionData, "autocomplete">
| Omit<ApplicationCommandStringOptionData, "autocomplete">;

export type ChatInputCommandOptionData = ChatInputCommandOptionDataAutocomplete | ChatInputCommandOptionDataNoAutocomplete;

export const allChatInputCommands: ChatInput[] = [commandPing];
