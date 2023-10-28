import type { NewTokenIndices } from "langchain/callbacks";
import { BaseCallbackHandler } from "langchain/callbacks";
import type { AgentAction, AgentFinish } from "langchain/schema";
import type { Serialized } from "langchain/load/serializable";
import type { EventEmitter } from "events";

interface IRun {
    runId: string;
    runAlias?: string;
    output: string;
    message?: string;
}

export type LLMResponseType = "token" | "toolStart" | "toolEnd" | "end" | "error";
export type LLMResponseCategory = "text" | "tool" | "action" | "end";

export interface LLMEvent {
    type: LLMResponseType;
    name?: string;
    category: LLMResponseCategory;
    runId: string;
    content: Record<string, any>;
}

export class LLMStreamHandler extends BaseCallbackHandler {
    name = "stream_callback_handler";
    aliasKey = "alias_";

    runAliases: Record<string, string> = {};
    runOutputs: Record<string, string> = {};

    runs: Record<string, IRun> = {};

    constructor(public emitter: EventEmitter) {
        super();
    }

    private parseAlias(tags?: string[]): string | null {
        const splits = tags
            ?.find((t) => t.startsWith(this.aliasKey))
            ?.split(this.aliasKey);
        return splits ? splits[1] : "unknown";
    }

    handleLLMNewToken(
        token: string,
        idx: NewTokenIndices,
        runId: string,
        parentRunId?: string | undefined,
        tags?: string[]
    ) {
        if (runId in this.runOutputs) {
            let currentOutput = this.runOutputs[runId];
            currentOutput += token;
            this.runOutputs[runId] = currentOutput;
        } else {
            this.runOutputs[runId] = token;
        }
        
        const event: LLMEvent = {
            type: "token",
            category: "text",
            runId,
            content: {
                text: token,
            },
        };
        this.emitter.emit("llmEvent", event);
    }

    handleToolStart(
        tool: Serialized,
        input: string,
        runId: string,
        parentRunId?: string | undefined,
        tags?: string[]
    ) {
        console.log("handleToolStart " + this.parseAlias(tags));
        this.runAliases[runId] = this.parseAlias(tags) || "ToolStart";
        console.log(
            JSON.stringify(this.runAliases, null, 2) +
                " " +
                this.runAliases[runId]
        );

        const event: LLMEvent = {
            type: "toolStart",
            name: this.runAliases[runId],
            category: "tool",
            runId,
            content: {
                input,
            }
        };

        this.emitter.emit("llmEvent", event);
    }

    handleToolEnd(
        output: string,
        runId: string,
        parentRunId?: string,
        tags?: string[]
    ) {
        this.runAliases[runId] = this.parseAlias(tags) || "ToolEnd";
        const event: LLMEvent = {
            type: "toolEnd",
            name: this.runAliases[runId],
            category: "tool",
            runId,
            content: {
                output,
            }
        };

        this.emitter.emit("llmEvent", event);
    }

    handleAgentAction(
        action: AgentAction,
        runId: string,
        parentRunId?: string,
        tags?: string[]
    ) {
        this.runAliases[runId] = this.parseAlias(tags) || "Action";

        const event: LLMEvent = {
            type: "token",
            name: this.runAliases[runId],
            category: "action",
            runId,
            content: {
                tool: action.tool,
                toolInput: action.toolInput,
            }
        };

        this.emitter.emit("llmEvent", event);
    }

    handleAgentEnd(
        action: AgentFinish,
        runId: string,
        parentRunId?: string | undefined,
        tags?: string[] | undefined
    ): void | Promise<void> {
        this.runAliases[runId] = this.parseAlias(tags) || "End";

        const event: LLMEvent = {
            type: "end",
            name: this.runAliases[runId],
            category: "end",
            runId,
            content: {
                returnValues: JSON.stringify(action.returnValues),
            }
        };

        this.emitter.emit("llmEvent", event);
        this.emitter.emit("end");
    }
}
