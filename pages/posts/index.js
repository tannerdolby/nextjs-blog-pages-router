import Layout from "../../components/layout";
import Head from "next/head";
import { getSortedPostsData } from "../../utils/posts";
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/post.module.css';
import Link from "next/link";
import { parseISO, format } from 'date-fns';
import {useState} from 'react';

export async function getServerSideProps({ query }) {
    const sortedPosts = getSortedPostsData();
    const filteredPostsByTag = sortedPosts.filter((post) => {
        return post.tags.includes(query.tag);
    });
    let allTags = new Set();
    sortedPosts.forEach((post) => {
        post.tags.forEach((tag) => {
            allTags.add(tag);
        });
    });
    return {
        props: {
            sortedPosts,
            filteredPostsByTag,
            tagQuery: query.tag || '',
            allTags: [...allTags]
        }
    }
}

export default function Posts({ sortedPosts, filteredPostsByTag, tagQuery, allTags }) {
    const [search, setSearch] = useState('');
    const posts = filteredPostsByTag.length ? filteredPostsByTag : sortedPosts;

    return (
        <Layout>
            <Head>
                <title>Blog</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <h2>Blog</h2>
                <div className={utilStyles.flexColumn}>
                    <small className={utilStyles.lightText}>
                        <label htmlFor="search">Search</label>
                    </small>
                    <input className={utilStyles.input} type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Enter search...'} />
                </div>

                {filteredPostsByTag.length ? <small><p>{filteredPostsByTag.length} posts tagged with {tagQuery}</p></small> : ''}
                <ul className={`${utilStyles.list} ${utilStyles.marginTopXl}`}>
                    {posts
                        .filter((post) => {
                            return post.title.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((post) => {
                            const date = parseISO(post.date, 'LLLL d, yyyy');
                            const formattedDate = format(date, 'LLLL d, yyyy');
                            return (
                                <li key={post.id} className={utilStyles.listItem}>
                                    <Link className={utilStyles.headingMd} href={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                    <br />
                                    <small className={`${utilStyles.lightText} ${utilStyles.flex}`}>
                                        <time dateTime={post.date}>{formattedDate}</time>
                                    </small>
                                </li>
                            );
                        })
                    }
                </ul>
                <h3>Filter Posts by Tag</h3>
                <ul className={`${utilStyles.list} ${utilStyles.flex} ${utilStyles.flexWrap} ${utilStyles.columnGapMd}`}>
                    {allTags.map((tag) => {
                        return (
                        <li className={`${utilStyles.listItem} ${utilStyles.textSm}`}>
                            <Link className={postStyles.tag} href={`/posts/?tag=${tag}`}>{tag}</Link>
                        </li>
                        );
                    })}
                </ul>
                {filteredPostsByTag.length ? <Link href="/posts" onClick={() => setSearch('')}>Clear filters</Link> : ''}
            </section>
        </Layout>
    )
}