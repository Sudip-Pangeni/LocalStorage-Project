import { useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import CommentSection from '../components/CommentSection';

const SingleBlogPage = () => {
    const { id } = useParams();
    const { blogs } = useBlog();
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Blog post not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <article className="mb-8">
                {blog.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                )}
                <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                <p className="text-gray-500 mb-6">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{blog.content}</p>
                </div>
            </article>

            <CommentSection blogId={id} />
        </div>
    );
};

export default SingleBlogPage;