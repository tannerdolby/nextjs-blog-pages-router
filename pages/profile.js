import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import profileStyles from '../styles/profile.module.css';

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
    console.log('Github Profile', githubProfile);
    const { company, location, bio, blog, html_url, followers, public_repos } = githubProfile;
    return (
        <Layout profile>
            <Head>
                <title>Profile</title>
            </Head>
            <section>
                <p>Software Engineer @{company || 'tbd'}. Based out of {location}.</p>
                <div className={profileStyles.githubProfile}>
                    <p>GitHub Profile: <a href={html_url}>@tannerdolby</a></p>
                    <p><span>👋</span> {bio}</p>
                    <p><span>✏️</span> <a className={utilStyles.darkText} href={blog}>{blog}</a></p>
                    <p><span>🤸</span> {followers} followers</p>
                    <p><span>📦</span> {public_repos} public repositories</p>
                </div>
                <h2>Projects</h2>
                <ul className={utilStyles.list}>
                    {githubRepos.sort((a,b) => b.stargazers_count - a.stargazers_count).map((repo) => {
                        return (
                            <li key={repo.id} className={utilStyles.listItem}>
                                <div className={`${utilStyles.flex} ${utilStyles.spaceBetween}`}>
                                    <a href={repo.html_url} className={utilStyles.margin0}>{repo.name}</a>
                                    <a href={`${repo.html_url}/stargazers`} className={profileStyles.starLink}>
                                        <small className={utilStyles.flex}>
                                            <span className={profileStyles.star}>
                                                ⭐
                                            </span>
                                            <span>{repo.stargazers_count}</span>
                                        </small>
                                    </a>
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
