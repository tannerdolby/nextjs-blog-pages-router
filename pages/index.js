import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../utils/posts';

// Static Generation with data
// Next.js pre-renders the page by
// generating the HTML for pages at build-time
// and reuses those pages for each request
export function getStaticProps() {
  const sortedPostsData = getSortedPostsData();
  return {
    props: {
      sortedPostsData,
    }
  };
}

export default function Home({sortedPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <b>Tanner</b>. I'm a software engineer and mathematician. You can contact me on <a href="https://twitter.com/tannerdolby">Twitter</a>.
        If you want to learn more, <Link href="/profile">checkout my profile</Link>.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Featured Posts</h2>
        <ul className={utilStyles.list}>
          {sortedPostsData.slice(0, 3).map(({id, date, title}) => {
            return (
              <li key={id} className={utilStyles.listItem}>
                <Link href={`/posts/${id}`}>
                  {title}
                </Link>
                <br />
                <small className={'lightText'}>
                  <Date dateString={date} />
                </small>
              </li>
            );
          })}
        </ul>
        <Link className={utilStyles.textNormal} href="/posts">See all posts &rarr;</Link>
        <h2>Feedback</h2>
        <p>See a problem or want to help make this blog better?</p>
        <Link className={utilStyles.textNormal} href="/feedback">Submit feedback &rarr;</Link>
      </section>
    </Layout>
  );
}
