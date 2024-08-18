import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USER = 'tannerdolby';

// Server-Side Rendering via getServerSideProps
// to fetch external data at request time and Next.js
// pre-renders the page by generating the pages HTML on each request
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

export default function Profile({ githubProfile, githubRepos }) {
    const { company, location, bio, blog, html_url, followers, public_repos } = githubProfile;
    return (
        <Layout profile>
            <Head>
                <title>Profile</title>
            </Head>
            <section>
                <p>Software Engineer @ {company}. Based out of {location} and writing about things on <a href={blog}>{blog}</a></p>
                <p>{bio}</p>
                <p>GitHub Profile: <a href={html_url}>@tannerdolby</a></p>
                <p>GitHub Followers: {followers}</p>
                <p>Public Repositories: {public_repos}</p>
                <h2>Projects</h2>
                <ul className={utilStyles.list}>
                    {githubRepos.map((repo) => {
                        return (
                            <li key={repo.id} className={utilStyles.listItem}>
                                <div className={`${utilStyles.flex} ${utilStyles.spaceBetween}`}>
                                    <a href={repo.html_url} className={utilStyles.margin0}>{repo.name}</a>
                                    <div>
                                        <small>
                                            <span className={utilStyles.marginRightMd}>⭐</span>
                                            <span>{repo.stargazers_count}</span>
                                        </small>
                                    </div>
                                </div>
                                <small className={utilStyles.lightText}>
                                    <p className={utilStyles.margin0}>{repo.description}</p>
                                </small>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </Layout>
    )
}
