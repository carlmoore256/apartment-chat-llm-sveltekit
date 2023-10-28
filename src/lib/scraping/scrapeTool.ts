import { DynamicTool } from "langchain/tools";

export function queryTool(dom: HTMLElement) {
    
}


export const QueryTool = new DynamicTool({
    name: "query",
    description:
        "call this to query the page",
    func: async () => "baz",
    tags: ["alias_queryPage"],
});