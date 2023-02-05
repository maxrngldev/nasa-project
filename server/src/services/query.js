const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination({ page, limit }) {
	if (!page && !limit) return { skip: 1, limit: 5 };

	const limitItems = Math.abs(limit) || DEFAULT_PAGE_NUMBER;
	const pageNumber = Math.abs(page) || DEFAULT_PAGE_LIMIT;

	const skip = (pageNumber - 1) * limitItems;

	return {
		skip,
		limit,
	};
}

module.exports = { getPagination };
