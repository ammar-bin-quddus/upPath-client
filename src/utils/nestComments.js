export const nestComments = (comments) => {
  const map = {}; // Maps comment ID to comment object
  const roots = []; // Stores top-level (root) comments

  // First pass: initialize each comment with a `children` array
  comments.forEach((comment) => {
    comment.children = [];
    map[comment._id] = comment;
  });

  // Second pass: nest replies under their parent, or push to root
  comments.forEach((comment) => {
    if (comment.parentId && map[comment.parentId]) {
      map[comment.parentId].children.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
};
