class ApiFeatures {
    constructor(sequelizeQuery, searchQuery) {
        this.sequelizeQuery = sequelizeQuery;
        this.searchQuery = searchQuery;
    }

    pagination(pageLimit) {
        let pageNum = Math.ceil(Math.abs(this.searchQuery.page * 1 || 1));
        let offset = (pageNum - 1) * pageLimit;
        this.sequelizeQuery.offset = offset;
        this.sequelizeQuery.limit = pageLimit;
        this.pageNum = pageNum;
        return this;
    }

    filtration() {
        let excluded = ["page", "sort", "pageLimit", "fields", "keyword"];
        let filterObj = Object.assign({}, this.searchQuery);
        excluded.forEach((el) => delete filterObj[el]);

        // Convert filterObj to Sequelize where clause
        let where = {};
        for (let key in filterObj) {
            if (filterObj[key].match(/\b(gte|gt|lte|lt)\b/)) {
                let operator = filterObj[key].match(/\b(gte|gt|lte|lt)\b/)[0];
                let value = filterObj[key].replace(operator, '');
                where[key] = { [`$${operator}`]: value };
            } else {
                where[key] = filterObj[key];
            }
        }

        this.sequelizeQuery.where = where;
        return this;
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(",").map(field => [field, 'ASC']);
            this.sequelizeQuery.order = sortBy;
        } else {
            this.sequelizeQuery.order = [['createdAt', 'DESC']];
        }
        return this;
    }

    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(",");
            this.sequelizeQuery.attributes = fields;
        } else {
            this.sequelizeQuery.attributes = { exclude: ['__v'] };
        }
        return this;
    }

    search() {
        if (this.searchQuery.keyword) {
            this.sequelizeQuery.where = {
                ...this.sequelizeQuery.where,
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${this.searchQuery.keyword}%` } },
                    { description: { [Sequelize.Op.iLike]: `%${this.searchQuery.keyword}%` } }
                ]
            };
        }
        return this;
    }
}

export { ApiFeatures };