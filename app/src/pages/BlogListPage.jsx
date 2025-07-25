import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import CreateEditBlog from '../pages/Dashboard/CreateEditBlog';

const BlogListTable = () => {
    const { blogs, deleteBlog } = useBlog();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };

    return (
        <div>
            <div className="flex justify-center py-6 items-center mb-6">
                <h2 className="text-2xl font-bold">All Blog Posts</h2>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full mx-[100px] divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={blog.image || '/images/default-blog-image.jpg'}
                                        alt={blog.title}
                                        className="h-12 w-12 rounded object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                        to={`/blogs/${blog.id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Read More
                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <CreateEditBlog
                    blog={editingBlog}
                    onClose={handleClose}
                />
            </Modal>
        </div>
    );
};

export default BlogListTable;