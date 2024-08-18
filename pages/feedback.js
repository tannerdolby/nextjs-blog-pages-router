import {useState} from 'react';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Feedback() {
    const [userEmail, setUserEmail] = useState('');
    const [userFeedback, setUserFeedback] = useState('');

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

        // Clear form fields
        setUserEmail('');
        setUserFeedback('');
    }

    return (
        <Layout>
            <section>
                <h2>Send me feedback</h2>
                <form onSubmit={handleSubmit} method="post" className={utilStyles.flexColumn}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
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
                        value={userFeedback}
                        onChange={(e) => setUserFeedback(e.target.value)}
                        placeholder="How can this blog be better?"
                        required
                    />
                    <button className={utilStyles.submitBtn} type="submit">Submit</button>
                </form>
            </section>
        </Layout>
    )
}