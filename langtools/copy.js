/*
 * Copies new lang terms from the source file to all other lang term files
 */
const
	fs = require('fs'),
	yargs = require('yargs');

const args = yargs.usage('USAGE: $0 [options] [terms]\n\nCopies new and deleted lang terms from the source file to all other lang term files. Default behaviour will not copy changes to existing lang terms. If an existing term is modified, you must specify the term as an argument to force-copy it from the source file (any translations of this term will be lost).')
	.strict(true)
	.option('config', {
		alias: 'c',
		describe: 'Config file path',
		required: true,
		requiresArg: true
	}).option('all', {
		alias: [ 'a', 'copy-all' ],
		describe: 'If this flag is set, the entirety of all lang term files will be overwritten with the contents of the source lang file; deleting any existing translations.',
		boolean: true,
		default: false
	}).argv;

const configFile = args.config;
const copyAll = args.all;
const terms = args._;

let config = null;
try {
	config = JSON.parse(fs.readFileSync(configFile));
} catch (e) {
	let msg = null;
	if (e instanceof SyntaxError) {
		msg = 'Config file is not valid JSON!';
	} else {
		msg = 'Unable to open config file!';
	}

	throw new Error(`${msg} ${e}`);
}

function getLangFilePath(langName) {
	return `${config.langDir}/${langName}.json`;
}

const sourcePath = getLangFilePath(config.copySourceLang);
if (!fs.existsSync(sourcePath)) {
	throw new Error(`Source file does not exist! ${sourcePath}`);
}

let sourceJson = null;
try {
	const sourceContents = fs.readFileSync(sourcePath);
	sourceJson = JSON.parse(sourceContents);
} catch (e) {
	let msg = null;
	if (e instanceof SyntaxError) {
		msg = 'Source file is not valid JSON!';
	} else {
		msg = 'Unable to open source file!';
	}

	throw new Error(`${msg} ${e}`);
}

config.langNames.forEach(langName => {
	if (langName === config.copySourceLang) {
		return;
	}

	const destPath = getLangFilePath(langName);

	const outputJson = {};
	let destJson;
	if (copyAll || !fs.existsSync(destPath)) {
		Object.assign(outputJson, sourceJson);
	} else {
		try {
			const destContents = fs.readFileSync(destPath);
			destJson = JSON.parse(destContents);
		} catch (e) {
			let msg = null;
			if (e instanceof SyntaxError) {
				msg = 'Lang file is not valid JSON!';
			} else {
				msg = 'Unable to open lang file!';
			}

			throw new Error(`${msg} ${e}`);
		}

		Object.keys(sourceJson).forEach(key => {
			if (!destJson[key] || terms.indexOf(key) >= 0) {
				outputJson[key] = sourceJson[key];
			} else {
				outputJson[key] = destJson[key];
			}
		});
	}

	fs.writeFileSync(destPath, JSON.stringify(outputJson, null, 4) + '\n');
});
