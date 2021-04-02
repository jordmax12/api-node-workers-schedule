const path = require('path');
const fs = require('fs');
const sorter = require('./common/sorter');

const MIGRATIONS_DIR = 'migrations';
exports.migrate = async () => {
    const dir = path.join(process.cwd(), MIGRATIONS_DIR);
    const files = sorter.sortFiles(await fs.readdirSync(dir), '.sql');
    console.log('logging files', files);
}

