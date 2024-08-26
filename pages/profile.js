import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import profileStyles from '../styles/profile.module.css';
import { useContext } from 'react';
import { ThemeContext } from './_app';
import useSWR from 'swr';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USER = 'tannerdolby';
const API_URL = `${GITHUB_API_URL}/users/${GITHUB_USER}`;

// Server-Side Rendering via getServerSideProps
// to fetch external data at request time and Next.js
// pre-renders the page by generating the pages HTML on each request
/*
export async function getServerSideProps() {
    const githubUserResponse = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USER}`);
    const githubProfile = await githubUserResponse.json();

    const githubReposResponse = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USER}/repos`);
    const githubRepos = await githubReposResponse.json();

    return {
        props: {
            githubProfile: githubProfile,
            githubRepos: githubRepos,
        }
    }
}
*/

// Another option would be Client-side Rendering instead of SSR with getServerSideProps.
// If you don't need to pre-render the Profile page and you also don't want to wait
// for all the data to load on the server at request-time (two requests to the GitHub API)
// before rendering the page, then a good option is to use Client-side rendering
// and keep parts of the page statically generated which will load instantly from
// being pre-rendered at build-time then use SWR to fetch GitHub API data and
// populate parts of the page that rely on external data
const fetcher = (url) => fetch(url).then((res) => res.json());

function ProfileCard({ payload, theme }) {
    if (payload.isLoading) {
        return <p>Loading...<span>⏳</span></p>
    }

    if (payload.error) {
        return <p>An error has occurred. <span>❌</span></p>
    }

    const { company, location, bio, blog, html_url, followers, public_repos } = payload.data;

    return (
        <>
            <p>Software Engineer {company || 'tbd'}. Based out of {location || 'Earth'}.</p>
            <div className={theme === 'dark' ? profileStyles.githubProfileDark : profileStyles.githubProfile}>
                <p>GitHub Profile: <a href={html_url}>@tannerdolby</a></p>
                <p><span>👋</span> {bio}</p>
                <p><span>✏️</span> <a className={utilStyles.darkText} href={blog}>{blog}</a></p>
                <p><span>🤸</span> {followers} followers</p>
                <p><span>📦</span> {public_repos} public repositories</p>
            </div>
        </>
    );
}

function RepoList({ payload }) {
    if (payload.isLoading) {
        return <p>Loading...<span>⏳</span></p>
    }

    if (payload.error) {
        return <p>An error has occurred. <span>❌</span></p>
    }
    return (
        <ul className={utilStyles.list}>
            {payload.data.sort((a, b) => b.stargazers_count - a.stargazers_count).map((repo) => {
                return (
                    <li key={repo.id} className={utilStyles.listItem}>
                        <div className={`${utilStyles.flex} ${utilStyles.spaceBetween}`}>
                            <a href={repo.html_url} className={utilStyles.margin0}>{repo.name}</a>
                            <a href={`${repo.html_url}/stargazers`} className={profileStyles.starLink}>
                                <small className={utilStyles.flex}>
                                    <span className={profileStyles.star}>⭐</span>
                                    <span>{repo.stargazers_count}</span>
                                </small>
                            </a>
                        </div>
                        <small className={'lightText'}>
                            <p className={utilStyles.margin0}>{repo.description}</p>
                        </small>
                    </li>
                );
            })}
        </ul>
    );
}

export default function Profile() {
    const githubProfile = useSWR(API_URL, fetcher);
    const githubRepos = useSWR(`${API_URL}/repos`, fetcher);
    const theme = useContext(ThemeContext);

    return (
        <Layout profile>
            <Head>
                <title>Profile</title>
            </Head>
            <section>
                <ProfileCard payload={githubProfile} theme={theme} />
                <h2>Projects</h2>
                <RepoList payload={githubRepos} />
            </section>
        </Layout>
    )
}
