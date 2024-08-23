import Layout from "../../components/layout";
import Head from "next/head";
import { getSortedPostsData } from "../../utils/posts";
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/post.module.css';
import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { useState, useCallback, useContext } from 'react';
import { ThemeContext } from "../_app";

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
    const theme = useContext(ThemeContext);
    const posts = filteredPostsByTag.length ? filteredPostsByTag : sortedPosts;

    const TagFilterText = () => {
        const matches = filteredPostsByTag.length;
        const itemType = matches === 1 ? 'post' : 'posts';

        if (!matches) {
            return '';
        }

        return (
            <div className={`${utilStyles.textNormal} ${utilStyles.flex} ${utilStyles.spaceBetween} ${utilStyles.flexWrap} ${utilStyles.marginTopMd}`}>
                <p className={utilStyles.margin0}>{matches} {itemType} tagged with {tagQuery}</p>
                <Link href="/posts" onClick={() => setSearch('')}>Clear filters</Link>
            </div>
        )
    }

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
                <TagFilterText />
                <ul className={`${utilStyles.list} ${utilStyles.marginYXl}`}>
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
                <ul className={`${utilStyles.list} ${utilStyles.flex} ${utilStyles.flexWrap}`}>
                    {allTags.map((tag) => {
                        return (
                            <li className={`${utilStyles.listItem} ${utilStyles.textSm}`} key={`${tag}-filter`}>
                                <Link className={theme === 'dark' ? postStyles.tagDark : postStyles.tag} href={`/posts/?tag=${tag}`}>{tag}</Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </Layout>
    )
}