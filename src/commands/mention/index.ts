import type{ Awaitable, Message, MessageReplyOptions } from "discord.js";
import commandEval from "./eval";
import commandPing from "./ping";

export interface MentionCommand {
  names: [string, ...string[]];
  ownerOnly?: true;
  testArgs(args: string[]): boolean;
  execute(message: Message<true>, reply: (content: MessageReplyOptions | string) => Promise<Message>, args: string[]): Awaitable<void>;
}

export const allMentionCommands: MentionCommand[] = [
  commandEval,
  commandPing,
];

export const quickResponses: Array<[
  triggers: [string, ...string[]],
  response: string,
]> = [];
