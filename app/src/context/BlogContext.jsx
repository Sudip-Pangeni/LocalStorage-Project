import { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState(() => {
        // Load from localStorage if available
        const savedBlogs = localStorage.getItem('blogs');
        return savedBlogs ? JSON.parse(savedBlogs) : [];
    });
    
    const [comments, setComments] = useState(() => {
        // Load from localStorage if available
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : {};
    });

    // Save to localStorage whenever blogs or comments change
    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const addBlog = (blog) => {
        const newBlog = {
            ...blog,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            image: blog.image || '/default-blog-image.jpg'
        };
        setBlogs([...blogs, newBlog]);
    };

    const updateBlog = (id, updatedBlog) => {
        setBlogs(blogs.map(blog =>
            blog.id === id ? { ...blog, ...updatedBlog } : blog
        ));
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
        const newComments = { ...comments };
        delete newComments[id];
        setComments(newComments);
    };

    const addComment = (blogId, comment) => {
        const newComment = {
            ...comment,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setComments({
            ...comments,
            [blogId]: [...(comments[blogId] || []), newComment]
        });
    };

    const deleteComment = (blogId, commentId) => {
        setComments({
            ...comments,
            [blogId]: (comments[blogId] || []).filter(c => c.id !== commentId)
        });
    };

    return (
        <BlogContext.Provider value={{
            blogs,
            comments,
            addBlog,
            updateBlog,
            deleteBlog,
            addComment,
            deleteComment
        }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => useContext(BlogContext);