["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/math/box.js"],"~:js","goog.provide(\"goog.math.Box\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.math.Coordinate\");\ngoog.math.Box = function(top, right, bottom, left) {\n  this.top = top;\n  this.right = right;\n  this.bottom = bottom;\n  this.left = left;\n};\ngoog.math.Box.boundingBox = function(var_args) {\n  var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\n  for (var i = 1; i < arguments.length; i++) {\n    box.expandToIncludeCoordinate(arguments[i]);\n  }\n  return box;\n};\ngoog.math.Box.prototype.getWidth = function() {\n  return this.right - this.left;\n};\ngoog.math.Box.prototype.getHeight = function() {\n  return this.bottom - this.top;\n};\ngoog.math.Box.prototype.clone = function() {\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\n};\nif (goog.DEBUG) {\n  goog.math.Box.prototype.toString = function() {\n    return \"(\" + this.top + \"t, \" + this.right + \"r, \" + this.bottom + \"b, \" + this.left + \"l)\";\n  };\n}\ngoog.math.Box.prototype.contains = function(other) {\n  return goog.math.Box.contains(this, other);\n};\ngoog.math.Box.prototype.expand = function(top, opt_right, opt_bottom, opt_left) {\n  if (goog.isObject(top)) {\n    this.top -= top.top;\n    this.right += top.right;\n    this.bottom += top.bottom;\n    this.left -= top.left;\n  } else {\n    this.top -= top;\n    this.right += Number(opt_right);\n    this.bottom += Number(opt_bottom);\n    this.left -= Number(opt_left);\n  }\n  return this;\n};\ngoog.math.Box.prototype.expandToInclude = function(box) {\n  this.left = Math.min(this.left, box.left);\n  this.top = Math.min(this.top, box.top);\n  this.right = Math.max(this.right, box.right);\n  this.bottom = Math.max(this.bottom, box.bottom);\n};\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\n  this.top = Math.min(this.top, coord.y);\n  this.right = Math.max(this.right, coord.x);\n  this.bottom = Math.max(this.bottom, coord.y);\n  this.left = Math.min(this.left, coord.x);\n};\ngoog.math.Box.equals = function(a, b) {\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left;\n};\ngoog.math.Box.contains = function(box, other) {\n  if (!box || !other) {\n    return false;\n  }\n  if (other instanceof goog.math.Box) {\n    return other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom;\n  }\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom;\n};\ngoog.math.Box.relativePositionX = function(box, coord) {\n  if (coord.x < box.left) {\n    return coord.x - box.left;\n  } else {\n    if (coord.x > box.right) {\n      return coord.x - box.right;\n    }\n  }\n  return 0;\n};\ngoog.math.Box.relativePositionY = function(box, coord) {\n  if (coord.y < box.top) {\n    return coord.y - box.top;\n  } else {\n    if (coord.y > box.bottom) {\n      return coord.y - box.bottom;\n    }\n  }\n  return 0;\n};\ngoog.math.Box.distance = function(box, coord) {\n  var x = goog.math.Box.relativePositionX(box, coord);\n  var y = goog.math.Box.relativePositionY(box, coord);\n  return Math.sqrt(x * x + y * y);\n};\ngoog.math.Box.intersects = function(a, b) {\n  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;\n};\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\n  return a.left <= b.right + padding && b.left <= a.right + padding && a.top <= b.bottom + padding && b.top <= a.bottom + padding;\n};\ngoog.math.Box.prototype.ceil = function() {\n  this.top = Math.ceil(this.top);\n  this.right = Math.ceil(this.right);\n  this.bottom = Math.ceil(this.bottom);\n  this.left = Math.ceil(this.left);\n  return this;\n};\ngoog.math.Box.prototype.floor = function() {\n  this.top = Math.floor(this.top);\n  this.right = Math.floor(this.right);\n  this.bottom = Math.floor(this.bottom);\n  this.left = Math.floor(this.left);\n  return this;\n};\ngoog.math.Box.prototype.round = function() {\n  this.top = Math.round(this.top);\n  this.right = Math.round(this.right);\n  this.bottom = Math.round(this.bottom);\n  this.left = Math.round(this.left);\n  return this;\n};\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.right += tx.x;\n    this.top += tx.y;\n    this.bottom += tx.y;\n  } else {\n    goog.asserts.assertNumber(tx);\n    this.left += tx;\n    this.right += tx;\n    if (typeof opt_ty === \"number\") {\n      this.top += opt_ty;\n      this.bottom += opt_ty;\n    }\n  }\n  return this;\n};\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\n  var sy = typeof opt_sy === \"number\" ? opt_sy : sx;\n  this.left *= sx;\n  this.right *= sx;\n  this.top *= sy;\n  this.bottom *= sy;\n  return this;\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview A utility class for representing a numeric box.\n */\n\n\ngoog.provide('goog.math.Box');\n\ngoog.require('goog.asserts');\ngoog.require('goog.math.Coordinate');\n\n\n\n/**\n * Class for representing a box. A box is specified as a top, right, bottom,\n * and left. A box is useful for representing margins and padding.\n *\n * This class assumes 'screen coordinates': larger Y coordinates are further\n * from the top of the screen.\n *\n * @param {number} top Top.\n * @param {number} right Right.\n * @param {number} bottom Bottom.\n * @param {number} left Left.\n * @struct\n * @constructor\n */\ngoog.math.Box = function(top, right, bottom, left) {\n  'use strict';\n  /**\n   * Top\n   * @type {number}\n   */\n  this.top = top;\n\n  /**\n   * Right\n   * @type {number}\n   */\n  this.right = right;\n\n  /**\n   * Bottom\n   * @type {number}\n   */\n  this.bottom = bottom;\n\n  /**\n   * Left\n   * @type {number}\n   */\n  this.left = left;\n};\n\n\n/**\n * Creates a Box by bounding a collection of goog.math.Coordinate objects\n * @param {...goog.math.Coordinate} var_args Coordinates to be included inside\n *     the box.\n * @return {!goog.math.Box} A Box containing all the specified Coordinates.\n */\ngoog.math.Box.boundingBox = function(var_args) {\n  'use strict';\n  var box = new goog.math.Box(\n      arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\n  for (var i = 1; i < arguments.length; i++) {\n    box.expandToIncludeCoordinate(arguments[i]);\n  }\n  return box;\n};\n\n\n/**\n * @return {number} width The width of this Box.\n */\ngoog.math.Box.prototype.getWidth = function() {\n  'use strict';\n  return this.right - this.left;\n};\n\n\n/**\n * @return {number} height The height of this Box.\n */\ngoog.math.Box.prototype.getHeight = function() {\n  'use strict';\n  return this.bottom - this.top;\n};\n\n\n/**\n * Creates a copy of the box with the same dimensions.\n * @return {!goog.math.Box} A clone of this Box.\n */\ngoog.math.Box.prototype.clone = function() {\n  'use strict';\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\n};\n\n\nif (goog.DEBUG) {\n  /**\n   * Returns a nice string representing the box.\n   * @return {string} In the form (50t, 73r, 24b, 13l).\n   * @override\n   */\n  goog.math.Box.prototype.toString = function() {\n    'use strict';\n    return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' +\n        this.left + 'l)';\n  };\n}\n\n\n/**\n * Returns whether the box contains a coordinate or another box.\n *\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\n * @return {boolean} Whether the box contains the coordinate or other box.\n */\ngoog.math.Box.prototype.contains = function(other) {\n  'use strict';\n  return goog.math.Box.contains(this, other);\n};\n\n\n/**\n * Expands box with the given margins.\n *\n * @param {number|goog.math.Box} top Top margin or box with all margins.\n * @param {number=} opt_right Right margin.\n * @param {number=} opt_bottom Bottom margin.\n * @param {number=} opt_left Left margin.\n * @return {!goog.math.Box} A reference to this Box.\n */\ngoog.math.Box.prototype.expand = function(\n    top, opt_right, opt_bottom, opt_left) {\n  'use strict';\n  if (goog.isObject(top)) {\n    this.top -= top.top;\n    this.right += top.right;\n    this.bottom += top.bottom;\n    this.left -= top.left;\n  } else {\n    this.top -= /** @type {number} */ (top);\n    this.right += Number(opt_right);\n    this.bottom += Number(opt_bottom);\n    this.left -= Number(opt_left);\n  }\n\n  return this;\n};\n\n\n/**\n * Expand this box to include another box.\n * NOTE(user): This is used in code that needs to be very fast, please don't\n * add functionality to this function at the expense of speed (variable\n * arguments, accepting multiple argument types, etc).\n * @param {goog.math.Box} box The box to include in this one.\n */\ngoog.math.Box.prototype.expandToInclude = function(box) {\n  'use strict';\n  this.left = Math.min(this.left, box.left);\n  this.top = Math.min(this.top, box.top);\n  this.right = Math.max(this.right, box.right);\n  this.bottom = Math.max(this.bottom, box.bottom);\n};\n\n\n/**\n * Expand this box to include the coordinate.\n * @param {!goog.math.Coordinate} coord The coordinate to be included\n *     inside the box.\n */\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\n  'use strict';\n  this.top = Math.min(this.top, coord.y);\n  this.right = Math.max(this.right, coord.x);\n  this.bottom = Math.max(this.bottom, coord.y);\n  this.left = Math.min(this.left, coord.x);\n};\n\n\n/**\n * Compares boxes for equality.\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A Box.\n * @return {boolean} True iff the boxes are equal, or if both are null.\n */\ngoog.math.Box.equals = function(a, b) {\n  'use strict';\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom &&\n      a.left == b.left;\n};\n\n\n/**\n * Returns whether a box contains a coordinate or another box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\n * @return {boolean} Whether the box contains the coordinate or other box.\n */\ngoog.math.Box.contains = function(box, other) {\n  'use strict';\n  if (!box || !other) {\n    return false;\n  }\n\n  if (other instanceof goog.math.Box) {\n    return other.left >= box.left && other.right <= box.right &&\n        other.top >= box.top && other.bottom <= box.bottom;\n  }\n\n  // other is a Coordinate.\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top &&\n      other.y <= box.bottom;\n};\n\n\n/**\n * Returns the relative x position of a coordinate compared to a box.  Returns\n * zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The x position of `coord` relative to the nearest\n *     side of `box`, or zero if `coord` is inside `box`.\n */\ngoog.math.Box.relativePositionX = function(box, coord) {\n  'use strict';\n  if (coord.x < box.left) {\n    return coord.x - box.left;\n  } else if (coord.x > box.right) {\n    return coord.x - box.right;\n  }\n  return 0;\n};\n\n\n/**\n * Returns the relative y position of a coordinate compared to a box.  Returns\n * zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The y position of `coord` relative to the nearest\n *     side of `box`, or zero if `coord` is inside `box`.\n */\ngoog.math.Box.relativePositionY = function(box, coord) {\n  'use strict';\n  if (coord.y < box.top) {\n    return coord.y - box.top;\n  } else if (coord.y > box.bottom) {\n    return coord.y - box.bottom;\n  }\n  return 0;\n};\n\n\n/**\n * Returns the distance between a coordinate and the nearest corner/side of a\n * box. Returns zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The distance between `coord` and the nearest\n *     corner/side of `box`, or zero if `coord` is inside\n *     `box`.\n */\ngoog.math.Box.distance = function(box, coord) {\n  'use strict';\n  var x = goog.math.Box.relativePositionX(box, coord);\n  var y = goog.math.Box.relativePositionY(box, coord);\n  return Math.sqrt(x * x + y * y);\n};\n\n\n/**\n * Returns whether two boxes intersect.\n *\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A second Box.\n * @return {boolean} Whether the boxes intersect.\n */\ngoog.math.Box.intersects = function(a, b) {\n  'use strict';\n  return (\n      a.left <= b.right && b.left <= a.right && a.top <= b.bottom &&\n      b.top <= a.bottom);\n};\n\n\n/**\n * Returns whether two boxes would intersect with additional padding.\n *\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A second Box.\n * @param {number} padding The additional padding.\n * @return {boolean} Whether the boxes intersect.\n */\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\n  'use strict';\n  return (\n      a.left <= b.right + padding && b.left <= a.right + padding &&\n      a.top <= b.bottom + padding && b.top <= a.bottom + padding);\n};\n\n\n/**\n * Rounds the fields to the next larger integer values.\n *\n * @return {!goog.math.Box} This box with ceil'd fields.\n */\ngoog.math.Box.prototype.ceil = function() {\n  'use strict';\n  this.top = Math.ceil(this.top);\n  this.right = Math.ceil(this.right);\n  this.bottom = Math.ceil(this.bottom);\n  this.left = Math.ceil(this.left);\n  return this;\n};\n\n\n/**\n * Rounds the fields to the next smaller integer values.\n *\n * @return {!goog.math.Box} This box with floored fields.\n */\ngoog.math.Box.prototype.floor = function() {\n  'use strict';\n  this.top = Math.floor(this.top);\n  this.right = Math.floor(this.right);\n  this.bottom = Math.floor(this.bottom);\n  this.left = Math.floor(this.left);\n  return this;\n};\n\n\n/**\n * Rounds the fields to nearest integer values.\n *\n * @return {!goog.math.Box} This box with rounded fields.\n */\ngoog.math.Box.prototype.round = function() {\n  'use strict';\n  this.top = Math.round(this.top);\n  this.right = Math.round(this.right);\n  this.bottom = Math.round(this.bottom);\n  this.left = Math.round(this.left);\n  return this;\n};\n\n\n/**\n * Translates this box by the given offsets. If a `goog.math.Coordinate`\n * is given, then the left and right values are translated by the coordinate's\n * x value and the top and bottom values are translated by the coordinate's y\n * value.  Otherwise, `tx` and `opt_ty` are used to translate the x\n * and y dimension values.\n *\n * @param {number|goog.math.Coordinate} tx The value to translate the x\n *     dimension values by or the coordinate to translate this box by.\n * @param {number=} opt_ty The value to translate y dimension values by.\n * @return {!goog.math.Box} This box after translating.\n */\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\n  'use strict';\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.right += tx.x;\n    this.top += tx.y;\n    this.bottom += tx.y;\n  } else {\n    goog.asserts.assertNumber(tx);\n    this.left += tx;\n    this.right += tx;\n    if (typeof opt_ty === 'number') {\n      this.top += opt_ty;\n      this.bottom += opt_ty;\n    }\n  }\n  return this;\n};\n\n\n/**\n * Scales this coordinate by the given scale factors. The x and y dimension\n * values are scaled by `sx` and `opt_sy` respectively.\n * If `opt_sy` is not given, then `sx` is used for both x and y.\n *\n * @param {number} sx The scale factor to use for the x dimension.\n * @param {number=} opt_sy The scale factor to use for the y dimension.\n * @return {!goog.math.Box} This box after scaling.\n */\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\n  'use strict';\n  var sy = (typeof opt_sy === 'number') ? opt_sy : sx;\n  this.left *= sx;\n  this.right *= sx;\n  this.top *= sy;\n  this.bottom *= sy;\n  return this;\n};\n","~:compiled-at",1624381933852,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.math.box.js\",\n\"lineCount\":155,\n\"mappings\":\"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\",\n\"sources\":[\"goog/math/box.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview A utility class for representing a numeric box.\\n */\\n\\n\\ngoog.provide('goog.math.Box');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.math.Coordinate');\\n\\n\\n\\n/**\\n * Class for representing a box. A box is specified as a top, right, bottom,\\n * and left. A box is useful for representing margins and padding.\\n *\\n * This class assumes 'screen coordinates': larger Y coordinates are further\\n * from the top of the screen.\\n *\\n * @param {number} top Top.\\n * @param {number} right Right.\\n * @param {number} bottom Bottom.\\n * @param {number} left Left.\\n * @struct\\n * @constructor\\n */\\ngoog.math.Box = function(top, right, bottom, left) {\\n  'use strict';\\n  /**\\n   * Top\\n   * @type {number}\\n   */\\n  this.top = top;\\n\\n  /**\\n   * Right\\n   * @type {number}\\n   */\\n  this.right = right;\\n\\n  /**\\n   * Bottom\\n   * @type {number}\\n   */\\n  this.bottom = bottom;\\n\\n  /**\\n   * Left\\n   * @type {number}\\n   */\\n  this.left = left;\\n};\\n\\n\\n/**\\n * Creates a Box by bounding a collection of goog.math.Coordinate objects\\n * @param {...goog.math.Coordinate} var_args Coordinates to be included inside\\n *     the box.\\n * @return {!goog.math.Box} A Box containing all the specified Coordinates.\\n */\\ngoog.math.Box.boundingBox = function(var_args) {\\n  'use strict';\\n  var box = new goog.math.Box(\\n      arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\\n  for (var i = 1; i < arguments.length; i++) {\\n    box.expandToIncludeCoordinate(arguments[i]);\\n  }\\n  return box;\\n};\\n\\n\\n/**\\n * @return {number} width The width of this Box.\\n */\\ngoog.math.Box.prototype.getWidth = function() {\\n  'use strict';\\n  return this.right - this.left;\\n};\\n\\n\\n/**\\n * @return {number} height The height of this Box.\\n */\\ngoog.math.Box.prototype.getHeight = function() {\\n  'use strict';\\n  return this.bottom - this.top;\\n};\\n\\n\\n/**\\n * Creates a copy of the box with the same dimensions.\\n * @return {!goog.math.Box} A clone of this Box.\\n */\\ngoog.math.Box.prototype.clone = function() {\\n  'use strict';\\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\\n};\\n\\n\\nif (goog.DEBUG) {\\n  /**\\n   * Returns a nice string representing the box.\\n   * @return {string} In the form (50t, 73r, 24b, 13l).\\n   * @override\\n   */\\n  goog.math.Box.prototype.toString = function() {\\n    'use strict';\\n    return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' +\\n        this.left + 'l)';\\n  };\\n}\\n\\n\\n/**\\n * Returns whether the box contains a coordinate or another box.\\n *\\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\\n * @return {boolean} Whether the box contains the coordinate or other box.\\n */\\ngoog.math.Box.prototype.contains = function(other) {\\n  'use strict';\\n  return goog.math.Box.contains(this, other);\\n};\\n\\n\\n/**\\n * Expands box with the given margins.\\n *\\n * @param {number|goog.math.Box} top Top margin or box with all margins.\\n * @param {number=} opt_right Right margin.\\n * @param {number=} opt_bottom Bottom margin.\\n * @param {number=} opt_left Left margin.\\n * @return {!goog.math.Box} A reference to this Box.\\n */\\ngoog.math.Box.prototype.expand = function(\\n    top, opt_right, opt_bottom, opt_left) {\\n  'use strict';\\n  if (goog.isObject(top)) {\\n    this.top -= top.top;\\n    this.right += top.right;\\n    this.bottom += top.bottom;\\n    this.left -= top.left;\\n  } else {\\n    this.top -= /** @type {number} */ (top);\\n    this.right += Number(opt_right);\\n    this.bottom += Number(opt_bottom);\\n    this.left -= Number(opt_left);\\n  }\\n\\n  return this;\\n};\\n\\n\\n/**\\n * Expand this box to include another box.\\n * NOTE(user): This is used in code that needs to be very fast, please don't\\n * add functionality to this function at the expense of speed (variable\\n * arguments, accepting multiple argument types, etc).\\n * @param {goog.math.Box} box The box to include in this one.\\n */\\ngoog.math.Box.prototype.expandToInclude = function(box) {\\n  'use strict';\\n  this.left = Math.min(this.left, box.left);\\n  this.top = Math.min(this.top, box.top);\\n  this.right = Math.max(this.right, box.right);\\n  this.bottom = Math.max(this.bottom, box.bottom);\\n};\\n\\n\\n/**\\n * Expand this box to include the coordinate.\\n * @param {!goog.math.Coordinate} coord The coordinate to be included\\n *     inside the box.\\n */\\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\\n  'use strict';\\n  this.top = Math.min(this.top, coord.y);\\n  this.right = Math.max(this.right, coord.x);\\n  this.bottom = Math.max(this.bottom, coord.y);\\n  this.left = Math.min(this.left, coord.x);\\n};\\n\\n\\n/**\\n * Compares boxes for equality.\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A Box.\\n * @return {boolean} True iff the boxes are equal, or if both are null.\\n */\\ngoog.math.Box.equals = function(a, b) {\\n  'use strict';\\n  if (a == b) {\\n    return true;\\n  }\\n  if (!a || !b) {\\n    return false;\\n  }\\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom &&\\n      a.left == b.left;\\n};\\n\\n\\n/**\\n * Returns whether a box contains a coordinate or another box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\\n * @return {boolean} Whether the box contains the coordinate or other box.\\n */\\ngoog.math.Box.contains = function(box, other) {\\n  'use strict';\\n  if (!box || !other) {\\n    return false;\\n  }\\n\\n  if (other instanceof goog.math.Box) {\\n    return other.left >= box.left && other.right <= box.right &&\\n        other.top >= box.top && other.bottom <= box.bottom;\\n  }\\n\\n  // other is a Coordinate.\\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top &&\\n      other.y <= box.bottom;\\n};\\n\\n\\n/**\\n * Returns the relative x position of a coordinate compared to a box.  Returns\\n * zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The x position of `coord` relative to the nearest\\n *     side of `box`, or zero if `coord` is inside `box`.\\n */\\ngoog.math.Box.relativePositionX = function(box, coord) {\\n  'use strict';\\n  if (coord.x < box.left) {\\n    return coord.x - box.left;\\n  } else if (coord.x > box.right) {\\n    return coord.x - box.right;\\n  }\\n  return 0;\\n};\\n\\n\\n/**\\n * Returns the relative y position of a coordinate compared to a box.  Returns\\n * zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The y position of `coord` relative to the nearest\\n *     side of `box`, or zero if `coord` is inside `box`.\\n */\\ngoog.math.Box.relativePositionY = function(box, coord) {\\n  'use strict';\\n  if (coord.y < box.top) {\\n    return coord.y - box.top;\\n  } else if (coord.y > box.bottom) {\\n    return coord.y - box.bottom;\\n  }\\n  return 0;\\n};\\n\\n\\n/**\\n * Returns the distance between a coordinate and the nearest corner/side of a\\n * box. Returns zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The distance between `coord` and the nearest\\n *     corner/side of `box`, or zero if `coord` is inside\\n *     `box`.\\n */\\ngoog.math.Box.distance = function(box, coord) {\\n  'use strict';\\n  var x = goog.math.Box.relativePositionX(box, coord);\\n  var y = goog.math.Box.relativePositionY(box, coord);\\n  return Math.sqrt(x * x + y * y);\\n};\\n\\n\\n/**\\n * Returns whether two boxes intersect.\\n *\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A second Box.\\n * @return {boolean} Whether the boxes intersect.\\n */\\ngoog.math.Box.intersects = function(a, b) {\\n  'use strict';\\n  return (\\n      a.left <= b.right && b.left <= a.right && a.top <= b.bottom &&\\n      b.top <= a.bottom);\\n};\\n\\n\\n/**\\n * Returns whether two boxes would intersect with additional padding.\\n *\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A second Box.\\n * @param {number} padding The additional padding.\\n * @return {boolean} Whether the boxes intersect.\\n */\\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\\n  'use strict';\\n  return (\\n      a.left <= b.right + padding && b.left <= a.right + padding &&\\n      a.top <= b.bottom + padding && b.top <= a.bottom + padding);\\n};\\n\\n\\n/**\\n * Rounds the fields to the next larger integer values.\\n *\\n * @return {!goog.math.Box} This box with ceil'd fields.\\n */\\ngoog.math.Box.prototype.ceil = function() {\\n  'use strict';\\n  this.top = Math.ceil(this.top);\\n  this.right = Math.ceil(this.right);\\n  this.bottom = Math.ceil(this.bottom);\\n  this.left = Math.ceil(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Rounds the fields to the next smaller integer values.\\n *\\n * @return {!goog.math.Box} This box with floored fields.\\n */\\ngoog.math.Box.prototype.floor = function() {\\n  'use strict';\\n  this.top = Math.floor(this.top);\\n  this.right = Math.floor(this.right);\\n  this.bottom = Math.floor(this.bottom);\\n  this.left = Math.floor(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Rounds the fields to nearest integer values.\\n *\\n * @return {!goog.math.Box} This box with rounded fields.\\n */\\ngoog.math.Box.prototype.round = function() {\\n  'use strict';\\n  this.top = Math.round(this.top);\\n  this.right = Math.round(this.right);\\n  this.bottom = Math.round(this.bottom);\\n  this.left = Math.round(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Translates this box by the given offsets. If a `goog.math.Coordinate`\\n * is given, then the left and right values are translated by the coordinate's\\n * x value and the top and bottom values are translated by the coordinate's y\\n * value.  Otherwise, `tx` and `opt_ty` are used to translate the x\\n * and y dimension values.\\n *\\n * @param {number|goog.math.Coordinate} tx The value to translate the x\\n *     dimension values by or the coordinate to translate this box by.\\n * @param {number=} opt_ty The value to translate y dimension values by.\\n * @return {!goog.math.Box} This box after translating.\\n */\\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\\n  'use strict';\\n  if (tx instanceof goog.math.Coordinate) {\\n    this.left += tx.x;\\n    this.right += tx.x;\\n    this.top += tx.y;\\n    this.bottom += tx.y;\\n  } else {\\n    goog.asserts.assertNumber(tx);\\n    this.left += tx;\\n    this.right += tx;\\n    if (typeof opt_ty === 'number') {\\n      this.top += opt_ty;\\n      this.bottom += opt_ty;\\n    }\\n  }\\n  return this;\\n};\\n\\n\\n/**\\n * Scales this coordinate by the given scale factors. The x and y dimension\\n * values are scaled by `sx` and `opt_sy` respectively.\\n * If `opt_sy` is not given, then `sx` is used for both x and y.\\n *\\n * @param {number} sx The scale factor to use for the x dimension.\\n * @param {number=} opt_sy The scale factor to use for the y dimension.\\n * @return {!goog.math.Box} This box after scaling.\\n */\\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\\n  'use strict';\\n  var sy = (typeof opt_sy === 'number') ? opt_sy : sx;\\n  this.left *= sx;\\n  this.right *= sx;\\n  this.top *= sy;\\n  this.bottom *= sy;\\n  return this;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"math\",\"Box\",\"goog.math.Box\",\"top\",\"right\",\"bottom\",\"left\",\"boundingBox\",\"goog.math.Box.boundingBox\",\"var_args\",\"box\",\"arguments\",\"y\",\"x\",\"i\",\"length\",\"expandToIncludeCoordinate\",\"prototype\",\"getWidth\",\"goog.math.Box.prototype.getWidth\",\"getHeight\",\"goog.math.Box.prototype.getHeight\",\"clone\",\"goog.math.Box.prototype.clone\",\"DEBUG\",\"toString\",\"goog.math.Box.prototype.toString\",\"contains\",\"goog.math.Box.prototype.contains\",\"other\",\"expand\",\"goog.math.Box.prototype.expand\",\"opt_right\",\"opt_bottom\",\"opt_left\",\"isObject\",\"Number\",\"expandToInclude\",\"goog.math.Box.prototype.expandToInclude\",\"Math\",\"min\",\"max\",\"goog.math.Box.prototype.expandToIncludeCoordinate\",\"coord\",\"equals\",\"goog.math.Box.equals\",\"a\",\"b\",\"goog.math.Box.contains\",\"relativePositionX\",\"goog.math.Box.relativePositionX\",\"relativePositionY\",\"goog.math.Box.relativePositionY\",\"distance\",\"goog.math.Box.distance\",\"sqrt\",\"intersects\",\"goog.math.Box.intersects\",\"intersectsWithPadding\",\"goog.math.Box.intersectsWithPadding\",\"padding\",\"ceil\",\"goog.math.Box.prototype.ceil\",\"floor\",\"goog.math.Box.prototype.floor\",\"round\",\"goog.math.Box.prototype.round\",\"translate\",\"goog.math.Box.prototype.translate\",\"tx\",\"opt_ty\",\"Coordinate\",\"asserts\",\"assertNumber\",\"scale\",\"goog.math.Box.prototype.scale\",\"sx\",\"opt_sy\",\"sy\"]\n}\n"]