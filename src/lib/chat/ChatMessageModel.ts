import type { MessageBlock, MessageBlockType } from "$lib/types/chat-types";
import { generateUUID } from "$lib/utils/generate-id";
import MessageBlockFactory from "$lib/chat/MessageBlockFactory";

export type MessageRoleType = "human" | "ai";


export class ChatMessageModel {
    
    id: string;
    createdAt: Date;
    role: MessageRoleType;
    blocks: MessageBlock[] = [];

    constructor(
        role: MessageRoleType,
        id?: string,
    ) {
        this.id = id ?? generateUUID();
        this.createdAt = new Date();
        this.role = role;
    }

    public static fromText(text?: string, role: MessageRoleType = "human"): ChatMessageModel {
        const message = new ChatMessageModel(role);
        message.addBlock(MessageBlockFactory.createTextBlock(text));
        return message;
    }

    public addBlock(block: MessageBlock) {
        this.blocks.push(block);
    }

    public upsertBlock(block: {id: string, type: MessageBlockType, content: any}) {
        const existingBlock = this.blocks.find((b) => b.id === block.id);
        if (existingBlock) {
            existingBlock.update(block.content);
        } else {
            const newBlock = MessageBlockFactory.createBlock(block.type, block.content);
            this.addBlock(newBlock);
        }
    }

    public addText(text: string) {
        const lastBlock = this.blocks[this.blocks.length - 1];
        if (lastBlock && lastBlock.type === "text") {
            lastBlock.update(text);
        } else {
            this.addBlock(MessageBlockFactory.createTextBlock(text));
        }
    }
}