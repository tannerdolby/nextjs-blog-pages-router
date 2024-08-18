import Layout from "../../components/layout";
import Head from "next/head";
import { getSortedPostsData } from "../../utils/posts";
import utilStyles from '../../styles/utils.module.css';
import Link from "next/link";
import { parseISO, format } from 'date-fns';

export async function getServerSideProps({ query }) {
    const sortedPosts = getSortedPostsData();
    const filteredPostsByTag = sortedPosts.filter((post) => {
        return post.tags.includes(query.tag);
    });
    return {
        props: {
            sortedPosts,
            filteredPostsByTag,
        }
    }
}

export default function Posts({ sortedPosts, filteredPostsByTag }) {
    const posts = filteredPostsByTag.length ? filteredPostsByTag : sortedPosts;
    return (
        <Layout>
            <Head>
                <title>Blog</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h2>Blog</h2>
                <ul className={utilStyles.list}>
                    {posts.map((post) => {
                        const date = parseISO(post.date, 'LLLL d, yyyy');
                        const formattedDate = format(date, 'LLLL d, yyyy');
                        return (
                            <li key={post.id} className={utilStyles.listItem}>
                                <Link className={utilStyles.headingMd} href={`/posts/${post.id}`}>{post.title}</Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <time dateTime={post.date}>{formattedDate}</time>
                                </small>

                            </li>
                        );
                    })}
                </ul>
                {filteredPostsByTag.length ? <Link href="/posts">Clear filters</Link> : ''}
            </section>
        </Layout>
    )
}