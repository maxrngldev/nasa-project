const path = require('path');

function getIndex(req, res) {
	const indexPath = path.join(__dirname, '..', '..', '..', 'public', 'index.html');
  
	res.status(200).sendFile(indexPath);
}

module.exports = { getIndex };
