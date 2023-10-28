import { addUser } from '$lib/server/database.js';

export function load({ cookies }) {
	let userid = cookies.get('userid');

	if (!userid) {
		userid = crypto.randomUUID();
		cookies.set('userId', userid, { path: '/' });
        addUser(userid);
	}
}