import { useReducer, useContext } from 'react';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { sendEmail } from '../utils/email';
import Head from 'next/head';
import { ThemeContext } from './_app';

const TEAM_EMAIL = 'dolb.tanner@gmail.com';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload};
        case 'SET_EMAIL':
            return {...state, email: action.payload};
        case 'SET_FEEDBACK':
            return {...state, feedback: action.payload};
        default:
            return state;
    }
}

export default function Feedback() {
    const [formState, dispatch] = useReducer(reducer, {
        name: '',
        email: '',
        feedback: ''
    });
    const theme = useContext(ThemeContext);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const res = await fetch('/api/save-feedback', {
            method: 'POST',
            body: formData,
        });
        // Do something with the API route response
        const data = await res.json();
        console.log('data', data);

        // Additionally, you could allow users to send an email to
        // you or a team inbox with their feedback
        sendEmail(TEAM_EMAIL, 'Next.js Pages Router Starter', formState.feedback);

        // Clear form fields
        dispatch({type: 'SET_NAME', payload: ''});
        dispatch({type: 'SET_EMAIL', payload: ''});
        dispatch({type: 'SET_FEEDBACK', payload: ''});
    }

    return (
        <Layout>
            <Head>
                <title>Feedback</title>
            </Head>
            <section>
                <h2>Send feedback</h2>
                <form onSubmit={handleSubmit} method="post" className={utilStyles.flexColumn}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={(e) => dispatch({type: 'SET_NAME', payload: e.target.value})}
                        placeholder="Your name"
                        className={utilStyles.input}
                        required
                    />
                    <label htmlFor="email" className={utilStyles.marginTopMd}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={(e) => dispatch({type: 'SET_EMAIL', payload: e.target.value})}
                        placeholder="your.email@gmail.com"
                        className={utilStyles.input}
                        required
                    />
                    <label htmlFor="feedback" className={utilStyles.marginTopMd}>Feedback</label>
                    <textarea
                        className={`${utilStyles.textArea} ${utilStyles.textAreaResizeY}`}
                        rows={5}
                        cols={5}
                        id="feedback"
                        name="feedback"
                        value={formState.feedback}
                        onChange={(e) => dispatch({type: 'SET_FEEDBACK', payload: e.target.value})}
                        placeholder="How can this blog be better?"
                        required
                    />
                    <button className={utilStyles.submitBtn} type="submit">Submit</button>
                </form>
            </section>
        </Layout>
    )
}