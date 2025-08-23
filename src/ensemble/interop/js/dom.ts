import * as types from "../../types.ts";

/*
| AbortController | no* |
| AbortSignal | no* |
| AbstractRange | no |
| Attr | no |
| CDATASection | no |
| CharacterData | no |
| Comment | no |
| CustomEvent | yes |
| Document | yes |
| DocumentFragment | yes |
| DocumentType | no |
| DOMException | no |
| DOMImplementation | no |
| DOMParser | no |
| DOMPoint | no |
| DOMPointReadOnly | no |
| DOMRect | no |
| DOMTokenList | no |
| Element | yes |
| Event | yes |
| EventTarget | yes |
| HTMLCollection | no |
| MutationObserver | no |
| MutationRecord | no |
| NamedNodeMap | no |
| Node | no |
| NodeIterator | no |
| NodeList | no |
| ProcessingInstruction | no |
| Range | no |
| StaticRange | no |
| Text | no |
| TextDecoder | no |
| TextEncoder | no |
| TimeRanges | no |
| TreeWalker | no |
| XMLDocument | no |
*/

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

export const nsValues: Array<[string, types.Closure]> = [
	// Shorthand properties
	["add-event-listener", addEventListener],
	["prevent-default", eventProtoPreventDefault],
	["get-element-by-id", getElementById],
	["query-selector", querySelector],
	["set-attribute", elementProtoSetAttribute],
	["get-attribute", elementProtoGetAttribute],

	// Custom Event
	["CustomEvent::new", customEventProtoNew],
	["CustomEvent::prototype", customEventProtoProto],
	["CustomEvent.detail", customEventDetail],
	["CustomEvent::initCustomEvent", customEventProtoInitCustomEvent],

	// Document
	["Document::addEventListener", documentProtoAddEventListener],
	["Document::adoptNode", documentProtoAdoptNode],
	["Document::captureEvents", documentProtoCaptureEvents],
	["Document::caretPositionFromPoint", documentProtoCaretPositionFromPoint],
	["Document::caretRangeFromPoint", documentProtoCaretRangeFromPoint],
	["Document::clear", documentProtoClear],
	["Document::close", documentProtoClose],
	["Document::createAttribute", documentProtoCreateAttribute],
	["Document::createAttributeNS", documentProtoCreateAttributeNS],
	["Document::createCDATASection", documentProtoCreateCDATASection],
	["Document::createComment", documentProtoCreateComment],
	["Document::createDocumentFragment", documentProtoCreateDocumentFragment],
	["Document::createElement", documentProtoCreateElement],
	["Document::createElementNS", documentProtoCreateElementNS],
	["Document::createEvent", documentProtoCreateEvent],
	["Document::createNodeIterator", documentProtoCreateNodeIterator],
	[
		"Document::createProcessingInstruction",
		documentProtoCreateProcessingInstruction,
	],
	["Document::createRange", documentProtoCreateRange],
	["Document::createTextNode", documentProtoCreateTextNode],
	["Document::createTreeWalker", documentProtoCreateTreeWalker],
	["Document::execCommand", documentProtoExecCommand],
	["Document::exitFullscreen", documentProtoExitFullscreen],
	["Document::exitPictureInPicture", documentProtoExitPictureInPicture],
	["Document::exitPointerLock", documentProtoExitPointerLock],
	["Document::getElementById", documentProtoGetElementById],
	["Document::getElementsByClassName", documentProtoGetElementsByClassName],
	["Document::getElementsByName", documentProtoGetElementsByName],
	["Document::getElementsByTagName", documentProtoGetElementsByTagName],
	["Document::getElementsByTagNameNS", documentProtoGetElementsByTagNameNS],
	["Document::getSelection", documentProtoGetSelection],
	["Document::hasFocus", documentProtoHasFocus],
	["Document::hasStorageAccess", documentProtoHasStorageAccess],
	["Document::importNode", documentProtoImportNode],
	["Document::new", documentProtoNew],
	["Document::open", documentProtoOpen],
	["Document::parseHTMLUnsafe", documentProtoParseHTMLUnsafe],
	["Document::prototype", documentProtoProto],
	["Document::queryCommandEnabled", documentProtoQueryCommandEnabled],
	["Document::queryCommandIndeterm", documentProtoQueryCommandIndeterm],
	["Document::queryCommandState", documentProtoQueryCommandState],
	["Document::queryCommandSupported", documentProtoQueryCommandSupported],
	["Document::queryCommandValue", documentProtoQueryCommandValue],
	["Document::querySelector", documentProtoQuerySelector],
	["Document::releaseEvents", documentProtoReleaseEvents],
	["Document::removeEventListener", documentProtoRemoveEventListener],
	["Document::requestStorageAccess", documentProtoRequestStorageAccess],
	["Document::startViewTransition", documentProtoStartViewTransition],
	["Document::write", documentProtoWrite],
	["Document::writeln", documentProtoWriteln],
	["Document.alinkColor", documentAlinkColor],
	["Document.all", documentAll],
	["Document.anchors", documentAnchors],
	["Document.applets", documentApplets],
	["Document.bgColor", documentBgColor],
	["Document.body", documentBody],
	["Document.characterSet", documentCharacterSet],
	["Document.charset", documentCharset],
	["Document.compatMode", documentCompatMode],
	["Document.contentType", documentContentType],
	["Document.cookie", documentCookie],
	["Document.currentScript", documentCurrentScript],
	["Document.defaultView", documentDefaultView],
	["Document.designMode", documentDesignMode],
	["Document.dir", documentDir],
	["Document.doctype", documentDoctype],
	["Document.documentElement", documentDocumentElement],
	["Document.documentURI", documentDocumentURI],
	["Document.domain", documentDomain],
	["Document.embeds", documentEmbeds],
	["Document.fgColor", documentFgColor],
	["Document.forms", documentForms],
	["Document.fragmentDirective", documentFragmentDirective],
	["Document.fullscreen", documentFullscreen],
	["Document.fullscreenEnabled", documentFullscreenEnabled],
	["Document.head", documentHead],
	["Document.hidden", documentHidden],
	["Document.images", documentImages],
	["Document.implementation", documentImplementation],
	["Document.inputEncoding", documentInputEncoding],
	["Document.lastModified", documentLastModified],
	["Document.linkColor", documentLinkColor],
	["Document.links", documentLinks],
	["Document.onfullscreenchange", documentOnfullscreenchange],
	["Document.onfullscreenerror", documentOnfullscreenerror],
	["Document.onpointerlockchange", documentOnpointerlockchange],
	["Document.onpointerlockerror", documentOnpointerlockerror],
	["Document.onreadystatechange", documentOnreadystatechange],
	["Document.onvisibilitychange", documentOnvisibilitychange],
	["Document.ownerDocument", documentOwnerDocument],
	["Document.pictureInPictureEnabled", documentPictureInPictureEnabled],
	["Document.plugins", documentPlugins],
	["Document.readyState", documentReadyState],
	["Document.referrer", documentReferrer],
	["Document.rootElement", documentRootElement],
	["Document.scripts", documentScripts],
	["Document.scrollingElement", documentScrollingElement],
	["Document.timeline", documentTimeline],
	["Document.title", documentTitle],
	["Document.URL", documentURL],
	["Document.visibilityState", documentVisibilityState],
	["Document.vlinkColor", documentVlinkColor],

	// DocumentFragment
	["DocumentFragment::getElementById", documentFragmentProtoGetElementById],
	["DocumentFragment::new", documentFragmentProtoNew],
	["DocumentFragment::prototype", documentFragmentProtoProto],
	["DocumentFragment.ownerDocument", documentFragmentOwnerDocument],
	["DocumentFragment::querySelector", documentFragmentProtoQuerySelector],

	// DocumentTimeline
	["DocumentTimeline::new", documentTimelineProtoNew],
	["DocumentTimeline::prototype", documentTimelineProtoProto],
	["DocumentType::new", documentTypeProtoNew],
	["DocumentType::prototype", documentTypeProtoProto],
	["DocumentType.name", documentTypeName],
	["DocumentType.ownerDocument", documentTypeOwnerDocument],
	["DocumentType.publicId", documentTypePublicId],
	["DocumentType.systemId", documentTypeSystemId],

	// Element
	["Element::addEventListener", elementProtoAddEventListener],
	["Element::attachShadow", elementProtoAttachShadow],
	["Element::checkVisibility", elementProtoCheckVisibility],
	["Element::closest", elementProtoClosest],
	["Element::computedStyleMap", elementProtoComputedStyleMap],
	["Element::getAttribute", elementProtoGetAttribute],
	["Element::getAttributeNames", elementProtoGetAttributeNames],
	["Element::getAttributeNode", elementProtoGetAttributeNode],
	["Element::getAttributeNodeNS", elementProtoGetAttributeNS],
	["Element::getAttributeNS", elementProtoGetAttributeNS],
	["Element::getBoundingClientRect", elementProtoGetBoundingClientRect],
	["Element::getClientRects", elementProtoGetClientRects],
	["Element::getElementsByClassName", elementProtoGetElementsByClassName],
	["Element::getElementsByTagName", elementProtoGetElementsByTagName],
	["Element::getElementsByTagNameNS", elementProtoGetElementsByTagNameNS],
	["Element::getHTML", elementProtoGetHTML],
	["Element::hasAttribute", elementProtoHasAttribute],
	["Element::hasAttributeNS", elementProtoHasAttributeNS],
	["Element::hasAttributes", elementProtoHasAttributes],
	["Element::hasPointerCapture", elementProtoHasPointerCapture],
	["Element::insertAdjacentElement", elementProtoInsertAdjacentElement],
	["Element::insertAdjacentHTML", elementProtoInsertAdjacentHTML],
	["Element::insertAdjacentText", elementProtoInsertAdjacentText],
	["Element::matches", elementProtoMatches],
	["Element::new", elementProtoNew],
	["Element::prototype", elementProtoProto],
	["Element::querySelector", elementProtoQuerySelector],
	["Element::releasePointerCapture", elementProtoReleasePointerCapture],
	["Element::removeAttribute", elementProtoRemoveAttribute],
	["Element::removeAttributeNode", elementProtoRemoveAttributeNode],
	["Element::removeAttributeNS", elementProtoRemoveAttributeNS],
	["Element::removeEventListener", elementProtoRemoveEventListener],
	["Element::requestFullscreen", elementProtoRequestFullscreen],
	["Element::requestPointerLock", elementProtoRequestPointerLock],
	["Element::scroll", elementProtoScroll],
	["Element::scrollBy", elementProtoScrollBy],
	["Element::scrollIntoView", elementProtoScrollIntoView],
	["Element::scrollTo", elementProtoScrollTo],
	["Element::setAttribute", elementProtoSetAttribute],
	["Element::setAttributeNode", elementProtoSetAttributeNode],
	["Element::setAttributeNodeNS", elementProtoSetAttributeNodeNS],
	["Element::setAttributeNS", elementProtoSetAttributeNS],
	["Element::setHTMLUnsafe", elementProtoSetHTMLUnsafe],
	["Element::setPointerCapture", elementProtoSetPointerCapture],
	["Element::toggleAttribute", elementProtoToggleAttribute],
	["Element::webkitMatchesSelector", elementProtoWebkitMatchesSelector],
	["Element.attributes", elementAttributes],
	["Element.classList", elementClassList],
	["Element.className", elementClassName],
	["Element.clientHeight", elementClientHeight],
	["Element.clientLeft", elementClientLeft],
	["Element.clientTop", elementClientTop],
	["Element.clientWidth", elementClientWidth],
	["Element.currentCSSZoom", elementCurrentCSSZoom],
	["Element.id", elementId],
	["Element.innerHTML", elementInnerHTML],
	["Element.localName", elementLocalName],
	["Element.namespaceURI", elementNamespaceURI],
	["Element.onfullscreenchange", elementOnfullscreenchange],
	["Element.onfullscreenerror", elementOnfullscreenerror],
	["Element.outerHTML", elementOuterHTML],
	["Element.ownerDocument", elementOwnerDocument],
	["Element.part", elementPart],
	["Element.prefix", elementPrefix],
	["Element.scrollHeight", elementScrollHeight],
	["Element.scrollLeft", elementScrollLeft],
	["Element.scrollTop", elementScrollTop],
	["Element.scrollWidth", elementScrollWidth],
	["Element.shadowRoot", elementShadowRoot],
	["Element.slot", elementSlot],
	["Element.tagName", elementTagName],

	// Event
	["Event::AT_TARGET", eventProtoATTARGET],
	["Event::BUBBLING_PHASE", eventProtoBUBBLINGPHASE],
	["Event::CAPTURING_PHASE", eventProtoCAPTURINGPHASE],
	["Event::composedPath", eventProtoComposedPath],
	["Event::initEvent", eventProtoInitEvent],
	["Event::new", eventProtoNew],
	["Event::NONE", eventProtoNONE],
	["Event::preventDefault", eventProtoPreventDefault],
	["Event::prototype", eventProtoProto],
	["Event::stopImmediatePropagation", eventProtoStopImmediatePropagation],
	["Event::stopPropagation", eventProtoStopPropagation],
	["Event.AT_TARGET", eventATTARGET],
	["Event.bubbles", eventBubbles],
	["Event.BUBBLING_PHASE", eventBUBBLINGPHASE],
	["Event.cancelable", eventCancelable],
	["Event.cancelBubble", eventCancelBubble],
	["Event.CAPTURING_PHASE", eventCAPTURINGPHASE],
	["Event.composed", eventComposed],
	["Event.currentTarget", eventCurrentTarget],
	["Event.defaultPrevented", eventDefaultPrevented],
	["Event.eventPhase", eventEventPhase],
	["Event.isTrusted", eventIsTrusted],
	["Event.NONE", eventNONE],
	["Event.returnValue", eventReturnValue],
	["Event.srcElement", eventSrcElement],
	["Event.target", eventTarget],
	["Event.timeStamp", eventTimeStamp],
	["Event.type", eventType],

	// EventTarget
	["EventTarget::new", eventTargetProtoNew],
	["EventTarget::prototype", eventTargetProtoProto],
	["EventTarget::addEventListener", eventTargetProtoAddEventListener],
	["EventTarget::dispatchEvent", eventTargetProtoDispatchEvent],
	["EventTarget::removeEventListener", eventTargetProtoRemoveEventListener],
];

for (const [sym, fn] of nsValues) {
	ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}

// MARK: Shorthand Events
export function getElementById(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 2);

	if (args[0].value instanceof DocumentFragment) {
		return documentFragmentProtoGetElementById(args);
	}

	return documentProtoGetElementById(args);
}

export function querySelector(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 2);

	if (args.length === 1 && args[0].value instanceof Document) {
		return documentProtoQuerySelector(args);
	}

	types.assertAtomNode(args[0]);

	if (args.length === 2 && args[0].value instanceof DocumentFragment) {
		return documentFragmentProtoQuerySelector(args);
	}

	if (args.length === 2 && args[0].value instanceof Element) {
		return elementProtoQuerySelector(args);
	}

	throw types.createErrorNode(
		"querySelector expects a Document, DocumentFragment or Element as the first parameter.",
		types.ErrorTypes.TypeError,
		args[0],
	);
}

// MARK: Longhand Events
export function customEventProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function customEventProtoProto(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function customEventDetail(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function customEventProtoInitCustomEvent(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoProto(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoParseHTMLUnsafe(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentURL(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentAlinkColor(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentAll(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentAnchors(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentApplets(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentBgColor(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentBody(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentCharacterSet(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentCharset(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentCompatMode(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentContentType(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentCookie(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentCurrentScript(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDefaultView(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDesignMode(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDir(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDoctype(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDocumentElement(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDocumentURI(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentDomain(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentEmbeds(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFgColor(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentForms(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFragmentDirective(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFullscreen(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFullscreenEnabled(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentHead(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentHidden(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentImages(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentImplementation(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentInputEncoding(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentLastModified(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentLinkColor(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentLinks(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnfullscreenchange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnfullscreenerror(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnpointerlockchange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnpointerlockerror(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnreadystatechange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOnvisibilitychange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentOwnerDocument(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentPictureInPictureEnabled(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentPlugins(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentReadyState(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentReferrer(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentRootElement(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentScripts(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentScrollingElement(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTimeline(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTitle(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentVisibilityState(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentVlinkColor(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoAdoptNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCaptureEvents(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCaretPositionFromPoint(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCaretRangeFromPoint(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoClear(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoClose(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateAttributeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateCDATASection(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateComment(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateDocumentFragment(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateElement(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateElementNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateEvent(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateNodeIterator(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateProcessingInstruction(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateRange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateTextNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoCreateTreeWalker(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoExecCommand(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoExitFullscreen(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoExitPictureInPicture(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoExitPointerLock(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function documentProtoGetElementById(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertStringNode(args[0]);

	const value = Document.prototype.getElementById.call(document, args[0].value);

	return value ? types.createAtomNode(value) : types.createNilNode();
}

export function documentProtoGetElementsByClassName(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoGetElementsByName(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoGetElementsByTagName(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoGetElementsByTagNameNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoGetSelection(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoHasFocus(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoHasStorageAccess(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoImportNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoOpen(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoQueryCommandEnabled(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoQueryCommandIndeterm(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoQueryCommandState(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoQueryCommandSupported(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoQueryCommandValue(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function documentProtoQuerySelector(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertStringNode(args[0]);

	const value = Document.prototype.querySelector.call(document, args[0].value);

	return value ? types.createAtomNode(value) : types.createNilNode();
}

// export function documentQuerySelectorAll(
// 	args: types.AstNode[]
// ): types.AstNode {
// 	types.assertArgumentCount(args.length, 1);
// 	return types.createNilNode();
// }

export function documentProtoReleaseEvents(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoRequestStorageAccess(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoStartViewTransition(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoWrite(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoWriteln(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentProtoAddEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertStringNode(args[0]);
	types.assertFunctionNode(args[1]);

	Document.prototype.addEventListener.call(
		document,
		args[0].value,
		(event: Event) => {
			args[1].value(types.createAtomNode(event));
		},
	);

	return types.createNilNode();
}

export function documentProtoRemoveEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTimelineProtoNew(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTimelineProtoProto(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTypeName(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTypeOwnerDocument(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTypePublicId(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTypeSystemId(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFragmentProtoNew(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFragmentProtoProto(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function documentFragmentProtoQuerySelector(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);

	if (!(args[0].value instanceof DocumentFragment)) {
		throw types.createErrorNode(
			"querySelector expects a DocumentFragment as the first parameter.",
			types.ErrorTypes.TypeError,
			args[0],
		);
	}

	const value = DocumentFragment.prototype.querySelector.call(
		args[0].value,
		args[1].value,
	);

	return value ? types.createAtomNode(value) : types.createNilNode();
}

export function documentFragmentOwnerDocument(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentFragmentProtoGetElementById(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertStringNode(args[0]);
	types.assertAtomNode(args[1]);

	const element = DocumentFragment.prototype.getElementById.call(
		args[0].value,
		args[1].value,
	);

	return element ? types.createAtomNode(element) : types.createNilNode();
}

export function documentTypeProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function documentTypeProtoProto(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoProto(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function elementProtoQuerySelector(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);

	if (!(args[0].value instanceof Element)) {
		throw types.createErrorNode(
			"querySelector expects an Element as the first parameter.",
			types.ErrorTypes.TypeError,
			args[0],
		);
	}

	const value = Element.prototype.querySelector.call(
		args[0].value,
		args[1].value,
	);

	return value ? types.createAtomNode(value) : types.createNilNode();
}

export function elementAttributes(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClassList(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClassName(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClientHeight(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClientLeft(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClientTop(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementClientWidth(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementCurrentCSSZoom(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementId(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementInnerHTML(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementLocalName(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementNamespaceURI(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementOnfullscreenchange(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementOnfullscreenerror(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementOuterHTML(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementOwnerDocument(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementPart(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementPrefix(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementScrollHeight(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementScrollLeft(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementScrollTop(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementScrollWidth(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementShadowRoot(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementSlot(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementTagName(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoAttachShadow(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoCheckVisibility(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoClosest(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoComputedStyleMap(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);

	const value = Element.prototype.getAttribute.call(
		args[0].value,
		args[1].value,
	);

	return value ? types.createStringNode(value) : types.createNilNode();
}
export function elementProtoGetAttributeNames(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetAttributeNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function elementProtoGetAttributeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetBoundingClientRect(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetClientRects(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetElementsByClassName(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetElementsByTagName(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetElementsByTagNameNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoGetHTML(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoHasAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoHasAttributeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoHasAttributes(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoHasPointerCapture(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoInsertAdjacentElement(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoInsertAdjacentHTML(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoInsertAdjacentText(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoMatches(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoReleasePointerCapture(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoRemoveAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoRemoveAttributeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoRemoveAttributeNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoRequestFullscreen(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoRequestPointerLock(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoScroll(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoScrollBy(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoScrollIntoView(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoScrollTo(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoSetAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 3);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);
	types.assertStringNode(args[2]);

	Element.prototype.setAttribute.call(
		args[0].value,
		args[1].value,
		args[2].value,
	);

	return types.createNilNode();
}
export function elementProtoSetAttributeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoSetAttributeNode(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoSetAttributeNodeNS(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoSetHTMLUnsafe(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoSetPointerCapture(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoToggleAttribute(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoWebkitMatchesSelector(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function elementProtoAddEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 3);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);
	types.assertFunctionNode(args[2]);

	if (!(args[0].value instanceof Element)) {
		throw types.createErrorNode(
			"addEventListener expects an Element as the first parameter.",
			types.ErrorTypes.TypeError,
			args[0],
		);
	}

	Element.prototype.addEventListener.call(
		args[0].value,
		args[1].value,
		(event: Event) => {
			args[2].value(types.createAtomNode(event));
		},
	);

	return types.createNilNode();
}
export function elementProtoRemoveEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoProto(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoNONE(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoCAPTURINGPHASE(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoATTARGET(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoBUBBLINGPHASE(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventBubbles(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventCancelBubble(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventCancelable(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventComposed(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventCurrentTarget(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventDefaultPrevented(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventEventPhase(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventIsTrusted(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventReturnValue(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventSrcElement(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventTarget(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventTimeStamp(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventType(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventNONE(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventCAPTURINGPHASE(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventATTARGET(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventBUBBLINGPHASE(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoComposedPath(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoInitEvent(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoPreventDefault(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertAtomNode(args[0]);

	if (!(args[0].value instanceof Event)) {
		throw types.createErrorNode(
			"preventDefault expects an Event as the first parameter.",
			types.ErrorTypes.TypeError,
			args[0],
		);
	}

	Event.prototype.preventDefault.call(args[0].value);
	return types.createNilNode();
}
export function eventProtoStopImmediatePropagation(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventProtoStopPropagation(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventTargetProtoNew(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventTargetProtoProto(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}

export function addEventListener(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 3);

	if (args[0].value instanceof Document) {
		return documentProtoAddEventListener(args);
	}

	if (args[0].value instanceof EventTarget) {
		return eventTargetProtoAddEventListener(args);
	}

	if (args[0].value instanceof Element) {
		return elementProtoAddEventListener(args);
	}

	throw types.createErrorNode(
		"addEventListener expects an Document, Element, or EventTarget as the first parameter.",
		types.ErrorTypes.TypeError,
		args[0],
	);
}

export function eventTargetProtoAddEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 3);
	types.assertAtomNode(args[0]);
	types.assertStringNode(args[1]);
	types.assertFunctionNode(args[2]);

	if (!(args[0].value instanceof EventTarget)) {
		throw types.createErrorNode(
			"addEventListener expects an EventTarget as the first parameter.",
			types.ErrorTypes.TypeError,
			args[0],
		);
	}

	EventTarget.prototype.addEventListener.call(
		args[0].value,
		args[1].value,
		(event: Event) => {
			args[2].value(types.createAtomNode(event));
		},
	);

	return types.createNilNode();
}

export function eventTargetProtoDispatchEvent(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
export function eventTargetProtoRemoveEventListener(
	args: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return types.createNilNode();
}
