import type {
    MessageBlock,
    TextBlock,
    CodeBlock,
    ToolBlock,
} from "$lib/types/chat-types";
import { generateId } from "$lib/utils/generate-id";
import type { LLMEvent } from "$lib/llm/LLMStreamHandler";

export default class MessageBlockFactory {
    static generateId(): string {
        return generateId(16);
    }

    static createBlock(type: MessageBlock["type"], content: any): MessageBlock {
        switch (type) {
            case "text":
                return this.createTextBlock(content);
            case "code":
                return this.createCodeBlock(content);
            case "tool":
                return this.createToolBlock(content);
            default:
                console.log("Unknown block type: " + type + ", creating text block");
                return this.createTextBlock(content);
        }
    }

    static createTextBlock(content?: string): TextBlock {
        const id = this.generateId();

        return {
            id,
            type: "text",
            content: content ?? "",
            update: function (newContent: string) {
                this.content += newContent;
            },
        };
    }

    static createCodeBlock(content: any): CodeBlock {
        const id = this.generateId();

        return {
            id,
            type: "code",
            content,
            update: function (newContent: any) {
                this.content += newContent;
            },
        };
    }

    static createToolBlock(content: LLMEvent): ToolBlock {
        // const id = this.generateId();
        console.log(`Creating tool block with content: ${JSON.stringify(content)}`)
        const id = content.runId;

        return {
            id,
            type: "tool",
            content: [content] ?? [],
            update: function (newEvent: LLMEvent) {
                this.content.push(newEvent);
            },
        };
    }
}
