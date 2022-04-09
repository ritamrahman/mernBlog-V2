class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; //Post.find()
    this.queryStr = queryStr; //$sec=abc
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    //   Removing fields from query
    // const removeFields = ["category"];
    // removeFields.forEach((el) => delete this.queryStr[el]);

    this.query = this.query.find({ ...keyword });

    return this;
  }
  filter() {
    const categories = this.queryStr.category
      ? {
          categories: {
            $regex: this.queryStr.category,
            $options: "i",
          },
        }
      : {};
    //   Removing fields from query
    const removeFields = ["keyword"];
    removeFields.forEach((el) => delete this.queryStr[el]);
    this.query = this.query.find(categories);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
