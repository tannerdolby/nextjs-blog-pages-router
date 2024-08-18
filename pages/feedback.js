import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Feedback() {
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        const formData = new FormData(event.currentTarget);
        console.log(event.currentTarget);
        console.log('formData', formData);
        const res = await fetch("/api/save-feedback", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        console.log('api route response', data);
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
                        placeholder="How can this blog be better?"
                        required
                    />
                    <button className={utilStyles.submitBtn} type="submit">Submit</button>
                </form>
            </section>
        </Layout>
    )
}