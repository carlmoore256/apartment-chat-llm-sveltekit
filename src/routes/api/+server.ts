export const GET = () => {

    return new Response(JSON.stringify({message: "hello world"}), {
        status: 200,
        headers: {
            "content-type": "text/html",
        },
    });
}