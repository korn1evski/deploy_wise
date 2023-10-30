const getTimeSinceUpload = (publishedAt) => {
  const currentDate = new Date();
  const videoDate = new Date(publishedAt);
  const timeDiff = currentDate - videoDate;

  const yearsSinceUpload = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const monthsSinceUpload = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const daysSinceUpload = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursSinceUpload = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesSinceUpload = Math.floor(timeDiff / (1000 * 60));

  if (yearsSinceUpload > 0) {
    return yearsSinceUpload === 1
      ? "1 year ago"
      : `${yearsSinceUpload} years ago`;
  } else if (monthsSinceUpload > 0) {
    return monthsSinceUpload === 1
      ? "1 month ago"
      : `${monthsSinceUpload} months ago`;
  } else if (daysSinceUpload > 0) {
    return daysSinceUpload === 1 ? "1 day ago" : `${daysSinceUpload} days ago`;
  } else if (hoursSinceUpload > 0) {
    return hoursSinceUpload === 1
      ? "1 hour ago"
      : `${hoursSinceUpload} hours ago`;
  } else {
    return minutesSinceUpload <= 1
      ? "less than a minute ago"
      : `${minutesSinceUpload} minutes ago`;
  }
};

function formatViewCount(viewCount) {
  if (viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + "B";
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "K";
  }
  return viewCount.toString();
}

export { getTimeSinceUpload, formatViewCount};
