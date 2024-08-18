import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // Get all filenames in the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove .md extension from filename
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray matter to parse the post metadata section
        const frontMatter = matter(fileContents);

        // Combine the front matter data with the id
        return {
            id,
            ...frontMatter.data,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse front matter from Markdown files (post metadata)
    const frontMatter = matter(fileContents);

    // TODO: Convert Markdown to HTML content
    const processedContent = await remark()
        .use(html)
        .process(frontMatter.content);
    const htmlContent = processedContent.toString();

    return {
        id,
        htmlContent,
        ...frontMatter.data,
    }
}