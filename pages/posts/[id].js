import Layout from "../../components/layout";
import Date from '../../components/date';
import Link from 'next/link';
import { getAllPostIds, getPostData } from "../../utils/posts";
import Head from "next/head";
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/post.module.css';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    const paths = getAllPostIds();

    return {
        props: {
            postData,
            paths,
        }
    }
}

export default function Post({ postData, paths }) {
    const { title, id, date, tags, htmlContent } = postData;
    const currentPathIdx = paths.findIndex((path) => path.params.id === id);
    let prevIdx = (currentPathIdx - 1) % paths.length;
    const nextIdx = (currentPathIdx + 1) % paths.length;
    prevIdx = prevIdx < 0 ? paths.length - 1 : prevIdx;

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <h2 className={utilStyles.headingXl}>{title}</h2>
            <div className={utilStyles.lightText}>
                <Date dateString={date} />
            </div>
            <ul className={`${utilStyles.flex} ${utilStyles.list} ${utilStyles.marginTopMd}`}>
                {tags.map((tag) => {
                    return (
                    <li
                        key={tag}
                        className={`${utilStyles.listItem} ${utilStyles.textSm}`}
                    >
                        <Link className={postStyles.tag} href={`/posts/?tag=${tag}`}>{tag}</Link>
                    </li>
                    )
                })}
            </ul>
            <div dangerouslySetInnerHTML={{__html: htmlContent}} />
            <br />
            <div className={`${utilStyles.flex} ${utilStyles.spaceBetween}`}>
                <Link href={`/posts/${paths[prevIdx].params.id}`}>&larr; Previous</Link>
                <Link href={`/posts/${paths[nextIdx].params.id}`}>Next &rarr;</Link>
            </div>
            <br />
            <hr />
        </Layout>
    )
}