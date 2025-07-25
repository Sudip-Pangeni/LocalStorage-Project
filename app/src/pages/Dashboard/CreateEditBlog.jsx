import { useState, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';

const CreateEditBlog = ({ blog, onClose }) => {
    const { addBlog, updateBlog } = useBlog();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        imagePreview: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                image: null,
                imagePreview: blog.image || '',
                fileName: blog.image ? 'Current image' : 'No file chosen'
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.match('image.*')) {
            setError('Please select an image file (JPEG, PNG, GIF)');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: reader.result,
                fileName: file.name
            }));
            if (error) setError(null);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        if (!formData.content.trim()) {
            setError('Content is required');
            return;
        }
        if (!formData.imagePreview) {
            setError('Featured image is required');
            return;
        }

        setIsLoading(true);
        try {
            const blogData = {
                title: formData.title,
                content: formData.content,
                image: formData.imagePreview
            };

            if (blog) {
                await updateBlog(blog.id, blogData);
            } else {
                await addBlog(blogData);
            }
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to save blog post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#c3edf775] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>

                        {/* File Upload Section - Positioned above content */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 z-20 mb-2">
                                Featured Image *
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="block">
                                    <span className="sr-only">Choose file</span>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                </label>
                                <span className="text-sm text-gray-500">
                                    {formData.fileName}
                                </span>
                            </div>
                            {formData.imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                                    <img 
                                        src={formData.imagePreview} 
                                        alt="Preview" 
                                        className="max-h-60 rounded-md object-contain"
                                    />
                                </div>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Recommended size: 1200×630 pixels (Max 5MB)
                            </p>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows="8"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your blog content here..."
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-4 border-t pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : blog ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEditBlog;