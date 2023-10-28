import { v4 as uuidv4 } from "uuid";
import type { IPendingProcessedApartment } from "$lib/types/types";
import {
    scrapePage,
    downloadPageWithBrowser,
} from "$lib/scraping/scrapePage.js";
import { addActiveJob, addUser } from "$lib/server/database.js";

export const POST = async ({ request, cookies }: any): Promise<Response> => {
    const id = uuidv4();

    const body = await request.json();
    const { name, url } = body;

    let userId = cookies.get("userId");

    if (!userId) {
        userId = crypto.randomUUID();
        cookies.set("userId", userId, { path: "/" });
        addUser(userId);
    }

    const pendingProcess: IPendingProcessedApartment = {
        id,
        name,
        url,
    };

    const res = new Response(JSON.stringify(pendingProcess), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    });


    console.log(`\n\n\n~~~~~~Adding active job ${JSON.stringify(pendingProcess)}`)
    addActiveJob(userId as string, pendingProcess);

    return res;
};

// setImmediate(async () => {
//     const scraped = await scrapePage(url);
//     console.log(`Scraped ${url} | ${scraped}`);
// });
