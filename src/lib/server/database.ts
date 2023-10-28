import type { IPendingProcessedApartment } from "$lib/types/types";

interface IUserData {
    id: string;
    jobs: IPendingProcessedApartment[];
}

const db = new Map<string, IUserData>();

// export function getActiveJob(
//     userId: string,
//     jobId: string
// ): IPendingProcessedApartment {
//     const userData = db.get(userId);
//     if (!userData) {
//         throw new Error("User not found");
//     }
//     const job = userData.jobs.find((job: any) => job.id === jobId);
//     return job;
// }

export function addActiveJob(userId: string, job: IPendingProcessedApartment) {
    let userData = db.get(userId);
    if (!userData) {
        // throw new Error("User not found");
        addUser(userId);
        userData = db.get(userId);
    }
    (userData as any).jobs.push(job);
}

export function getActiveJobs(userId: string): IPendingProcessedApartment[] {
    const userData = db.get(userId);
    if (!userData) {
        throw new Error("User not found");
    }
    return userData.jobs;
}

export function getJob(userId : string, jobId: string) {
    const userData = db.get(userId);
    if (!userData) {
        throw new Error("User not found");
    }
    const job = userData.jobs.find((job: any) => job.id === jobId);
    return job;
}

export function getLastAddedJob(userId: string): IPendingProcessedApartment {
    const userData = db.get(userId);
    if (!userData) {
        throw new Error("User not found");
    }
    return userData.jobs[userData.jobs.length - 1];
}

export function addUser(userId: string) {
    db.set(userId, {
        id: userId,
        jobs: [],
    });
}

// export function getTodos(userid : string) {
//     if (!db.get(userid)) {
//         db.set(userid, [
//             {
//                 id: crypto.randomUUID(),
//                 description: "Learn SvelteKit",
//                 done: false,
//             },
//         ]);
//     }

//     return db.get(userid);
// }

// export function createTodo(userid : string, description : string) {
//     const todos = db.get(userid);

//     todos.push({
//         id: crypto.randomUUID(),
//         description,
//         done: false,
//     });
// }

// export function deleteTodo(userid : string, todoid : string) {
//     const todos = db.get(userid);
//     const index = todos.findIndex((todo : any) => todo.id === todoid);

//     if (index !== -1) {
//         todos.splice(index, 1);
//     }
// }
