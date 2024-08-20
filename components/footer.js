import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

export default function Footer() {
    return (
        <footer>
            <p className={utilStyles.lightText}>Built by tannerdolby · Hosted on <a className={utilStyles.lightText} href="https://vercel.com">Vercel</a></p>
        </footer>
    )
}