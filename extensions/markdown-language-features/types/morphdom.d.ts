declare module 'morphdom' {
	interface MorphdomOptions {
		childrenOnly?: boolean;
		onBeforeElUpdated?: (fromEl: Element, toEl: Element) => boolean;
		onElUpdated?: (el: Element) => void;
		onBeforeNodeAdded?: (node: Node) => Node;
		onNodeAdded?: (node: Node) => void;
		onBeforeNodeDiscarded?: (node: Node) => boolean;
		onNodeDiscarded?: (node: Node) => void;
		onBeforeElChildrenUpdated?: (fromEl: Element, toEl: Element) => boolean;
		onElChildrenUpdated?: (fromEl: Element, toEl: Element) => void;
		skipFromChildren?: (fromEl: Element) => boolean;
		skipToChildren?: (toEl: Element) => boolean;
	}

	function morphdom(
		fromNode: Element | DocumentFragment,
		toNode: Element | DocumentFragment | string,
		options?: MorphdomOptions
	): Element | DocumentFragment;

	export = morphdom;
}
