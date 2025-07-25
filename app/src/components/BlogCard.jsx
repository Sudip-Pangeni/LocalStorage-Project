import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-white rounded-lg shadow-2xl shadow-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
            {blog.image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{blog.content}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                        to={`/blogs/${blog.id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;