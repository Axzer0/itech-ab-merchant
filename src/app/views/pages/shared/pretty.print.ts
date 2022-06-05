import {Pipe, PipeTransform} from "@angular/core";
import {escapeRegExp} from "@angular/compiler/src/util";

@Pipe({
	name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {
	transform(val) {
		let v = JSON.stringify(val);
		v = this.replaceAT('{','','')
		// v = this.replaceAll(v,'{', '{<br>')
		// v = this.replaceAll(v,',', ',<br>')
		// v = this.replaceAll(v,'}', '<br>}')
		// v = this.replaceAll(v,']', '<br>]')
		// v = this.replaceAll(v,'[', '[<br>')
		console.log(v);
		return v
	}

	replaceAll(str, find, replace) {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	replaceAT(str,index, replacement) {
		return str(0, index) + replacement + str(index + replacement.length);
	}
}
