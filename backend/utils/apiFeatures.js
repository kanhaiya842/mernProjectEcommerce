class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i" // this tells that name is case insensitive it means it will search for boith capital and small letters..
                }
            }
            : {}

        this.query = this.query.find({ ...keyword });
        return this; // this sentence means we are returning the whole class..
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //Remove fields on which we should not apply filteration
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        //Filter for price and rating beacuse price is always in range
        let queryStr = JSON.stringify(queryCopy); // Converting ojbect into string beacuse we awant to apply regex to string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`); // changing lt,gt of querycopy to $lt,$gt

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = +(this.queryStr.page) || 1;
        const skip = (currentPage - 1) * resultPerPage;
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;