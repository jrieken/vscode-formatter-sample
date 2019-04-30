declare module "pug-beautify" {
	interface IPugBeautifyOptions {
		fill_tab: boolean;
		omit_div: boolean;
		tab_size: number;
	}

	function beautify(code: string, options: IPugBeautifyOptions): string;

	namespace beautify{}
	export = beautify;
}