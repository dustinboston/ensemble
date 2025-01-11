/**
 * Converts DOM class definitions into a BuiltinCollection object.
 * @param inputText The input text containing the DOM class definitions.
 * @returns A BuiltinCollection object representing the parsed definitions.
 */
function mdnDefToBuiltin(inputText: string): string[] {
  const lines = inputText.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
  const collection: string[] = [];
  let className = '';
  let currentSection = '';
  const inheritance: string[] = [];

  const sections = [
    'Constructor',
    'Instance methods',
    'Instance properties',
    'Static methods',
    'Static properties',
    'Events',
    'Inheritance',
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i === 0) {
      // First line is the class name
      className = line;
      continue;
    }

    if (sections.includes(line)) {
      currentSection = line;
      continue;
    }

    if (line.endsWith('Non-standard') || line.endsWith('Deprecated') || line.endsWith('Experimental')) {
      continue;
    }

    if (currentSection === 'Constructor') {
      collection.push(`  ['${className}.new']: {
    type: 'Constructor',
    params: [],
    returns: '${className}',
    inherits: [${inheritance.join(', ')}],
  },`);
    } else if (currentSection === 'Instance methods' || currentSection === 'Static methods') {
      const isInstance = currentSection === 'Instance methods';
      const methodName = line.replace('()', '');
      collection.push(`  ['${isInstance ? `${className}.prototype.${methodName}` : `${className}.${methodName}`}']: {
    type: '${isInstance ? 'InstanceMethod' : 'StaticMethod'}',
    params: [],
    returns: any(),
    inherits: [${inheritance.join(', ')}],
  },`);      
    } else if (currentSection === 'Instance properties' || currentSection === 'Static properties') {
      const isInstance = currentSection === 'Instance properties';
      collection.push(`  ['${isInstance ? `${className}.prototype.${line}` : `${className}.${line}`}']: {
    type: '${isInstance ? 'InstanceProperty' : 'StaticProperty'}',
    params: [],
    returns: any(),
    inherits: [],
  },`);
    } else if (currentSection === 'Events') {
      const eventName = line.replace('()', '');
      collection.push(`  ['${className}.${eventName}']: {
    type: 'Event',
    params: [],
    returns: undef(),
    inherits: [${inheritance.join(', ')}],
  },`);
    } else if (currentSection === 'Inheritance') {
      inheritance.push(line);
    }
  }

  return [`const builtin${className} = {`, ...collection, '};'];
}

// Copy the left column of the MDN definition and paste it here
const inputDefinition = `
Document
Constructor
Document()
Instance properties
activeElement
adoptedStyleSheets
alinkColorDeprecated
allDeprecated
anchorsDeprecated
appletsDeprecated
bgColorDeprecated
body
characterSet
childElementCount
children
compatMode
contentType
cookie
currentScript
defaultView
designMode
dir
doctype
documentElement
documentURI
domainDeprecated
embeds
featurePolicyExperimental
fgColorDeprecated
firstElementChild
fonts
forms
fragmentDirective
fullscreenDeprecated
fullscreenElement
fullscreenEnabled
head
hidden
images
implementation
lastElementChild
lastModified
lastStyleSheetSetNon-standardDeprecated
linkColorDeprecated
links
location
pictureInPictureElement
pictureInPictureEnabled
plugins
pointerLockElement
preferredStyleSheetSetNon-standardDeprecated
prerenderingExperimental
readyState
referrer
rootElementDeprecated
scripts
scrollingElement
selectedStyleSheetSetNon-standardDeprecated
styleSheets
styleSheetSetsNon-standardDeprecated
timeline
title
URL
visibilityState
vlinkColorDeprecated
xmlEncodingDeprecated
xmlVersionDeprecated
Static methods
parseHTMLUnsafe()
Instance methods
adoptNode()
append()
browsingTopics()ExperimentalNon-standard
caretPositionFromPoint()
caretRangeFromPoint()Non-standard
clear()Deprecated
close()
createAttribute()
createAttributeNS()
createCDATASection()
createComment()
createDocumentFragment()
createElement()
createElementNS()
createEvent()
createExpression()
createNodeIterator()
createNSResolver()Deprecated
createProcessingInstruction()
createRange()
createTextNode()
createTouch()Non-standardDeprecated
createTouchList()Non-standardDeprecated
createTreeWalker()
elementFromPoint()
elementsFromPoint()
enableStyleSheetsForSet()Non-standardDeprecated
evaluate()
execCommand()Deprecated
exitFullscreen()
exitPictureInPicture()
exitPointerLock()
getAnimations()
getElementById()
getElementsByClassName()
getElementsByName()
getElementsByTagName()
getElementsByTagNameNS()
getSelection()
hasFocus()
hasStorageAccess()
hasUnpartitionedCookieAccess()
importNode()
mozSetImageElement()Non-standard
open()
prepend()
queryCommandEnabled()Non-standardDeprecated
queryCommandState()Non-standardDeprecated
queryCommandSupported()Non-standardDeprecated
querySelector()
querySelectorAll()
releaseCapture()Non-standard
replaceChildren()
requestStorageAccess()
requestStorageAccessFor()Experimental
startViewTransition()
write()
writeln()
Events
afterscriptexecuteNon-standard
beforescriptexecuteNon-standard
copy
cut
DOMContentLoaded
fullscreenchange
fullscreenerror
paste
pointerlockchange
pointerlockerror
prerenderingchangeExperimental
readystatechange
scroll
scrollend
scrollsnapchangeExperimental
scrollsnapchangingExperimental
securitypolicyviolation
selectionchange
visibilitychange
Inheritance
Node
EventTarget
`;

const builtinCollection = mdnDefToBuiltin(inputDefinition);

console.log(builtinCollection.join('\n'));
