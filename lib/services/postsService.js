const marked = require("marked"); // also consider "hoedown"
const BlogPost = require("../models/blogPost");

let PostsService = {};

PostsService.getPosts = async (category) => {
  const filter =
    category !== undefined && category !== null ? { category } : {};

  let posts = await BlogPost.find(filter)
    .select("-fullContent") // exclude the full content
    .exec();

  return posts;
};

PostsService.getPostsByTag = async (tag) => {
  const posts = await BlogPost.find({ tags: { $in: [tag] } })
    .select("-fullContent")
    .exec();

  return posts;
};

PostsService.getPostContent = async (file) => {
  const post = await BlogPost.findOne({ file })
    .select("fullContent html")
    .exec();

  if (!post) {
    return null;
  }

  // convert from md to html if necessary
  const html = post.html ? post.fullContent : marked(post.fullContent);

  return html;
};

PostsService.getPostForEdit = async (file) => {
  let post = await BlogPost.findOne({ file }).exec();
  return post;
};

PostsService.savePost = async (post) => {
  // look for an id - if exists look it up.  if not, this is a new post
  if (post._id !== undefined) {
    console.log(
      `Editing an existing post with file name ${post.file} and _id ${post._id}`
    );
  } else {
    console.log(`Adding a new post with file ${post.file}.`);
  }

  const populateAndSave = async (blogPost) => {
    if (!blogPost) {
      blogPost = new BlogPost();
    }

    blogPost.name = post.name;
    blogPost.file = post.file;
    blogPost.html = post.html;
    blogPost.postDate = post.postDate;
    blogPost.category = post.category;
    blogPost.tags = post.tags || [];
    blogPost.preview = post.preview;
    blogPost.fullContent = post.fullContent;

    // save
    try {
      const savedPost = await blogPost.save();
      console.log(`Saved blog post '${savedPost.name}'`);
      return savedPost;
    } catch (err) {
      console.log("Error seeding blog post: " + err);
      throw err;
    }
  };

  if (post._id !== undefined) {
    const existingPost = await BlogPost.findOne({ file: post.file }).exec();

    return await populateAndSave(existingPost);
  } else {
    return await populateAndSave();
  }
};

PostsService.getCategories = async () => {
  const categories = await BlogPost.collection.distinct("category");
  return categories;
};

PostsService.getTags = async () => {
  // TODO: used to return an object with tag name and count.  will need to look up
  //       how we aggregate this in mongoose
  const tags = await BlogPost.collection.distinct("tags");
  console.log(`Loaded ${tags.length} tags`);
  return tags;
};

// interim function that will rebuild the db posts with the files until
// an API can be built to to add blog posts
PostsService.seedData = async () => {
  let postsAdded = 0;

  // delete 'em all!
  try {
    console.log("removing all existing blog entries...");
    await BlogPost.remove({});
  } catch (error) {
    console.log(error);
    return { success: false, postsAdded, error };
  }

  const fs = require("fs");
  const posts = require("./postsData");

  console.log(`There are ${posts.length} posts to seed...`);

  // for each post, read in to BlogPost object and save
  for (const post of posts) {
    let blogPost = new BlogPost();
    blogPost.name = post.name;
    blogPost.file = post.file;
    blogPost.html = post.html;
    blogPost.postDate = post.postDate;
    blogPost.category = post.category;
    blogPost.tags = post.tags;
    blogPost.preview = post.preview;

    // read from file for content
    let extension = post.html ? ".html" : ".md";
    let filePath = `./posts/${post.file}${extension}`;
    let contents = fs.readFileSync(filePath).toString();

    blogPost.fullContent = contents;

    try {
      const savedPost = await blogPost.save();
      postsAdded++;
      console.log(`Seeded new blog post '${savedPost.name}'`);
    } catch (err) {
      console.log("Error seeding blog post: " + err);
    }
  }

  return { success: true, postsAdded };
};

module.exports = PostsService;
