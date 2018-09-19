module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const routing = j(file.source);
  // Add Login in imported pages
  routing.find(j.ImportDeclaration, { source: { value: "./pages" } }).forEach(p => {
    const loginSpecifier = j.importSpecifier(j.identifier("Login"));
    p.value.specifiers.push(loginSpecifier);
  });
  /**
   * Creates <Route path="/login" component={Login} />
   * @returns {JSXOpeningElement}
   */
  function createJSXRoute() {
    return j.jsxOpeningElement(
      j.jsxIdentifier("Route"),
      [
        j.jsxAttribute(j.jsxIdentifier("path"), j.literal("/login")),
        j.jsxAttribute(j.jsxIdentifier("component"), j.jsxExpressionContainer(j.identifier("Login")))
      ],
      true
    );
  }
  // Add the Login Route element
  routing
    .findJSXElements("Route")
    .at(-1)
    .insertAfter(() => createJSXRoute())
    .insertAfter(() => j.jsxText("\n"));
  return routing.toSource();
};
