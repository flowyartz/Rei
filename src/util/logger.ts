import chalk from 'chalk';
import * as moment from 'moment';
import util from 'util';

export class logger {
	public static log(content: any, { colour = 'grey', tag = 'Log' } = {}) {
		this.write(content, { colour, tag });
	}

	public static info(content: any, { colour = 'green', tag = 'Info' } = {}) {
		this.write(content, { colour, tag });
	}

	public static warn(content: any, { colour = 'yellow', tag = 'Warn' } = {}) {
		this.write(content, { colour, tag });
	}

	public static error(content: any, { colour = 'red', tag = 'Error' } = {}) {
		this.write(content, { colour, tag });
	}

	public static stacktrace(content: any, { colour = 'white', tag = 'Error' } = {}) {
		this.write(content, { colour, tag });
	}


	public static write(content: any, { colour = 'grey', tag = 'Log', error = false } = {}) {
		const stream = error ? process.stderr : process.stdout;
		stream.write(`${chalk.magenta(`[${moment().format(`DD/MM/YY hh:mm:ss`)}]:`)} ${chalk.bold(`[${tag}]:`)} ${(chalk as any)[colour](this.clean(content))}\n`)
	}

	public static clean(item: any) {
		if (typeof item === 'string') return item;
		const cleaned = util.inspect(item, { depth: Infinity });
		return cleaned;
	}
}