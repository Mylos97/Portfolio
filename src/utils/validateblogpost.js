const checkForDate = (dateString) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

const checkForTitle = (title) => {
  if (title.length < 6) {
    console.log("Please add a longer title");
    return false;
  }
  return true;
};

const checkForContent = (content) => {
  if (content.length < 320) {
    console.log("Please add a more text");
    return false;
  }
  return true;
};

export const validateBlogPost = (title,date,content) => {
    if(!checkForTitle(title)) return false;
    if(!checkForDate(date)) return false;
    if(!checkForContent(content)) return false;
    return true
}
