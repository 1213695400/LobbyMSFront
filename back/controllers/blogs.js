const Blog = require("../models/Blog");
const fs = require("fs");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    if (req?.query?.myBlogs) {
      const blogs = await Blog.find({ userId: req.user.id });

      return res.status(200).json({
        success: true,
        data: blogs,
      });
    }
    const blogs = await Blog.find();

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorResponse("No blog found", 404));
    }

    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, postType } = req.body;
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return next(new ErrorResponse("Please upload a file", 400));
    }
    await Blog.create({
      userId,
      title,
      content,
      postType,
      file: file.path,
    });
    res.status(201).json("Blog created");
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorResponse("No blog found", 404));
    }
    
    // like
    if (req.body.like) {
      blog['likes'] += 1;
      await blog.save();
      return res.status(200).json({
        success: true,
        data: blog,
      });
    }

    
    // feedback
    if (req.body.feedback) {
      blog.feedback.push({
        name: req.user.username,
        email: req.user.email,
        comment: req.body.feedback,
      });
      await blog.save();
      return res.status(200).json({
        success: true,
        data: blog,
      });
    }
    
    if (blog.userId.toString() !== req.user.id) {
      return next(
        new ErrorResponse("You are not authorized to update this blog", 401)
      );
    }
    const { title, content, postType } = req.body;
    const file = req.file;

    if (file) {
      fs.unlink(blog.file, (err) => {
        if (err) {
          console.log(err);
        }
      });
      blog.file = file.path;
    }

    blog.title = title;
    blog.content = content;
    blog.postType = postType;

    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorResponse("No blog found", 404));
    }

    if (blog.userId.toString() !== req.user.id) {
      return next(
        new ErrorResponse("You are not authorized to delete this blog", 401)
      );
    }

    fs.unlink(blog.file, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await blog.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
