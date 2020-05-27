export const sortByDateEarliest = (posts) => {
    posts.sort(function(a, b) {
        return -1 * a.date.localeCompare(b.date);
    });
    return posts;
}

export const sortByDateOldest = (posts) => {
    posts.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });
    return posts;
}

export const sortByTitleFirst = (posts) => {
    posts.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    return posts;
}

export const sortByTitleLast = (posts) => {
    posts.sort(function (a, b) {
        return -1 * a.title.localeCompare(b.title);
    });
    return posts;
}