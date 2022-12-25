const pages = {
    getPageCount: (arr, perPage) => Math.ceil(arr.length / perPage),
    getPage: (page, arr, perPage) => arr.slice((page - 1) * perPage, page * perPage)
}

export default pages;