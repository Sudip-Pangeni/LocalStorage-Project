import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { useBlog } from '../context/BlogContext';

const HomePage = () => {
  const { blogs } = useBlog();
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing articles and stories from our community of writers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Posts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/blogs" 
            className="inline-block bg-blue-500 text-white px-6 py-2 mt-[50px] rounded hover:bg-blue-600"
          >
            View All Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;