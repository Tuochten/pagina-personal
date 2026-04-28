import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('posts');
	const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sorted.map(post => ({
			title:       post.data.title,
			description: post.data.description,
			pubDate:     post.data.date,
			link:        `/blog/${post.id}/`,
		})),
	});
}
