module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const routing = j(file.source);

  // Add Avatar in imported pages
  routing
    .find(j.ImportDeclaration, { source: { value: './pages' }})
    .forEach(p => {
    	const avatarSpecifier = j.importSpecifier(j.identifier("Avatar"));
    	p.value.specifiers.push(avatarSpecifier)
  	});

  /**
   * Creates <Route path="/avatar" component={Avatar} />
   * @returns {JSXOpeningElement}
   */
  function createJSXRoute() {
    return j.jsxOpeningElement(
      j.jsxIdentifier('Route'),
      [
        j.jsxAttribute(j.jsxIdentifier('path'), j.literal('/avatar')),
        j.jsxAttribute(j.jsxIdentifier('component'), j.jsxExpressionContainer(j.identifier('Avatar'))),
      ],
      true
    );
  }

// Add the Avatar Route element
  routing.findJSXElements('Route')
    .insertAfter(() => createJSXRoute())
    .insertAfter(() => j.jsxText("\n"));

  return routing.toSource();
};