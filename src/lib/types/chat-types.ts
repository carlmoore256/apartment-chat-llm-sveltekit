import type { LLMEvent } from "$lib/llm/LLMStreamHandler";

export interface IChatSession {
    id?: string;
    userId: string;
    createdAt?: Date;
    title?: string | null;
    numMessages?: number;
}

export interface IChatMessage {
    id: string;
    createdAt: Date;
    role: "human" | "ai";
    blocks: MessageBlock[];
}


export type UpdateBlockFunc = (content: any) => void;


export interface MessageBlockBase {
    id: string;
    type: MessageBlockType;
    update: (newContent: any) => void;
}

export interface TextBlock extends MessageBlockBase {
    type: "text";
    content: string;
}

export interface CodeBlock extends MessageBlockBase {
    type: "code";
    content: any;
}

export interface ToolBlock extends MessageBlockBase {
    type: "tool";
    content: LLMEvent[];
}

export type MessageBlock = TextBlock | CodeBlock | ToolBlock;

export type MessageBlockType = MessageBlock["type"];


interface IRun {
    runId: string;
    runAlias?: string;
    output: string;
    message?: string;
}

export interface ILLMResponse {}

