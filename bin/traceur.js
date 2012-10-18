
var $__1 = function(value) { 
  if(value == null) throw TypeError(); 
  return Object(value); 
}, $__2 = function(items) { 
  var retval =[]; 
  var k = 0; 
  for(var i = 0; i < items.length; i += 2) { 
    var value = items[i + 1]; 
    if(items[i]) { 
      value = $__1(value); 
      for(var j = 0; j < value.length; j ++) { 
        retval[k ++]= value[j]; 
      } 
    } else { 
      retval[k ++]= value; 
    } 
  } 
  return retval; 
}; 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    module.exports = factory(); 
  } else if(typeof define === 'function' && define.amd) { 
    define([], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    sourceMapModule['array-set']= factory(); 
  } 
}(this, function() { 
  function ArraySet() { 
    this._array =[]; 
    this._set = { }; 
  } 
  ArraySet.fromArray = function ArraySet_fromArray(aArray) { 
    var set = new ArraySet(); 
    for(var i = 0, len = aArray.length; i < len; i ++) { 
      set.add(aArray[i]); 
    } 
    return set; 
  }; 
  ArraySet.prototype.add = function ArraySet_add(aStr) { 
    if(this.has(aStr)) { 
      return; 
    } 
    var idx = this._array.length; 
    this._array.push(aStr); 
    this._set[aStr]= idx; 
  }; 
  ArraySet.prototype.has = function ArraySet_has(aStr) { 
    return Object.prototype.hasOwnProperty.call(this._set, aStr); 
  }; 
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) { 
    if(this.has(aStr)) { 
      return this._set[aStr]; 
    } 
    throw new Error('"' + aStr + '" is not in the set.'); 
  }; 
  ArraySet.prototype.at = function ArraySet_at(aIdx) { 
    if(aIdx >= 0 && aIdx < this._array.length) { 
      return this._array[aIdx]; 
    } 
    throw new Error('No element indexed by ' + aIdx); 
  }; 
  ArraySet.prototype.toArray = function ArraySet_toArray() { 
    return this._array.slice(); 
  }; 
  return ArraySet; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    module.exports = factory(); 
  } else if(typeof define === 'function' && define.amd) { 
    define([], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    sourceMapModule.base64 = factory(); 
  } 
}(this, function() { 
  var exports = { }; 
  var charToIntMap = { }; 
  var intToCharMap = { }; 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').forEach(function(ch, index) { 
    charToIntMap[ch]= index; 
    intToCharMap[index]= ch; 
  }); 
  exports.encode = function base64_encode(aNumber) { 
    if(aNumber in intToCharMap) { 
      return intToCharMap[aNumber]; 
    } 
    throw new TypeError("Must be between 0 and 63: " + aNumber); 
  }; 
  exports.decode = function base64_decode(aChar) { 
    if(aChar in charToIntMap) { 
      return charToIntMap[aChar]; 
    } 
    throw new TypeError("Not a valid base 64 digit: " + aChar); 
  }; 
  return exports; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    var base64 = require('./base64'); 
    module.exports = factory(base64); 
  } else if(typeof define === 'function' && define.amd) { 
    define(['source-map/base64'], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    sourceMapModule['base64-vlq']= factory(sourceMapModule.base64); 
  } 
}(this, function(base64) { 
  var exports = { }; 
  var VLQ_BASE_SHIFT = 5; 
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT; 
  var VLQ_BASE_MASK = VLQ_BASE - 1; 
  var VLQ_CONTINUATION_BIT = VLQ_BASE; 
  function toVLQSigned(aValue) { 
    return aValue < 0 ?((- aValue) << 1) + 1:(aValue << 1) + 0; 
  } 
  function fromVLQSigned(aValue) { 
    var isNegative =(aValue & 1) === 1; 
    var shifted = aValue >> 1; 
    return isNegative ? - shifted: shifted; 
  } 
  exports.encode = function base64VLQ_encode(aValue) { 
    var encoded = ""; 
    var digit; 
    var vlq = toVLQSigned(aValue); 
    do { 
      digit = vlq & VLQ_BASE_MASK; 
      vlq >>>= VLQ_BASE_SHIFT; 
      if(vlq > 0) { 
        digit |= VLQ_CONTINUATION_BIT; 
      } 
      encoded += base64.encode(digit); 
    } while(vlq > 0); 
    return encoded; 
  }; 
  exports.decode = function base64VLQ_decode(aStr) { 
    var i = 0; 
    var strLen = aStr.length; 
    var result = 0; 
    var shift = 0; 
    var continuation, digit; 
    do { 
      if(i >= strLen) { 
        throw new Error("Expected more digits in base 64 VLQ value."); 
      } 
      digit = base64.decode(aStr.charAt(i ++)); 
      continuation = ! !(digit & VLQ_CONTINUATION_BIT); 
      digit &= VLQ_BASE_MASK; 
      result = result +(digit << shift); 
      shift += VLQ_BASE_SHIFT; 
    } while(continuation); 
    return { 
      value: fromVLQSigned(result), 
      rest: aStr.slice(i) 
    }; 
  }; 
  return exports; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    module.exports = factory(); 
  } else if(typeof define === 'function' && define.amd) { 
    define([], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    sourceMapModule['binary-search']= factory(); 
  } 
}(this, function() { 
  var exports = { }; 
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) { 
    var mid = Math.floor((aHigh - aLow) / 2) + aLow; 
    var cmp = aCompare(aNeedle, aHaystack[mid]); 
    if(cmp === 0) { 
      return aHaystack[mid]; 
    } else if(cmp > 0) { 
      if(aHigh - mid > 1) { 
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare); 
      } 
      return aHaystack[mid]; 
    } else { 
      if(mid - aLow > 1) { 
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare); 
      } 
      return aLow < 0 ? null: aHaystack[aLow]; 
    } 
  } 
  exports.search = function search(aNeedle, aHaystack, aCompare) { 
    return aHaystack.length > 0 ? recursiveSearch(- 1, aHaystack.length, aNeedle, aHaystack, aCompare): null; 
  }; 
  return exports; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    module.exports = factory(); 
  } else if(typeof define === 'function' && define.amd) { 
    define([], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    sourceMapModule['util']= factory(); 
  } 
}(this, function() { 
  var exports = { }; 
  function getArg(aArgs, aName, aDefaultValue) { 
    if(aName in aArgs) { 
      return aArgs[aName]; 
    } else if(arguments.length === 3) { 
      return aDefaultValue; 
    } else { 
      throw new Error('"' + aName + '" is a required argument.'); 
    } 
  } 
  exports.getArg = getArg; 
  function join(aRoot, aPath) { 
    return aPath.charAt(0) === '/' ? aPath: aRoot.replace(/\/*$/, '') + '/' + aPath; 
  } 
  exports.join = join; 
  return exports; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    var base64VLQ = require('./base64-vlq'); 
    var util = require('./util'); 
    var ArraySet = require('./array-set').ArraySet; 
    module.exports = factory(base64VLQ, util, ArraySet); 
  } else if(typeof define === 'function' && define.amd) { 
    define(['source-map/base64-vlq', 'source-map/util', 'source-map/array-set'], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    var base64VLQ = sourceMapModule['base64-vlq']; 
    var util = sourceMapModule['util']; 
    var ArraySet = sourceMapModule['array-set']; 
    sourceMapModule['source-map-generator']= factory(base64VLQ, util, ArraySet); 
  } 
}(this, function(base64VLQ, util, ArraySet) { 
  function SourceMapGenerator(aArgs) { 
    this._file = util.getArg(aArgs, 'file'); 
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null); 
    this._sources = new ArraySet(); 
    this._names = new ArraySet(); 
    this._mappings =[]; 
  } 
  SourceMapGenerator.prototype._version = 3; 
  SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) { 
    var generated = util.getArg(aArgs, 'generated'); 
    var original = util.getArg(aArgs, 'original', null); 
    var source = util.getArg(aArgs, 'source', null); 
    var name = util.getArg(aArgs, 'name', null); 
    this._validateMapping(generated, original, source, name); 
    if(source && ! this._sources.has(source)) { 
      this._sources.add(source); 
    } 
    if(name && ! this._names.has(name)) { 
      this._names.add(name); 
    } 
    this._mappings.push({ 
      generated: generated, 
      original: original, 
      source: source, 
      name: name 
    }); 
  }; 
  SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) { 
    if(aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && ! aOriginal && ! aSource && ! aName) { 
      return; 
    } else if(aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) { 
      return; 
    } else { 
      throw new Error('Invalid mapping.'); 
    } 
  }; 
  SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() { 
    var previousGeneratedColumn = 0; 
    var previousGeneratedLine = 1; 
    var previousOriginalColumn = 0; 
    var previousOriginalLine = 0; 
    var previousName = 0; 
    var previousSource = 0; 
    var result = ''; 
    var mapping; 
    this._mappings.sort(function(mappingA, mappingB) { 
      var cmp = mappingA.generated.line - mappingB.generated.line; 
      return cmp === 0 ? mappingA.generated.column - mappingB.generated.column: cmp; 
    }); 
    for(var i = 0, len = this._mappings.length; i < len; i ++) { 
      mapping = this._mappings[i]; 
      if(mapping.generated.line !== previousGeneratedLine) { 
        previousGeneratedColumn = 0; 
        while(mapping.generated.line !== previousGeneratedLine) { 
          result += ';'; 
          previousGeneratedLine ++; 
        } 
      } else { 
        if(i > 0) { 
          result += ','; 
        } 
      } 
      result += base64VLQ.encode(mapping.generated.column - previousGeneratedColumn); 
      previousGeneratedColumn = mapping.generated.column; 
      if(mapping.source && mapping.original) { 
        result += base64VLQ.encode(this._sources.indexOf(mapping.source) - previousSource); 
        previousSource = this._sources.indexOf(mapping.source); 
        result += base64VLQ.encode(mapping.original.line - 1 - previousOriginalLine); 
        previousOriginalLine = mapping.original.line - 1; 
        result += base64VLQ.encode(mapping.original.column - previousOriginalColumn); 
        previousOriginalColumn = mapping.original.column; 
        if(mapping.name) { 
          result += base64VLQ.encode(this._names.indexOf(mapping.name) - previousName); 
          previousName = this._names.indexOf(mapping.name); 
        } 
      } 
    } 
    return result; 
  }; 
  SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() { 
    var map = { 
      version: this._version, 
      file: this._file, 
      sources: this._sources.toArray(), 
      names: this._names.toArray(), 
      mappings: this._serializeMappings() 
    }; 
    if(this._sourceRoot) { 
      map.sourceRoot = this._sourceRoot; 
    } 
    return JSON.stringify(map); 
  }; 
  return SourceMapGenerator; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    var util = require('./util'); 
    var binarySearch = require('./binary-search'); 
    var ArraySet = require('./array-set').ArraySet; 
    var base64VLQ = require('./base64-vlq'); 
    module.exports = factory(util, binarySearch, ArraySet, base64VLQ); 
  } else if(typeof define === 'function' && define.amd) { 
    define(['source-map/util', 'source-map/binary-search', 'source-map/array-set', 'source-map/base64-vlq'], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    var util = sourceMapModule['util']; 
    var binarySearch = sourceMapModule['binary-search']; 
    var ArraySet = sourceMapModule['array-set']; 
    var base64VLQ = sourceMapModule['base64-vlq']; 
    sourceMapModule['source-map-consumer']= factory(util, binarySearch, ArraySet, base64VLQ); 
  } 
}(this, function(util, binarySearch, ArraySet, base64VLQ) { 
  function SourceMapConsumer(aSourceMap) { 
    var sourceMap = aSourceMap; 
    if(typeof aSourceMap === 'string') { 
      sourceMap = JSON.parse(aSourceMap); 
    } 
    var version = util.getArg(sourceMap, 'version'); 
    var sources = util.getArg(sourceMap, 'sources'); 
    var names = util.getArg(sourceMap, 'names'); 
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null); 
    var mappings = util.getArg(sourceMap, 'mappings'); 
    var file = util.getArg(sourceMap, 'file'); 
    if(version !== this._version) { 
      throw new Error('Unsupported version: ' + version); 
    } 
    this._names = ArraySet.fromArray(names); 
    this._sources = ArraySet.fromArray(sources); 
    this._generatedMappings =[]; 
    this._parseMappings(mappings, sourceRoot); 
  } 
  SourceMapConsumer.prototype._version = 3; 
  SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) { 
    var generatedLine = 1; 
    var previousGeneratedColumn = 0; 
    var previousOriginalLine = 0; 
    var previousOriginalColumn = 0; 
    var previousSource = 0; 
    var previousName = 0; 
    var mappingSeparator = /^[,;]/; 
    var str = aStr; 
    var mapping; 
    var temp; 
    while(str.length > 0) { 
      if(str.charAt(0) === ';') { 
        generatedLine ++; 
        str = str.slice(1); 
        previousGeneratedColumn = 0; 
      } else if(str.charAt(0) === ',') { 
        str = str.slice(1); 
      } else { 
        mapping = { }; 
        mapping.generatedLine = generatedLine; 
        temp = base64VLQ.decode(str); 
        mapping.generatedColumn = previousGeneratedColumn + temp.value; 
        previousGeneratedColumn = mapping.generatedColumn; 
        str = temp.rest; 
        if(str.length > 0 && ! mappingSeparator.test(str.charAt(0))) { 
          temp = base64VLQ.decode(str); 
          if(aSourceRoot) { 
            mapping.source = util.join(aSourceRoot, this._sources.at(previousSource + temp.value)); 
          } else { 
            mapping.source = this._sources.at(previousSource + temp.value); 
          } 
          previousSource += temp.value; 
          str = temp.rest; 
          if(str.length === 0 || mappingSeparator.test(str.charAt(0))) { 
            throw new Error('Found a source, but no line and column'); 
          } 
          temp = base64VLQ.decode(str); 
          mapping.originalLine = previousOriginalLine + temp.value; 
          previousOriginalLine = mapping.originalLine; 
          mapping.originalLine += 1; 
          str = temp.rest; 
          if(str.length === 0 || mappingSeparator.test(str.charAt(0))) { 
            throw new Error('Found a source and line, but no column'); 
          } 
          temp = base64VLQ.decode(str); 
          mapping.originalColumn = previousOriginalColumn + temp.value; 
          previousOriginalColumn = mapping.originalColumn; 
          str = temp.rest; 
          if(str.length > 0 && ! mappingSeparator.test(str.charAt(0))) { 
            temp = base64VLQ.decode(str); 
            mapping.name = this._names.at(previousName + temp.value); 
            previousName += temp.value; 
            str = temp.rest; 
          } 
        } 
        this._generatedMappings.push(mapping); 
      } 
    } 
  }; 
  SourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) { 
    function compare(mappingA, mappingB) { 
      var cmp = mappingA.generatedLine - mappingB.generatedLine; 
      return cmp === 0 ? mappingA.generatedColumn - mappingB.generatedColumn: cmp; 
    } 
    var needle = { 
      generatedLine: util.getArg(aArgs, 'line'), 
      generatedColumn: util.getArg(aArgs, 'column') 
    }; 
    if(needle.generatedLine <= 0) { 
      throw new TypeError('Line must be greater than or equal to 1.'); 
    } 
    if(needle.generatedColumn < 0) { 
      throw new TypeError('Column must be greater than or equal to 0.'); 
    } 
    var mapping = binarySearch.search(needle, this._generatedMappings, compare); 
    if(mapping) { 
      return { 
        source: util.getArg(mapping, 'source', null), 
        line: util.getArg(mapping, 'originalLine', null), 
        column: util.getArg(mapping, 'originalColumn', null), 
        name: util.getArg(mapping, 'name', null) 
      }; 
    } 
    return { 
      source: null, 
      line: null, 
      column: null, 
      name: null 
    }; 
  }; 
  return SourceMapConsumer; 
})); 
(function(global, factory) { 
  if(typeof exports === 'object') { 
    var SourceMapGenerator = require('./source-map-generator'); 
    module.exports = factory(SourceMapGenerator); 
  } else if(typeof define === 'function' && define.amd) { 
    define(['source-map/source-map-generator'], factory); 
  } else { 
    var sourceMapModule = global.sourceMapModule = global.sourceMapModule || { }; 
    var SourceMapGenerator = sourceMapModule['source-map-generator']; 
    sourceMapModule['source-node']= factory(SourceMapGenerator); 
  } 
}(this, function(SourceMapGenerator) { 
  function SourceNode(aLine, aColumn, aSource, aChunks) { 
    this.children =[]; 
    this.line = aLine; 
    this.column = aColumn; 
    this.source = aSource; 
    if(aChunks) this.add(aChunks); 
  } 
  SourceNode.prototype.add = function SourceNode_add(aChunk) { 
    if(Array.isArray(aChunk)) { 
      aChunk.forEach(function(chunk) { 
        this.add(chunk); 
      }, this); 
    } else if(aChunk instanceof SourceNode || typeof aChunk === "string") { 
      this.children.push(aChunk); 
    } else { 
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk); 
    } 
    return this; 
  }; 
  SourceNode.prototype.walk = function SourceNode_walk(aFn) { 
    this.children.forEach(function(chunk) { 
      if(chunk instanceof SourceNode) { 
        chunk.walk(aFn); 
      } else { 
        if(chunk !== '') { 
          aFn(chunk, { 
            source: this.source, 
            line: this.line, 
            column: this.column 
          }); 
        } 
      } 
    }, this); 
  }; 
  SourceNode.prototype.join = function SourceNode_join(aSep) { 
    var newChildren; 
    var i; 
    var len = this.children.length; 
    if(len > 0) { 
      newChildren =[]; 
      for(i = 0; i < len - 1; i ++) { 
        newChildren.push(this.children[i]); 
        newChildren.push(aSep); 
      } 
      newChildren.push(this.children[i]); 
      this.children = newChildren; 
    } 
    return this; 
  }; 
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) { 
    var lastChild = this.children[this.children.length - 1]; 
    if(lastChild instanceof SourceNode) { 
      lastChild.replaceRight(aPattern, aReplacement); 
    } else if(typeof lastChild === 'string') { 
      this.children[this.children.lenth - 1]= lastChild.replace(aPattern, aReplacement); 
    } else { 
      this.children.push(''.replace(aPattern, aReplacement)); 
    } 
    return this; 
  }; 
  SourceNode.prototype.toString = function SourceNode_toString() { 
    var str = ""; 
    this.walk(function(chunk) { 
      str += chunk; 
    }); 
    return str; 
  }; 
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) { 
    var generated = { 
      code: "", 
      line: 1, 
      column: 0 
    }; 
    var map = new SourceMapGenerator(aArgs); 
    this.walk(function(chunk, original) { 
      generated.code += chunk; 
      if(original.source !== null && original.line !== null && original.column !== null) { 
        map.addMapping({ 
          source: original.source, 
          original: { 
            line: original.line, 
            column: original.column 
          }, 
          generated: { 
            line: generated.line, 
            column: generated.column 
          } 
        }); 
      } 
      chunk.split('').forEach(function(char) { 
        if(char === '\n') { 
          generated.line ++; 
          generated.column = 0; 
        } else { 
          generated.column ++; 
        } 
      }); 
    }); 
    return { 
      code: generated.code, 
      map: map 
    }; 
  }; 
  return SourceNode; 
})); 
if(! this.traceur) this.traceur = { }; 
traceur.runtime =(function(global) { 
  'use strict'; 
  var $call = Function.prototype.call.bind(Function.prototype.call); 
  var $create = Object.create; 
  var $defineProperty = Object.defineProperty; 
  var $freeze = Object.freeze; 
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; 
  var $getOwnPropertyNames = Object.getOwnPropertyNames; 
  var $getPrototypeOf = Object.getPrototypeOf; 
  var $hasOwnProperty = Object.prototype.hasOwnProperty; 
  var bind = Function.prototype.bind; 
  function nonEnum(value) { 
    return { 
      configurable: true, 
      enumerable: false, 
      value: value, 
      writable: true 
    }; 
  } 
  var method = nonEnum; 
  Object.defineProperties(String.prototype, { 
    startsWith: method(function(s) { 
      return this.lastIndexOf(s, 0) === 0; 
    }), 
    endsWith: method(function(s) { 
      var t = String(s); 
      var l = this.length - t.length; 
      return l >= 0 && this.indexOf(t, l) === l; 
    }), 
    contains: method(function(s) { 
      return this.indexOf(s) !== - 1; 
    }), 
    toArray: method(function() { 
      return this.split(''); 
    }) 
  }); 
  $defineProperty(String, 'raw', { 
    value: function(callsite) { 
      var raw = callsite.raw; 
      var len = raw.length >>> 0; 
      if(len === 0) return ''; 
      var s = ''; 
      var i = 0; 
      while(true) { 
        s += raw[i]; 
        if(i + 1 === len) return s; 
        s += arguments[++ i]; 
      } 
    }, 
    configurable: true, 
    enumerable: false, 
    writable: true 
  }); 
  function createClass(proto, extendsExpr, hasConstructor, hasExtendsExpression) { 
    if(extendsExpr !== null && typeof extendsExpr !== 'function') throw new TypeError('Can only extend functions or null'); 
    var ctor; 
    if(extendsExpr === null && ! hasConstructor) ctor = function() { }; else ctor = proto.constructor; 
    var superPrototype; 
    if(! hasExtendsExpression) { 
      superPrototype = Object.prototype; 
    } else { 
      if(extendsExpr === null) { 
        superPrototype = null; 
      } else { 
        ctor.__proto__ = extendsExpr; 
        superPrototype = extendsExpr.prototype; 
      } 
    } 
    var descriptors = { }; 
    $getOwnPropertyNames(proto).forEach((function(name) { 
      descriptors[name]= $getOwnPropertyDescriptor(proto, name); 
    })); 
    descriptors.constructor.value = ctor; 
    descriptors.constructor.enumerable = false; 
    ctor.prototype = $create(superPrototype, descriptors); 
    return ctor; 
  } 
  function getDescriptor(ctor, name) { 
    var proto = $getPrototypeOf(ctor.prototype); 
    if(! proto) throw new TypeError('super is null'); 
    return $getPropertyDescriptor(proto, name); 
  } 
  function superCall(self, ctor, name, args) { 
    var descriptor = getDescriptor(ctor, name); 
    if(descriptor) { 
      if('value' in descriptor) return descriptor.value.apply(self, args); 
      if(descriptor.get) return descriptor.get.call(self).apply(self, args); 
    } 
    throw new TypeError("Object has no method '" + name + "'."); 
  } 
  function superGet(self, ctor, name) { 
    var descriptor = getDescriptor(ctor, name); 
    if(descriptor) { 
      if(descriptor.get) return descriptor.get.call(self); else if('value' in descriptor) return descriptor.value; 
    } 
    return undefined; 
  } 
  function superSet(self, ctor, name, value) { 
    var descriptor = getDescriptor(ctor, name); 
    if(descriptor && descriptor.set) { 
      descriptor.set.call(self, value); 
      return; 
    } 
    throw new TypeError("Object has no setter '" + name + "'."); 
  } 
  function markMethods(object, names) { 
    names.forEach((function(name) { 
      $defineProperty(object, name, { enumerable: false }); 
    })); 
    return object; 
  } 
  var counter = 0; 
  function newUniqueString() { 
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++ counter + '$__'; 
  } 
  var nameRe = /^__\$(?:\d+)\$(?:\d+)\$__$/; 
  var internalStringValueName = newUniqueString(); 
  function Name(string) { 
    if(! string) string = newUniqueString(); 
    $defineProperty(this, internalStringValueName, { value: newUniqueString() }); 
    function toString() { 
      return string; 
    } 
    $freeze(toString); 
    $freeze(toString.prototype); 
    var toStringDescr = method(toString); 
    $defineProperty(this, 'toString', toStringDescr); 
    this.public = $freeze($create(null, { toString: method($freeze(function toString() { 
        return string; 
      })) })); 
    $freeze(this.public.toString.prototype); 
    $freeze(this); 
  } 
  ; 
  $freeze(Name); 
  $freeze(Name.prototype); 
  function assertName(val) { 
    if(! NameModule.isName(val)) throw new TypeError(val + ' is not a Name'); 
    return val; 
  } 
  var elementDeleteName = new Name(); 
  var elementGetName = new Name(); 
  var elementSetName = new Name(); 
  var NameModule = $freeze({ 
    Name: function(str) { 
      return new Name(str); 
    }, 
    isName: function(x) { 
      return x instanceof Name; 
    }, 
    elementGet: elementGetName, 
    elementSet: elementSetName, 
    elementDelete: elementDeleteName 
  }); 
  var filter = Array.prototype.filter.call.bind(Array.prototype.filter); 
  function getOwnPropertyNames(object) { 
    return filter($getOwnPropertyNames(object), function(str) { 
      return ! nameRe.test(str); 
    }); 
  } 
  function hasOwnProperty(name) { 
    if(NameModule.isName(name) || nameRe.test(name)) return false; 
    return $hasOwnProperty.call(this, name); 
  } 
  function elementDelete(object, name) { 
    if(traceur.options.trapMemberLookup && hasPrivateNameProperty(object, elementDeleteName)) { 
      return getProperty(object, elementDeleteName).call(object, name); 
    } 
    return deleteProperty(object, name); 
  } 
  function elementGet(object, name) { 
    if(traceur.options.trapMemberLookup && hasPrivateNameProperty(object, elementGetName)) { 
      return getProperty(object, elementGetName).call(object, name); 
    } 
    return getProperty(object, name); 
  } 
  function elementHas(object, name) { 
    return has(object, name); 
  } 
  function elementSet(object, name, value) { 
    if(traceur.options.trapMemberLookup && hasPrivateNameProperty(object, elementSetName)) { 
      getProperty(object, elementSetName).call(object, name, value); 
    } else { 
      setProperty(object, name, value); 
    } 
    return value; 
  } 
  function assertNotName(s) { 
    if(nameRe.test(s)) throw Error('Invalid access to private name'); 
  } 
  function deleteProperty(object, name) { 
    if(NameModule.isName(name)) return delete object[name[internalStringValueName]]; 
    if(nameRe.test(name)) return true; 
    return delete object[name]; 
  } 
  function getProperty(object, name) { 
    if(NameModule.isName(name)) return object[name[internalStringValueName]]; 
    if(nameRe.test(name)) return undefined; 
    return object[name]; 
  } 
  function hasPrivateNameProperty(object, name) { 
    return name[internalStringValueName]in Object(object); 
  } 
  function has(object, name) { 
    if(NameModule.isName(name) || nameRe.test(name)) return false; 
    return name in Object(object); 
  } 
  function setProperty(object, name, value) { 
    if(NameModule.isName(name)) { 
      var descriptor = $getPropertyDescriptor(object,[name[internalStringValueName]]); 
      if(descriptor) object[name[internalStringValueName]]= value; else $defineProperty(object, name[internalStringValueName], nonEnum(value)); 
    } else { 
      assertNotName(name); 
      object[name]= value; 
    } 
  } 
  function defineProperty(object, name, descriptor) { 
    if(NameModule.isName(name)) { 
      if(descriptor.enumerable) { 
        descriptor = Object.create(descriptor, { enumerable: { value: false } }); 
      } 
      $defineProperty(object, name[internalStringValueName], descriptor); 
    } else { 
      assertNotName(name); 
      $defineProperty(object, name, descriptor); 
    } 
  } 
  function $getPropertyDescriptor(obj, name) { 
    while(obj !== null) { 
      var result = Object.getOwnPropertyDescriptor(obj, name); 
      if(result) return result; 
      obj = $getPrototypeOf(obj); 
    } 
    return undefined; 
  } 
  function getPropertyDescriptor(obj, name) { 
    if(NameModule.isName(name)) return undefined; 
    assertNotName(name); 
    return $getPropertyDescriptor(obj, name); 
  } 
  $defineProperty(Object, 'defineProperty', { value: defineProperty }); 
  $defineProperty(Object, 'deleteProperty', method(deleteProperty)); 
  $defineProperty(Object, 'getOwnPropertyNames', { value: getOwnPropertyNames }); 
  $defineProperty(Object, 'getProperty', method(getProperty)); 
  $defineProperty(Object, 'getPropertyDescriptor', method(getPropertyDescriptor)); 
  $defineProperty(Object, 'has', method(has)); 
  $defineProperty(Object, 'setProperty', method(setProperty)); 
  $defineProperty(Object.prototype, 'hasOwnProperty', { value: hasOwnProperty }); 
  function is(left, right) { 
    if(left === right) return left !== 0 || 1 / left === 1 / right; 
    return left !== left && right !== right; 
  } 
  function isnt(left, right) { 
    return ! is(left, right); 
  } 
  $defineProperty(Object, 'is', method(is)); 
  var iteratorName = new Name('iterator'); 
  var generatorName = new Name('generator'); 
  var IterModule = { get iterator() { 
      return iteratorName; 
    } }; 
  function getIterator(collection) { 
    if(getProperty(collection, generatorName)) return collection; 
    return getProperty(collection, iteratorName).call(collection); 
  } 
  function markAsGenerator(object) { 
    setProperty(object, generatorName, true); 
  } 
  defineProperty(Array.prototype, IterModule.iterator, method(function() { 
    var index = 0; 
    var array = this; 
    var current; 
    return { 
      get current() { 
        return current; 
      }, 
      moveNext: function() { 
        if(index < array.length) { 
          current = array[index ++]; 
          return true; 
        } 
        return false; 
      } 
    }; 
  })); 
  function Deferred(canceller) { 
    this.canceller_ = canceller; 
    this.listeners_ =[]; 
  } 
  function notify(self) { 
    while(self.listeners_.length > 0) { 
      var current = self.listeners_.shift(); 
      var currentResult = undefined; 
      try { 
        try { 
          if(self.result_[1]) { 
            if(current.errback) currentResult = current.errback.call(undefined, self.result_[0]); 
          } else { 
            if(current.callback) currentResult = current.callback.call(undefined, self.result_[0]); 
          } 
          current.deferred.callback(currentResult); 
        } catch(err) { 
          current.deferred.errback(err); 
        } 
      } catch(unused) { } 
    } 
  } 
  function fire(self, value, isError) { 
    if(self.fired_) throw new Error('already fired'); 
    self.fired_ = true; 
    self.result_ =[value, isError]; 
    notify(self); 
  } 
  Deferred.prototype = { 
    fired_: false, 
    result_: undefined, 
    createPromise: function() { 
      return { 
        then: this.then.bind(this), 
        cancel: this.cancel.bind(this) 
      }; 
    }, 
    callback: function(value) { 
      fire(this, value, false); 
    }, 
    errback: function(err) { 
      fire(this, err, true); 
    }, 
    then: function(callback, errback) { 
      var result = new Deferred(this.cancel.bind(this)); 
      this.listeners_.push({ 
        deferred: result, 
        callback: callback, 
        errback: errback 
      }); 
      if(this.fired_) notify(this); 
      return result.createPromise(); 
    }, 
    cancel: function() { 
      if(this.fired_) throw new Error('already finished'); 
      var result; 
      if(this.canceller_) { 
        result = this.canceller_(this); 
        if(! result instanceof Error) result = new Error(result); 
      } else { 
        result = new Error('cancelled'); 
      } 
      if(! this.fired_) { 
        this.result_ =[result, true]; 
        notify(this); 
      } 
    } 
  }; 
  var modules = $freeze({ 
    get '@name'() { 
      return NameModule; 
    }, 
    get '@iter'() { 
      return IterModule; 
    } 
  }); 
  global.Deferred = Deferred; 
  return { 
    Deferred: Deferred, 
    assertName: assertName, 
    createClass: createClass, 
    createName: NameModule.Name, 
    deleteProperty: deleteProperty, 
    elementDelete: elementDelete, 
    elementGet: elementGet, 
    elementHas: elementHas, 
    elementSet: elementSet, 
    getIterator: getIterator, 
    getProperty: getProperty, 
    has: has, 
    is: is, 
    isnt: isnt, 
    markAsGenerator: markAsGenerator, 
    markMethods: markMethods, 
    modules: modules, 
    setProperty: setProperty, 
    superCall: superCall, 
    superGet: superGet, 
    superSet: superSet 
  }; 
})(this); 
var $src_options_js =(function() { 
  "use strict"; 
  var Kind = { 
    es6: 'es6', 
    es6proposal: 'es6proposal', 
    harmony: 'harmony', 
    experimental: 'experimental' 
  }; 
  var kindMapping = Object.create(null); 
  Object.keys(Kind).forEach((function(kind) { 
    kindMapping[kind]= Object.create(null); 
  })); 
  function enable(kind, b) { 
    Object.keys(kindMapping[kind]).forEach((function(name) { 
      options[name]= b; 
    })); 
  } 
  function getValue(kind) { 
    var value; 
    Object.keys(kindMapping[kind]).every((function(name) { 
      var currentValue = options[name]; 
      if(value === undefined) { 
        value = currentValue; 
        return true; 
      } 
      if(currentValue !== value) { 
        value = null; 
        return false; 
      } 
      return true; 
    })); 
    return value; 
  } 
  var parseOptions = Object.create(null); 
  var transformOptions = Object.create(null); 
  var defaultValues = Object.create(null); 
  var options = { 
    set es6(v) { 
      enable(Kind.es6, Boolean(v)); 
    }, 
    get es6() { 
      return getValue(Kind.es6); 
    }, 
    set es6proposal(v) { 
      enable(Kind.es6proposal, Boolean(v)); 
    }, 
    get es6proposal() { 
      return getValue(Kind.es6proposal); 
    }, 
    set harmony(v) { 
      enable(Kind.harmony, Boolean(v)); 
    }, 
    get harmony() { 
      return getValue(Kind.harmony); 
    }, 
    set experimental(v) { 
      enable(Kind.experimental, Boolean(v)); 
    }, 
    get experimental() { 
      return getValue(Kind.experimental); 
    } 
  }; 
  function reset(opt_allOff) { 
    var useDefault = opt_allOff === undefined; 
    Object.keys(options).forEach((function(name) { 
      options[name]= useDefault && defaultValues[name]; 
    })); 
  } 
  function fromString(s) { 
    fromArgv(s.split(/\s+/)); 
  } 
  function fromArgv(args) { 
    args.forEach(parseCommand); 
  } 
  function setFromObject(object) { 
    Object.keys(object).forEach((function(name) { 
      options[name]= object[name]; 
    })); 
  } 
  Object.defineProperties(options, { 
    parse: { value: parseOptions }, 
    transform: { value: transformOptions }, 
    reset: { value: reset }, 
    fromString: { value: fromString }, 
    fromArgv: { value: fromArgv }, 
    setFromObject: { value: setFromObject } 
  }); 
  function parseCommand(s) { 
    var re = /--([^=]+)(?:=(.+))?/; 
    var m = re.exec(s); 
    if(m) { 
      var name = toCamelCase(m[1]); 
      var value; 
      switch(m[2]) { 
        case '': 
          value = true; 
          break; 

        case 'false': 
          value = false; 
          break; 

        case 'parse': 
          value = 'parse'; 
          break; 

        default: 
          value = true; 

      } 
      if(name in options) { 
        options[name]= value; 
      } else { 
        throw Error('Unknown option: ' + m[1]); 
      } 
    } 
  } 
  function toCamelCase(s) { 
    return s.replace(/-\w/g, function(ch) { 
      return ch[1].toUpperCase(); 
    }); 
  } 
  function addFeatureOption(name, kind) { 
    kindMapping[kind][name]= true; 
    Object.defineProperty(options, name, { 
      get: function() { 
        if(parseOptions[name]=== transformOptions[name]) { 
          return parseOptions[name]; 
        } 
        return 'parse'; 
      }, 
      set: function(v) { 
        if(v === 'parse') { 
          parseOptions[name]= true; 
          transformOptions[name]= false; 
        } else { 
          parseOptions[name]= transformOptions[name]= Boolean(v); 
        } 
      }, 
      enumerable: true, 
      configurable: true 
    }); 
    var defaultValue = kind !== Kind.experimental; 
    defaultValues[name]= defaultValue; 
    parseOptions[name]= defaultValue; 
    transformOptions[name]= defaultValue; 
  } 
  function addBoolOption(name) { 
    defaultValues[name]= true; 
    options[name]= true; 
  } 
  addFeatureOption('arrayComprehension', Kind.es6); 
  addFeatureOption('arrowFunctions', Kind.es6); 
  addFeatureOption('blockBinding', Kind.es6); 
  addFeatureOption('classes', Kind.es6); 
  addFeatureOption('defaultParameters', Kind.es6); 
  addFeatureOption('destructuring', Kind.es6); 
  addFeatureOption('forOf', Kind.es6); 
  addFeatureOption('isExpression', Kind.es6); 
  addFeatureOption('propertyMethods', Kind.es6); 
  addFeatureOption('propertyNameShorthand', Kind.es6); 
  addFeatureOption('quasi', Kind.es6); 
  addFeatureOption('restParameters', Kind.es6); 
  addFeatureOption('spread', Kind.es6); 
  addFeatureOption('generatorComprehension', Kind.es6proposal); 
  addFeatureOption('generators', Kind.es6proposal); 
  addFeatureOption('modules', Kind.es6proposal); 
  addFeatureOption('privateNameSyntax', Kind.es6proposal); 
  addFeatureOption('privateNames', Kind.es6proposal); 
  addFeatureOption('cascadeExpression', Kind.experimental); 
  addFeatureOption('trapMemberLookup', Kind.experimental); 
  addFeatureOption('deferredFunctions', Kind.experimental); 
  addFeatureOption('propertyOptionalComma', Kind.experimental); 
  addBoolOption('debug'); 
  addBoolOption('sourceMaps'); 
  addBoolOption('freeVariableChecker'); 
  addBoolOption('validate'); 
  return Object.preventExtensions(Object.create(null, { 
    parseOptions: { 
      get: function() { 
        return parseOptions; 
      }, 
      enumerable: true 
    }, 
    transformOptions: { 
      get: function() { 
        return transformOptions; 
      }, 
      enumerable: true 
    }, 
    options: { 
      get: function() { 
        return options; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_util_util_js =(function() { 
  "use strict"; 
  function evaluateStringLiteral(token) { 
    return eval(token.value); 
  } 
  function createObject(proto, obj) { 
    var newObject = Object.create(proto); 
    Object.getOwnPropertyNames(obj).forEach((function(name) { 
      Object.defineProperty(newObject, name, Object.getOwnPropertyDescriptor(obj, name)); 
    })); 
    return newObject; 
  } 
  return Object.preventExtensions(Object.create(null, { 
    evaluateStringLiteral: { 
      get: function() { 
        return evaluateStringLiteral; 
      }, 
      enumerable: true 
    }, 
    createObject: { 
      get: function() { 
        return createObject; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_semantics_symbols_SymbolType_js =(function() { 
  "use strict"; 
  var SymbolType = { 
    EXPORT: 'EXPORT', 
    MODULE: 'MODULE' 
  }; 
  return Object.preventExtensions(Object.create(null, { SymbolType: { 
      get: function() { 
        return SymbolType; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_symbols_Symbol_js =(function() { 
  "use strict"; 
  var destructuring$SymbolType = $src_semantics_symbols_SymbolType_js, SymbolType = destructuring$SymbolType.SymbolType; 
  function Symbol(type, tree, name) { 
    this.type = type; 
    this.tree = tree; 
    this.name = name; 
  } 
  Symbol.prototype = { 
    asExport: function() { 
      traceur.assert(this.type == SymbolType.EXPORT); 
      return this; 
    }, 
    asModuleSymbol: function() { 
      traceur.assert(this.type == SymbolType.MODULE); 
      return this; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { Symbol: { 
      get: function() { 
        return Symbol; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_symbols_ExportSymbol_js =(function() { 
  "use strict"; 
  var destructuring$Symbol = $src_semantics_symbols_Symbol_js, Symbol = destructuring$Symbol.Symbol; 
  var destructuring$SymbolType = $src_semantics_symbols_SymbolType_js, SymbolType = destructuring$SymbolType.SymbolType; 
  function ExportSymbol(tree, name, relatedTree) { 
    Symbol.call(this, SymbolType.EXPORT, tree, name); 
    this.relatedTree = relatedTree; 
  } 
  ExportSymbol.prototype = Object.create(Symbol.prototype); 
  return Object.preventExtensions(Object.create(null, { ExportSymbol: { 
      get: function() { 
        return ExportSymbol; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_trees_ParseTree_js =(function() { 
  "use strict"; 
  var ParseTreeType = { }; 
  var typeToNameMap = Object.create(null); 
  function getCapitalizedName(type) { 
    var name = type.toString(); 
    return('_' + name.toLowerCase()).replace(/_(\w)/g, function(_, c) { 
      return c.toUpperCase(); 
    }); 
  } 
  function getTreeNameForType(type) { 
    if(type in typeToNameMap) return typeToNameMap[type]; 
    var name = getCapitalizedName(type); 
    return typeToNameMap[type]= name; 
  } 
  function ParseTree(type, location) { 
    this.type = type; 
    this.location = location; 
  } 
  ParseTree.stripLocation = function(key, value) { 
    if(key === 'location') { 
      return undefined; 
    } 
    return value; 
  }; 
  ParseTree.prototype = { 
    isNull: function() { 
      return this.type === ParseTreeType.NULL_TREE; 
    }, 
    isPattern: function() { 
      switch(this.type) { 
        case ParseTreeType.ARRAY_PATTERN: 
        case ParseTreeType.OBJECT_PATTERN: 
          return true; 

        case ParseTreeType.PAREN_EXPRESSION: 
          return this.expression.isPattern(); 

        default: 
          return false; 

      } 
    }, 
    isLeftHandSideExpression: function() { 
      switch(this.type) { 
        case ParseTreeType.THIS_EXPRESSION: 
        case ParseTreeType.CLASS_EXPRESSION: 
        case ParseTreeType.SUPER_EXPRESSION: 
        case ParseTreeType.IDENTIFIER_EXPRESSION: 
        case ParseTreeType.LITERAL_EXPRESSION: 
        case ParseTreeType.ARRAY_LITERAL_EXPRESSION: 
        case ParseTreeType.OBJECT_LITERAL_EXPRESSION: 
        case ParseTreeType.NEW_EXPRESSION: 
        case ParseTreeType.MEMBER_EXPRESSION: 
        case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
        case ParseTreeType.CALL_EXPRESSION: 
        case ParseTreeType.FUNCTION_DECLARATION: 
        case ParseTreeType.QUASI_LITERAL_EXPRESSION: 
          return true; 

        case ParseTreeType.PAREN_EXPRESSION: 
          return this.expression.isLeftHandSideExpression(); 

        default: 
          return false; 

      } 
    }, 
    isArrowFunctionExpression: function() { 
      switch(this.type) { 
        case ParseTreeType.ARRAY_COMPREHENSION: 
        case ParseTreeType.ARRAY_LITERAL_EXPRESSION: 
        case ParseTreeType.ARROW_FUNCTION_EXPRESSION: 
        case ParseTreeType.BINARY_OPERATOR: 
        case ParseTreeType.CALL_EXPRESSION: 
        case ParseTreeType.CASCADE_EXPRESSION: 
        case ParseTreeType.CLASS_EXPRESSION: 
        case ParseTreeType.CONDITIONAL_EXPRESSION: 
        case ParseTreeType.FUNCTION_DECLARATION: 
        case ParseTreeType.GENERATOR_COMPREHENSION: 
        case ParseTreeType.IDENTIFIER_EXPRESSION: 
        case ParseTreeType.LITERAL_EXPRESSION: 
        case ParseTreeType.MEMBER_EXPRESSION: 
        case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
        case ParseTreeType.MISSING_PRIMARY_EXPRESSION: 
        case ParseTreeType.NEW_EXPRESSION: 
        case ParseTreeType.OBJECT_LITERAL_EXPRESSION: 
        case ParseTreeType.PAREN_EXPRESSION: 
        case ParseTreeType.POSTFIX_EXPRESSION: 
        case ParseTreeType.QUASI_LITERAL_EXPRESSION: 
        case ParseTreeType.SUPER_EXPRESSION: 
        case ParseTreeType.THIS_EXPRESSION: 
        case ParseTreeType.UNARY_EXPRESSION: 
        case ParseTreeType.AT_NAME_EXPRESSION: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    isMemberExpression: function() { 
      switch(this.type) { 
        case ParseTreeType.THIS_EXPRESSION: 
        case ParseTreeType.CLASS_EXPRESSION: 
        case ParseTreeType.SUPER_EXPRESSION: 
        case ParseTreeType.IDENTIFIER_EXPRESSION: 
        case ParseTreeType.LITERAL_EXPRESSION: 
        case ParseTreeType.ARRAY_LITERAL_EXPRESSION: 
        case ParseTreeType.OBJECT_LITERAL_EXPRESSION: 
        case ParseTreeType.PAREN_EXPRESSION: 
        case ParseTreeType.QUASI_LITERAL_EXPRESSION: 
        case ParseTreeType.FUNCTION_DECLARATION: 
        case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
        case ParseTreeType.MEMBER_EXPRESSION: 
        case ParseTreeType.CALL_EXPRESSION: 
        case ParseTreeType.CASCADE_EXPRESSION: 
          return true; 

        case ParseTreeType.NEW_EXPRESSION: 
          return this.args != null; 

      } 
      return false; 
    }, 
    isExpression: function() { 
      return this.isArrowFunctionExpression() || this.type == ParseTreeType.COMMA_EXPRESSION; 
    }, 
    isAssignmentOrSpread: function() { 
      return this.isArrowFunctionExpression() || this.type == ParseTreeType.SPREAD_EXPRESSION; 
    }, 
    isRestParameter: function() { 
      return this.type == ParseTreeType.REST_PARAMETER; 
    }, 
    isSpreadPatternElement: function() { 
      return this.type == ParseTreeType.SPREAD_PATTERN_ELEMENT; 
    }, 
    isStatement: function() { 
      return this.isSourceElement(); 
    }, 
    isStatementStandard: function() { 
      switch(this.type) { 
        case ParseTreeType.BLOCK: 
        case ParseTreeType.AWAIT_STATEMENT: 
        case ParseTreeType.VARIABLE_STATEMENT: 
        case ParseTreeType.EMPTY_STATEMENT: 
        case ParseTreeType.EXPRESSION_STATEMENT: 
        case ParseTreeType.IF_STATEMENT: 
        case ParseTreeType.DO_WHILE_STATEMENT: 
        case ParseTreeType.WHILE_STATEMENT: 
        case ParseTreeType.FOR_OF_STATEMENT: 
        case ParseTreeType.FOR_IN_STATEMENT: 
        case ParseTreeType.FOR_STATEMENT: 
        case ParseTreeType.CONTINUE_STATEMENT: 
        case ParseTreeType.BREAK_STATEMENT: 
        case ParseTreeType.RETURN_STATEMENT: 
        case ParseTreeType.YIELD_STATEMENT: 
        case ParseTreeType.WITH_STATEMENT: 
        case ParseTreeType.SWITCH_STATEMENT: 
        case ParseTreeType.LABELLED_STATEMENT: 
        case ParseTreeType.THROW_STATEMENT: 
        case ParseTreeType.TRY_STATEMENT: 
        case ParseTreeType.DEBUGGER_STATEMENT: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    isSourceElement: function() { 
      switch(this.type) { 
        case ParseTreeType.FUNCTION_DECLARATION: 
        case ParseTreeType.CLASS_DECLARATION: 
        case ParseTreeType.NAME_STATEMENT: 
          return true; 

      } 
      return this.isStatementStandard(); 
    }, 
    isProgramElement: function() { 
      switch(this.type) { 
        case ParseTreeType.CLASS_DECLARATION: 
        case ParseTreeType.EXPORT_DECLARATION: 
        case ParseTreeType.FUNCTION_DECLARATION: 
        case ParseTreeType.IMPORT_DECLARATION: 
        case ParseTreeType.MODULE_DECLARATION: 
        case ParseTreeType.MODULE_DEFINITION: 
        case ParseTreeType.NAME_STATEMENT: 
        case ParseTreeType.VARIABLE_DECLARATION: 
          return true; 

      } 
      return this.isStatementStandard(); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { 
    ParseTreeType: { 
      get: function() { 
        return ParseTreeType; 
      }, 
      enumerable: true 
    }, 
    getTreeNameForType: { 
      get: function() { 
        return getTreeNameForType; 
      }, 
      enumerable: true 
    }, 
    ParseTree: { 
      get: function() { 
        return ParseTree; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_syntax_ParseTreeVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType$getTreeNameForType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType$getTreeNameForType.ParseTreeType, getTreeNameForType = destructuring$ParseTreeType$getTreeNameForType.getTreeNameForType; 
  var ParseTreeVisitor = traceur.runtime.createClass({ 
    visitAny: function(tree) { 
      if(tree === null) { 
        return; 
      } 
      var name = getTreeNameForType(tree.type); 
      this['visit' + name](tree); 
    }, 
    visit: function(tree) { 
      this.visitAny(tree); 
    }, 
    visitList: function(list) { 
      for(var i = 0; i < list.length; i ++) { 
        this.visitAny(list[i]); 
      } 
    }, 
    visitArgumentList: function(tree) { 
      this.visitList(tree.args); 
    }, 
    visitArrayComprehension: function(tree) { 
      this.visitAny(tree.expression); 
      this.visitList(tree.comprehensionForList); 
      this.visitAny(tree.ifExpression); 
    }, 
    visitArrayLiteralExpression: function(tree) { 
      this.visitList(tree.elements); 
    }, 
    visitArrayPattern: function(tree) { 
      this.visitList(tree.elements); 
    }, 
    visitArrowFunctionExpression: function(tree) { 
      this.visitAny(tree.formalParameters); 
      this.visitAny(tree.functionBody); 
    }, 
    visitAtNameExpression: function(tree) { }, 
    visitAtNameDeclaration: function(tree) { 
      this.visitAny(tree.initializer); 
    }, 
    visitAwaitStatement: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitBinaryOperator: function(tree) { 
      this.visitAny(tree.left); 
      this.visitAny(tree.right); 
    }, 
    visitBindThisParameter: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitBindingElement: function(tree) { 
      this.visitAny(tree.binding); 
      this.visitAny(tree.initializer); 
    }, 
    visitBindingIdentifier: function(tree) { }, 
    visitBlock: function(tree) { 
      this.visitList(tree.statements); 
    }, 
    visitBreakStatement: function(tree) { }, 
    visitCallExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitAny(tree.args); 
    }, 
    visitCaseClause: function(tree) { 
      this.visitAny(tree.expression); 
      this.visitList(tree.statements); 
    }, 
    visitCatch: function(tree) { 
      this.visitAny(tree.binding); 
      this.visitAny(tree.catchBody); 
    }, 
    visitCascadeExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitList(tree.expressions); 
    }, 
    visitClassDeclaration: function(tree) { 
      this.visitAny(tree.superClass); 
      this.visitList(tree.elements); 
    }, 
    visitClassExpression: function(tree) { }, 
    visitCommaExpression: function(tree) { 
      this.visitList(tree.expressions); 
    }, 
    visitComprehensionFor: function(tree) { 
      this.visitAny(tree.left); 
      this.visitAny(tree.iterator); 
    }, 
    visitConditionalExpression: function(tree) { 
      this.visitAny(tree.condition); 
      this.visitAny(tree.left); 
      this.visitAny(tree.right); 
    }, 
    visitContinueStatement: function(tree) { }, 
    visitDebuggerStatement: function(tree) { }, 
    visitDefaultClause: function(tree) { 
      this.visitList(tree.statements); 
    }, 
    visitDoWhileStatement: function(tree) { 
      this.visitAny(tree.body); 
      this.visitAny(tree.condition); 
    }, 
    visitEmptyStatement: function(tree) { }, 
    visitExportDeclaration: function(tree) { 
      this.visitAny(tree.declaration); 
    }, 
    visitExportMapping: function(tree) { 
      this.visitAny(tree.moduleExpression); 
      this.visitAny(tree.specifierSet); 
    }, 
    visitExportMappingList: function(tree) { 
      this.visitList(tree.paths); 
    }, 
    visitExportSpecifier: function(tree) { }, 
    visitExportSpecifierSet: function(tree) { 
      this.visitList(tree.specifiers); 
    }, 
    visitExpressionStatement: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitFinally: function(tree) { 
      this.visitAny(tree.block); 
    }, 
    visitForOfStatement: function(tree) { 
      this.visitAny(tree.initializer); 
      this.visitAny(tree.collection); 
      this.visitAny(tree.body); 
    }, 
    visitForInStatement: function(tree) { 
      this.visitAny(tree.initializer); 
      this.visitAny(tree.collection); 
      this.visitAny(tree.body); 
    }, 
    visitForStatement: function(tree) { 
      this.visitAny(tree.initializer); 
      this.visitAny(tree.condition); 
      this.visitAny(tree.increment); 
      this.visitAny(tree.body); 
    }, 
    visitFormalParameterList: function(tree) { 
      this.visitList(tree.parameters); 
    }, 
    visitFunctionDeclaration: function(tree) { 
      this.visitAny(tree.name); 
      this.visitAny(tree.formalParameterList); 
      this.visitAny(tree.functionBody); 
    }, 
    visitGeneratorComprehension: function(tree) { 
      this.visitAny(tree.expression); 
      this.visitList(tree.comprehensionForList); 
      this.visitAny(tree.ifExpression); 
    }, 
    visitGetAccessor: function(tree) { 
      this.visitAny(tree.body); 
    }, 
    visitIdentifierExpression: function(tree) { }, 
    visitIfStatement: function(tree) { 
      this.visitAny(tree.condition); 
      this.visitAny(tree.ifClause); 
      this.visitAny(tree.elseClause); 
    }, 
    visitImportDeclaration: function(tree) { 
      this.visitList(tree.importPathList); 
    }, 
    visitImportBinding: function(tree) { 
      if(tree.importSpecifierSet !== null) { 
        this.visitList(tree.importSpecifierSet); 
      } 
      this.visitAny(tree.moduleExpression); 
    }, 
    visitImportSpecifier: function(tree) { }, 
    visitImportSpecifierSet: function(tree) { 
      this.visitList(tree.specifiers); 
    }, 
    visitLabelledStatement: function(tree) { 
      this.visitAny(tree.statement); 
    }, 
    visitLiteralExpression: function(tree) { }, 
    visitMemberExpression: function(tree) { 
      this.visitAny(tree.operand); 
    }, 
    visitMemberLookupExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitAny(tree.memberExpression); 
    }, 
    visitMissingPrimaryExpression: function(tree) { }, 
    visitModuleDeclaration: function(tree) { 
      this.visitList(tree.specifiers); 
    }, 
    visitModuleDefinition: function(tree) { 
      this.visitList(tree.elements); 
    }, 
    visitModuleExpression: function(tree) { 
      this.visitAny(tree.reference); 
    }, 
    visitModuleRequire: function(tree) { }, 
    visitModuleSpecifier: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitNewExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitAny(tree.args); 
    }, 
    visitNameStatement: function(tree) { 
      this.visitList(tree.declarations); 
    }, 
    visitNullTree: function(tree) { }, 
    visitObjectLiteralExpression: function(tree) { 
      this.visitList(tree.propertyNameAndValues); 
    }, 
    visitObjectPattern: function(tree) { 
      this.visitList(tree.fields); 
    }, 
    visitObjectPatternField: function(tree) { 
      this.visitAny(tree.element); 
    }, 
    visitParenExpression: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitPostfixExpression: function(tree) { 
      this.visitAny(tree.operand); 
    }, 
    visitProgram: function(tree) { 
      this.visitList(tree.programElements); 
    }, 
    visitPropertyMethodAssignment: function(tree) { 
      this.visitAny(tree.formalParameterList); 
      this.visitAny(tree.functionBody); 
    }, 
    visitPropertyNameAssignment: function(tree) { 
      this.visitAny(tree.value); 
    }, 
    visitPropertyNameShorthand: function(tree) { }, 
    visitQuasiLiteralExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitList(tree.elements); 
    }, 
    visitQuasiLiteralPortion: function(tree) { }, 
    visitQuasiSubstitution: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitRequiresMember: function(tree) { }, 
    visitRestParameter: function(tree) { }, 
    visitReturnStatement: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitSetAccessor: function(tree) { 
      this.visitAny(tree.body); 
    }, 
    visitSpreadExpression: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    visitSpreadPatternElement: function(tree) { 
      this.visitAny(tree.lvalue); 
    }, 
    visitStateMachine: function(tree) { 
      throw Error('State machines should not live outside of the' + ' GeneratorTransformer.'); 
    }, 
    visitSuperExpression: function(tree) { }, 
    visitSwitchStatement: function(tree) { 
      this.visitAny(tree.expression); 
      this.visitList(tree.caseClauses); 
    }, 
    visitThisExpression: function(tree) { }, 
    visitThrowStatement: function(tree) { 
      this.visitAny(tree.value); 
    }, 
    visitTryStatement: function(tree) { 
      this.visitAny(tree.body); 
      this.visitAny(tree.catchBlock); 
      this.visitAny(tree.finallyBlock); 
    }, 
    visitUnaryExpression: function(tree) { 
      this.visitAny(tree.operand); 
    }, 
    visitVariableDeclaration: function(tree) { 
      this.visitAny(tree.lvalue); 
      this.visitAny(tree.initializer); 
    }, 
    visitVariableDeclarationList: function(tree) { 
      this.visitList(tree.declarations); 
    }, 
    visitVariableStatement: function(tree) { 
      this.visitAny(tree.declarations); 
    }, 
    visitWhileStatement: function(tree) { 
      this.visitAny(tree.condition); 
      this.visitAny(tree.body); 
    }, 
    visitWithStatement: function(tree) { 
      this.visitAny(tree.expression); 
      this.visitAny(tree.body); 
    }, 
    visitYieldStatement: function(tree) { 
      this.visitAny(tree.expression); 
    }, 
    constructor: function() { 
      var args = Array.prototype.slice.call(arguments, 0); 
      traceur.runtime.superCall(this, ParseTreeVisitor, "constructor", $__1(args)); 
    } 
  }, null, false, false); 
  return Object.preventExtensions(Object.create(null, { ParseTreeVisitor: { 
      get: function() { 
        return ParseTreeVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_url_js =(function() { 
  "use strict"; 
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) { 
    var out =[]; 
    if(opt_scheme) { 
      out.push(opt_scheme, ':'); 
    } 
    if(opt_domain) { 
      out.push('//'); 
      if(opt_userInfo) { 
        out.push(opt_userInfo, '@'); 
      } 
      out.push(opt_domain); 
      if(opt_port) { 
        out.push(':', opt_port); 
      } 
    } 
    if(opt_path) { 
      out.push(opt_path); 
    } 
    if(opt_queryData) { 
      out.push('?', opt_queryData); 
    } 
    if(opt_fragment) { 
      out.push('#', opt_fragment); 
    } 
    return out.join(''); 
  } 
  ; 
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$'); 
  var ComponentIndex = { 
    SCHEME: 1, 
    USER_INFO: 2, 
    DOMAIN: 3, 
    PORT: 4, 
    PATH: 5, 
    QUERY_DATA: 6, 
    FRAGMENT: 7 
  }; 
  function split(uri) { 
    return(uri.match(splitRe)); 
  } 
  function removeDotSegments(path) { 
    if(path === '/') return '/'; 
    var leadingSlash = path[0]=== '/' ? '/': ''; 
    var trailingSlash = path.slice(- 1) === '/' ? '/': ''; 
    var segments = path.split('/'); 
    var out =[]; 
    var up = 0; 
    for(var pos = 0; pos < segments.length; pos ++) { 
      var segment = segments[pos]; 
      switch(segment) { 
        case '': 
        case '.': 
          break; 

        case '..': 
          if(out.length) out.pop(); else up ++; 
          break; 

        default: 
          out.push(segment); 

      } 
    } 
    if(! leadingSlash) { 
      while(up -- > 0) { 
        out.unshift('..'); 
      } 
      if(out.length === 0) out.push('.'); 
    } 
    return leadingSlash + out.join('/') + trailingSlash; 
  } 
  function joinAndCanonicalizePath(parts) { 
    var path = parts[ComponentIndex.PATH]; 
    path = removeDotSegments(path.replace(/\/\//.g, '/')); 
    parts[ComponentIndex.PATH]= path; 
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]); 
  } 
  function canonicalizeUrl(url) { 
    var parts = split(url); 
    return joinAndCanonicalizePath(parts); 
  } 
  function resolveUrl(base, url) { 
    if(url[0]=== '@') return url; 
    var parts = split(url); 
    var baseParts = split(base); 
    if(parts[ComponentIndex.SCHEME]) { 
      return joinAndCanonicalizePath(parts); 
    } else { 
      parts[ComponentIndex.SCHEME]= baseParts[ComponentIndex.SCHEME]; 
    } 
    for(var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i ++) { 
      if(! parts[i]) { 
        parts[i]= baseParts[i]; 
      } 
    } 
    if(parts[ComponentIndex.PATH][0]== '/') { 
      return joinAndCanonicalizePath(parts); 
    } 
    var path = baseParts[ComponentIndex.PATH]; 
    var index = path.lastIndexOf('/'); 
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH]; 
    parts[ComponentIndex.PATH]= path; 
    return joinAndCanonicalizePath(parts); 
  } 
  return Object.preventExtensions(Object.create(null, { 
    removeDotSegments: { 
      get: function() { 
        return removeDotSegments; 
      }, 
      enumerable: true 
    }, 
    canonicalizeUrl: { 
      get: function() { 
        return canonicalizeUrl; 
      }, 
      enumerable: true 
    }, 
    resolveUrl: { 
      get: function() { 
        return resolveUrl; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_codegeneration_module_ModuleVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ParseTree$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTree = destructuring$ParseTree$ParseTreeType.ParseTree, ParseTreeType = destructuring$ParseTree$ParseTreeType.ParseTreeType; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$Symbol = $src_semantics_symbols_Symbol_js, Symbol = destructuring$Symbol.Symbol; 
  var destructuring$createObject$evaluateStringLiteral = $src_util_util_js, createObject = destructuring$createObject$evaluateStringLiteral.createObject, evaluateStringLiteral = destructuring$createObject$evaluateStringLiteral.evaluateStringLiteral; 
  var destructuring$resolveUrl = $src_util_url_js, resolveUrl = destructuring$resolveUrl.resolveUrl; 
  function getFriendlyName(module) { 
    return module.name || module.url; 
  } 
  var ModuleVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter, project, module) { 
      traceur.runtime.superCall(this, ModuleVisitor, "constructor",[]); 
      this.reporter_ = reporter; 
      this.project = project; 
      this.currentModule_ = module; 
    }, 
    get currentModule() { 
      return this.currentModule_; 
    }, 
    getModuleByName: function(name) { 
      var module = this.currentModule; 
      while(module) { 
        if(module.hasModule(name)) { 
          return module.getModule(name); 
        } 
        module = module.parent; 
      } 
      return null; 
    }, 
    getModuleForModuleExpression: function(tree, reportErrors) { 
      if(tree.reference.type == ParseTreeType.MODULE_REQUIRE) { 
        var url = evaluateStringLiteral(tree.reference.url); 
        url = resolveUrl(this.currentModule.url, url); 
        return this.project.getModuleForUrl(url); 
      } 
      var getNext =(function(parent, identifierToken) { 
        var name = identifierToken.value; 
        if(! parent.hasModule(name)) { 
          if(reportErrors) { 
            this.reportError_(tree, '\'%s\' is not a module', name); 
          } 
          return null; 
        } 
        if(! parent.hasExport(name)) { 
          if(reportErrors) { 
            this.reportError_(tree, '\'%s\' is not exported by %s', name, getFriendlyName(parent)); 
          } 
          return null; 
        } 
        return parent.getModule(name); 
      }).bind(this); 
      var name = tree.reference.identifierToken.value; 
      var parent = this.getModuleByName(name); 
      if(! parent) { 
        if(reportErrors) { 
          this.reportError_(tree, '\'%s\' is not a module', name); 
        } 
        return null; 
      } 
      for(var i = 0; i < tree.identifiers.length; i ++) { 
        parent = getNext(parent, tree.identifiers[i]); 
        if(! parent) { 
          return null; 
        } 
      } 
      return parent; 
    }, 
    visitFunctionDeclaration: function(tree) { }, 
    visitSetAccessor: function(tree) { }, 
    visitGetAccessor: function(tree) { }, 
    visitModuleElement_: function(element) { 
      switch(element.type) { 
        case ParseTreeType.MODULE_DECLARATION: 
        case ParseTreeType.MODULE_DEFINITION: 
        case ParseTreeType.EXPORT_DECLARATION: 
        case ParseTreeType.IMPORT_DECLARATION: 
          this.visitAny(element); 

      } 
    }, 
    visitProgram: function(tree) { 
      tree.programElements.forEach(this.visitModuleElement_, this); 
    }, 
    visitModuleDefinition: function(tree) { 
      var current = this.currentModule_; 
      var name = tree.name.value; 
      var module = current.getModule(name); 
      traceur.assert(module); 
      this.currentModule_ = module; 
      tree.elements.forEach(this.visitModuleElement_, this); 
      this.currentModule_ = current; 
    }, 
    checkForDuplicateModule_: function(name, tree) { 
      var parent = this.currentModule; 
      if(parent.hasModule(name)) { 
        this.reportError_(tree, 'Duplicate module declaration \'%s\'', name); 
        this.reportRelatedError_(parent.getModule(name).tree); 
        return false; 
      } 
      return true; 
    }, 
    reportError_: function(symbolOrTree, format, var_args) { 
      var tree; 
      if(symbolOrTree instanceof Symbol) { 
        tree = symbolOrTree.tree; 
      } else { 
        tree = symbolOrTree; 
      } 
      var args = Array.prototype.slice.call(arguments); 
      args[0]= tree.location.start; 
      this.reporter_.reportError.apply(this.reporter_, args); 
    }, 
    reportRelatedError_: function(symbolOrTree) { 
      if(symbolOrTree instanceof ParseTree) { 
        this.reportError_(symbolOrTree, 'Location related to previous error'); 
      } else { 
        var tree = symbolOrTree.tree; 
        if(tree) { 
          this.reportRelatedError_(tree); 
        } else { 
          this.reporter_.reportError(null, 'Module related to previous error: ' + symbolOrTree.url); 
        } 
      } 
    } 
  }, ParseTreeVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ModuleVisitor: { 
      get: function() { 
        return ModuleVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_module_ExportVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ExportSymbol = $src_semantics_symbols_ExportSymbol_js, ExportSymbol = destructuring$ExportSymbol.ExportSymbol; 
  var destructuring$ModuleVisitor = $src_codegeneration_module_ModuleVisitor_js, ModuleVisitor = destructuring$ModuleVisitor.ModuleVisitor; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var IDENTIFIER_EXPRESSION = ParseTreeType.IDENTIFIER_EXPRESSION; 
  var ExportVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter, project, module) { 
      traceur.runtime.superCall(this, ExportVisitor, "constructor",[reporter, project, module]); 
      this.inExport_ = false; 
      this.relatedTree_ = null; 
    }, 
    addExport_: function(name, tree) { 
      if(! this.inExport_) { 
        return; 
      } 
      traceur.assert(typeof name == 'string'); 
      var parent = this.currentModule; 
      if(parent.hasExport(name)) { 
        this.reportError_(tree, 'Duplicate export declaration \'%s\'', name); 
        this.reportRelatedError_(parent.getExport(name)); 
        return; 
      } 
      parent.addExport(name, new ExportSymbol(tree, name, this.relatedTree_)); 
    }, 
    visitClassDeclaration: function(tree) { 
      this.addExport_(tree.name.identifierToken.value, tree); 
    }, 
    visitExportDeclaration: function(tree) { 
      this.inExport_ = true; 
      this.visitAny(tree.declaration); 
      this.inExport_ = false; 
    }, 
    visitExportMapping: function(tree) { 
      this.relatedTree_ = tree.moduleExpression; 
      this.visitAny(tree.specifierSet); 
      this.relatedTree_ = null; 
    }, 
    visitExportMappingList: function(tree) { 
      for(var i = 0; i < tree.paths.length; i ++) { 
        var path = tree.paths[i]; 
        if(path.type == IDENTIFIER_EXPRESSION) { 
          this.addExport_(path.identifierToken.value, path); 
        } else { 
          this.visitAny(path); 
        } 
      } 
    }, 
    visitExportSpecifier: function(tree) { 
      this.addExport_((tree.rhs || tree.lhs).value, tree); 
    }, 
    visitFunctionDeclaration: function(tree) { 
      if(tree.name) { 
        this.addExport_(tree.name.identifierToken.value, tree); 
      } 
    }, 
    visitIdentifierExpression: function(tree) { 
      this.addExport_(tree.identifierToken.value, tree); 
    }, 
    visitModuleDefinition: function(tree) { 
      this.addExport_(tree.name.value, tree); 
      var inExport = this.inExport_; 
      this.inExport_ = false; 
      traceur.runtime.superCall(this, ExportVisitor, "visitModuleDefinition",[tree]); 
      this.inExport_ = inExport; 
    }, 
    visitModuleSpecifier: function(tree) { 
      this.addExport_(tree.identifier.value, tree); 
    }, 
    visitVariableDeclaration: function(tree) { 
      this.addExport_(tree.lvalue.identifierToken.value, tree); 
    } 
  }, ModuleVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ExportVisitor: { 
      get: function() { 
        return ExportVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_TokenType_js =(function() { 
  "use strict"; 
  var TokenType = { 
    END_OF_FILE: 'End of File', 
    ERROR: 'error', 
    IDENTIFIER: 'identifier', 
    BREAK: 'break', 
    CASE: 'case', 
    CATCH: 'catch', 
    CONTINUE: 'continue', 
    DEBUGGER: 'debugger', 
    DEFAULT: 'default', 
    DELETE: 'delete', 
    DO: 'do', 
    ELSE: 'else', 
    FINALLY: 'finally', 
    FOR: 'for', 
    FUNCTION: 'function', 
    IF: 'if', 
    IN: 'in', 
    INSTANCEOF: 'instanceof', 
    NEW: 'new', 
    RETURN: 'return', 
    SWITCH: 'switch', 
    THIS: 'this', 
    THROW: 'throw', 
    TRY: 'try', 
    TYPEOF: 'typeof', 
    VAR: 'var', 
    VOID: 'void', 
    WHILE: 'while', 
    WITH: 'with', 
    CLASS: 'class', 
    CONST: 'const', 
    ENUM: 'enum', 
    EXPORT: 'export', 
    EXTENDS: 'extends', 
    IMPORT: 'import', 
    SUPER: 'super', 
    IMPLEMENTS: 'implements', 
    INTERFACE: 'interface', 
    LET: 'let', 
    PACKAGE: 'package', 
    PRIVATE: 'private', 
    PROTECTED: 'protected', 
    PUBLIC: 'public', 
    STATIC: 'static', 
    YIELD: 'yield', 
    OPEN_CURLY: '{', 
    CLOSE_CURLY: '}', 
    OPEN_PAREN: '(', 
    CLOSE_PAREN: ')', 
    OPEN_SQUARE: '[', 
    CLOSE_SQUARE: ']', 
    PERIOD: '.', 
    PERIOD_OPEN_CURLY: '.{', 
    SEMI_COLON: ';', 
    COMMA: ',', 
    OPEN_ANGLE: '<', 
    CLOSE_ANGLE: '>', 
    LESS_EQUAL: '<=', 
    GREATER_EQUAL: '>=', 
    EQUAL_EQUAL: '==', 
    NOT_EQUAL: '!=', 
    EQUAL_EQUAL_EQUAL: '===', 
    NOT_EQUAL_EQUAL: '!==', 
    PLUS: '+', 
    MINUS: '-', 
    STAR: '*', 
    PERCENT: '%', 
    PLUS_PLUS: '++', 
    MINUS_MINUS: '--', 
    LEFT_SHIFT: '<<', 
    RIGHT_SHIFT: '>>', 
    UNSIGNED_RIGHT_SHIFT: '>>>', 
    AMPERSAND: '&', 
    BAR: '|', 
    CARET: '^', 
    BANG: '!', 
    TILDE: '~', 
    AND: '&&', 
    OR: '||', 
    QUESTION: '?', 
    COLON: ':', 
    EQUAL: '=', 
    PLUS_EQUAL: '+=', 
    MINUS_EQUAL: '-=', 
    STAR_EQUAL: '*=', 
    PERCENT_EQUAL: '%=', 
    LEFT_SHIFT_EQUAL: '<<=', 
    RIGHT_SHIFT_EQUAL: '>>=', 
    UNSIGNED_RIGHT_SHIFT_EQUAL: '>>>=', 
    AMPERSAND_EQUAL: '&=', 
    BAR_EQUAL: '|=', 
    CARET_EQUAL: '^=', 
    SLASH: '/', 
    SLASH_EQUAL: '/=', 
    NULL: 'null', 
    TRUE: 'true', 
    FALSE: 'false', 
    NUMBER: 'number literal', 
    STRING: 'string literal', 
    REGULAR_EXPRESSION: 'regular expression literal', 
    DOT_DOT_DOT: '...', 
    AWAIT: 'await', 
    ARROW: '=>', 
    BACK_QUOTE: '`', 
    DOLLAR: '$', 
    QUASI_LITERAL_PORTION: 'quasi literal portion', 
    AT_NAME: 'at name' 
  }; 
  return Object.preventExtensions(Object.create(null, { TokenType: { 
      get: function() { 
        return TokenType; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_module_ImportStarVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ModuleVisitor = $src_codegeneration_module_ModuleVisitor_js, ModuleVisitor = destructuring$ModuleVisitor.ModuleVisitor; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var ImportStarVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter, project, module) { 
      traceur.runtime.superCall(this, ImportStarVisitor, "constructor",[reporter, project, module]); 
    }, 
    visitImportBinding: function(tree) { 
      var importSpecifierSet = tree.importSpecifierSet; 
      if(importSpecifierSet.type === ParseTreeType.IMPORT_SPECIFIER_SET && importSpecifierSet.specifiers.type === TokenType.STAR) { 
        var module = this.getModuleForModuleExpression(tree.moduleExpression); 
        this.project.setModuleForStarTree(importSpecifierSet, module); 
      } 
    } 
  }, ModuleVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ImportStarVisitor: { 
      get: function() { 
        return ImportStarVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_module_ModuleDeclarationVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ModuleVisitor = $src_codegeneration_module_ModuleVisitor_js, ModuleVisitor = destructuring$ModuleVisitor.ModuleVisitor; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var ModuleDeclarationVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter, project, module) { 
      traceur.runtime.superCall(this, ModuleDeclarationVisitor, "constructor",[reporter, project, module]); 
    }, 
    visitModuleSpecifier: function(tree) { 
      var name = tree.identifier.value; 
      var parent = this.currentModule; 
      var module = this.getModuleForModuleExpression(tree.expression); 
      if(! module) { 
        return; 
      } 
      parent.addModuleWithName(module, name); 
    } 
  }, ModuleVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ModuleDeclarationVisitor: { 
      get: function() { 
        return ModuleDeclarationVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_symbols_ModuleSymbol_js =(function() { 
  "use strict"; 
  var destructuring$Symbol = $src_semantics_symbols_Symbol_js, Symbol = destructuring$Symbol.Symbol; 
  var destructuring$SymbolType = $src_semantics_symbols_SymbolType_js, SymbolType = destructuring$SymbolType.SymbolType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function ModuleSymbol(name, parent, tree, url) { 
    Symbol.call(this, SymbolType.MODULE, tree, name); 
    this.children_ = Object.create(null); 
    this.exports_ = Object.create(null); 
    this.parent = parent; 
    this.tree = tree; 
    if(! url) { 
      console.error('Missing URL'); 
    } 
    this.url = url; 
  } 
  ModuleSymbol.prototype = createObject(Symbol.prototype, { 
    addModule: function(module) { 
      this.addModuleWithName(module, module.name); 
    }, 
    addModuleWithName: function(module, name) { 
      this.children_[name]= module; 
    }, 
    hasModule: function(name) { 
      return name in this.children_; 
    }, 
    getModule: function(name) { 
      return this.children_[name]; 
    }, 
    hasExport: function(name) { 
      return name in this.exports_; 
    }, 
    getExport: function(name) { 
      return this.exports_[name]; 
    }, 
    addExport: function(name, exp) { 
      this.exports_[name]= exp; 
    }, 
    getExports: function() { 
      var exports = this.exports_; 
      return Object.keys(exports).map((function(key) { 
        return exports[key]; 
      })); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ModuleSymbol: { 
      get: function() { 
        return ModuleSymbol; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_module_ModuleDefinitionVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ModuleSymbol = $src_semantics_symbols_ModuleSymbol_js, ModuleSymbol = destructuring$ModuleSymbol.ModuleSymbol; 
  var destructuring$ModuleVisitor = $src_codegeneration_module_ModuleVisitor_js, ModuleVisitor = destructuring$ModuleVisitor.ModuleVisitor; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var ModuleDefinitionVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter, project, module) { 
      traceur.runtime.superCall(this, ModuleDefinitionVisitor, "constructor",[reporter, project, module]); 
    }, 
    visitModuleDefinition: function(tree) { 
      var name = tree.name.value; 
      if(this.checkForDuplicateModule_(name, tree)) { 
        var parent = this.currentModule; 
        var module = new ModuleSymbol(name, parent, tree, parent.url); 
        parent.addModule(module); 
      } 
      traceur.runtime.superCall(this, ModuleDefinitionVisitor, "visitModuleDefinition",[tree]); 
    } 
  }, ModuleVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ModuleDefinitionVisitor: { 
      get: function() { 
        return ModuleDefinitionVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_module_ValidationVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ModuleVisitor = $src_codegeneration_module_ModuleVisitor_js, ModuleVisitor = destructuring$ModuleVisitor.ModuleVisitor; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function getFriendlyName(module) { 
    return module.name || "'" + module.url + "'"; 
  } 
  function ValidationVisitor(reporter, project, module) { 
    ModuleVisitor.call(this, reporter, project, module); 
  } 
  ValidationVisitor.prototype = createObject(ModuleVisitor.prototype, { 
    checkExport_: function(tree, name) { 
      if(this.validatingModule_ && ! this.validatingModule_.hasExport(name)) { 
        this.reportError_(tree, '\'%s\' is not exported by %s', name, getFriendlyName(this.validatingModule_)); 
      } 
    }, 
    visitAndValidate_: function(module, tree) { 
      var validatingModule = this.validatingModule_; 
      this.validatingModule_ = module; 
      this.visitAny(tree); 
      this.validatingModule_ = validatingModule; 
    }, 
    visitExportMapping: function(tree) { 
      if(tree.moduleExpression) { 
        this.visitAny(tree.moduleExpression); 
        var module = this.getModuleForModuleExpression(tree.moduleExpression); 
        this.visitAndValidate_(module, tree.specifierSet); 
      } 
    }, 
    visitExportSpecifier: function(tree) { 
      this.checkExport_(tree, tree.lhs.value); 
    }, 
    visitIdentifierExpression: function(tree) { 
      this.checkExport_(tree, tree.identifierToken.value); 
    }, 
    visitModuleExpression: function(tree) { 
      this.getModuleForModuleExpression(tree, true); 
    }, 
    visitImportBinding: function(tree) { 
      var module = this.getModuleForModuleExpression(tree.moduleExpression, true); 
      this.visitAndValidate_(module, tree.importSpecifierSet); 
    }, 
    visitImportSpecifier: function(tree) { 
      this.checkExport_(tree, tree.lhs.value); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ValidationVisitor: { 
      get: function() { 
        return ValidationVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_ModuleAnalyzer_js =(function() { 
  "use strict"; 
  var destructuring$ExportVisitor = $src_codegeneration_module_ExportVisitor_js, ExportVisitor = destructuring$ExportVisitor.ExportVisitor; 
  var destructuring$ImportStarVisitor = $src_codegeneration_module_ImportStarVisitor_js, ImportStarVisitor = destructuring$ImportStarVisitor.ImportStarVisitor; 
  var destructuring$ModuleDeclarationVisitor = $src_codegeneration_module_ModuleDeclarationVisitor_js, ModuleDeclarationVisitor = destructuring$ModuleDeclarationVisitor.ModuleDeclarationVisitor; 
  var destructuring$ModuleDefinitionVisitor = $src_codegeneration_module_ModuleDefinitionVisitor_js, ModuleDefinitionVisitor = destructuring$ModuleDefinitionVisitor.ModuleDefinitionVisitor; 
  var destructuring$ValidationVisitor = $src_codegeneration_module_ValidationVisitor_js, ValidationVisitor = destructuring$ValidationVisitor.ValidationVisitor; 
  function ModuleAnalyzer(reporter, project) { 
    this.reporter_ = reporter; 
    this.project_ = project; 
  } 
  ModuleAnalyzer.prototype = { 
    analyze: function() { 
      this.analyzeTrees(this.project_.getSourceTrees()); 
    }, 
    analyzeFile: function(sourceFile) { 
      var trees =[this.project_.getParseTree(sourceFile)]; 
      this.analyzeTrees(trees); 
    }, 
    analyzeTrees: function(trees) { 
      this.analyzeModuleTrees(trees); 
    }, 
    analyzeModuleTrees: function(trees, opt_roots) { 
      var reporter = this.reporter_; 
      var project = this.project_; 
      var root = project.getRootModule(); 
      function getRoot(i) { 
        return opt_roots ? opt_roots[i]: root; 
      } 
      function doVisit(ctor) { 
        for(var i = 0; i < trees.length; i ++) { 
          var visitor = new ctor(reporter, project, getRoot(i)); 
          visitor.visitAny(trees[i]); 
        } 
      } 
      doVisit(ModuleDefinitionVisitor); 
      doVisit(ExportVisitor); 
      doVisit(ModuleDeclarationVisitor); 
      doVisit(ValidationVisitor); 
      doVisit(ImportStarVisitor); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { ModuleAnalyzer: { 
      get: function() { 
        return ModuleAnalyzer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_ArrayMap_js =(function() { 
  "use strict"; 
  var ArrayMap = traceur.runtime.createClass({ 
    constructor: function() { 
      this.values_ =[]; 
      this.keys_ =[]; 
    }, 
    has: function(key) { 
      return this.keys_.indexOf(key) != - 1; 
    }, 
    get: function(key) { 
      var index = this.keys_.indexOf(key); 
      if(index == - 1) { 
        return undefined; 
      } 
      return this.values_[index]; 
    }, 
    put: function(key, value) { 
      var index = this.keys_.indexOf(key); 
      if(index == - 1) { 
        this.keys_.push(key); 
        this.values_.push(value); 
      } else { 
        this.values_[index]= value; 
      } 
    }, 
    addAll: function(other) { 
      var keys = other.keys(); 
      var values = other.values(); 
      for(var i = 0; i < keys.length; i ++) { 
        this.put(keys[i], values[i]); 
      } 
    }, 
    remove: function(key) { 
      var index = this.keys_.indexOf(key); 
      if(index == - 1) { 
        return; 
      } 
      this.keys_.splice(index, 1); 
      this.values_.splice(index, 1); 
    }, 
    keys: function() { 
      return this.keys_.concat(); 
    }, 
    values: function() { 
      return this.values_.concat(); 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { ArrayMap: { 
      get: function() { 
        return ArrayMap; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_ObjectMap_js =(function() { 
  "use strict"; 
  var ObjectMap = traceur.runtime.createClass({ 
    constructor: function() { 
      this.keys_ = Object.create(null); 
      this.values_ = Object.create(null); 
    }, 
    put: function(key, value) { 
      var uid = key.uid; 
      this.keys_[uid]= key; 
      this.values_[uid]= value; 
    }, 
    get: function(key) { 
      return this.values_[key.uid]; 
    }, 
    has: function(key) { 
      return key.uid in this.keys_; 
    }, 
    addAll: function(other) { 
      for(var uid in other.keys_) { 
        this.keys_[uid]= other.keys_[uid]; 
        this.values_[uid]= other.values_[uid]; 
      } 
    }, 
    keys: function() { 
      return Object.keys(this.keys_).map((function(uid) { 
        return this.keys_[uid]; 
      }).bind(this)); 
    }, 
    values: function() { 
      return Object.keys(this.values_).map((function(uid) { 
        return this.values_[uid]; 
      }).bind(this)); 
    }, 
    remove: function(key) { 
      var uid = key.uid; 
      delete this.keys_[uid]; 
      delete this.values_[uid]; 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { ObjectMap: { 
      get: function() { 
        return ObjectMap; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_ErrorReporter_js =(function() { 
  "use strict"; 
  var ErrorReporter = traceur.runtime.createClass({ 
    constructor: function() { 
      this.hadError_ = false; 
    }, 
    reportError: function(location, format, var_args) { 
      this.hadError_ = true; 
      var args = Array.prototype.slice.call(arguments, 2); 
      this.reportMessageInternal(location, 'error', format, args); 
    }, 
    reportWarning: function(location, format, var_args) { 
      var args = Array.prototype.slice.call(arguments, 2); 
      this.reportMessageInternal(location, 'warn', format, args); 
    }, 
    reportMessageInternal: function(location, kind, format, args) { 
      if(location) format = location + ': ' + format; 
      console[kind].apply(console,[format].concat(args)); 
    }, 
    hadError: function() { 
      return this.hadError_; 
    }, 
    clearError: function() { 
      this.hadError_ = false; 
    } 
  }, null, true, false); 
  ErrorReporter.format = function(location, text, opt_args) { 
    var i = 0; 
    text = text.replace(/%./g, function(s) { 
      switch(s) { 
        case '%s': 
          return opt_args && opt_args[i ++]; 

        case '%%': 
          return '%'; 

      } 
      return s; 
    }); 
    if(location) text = location + ': ' + text; 
    return text; 
  }; 
  return Object.preventExtensions(Object.create(null, { ErrorReporter: { 
      get: function() { 
        return ErrorReporter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_MutedErrorReporter_js =(function() { 
  "use strict"; 
  var destructuring$ErrorReporter = $src_util_ErrorReporter_js, ErrorReporter = destructuring$ErrorReporter.ErrorReporter; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var MutedErrorReporter = traceur.runtime.createClass({ 
    constructor: function() { }, 
    reportMessageInternal: function(location, message) { } 
  }, ErrorReporter, true, true); 
  return Object.preventExtensions(Object.create(null, { MutedErrorReporter: { 
      get: function() { 
        return MutedErrorReporter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_trees_NullTree_js =(function() { 
  "use strict"; 
  var destructuring$ParseTree$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTree = destructuring$ParseTree$ParseTreeType.ParseTree, ParseTreeType = destructuring$ParseTree$ParseTreeType.ParseTreeType; 
  var instance; 
  ParseTreeType.NULL_TREE = 'NULL_TREE'; 
  function NullTree() { 
    if(instance) return instance; 
    ParseTree.call(this, ParseTreeType.NULL_TREE, null); 
    instance = this; 
  } 
  NullTree.prototype = Object.create(ParseTree.prototype); 
  return Object.preventExtensions(Object.create(null, { NullTree: { 
      get: function() { 
        return NullTree; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_trees_ParseTrees_js =(function() { 
  "use strict"; 
  var destructuring$NullTree = $src_syntax_trees_NullTree_js, NullTree = destructuring$NullTree.NullTree; 
  var destructuring$ParseTree$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTree = destructuring$ParseTree$ParseTreeType.ParseTree, ParseTreeType = destructuring$ParseTree$ParseTreeType.ParseTreeType; 
  function create(var_args) { 
    var args = arguments; 
    var Tree = function(location) { 
      ParseTree.call(this, this.type, location); 
      for(var i = 0; i < args.length; i ++) { 
        this[args[i]]= arguments[i + 1]; 
      } 
    }; 
    Tree.prototype = Object.create(ParseTree.prototype); 
    return Tree; 
  } 
  var trees = { 
    ArgumentList: create('args'), 
    ArrayComprehension: create('expression', 'comprehensionForList', 'ifExpression'), 
    ArrayLiteralExpression: create('elements'), 
    ArrayPattern: create('elements'), 
    ArrowFunctionExpression: create('formalParameters', 'functionBody'), 
    AtNameExpression: create('atNameToken'), 
    AtNameDeclaration: create('atNameToken', 'initializer'), 
    AwaitStatement: create('identifier', 'expression'), 
    BinaryOperator: create('left', 'operator', 'right'), 
    BindThisParameter: create('expression'), 
    BindingIdentifier: create('identifierToken'), 
    BindingElement: create('binding', 'initializer'), 
    Block: create('statements'), 
    BreakStatement: create('name'), 
    CallExpression: create('operand', 'args'), 
    CascadeExpression: create('operand', 'expressions'), 
    CaseClause: create('expression', 'statements'), 
    Catch: create('binding', 'catchBody'), 
    ClassDeclaration: create('name', 'superClass', 'elements'), 
    ClassExpression: create('name', 'superClass', 'elements'), 
    CommaExpression: create('expressions'), 
    ComprehensionFor: create('left', 'iterator'), 
    ConditionalExpression: create('condition', 'left', 'right'), 
    ContinueStatement: create('name'), 
    DebuggerStatement: create(), 
    DefaultClause: create('statements'), 
    DoWhileStatement: create('body', 'condition'), 
    EmptyStatement: create(), 
    ExportDeclaration: create('declaration'), 
    ExportMappingList: create('paths'), 
    ExportMapping: create('moduleExpression', 'specifierSet'), 
    ExportSpecifier: create('lhs', 'rhs'), 
    ExportSpecifierSet: create('specifiers'), 
    ExpressionStatement: create('expression'), 
    Finally: create('block'), 
    ForOfStatement: create('initializer', 'collection', 'body'), 
    ForInStatement: create('initializer', 'collection', 'body'), 
    FormalParameterList: create('parameters'), 
    ForStatement: create('initializer', 'condition', 'increment', 'body'), 
    FunctionDeclaration: create('name', 'isGenerator', 'formalParameterList', 'functionBody'), 
    GeneratorComprehension: create('expression', 'comprehensionForList', 'ifExpression'), 
    GetAccessor: create('propertyName', 'body'), 
    IdentifierExpression: create('identifierToken'), 
    IfStatement: create('condition', 'ifClause', 'elseClause'), 
    ImportDeclaration: create('importPathList'), 
    ImportBinding: create('moduleExpression', 'importSpecifierSet'), 
    ImportSpecifier: create('lhs', 'rhs'), 
    ImportSpecifierSet: create('specifiers'), 
    LabelledStatement: create('name', 'statement'), 
    LiteralExpression: create('literalToken'), 
    MemberExpression: create('operand', 'memberName'), 
    MemberLookupExpression: create('operand', 'memberExpression'), 
    MissingPrimaryExpression: create('nextToken'), 
    ModuleDeclaration: create('specifiers'), 
    ModuleDefinition: create('name', 'elements'), 
    ModuleExpression: create('reference', 'identifiers'), 
    ModuleRequire: create('url'), 
    ModuleSpecifier: create('identifier', 'expression'), 
    NameStatement: create('declarations'), 
    NewExpression: create('operand', 'args'), 
    ObjectLiteralExpression: create('propertyNameAndValues'), 
    ObjectPatternField: create('identifier', 'element'), 
    ObjectPattern: create('fields'), 
    ParenExpression: create('expression'), 
    PostfixExpression: create('operand', 'operator'), 
    Program: create('programElements'), 
    PropertyMethodAssignment: create('name', 'isGenerator', 'formalParameterList', 'functionBody'), 
    PropertyNameAssignment: create('name', 'value'), 
    PropertyNameShorthand: create('name'), 
    QuasiLiteralExpression: create('operand', 'elements'), 
    QuasiLiteralPortion: create('value'), 
    QuasiSubstitution: create('expression'), 
    RequiresMember: create('name'), 
    RestParameter: create('identifier'), 
    ReturnStatement: create('expression'), 
    SetAccessor: create('propertyName', 'parameter', 'body'), 
    SpreadExpression: create('expression'), 
    SpreadPatternElement: create('lvalue'), 
    SuperExpression: create(), 
    SwitchStatement: create('expression', 'caseClauses'), 
    ThisExpression: create(), 
    ThrowStatement: create('value'), 
    TryStatement: create('body', 'catchBlock', 'finallyBlock'), 
    UnaryExpression: create('operator', 'operand'), 
    VariableDeclarationList: create('declarationType', 'declarations'), 
    VariableDeclaration: create('lvalue', 'initializer'), 
    VariableStatement: create('declarations'), 
    WhileStatement: create('condition', 'body'), 
    WithStatement: create('expression', 'body'), 
    YieldStatement: create('expression', 'isYieldFor') 
  }; 
  function getEnumName(name) { 
    return name[0]+ name.slice(1).replace(/([A-Z])/g, '_$1').toUpperCase(); 
  } 
  Object.keys(trees).forEach((function(name) { 
    var enumName = getEnumName(name); 
    trees[name].prototype.type = ParseTreeType[enumName]= enumName; 
  })); 
  trees.NullTree = NullTree; 
  trees.ParseTreeType = ParseTreeType; 
  trees.ParseTree = ParseTree; 
  return Object.preventExtensions(Object.create(null, { trees: { 
      get: function() { 
        return trees; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ParseTreeTransformer_js =(function() { 
  "use strict"; 
  var destructuring$getTreeNameForType = $src_syntax_trees_ParseTree_js, getTreeNameForType = destructuring$getTreeNameForType.getTreeNameForType; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var ArgumentList = trees.ArgumentList; 
  var ArrayComprehension = trees.ArrayComprehension; 
  var ArrayLiteralExpression = trees.ArrayLiteralExpression; 
  var ArrayPattern = trees.ArrayPattern; 
  var ArrowFunctionExpression = trees.ArrowFunctionExpression; 
  var AtNameExpression = trees.AtNameExpression; 
  var AtNameDeclaration = trees.AtNameDeclaration; 
  var AwaitStatement = trees.AwaitStatement; 
  var BinaryOperator = trees.BinaryOperator; 
  var BindThisParameter = trees.BindThisParameter; 
  var BindingElement = trees.BindingElement; 
  var Block = trees.Block; 
  var CallExpression = trees.CallExpression; 
  var CascadeExpression = trees.CascadeExpression; 
  var CaseClause = trees.CaseClause; 
  var Catch = trees.Catch; 
  var ClassDeclaration = trees.ClassDeclaration; 
  var ClassExpression = trees.ClassExpression; 
  var CommaExpression = trees.CommaExpression; 
  var ComprehensionFor = trees.ComprehensionFor; 
  var ConditionalExpression = trees.ConditionalExpression; 
  var DefaultClause = trees.DefaultClause; 
  var DoWhileStatement = trees.DoWhileStatement; 
  var ExportDeclaration = trees.ExportDeclaration; 
  var ExportMapping = trees.ExportMapping; 
  var ExportMappingList = trees.ExportMappingList; 
  var ExportSpecifier = trees.ExportSpecifier; 
  var ExportSpecifierSet = trees.ExportSpecifierSet; 
  var ExpressionStatement = trees.ExpressionStatement; 
  var Finally = trees.Finally; 
  var ForInStatement = trees.ForInStatement; 
  var ForOfStatement = trees.ForOfStatement; 
  var ForStatement = trees.ForStatement; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GeneratorComprehension = trees.GeneratorComprehension; 
  var GetAccessor = trees.GetAccessor; 
  var IfStatement = trees.IfStatement; 
  var ImportBinding = trees.ImportBinding; 
  var ImportDeclaration = trees.ImportDeclaration; 
  var LabelledStatement = trees.LabelledStatement; 
  var MemberExpression = trees.MemberExpression; 
  var MemberLookupExpression = trees.MemberLookupExpression; 
  var ModuleDeclaration = trees.ModuleDeclaration; 
  var ModuleDefinition = trees.ModuleDefinition; 
  var ModuleExpression = trees.ModuleExpression; 
  var ModuleSpecifier = trees.ModuleSpecifier; 
  var NameStatement = trees.NameStatement; 
  var NewExpression = trees.NewExpression; 
  var ObjectLiteralExpression = trees.ObjectLiteralExpression; 
  var ObjectPattern = trees.ObjectPattern; 
  var ObjectPatternField = trees.ObjectPatternField; 
  var ParenExpression = trees.ParenExpression; 
  var PostfixExpression = trees.PostfixExpression; 
  var Program = trees.Program; 
  var PropertyMethodAssignment = trees.PropertyMethodAssignment; 
  var PropertyNameAssignment = trees.PropertyNameAssignment; 
  var QuasiLiteralExpression = trees.QuasiLiteralExpression; 
  var QuasiSubstitution = trees.QuasiSubstitution; 
  var ReturnStatement = trees.ReturnStatement; 
  var SetAccessor = trees.SetAccessor; 
  var SpreadExpression = trees.SpreadExpression; 
  var SpreadPatternElement = trees.SpreadPatternElement; 
  var SwitchStatement = trees.SwitchStatement; 
  var ThrowStatement = trees.ThrowStatement; 
  var TryStatement = trees.TryStatement; 
  var UnaryExpression = trees.UnaryExpression; 
  var VariableDeclaration = trees.VariableDeclaration; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableStatement = trees.VariableStatement; 
  var WhileStatement = trees.WhileStatement; 
  var WithStatement = trees.WithStatement; 
  var YieldStatement = trees.YieldStatement; 
  function ParseTreeTransformer() { } 
  ParseTreeTransformer.prototype = { 
    transformAny: function(tree) { 
      if(tree == null) { 
        return null; 
      } 
      var name = getTreeNameForType(tree.type); 
      return this['transform' + name](tree); 
    }, 
    transformList: function(list) { 
      if(list == null || list.length == 0) { 
        return list; 
      } 
      var builder = null; 
      for(var index = 0; index < list.length; index ++) { 
        var element = list[index]; 
        var transformed = this.transformAny(element); 
        if(builder != null || element != transformed) { 
          if(builder == null) { 
            builder = list.slice(0, index); 
          } 
          builder.push(transformed); 
        } 
      } 
      return builder || list; 
    }, 
    toSourceElement: function(tree) { 
      return tree.isSourceElement() ? tree: new ExpressionStatement(tree.location, tree); 
    }, 
    transformSourceElements: function(list) { 
      if(list == null || list.length == 0) { 
        return list; 
      } 
      var builder = null; 
      for(var index = 0; index < list.length; index ++) { 
        var element = list[index]; 
        var transformed = this.toSourceElement(this.transformAny(element)); 
        if(builder != null || element != transformed) { 
          if(builder == null) { 
            builder = list.slice(0, index); 
          } 
          builder.push(transformed); 
        } 
      } 
      return builder || list; 
    }, 
    transformArgumentList: function(tree) { 
      var args = this.transformList(tree.args); 
      if(args == tree.args) { 
        return tree; 
      } 
      return new ArgumentList(tree.location, args); 
    }, 
    transformArrayComprehension: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var comprehensionForList = this.transformList(tree.comprehensionForList); 
      var ifExpression = this.transformAny(tree.ifExpression); 
      if(expression === tree.expression && comprehensionForList === tree.comprehensionForList && ifExpression === tree.ifExpression) { 
        return tree; 
      } 
      return new ArrayComprehension(tree.location, expression, comprehensionForList, ifExpression); 
    }, 
    transformArrayLiteralExpression: function(tree) { 
      var elements = this.transformList(tree.elements); 
      if(elements == tree.elements) { 
        return tree; 
      } 
      return new ArrayLiteralExpression(tree.location, elements); 
    }, 
    transformArrayPattern: function(tree) { 
      var elements = this.transformList(tree.elements); 
      if(elements == tree.elements) { 
        return tree; 
      } 
      return new ArrayPattern(tree.location, elements); 
    }, 
    transformArrowFunctionExpression: function(tree) { 
      var parameters = this.transformAny(tree.formalParameters); 
      var body = this.transformAny(tree.functionBody); 
      if(parameters == tree.formalParameters && body == tree.functionBody) { 
        return tree; 
      } 
      return new ArrowFunctionExpression(null, parameters, body); 
    }, 
    transformAtNameExpression: function(tree) { 
      return tree; 
    }, 
    transformAtNameDeclaration: function(tree) { 
      var initializer = this.transformAny(tree.initializer); 
      if(initializer === tree.initializer) return tree; 
      return new AtNameDeclaration(tree.location, tree.atNameToken, initializer); 
    }, 
    transformAwaitStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(tree.expression == expression) { 
        return tree; 
      } 
      return new AwaitStatement(tree.location, tree.identifier, expression); 
    }, 
    transformBinaryOperator: function(tree) { 
      var left = this.transformAny(tree.left); 
      var right = this.transformAny(tree.right); 
      if(left == tree.left && right == tree.right) { 
        return tree; 
      } 
      return new BinaryOperator(tree.location, left, tree.operator, right); 
    }, 
    transformBindThisParameter: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(tree.expression == expression) { 
        return tree; 
      } 
      return new BindThisParameter(tree.location, expression); 
    }, 
    transformBindingElement: function(tree) { 
      var binding = this.transformAny(tree.binding); 
      var initializer = this.transformAny(tree.initializer); 
      if(binding === tree.binding && initializer === tree.initializer) return tree; 
      return new BindingElement(tree.location, binding, initializer); 
    }, 
    transformBindingIdentifier: function(tree) { 
      return tree; 
    }, 
    transformBlock: function(tree) { 
      var elements = this.transformList(tree.statements); 
      if(elements == tree.statements) { 
        return tree; 
      } 
      return new Block(tree.location, elements); 
    }, 
    transformBreakStatement: function(tree) { 
      return tree; 
    }, 
    transformCallExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var args = this.transformAny(tree.args); 
      if(operand == tree.operand && args == tree.args) { 
        return tree; 
      } 
      return new CallExpression(tree.location, operand, args); 
    }, 
    transformCaseClause: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var statements = this.transformList(tree.statements); 
      if(expression == tree.expression && statements == tree.statements) { 
        return tree; 
      } 
      return new CaseClause(tree.location, expression, statements); 
    }, 
    transformCatch: function(tree) { 
      var catchBody = this.transformAny(tree.catchBody); 
      var binding = this.transformAny(tree.binding); 
      if(catchBody == tree.catchBody && binding == tree.binding) { 
        return tree; 
      } 
      return new Catch(tree.location, binding, catchBody); 
    }, 
    transformCascadeExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var expressions = this.transformList(tree.expressions); 
      if(operand == tree.operand && expressions == tree.expressions) { 
        return tree; 
      } 
      return new CascadeExpression(tree.location, operand, expressions); 
    }, 
    transformClassDeclaration: function(tree) { 
      var superClass = this.transformAny(tree.superClass); 
      var elements = this.transformList(tree.elements); 
      if(superClass == tree.superClass && elements == tree.elements) return tree; 
      return new ClassDeclaration(tree.location, tree.name, superClass, elements); 
    }, 
    transformClassExpression: function(tree) { 
      var superClass = this.transformAny(tree.superClass); 
      var elements = this.transformList(tree.elements); 
      if(superClass == tree.superClass && elements == tree.elements) return tree; 
      return new ClassExpression(tree.location, tree.name, superClass, elements); 
    }, 
    transformCommaExpression: function(tree) { 
      var expressions = this.transformList(tree.expressions); 
      if(expressions == tree.expressions) { 
        return tree; 
      } 
      return new CommaExpression(tree.location, expressions); 
    }, 
    transformComprehensionFor: function(tree) { 
      var left = this.transformAny(tree.left); 
      var iterator = this.transformAny(tree.iterator); 
      if(left === tree.left && iterator === tree.iterator) return tree; 
      return new ComprehensionFor(tree.location, left, iterator); 
    }, 
    transformConditionalExpression: function(tree) { 
      var condition = this.transformAny(tree.condition); 
      var left = this.transformAny(tree.left); 
      var right = this.transformAny(tree.right); 
      if(condition == tree.condition && left == tree.left && right == tree.right) { 
        return tree; 
      } 
      return new ConditionalExpression(tree.location, condition, left, right); 
    }, 
    transformContinueStatement: function(tree) { 
      return tree; 
    }, 
    transformDebuggerStatement: function(tree) { 
      return tree; 
    }, 
    transformDefaultClause: function(tree) { 
      var statements = this.transformList(tree.statements); 
      if(statements == tree.statements) { 
        return tree; 
      } 
      return new DefaultClause(tree.location, statements); 
    }, 
    transformDoWhileStatement: function(tree) { 
      var body = this.transformAny(tree.body); 
      var condition = this.transformAny(tree.condition); 
      if(body == tree.body && condition == tree.condition) { 
        return tree; 
      } 
      return new DoWhileStatement(tree.location, body, condition); 
    }, 
    transformEmptyStatement: function(tree) { 
      return tree; 
    }, 
    transformExportDeclaration: function(tree) { 
      var declaration = this.transformAny(tree.declaration); 
      if(tree.declaration == declaration) { 
        return tree; 
      } 
      return new ExportDeclaration(tree.location, declaration); 
    }, 
    transformExportMappingList: function(tree) { 
      var paths = this.transformList(tree.paths); 
      if(paths == tree.paths) { 
        return tree; 
      } 
      return new ExportMappingList(tree.location, paths); 
    }, 
    transformExportMapping: function(tree) { 
      var moduleExpression = this.transformAny(tree.moduleExpression); 
      var specifierSet = this.transformAny(tree.specifierSet); 
      if(moduleExpression == tree.moduleExpression && specifierSet == tree.specifierSet) { 
        return tree; 
      } 
      return new ExportMapping(tree.location, moduleExpression, specifierSet); 
    }, 
    transformExportSpecifier: function(tree) { 
      return tree; 
    }, 
    transformExportSpecifierSet: function(tree) { 
      var specifiers = this.transformList(tree.specifiers); 
      if(specifiers == tree.specifiers) { 
        return tree; 
      } 
      return new ExportSpecifierSet(tree.location, specifiers); 
    }, 
    transformExpressionStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new ExpressionStatement(tree.location, expression); 
    }, 
    transformFinally: function(tree) { 
      var block = this.transformAny(tree.block); 
      if(block == tree.block) { 
        return tree; 
      } 
      return new Finally(tree.location, block); 
    }, 
    transformForOfStatement: function(tree) { 
      var initializer = this.transformAny(tree.initializer); 
      var collection = this.transformAny(tree.collection); 
      var body = this.transformAny(tree.body); 
      if(initializer == tree.initializer && collection == tree.collection && body == tree.body) { 
        return tree; 
      } 
      return new ForOfStatement(tree.location, initializer, collection, body); 
    }, 
    transformForInStatement: function(tree) { 
      var initializer = this.transformAny(tree.initializer); 
      var collection = this.transformAny(tree.collection); 
      var body = this.transformAny(tree.body); 
      if(initializer == tree.initializer && collection == tree.collection && body == tree.body) { 
        return tree; 
      } 
      return new ForInStatement(tree.location, initializer, collection, body); 
    }, 
    transformForStatement: function(tree) { 
      var initializer = this.transformAny(tree.initializer); 
      var condition = this.transformAny(tree.condition); 
      var increment = this.transformAny(tree.increment); 
      var body = this.transformAny(tree.body); 
      if(initializer == tree.initializer && condition == tree.condition && increment == tree.increment && body == tree.body) { 
        return tree; 
      } 
      return new ForStatement(tree.location, initializer, condition, increment, body); 
    }, 
    transformFormalParameterList: function(tree) { 
      var parameters = this.transformList(tree.parameters); 
      if(parameters == tree.parameters) return tree; 
      return new FormalParameterList(tree.location, parameters); 
    }, 
    transformFunctionDeclaration: function(tree) { 
      var formalParameterList = this.transformAny(tree.formalParameterList); 
      var functionBody = this.transformFunctionBody(tree.functionBody); 
      if(formalParameterList == tree.formalParameterList && functionBody == tree.functionBody) { 
        return tree; 
      } 
      return new FunctionDeclaration(tree.location, tree.name, tree.isGenerator, formalParameterList, functionBody); 
    }, 
    transformFunctionBody: function(tree) { 
      return this.transformAny(tree); 
    }, 
    transformGeneratorComprehension: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var comprehensionForList = this.transformList(tree.comprehensionForList); 
      var ifExpression = this.transformAny(tree.ifExpression); 
      if(expression === tree.expression && comprehensionForList === tree.comprehensionForList && ifExpression === tree.ifExpression) { 
        return tree; 
      } 
      return new GeneratorComprehension(tree.location, expression, comprehensionForList, ifExpression); 
    }, 
    transformGetAccessor: function(tree) { 
      var body = this.transformFunctionBody(tree.body); 
      if(body == tree.body) return tree; 
      return new GetAccessor(tree.location, tree.propertyName, body); 
    }, 
    transformIdentifierExpression: function(tree) { 
      return tree; 
    }, 
    transformIfStatement: function(tree) { 
      var condition = this.transformAny(tree.condition); 
      var ifClause = this.transformAny(tree.ifClause); 
      var elseClause = this.transformAny(tree.elseClause); 
      if(condition == tree.condition && ifClause == tree.ifClause && elseClause == tree.elseClause) { 
        return tree; 
      } 
      return new IfStatement(tree.location, condition, ifClause, elseClause); 
    }, 
    transformImportDeclaration: function(tree) { 
      var importPathList = this.transformList(tree.importPathList); 
      if(importPathList == tree.importPathList) { 
        return tree; 
      } 
      return new ImportDeclaration(tree.location, importPathList); 
    }, 
    transformImportBinding: function(tree) { 
      var moduleExpression = this.transformAny(tree.moduleExpression); 
      var importSpecifierSet = this.transformList(tree.importSpecifierSet); 
      if(moduleExpression == tree.moduleExpression && importSpecifierSet == tree.importSpecifierSet) { 
        return tree; 
      } 
      return new ImportBinding(tree.location, moduleExpression, importSpecifierSet); 
    }, 
    transformImportSpecifier: function(tree) { 
      return tree; 
    }, 
    transformLabelledStatement: function(tree) { 
      var statement = this.transformAny(tree.statement); 
      if(statement == tree.statement) { 
        return tree; 
      } 
      return new LabelledStatement(tree.location, tree.name, statement); 
    }, 
    transformLiteralExpression: function(tree) { 
      return tree; 
    }, 
    transformMemberExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      if(operand == tree.operand) { 
        return tree; 
      } 
      return new MemberExpression(tree.location, operand, tree.memberName); 
    }, 
    transformMemberLookupExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var memberExpression = this.transformAny(tree.memberExpression); 
      if(operand == tree.operand && memberExpression == tree.memberExpression) { 
        return tree; 
      } 
      return new MemberLookupExpression(tree.location, operand, memberExpression); 
    }, 
    transformMissingPrimaryExpression: function(tree) { 
      throw new Error('Should never transform trees that had errors during parse'); 
    }, 
    transformModuleDeclaration: function(tree) { 
      var specifiers = this.transformList(tree.specifiers); 
      if(specifiers == tree.specifiers) { 
        return tree; 
      } 
      return new ModuleDeclaration(tree.location, specifiers); 
    }, 
    transformModuleDefinition: function(tree) { 
      var elements = this.transformList(tree.elements); 
      if(elements == tree.elements) { 
        return tree; 
      } 
      return new ModuleDefinition(tree.location, tree.name, elements); 
    }, 
    transformModuleExpression: function(tree) { 
      var reference = this.transformAny(tree.reference); 
      if(reference == tree.reference) { 
        return tree; 
      } 
      return new ModuleExpression(tree.location, reference, tree.identifiers); 
    }, 
    transformModuleRequire: function(tree) { 
      return tree; 
    }, 
    transformModuleSpecifier: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new ModuleSpecifier(tree.location, tree.identifier, expression); 
    }, 
    transformNameStatement: function(tree) { 
      var declarations = this.transformList(tree.declarations); 
      if(declarations === tree.declarations) return tree; 
      return new NameStatement(tree.location, declarations); 
    }, 
    transformNewExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var args = this.transformAny(tree.args); 
      if(operand == tree.operand && args == tree.args) { 
        return tree; 
      } 
      return new NewExpression(tree.location, operand, args); 
    }, 
    transformNullTree: function(tree) { 
      return tree; 
    }, 
    transformObjectLiteralExpression: function(tree) { 
      var propertyNameAndValues = this.transformList(tree.propertyNameAndValues); 
      if(propertyNameAndValues == tree.propertyNameAndValues) { 
        return tree; 
      } 
      return new ObjectLiteralExpression(tree.location, propertyNameAndValues); 
    }, 
    transformObjectPattern: function(tree) { 
      var fields = this.transformList(tree.fields); 
      if(fields == tree.fields) { 
        return tree; 
      } 
      return new ObjectPattern(tree.location, fields); 
    }, 
    transformObjectPatternField: function(tree) { 
      var element = this.transformAny(tree.element); 
      if(element == tree.element) { 
        return tree; 
      } 
      return new ObjectPatternField(tree.location, tree.identifier, element); 
    }, 
    transformParenExpression: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new ParenExpression(tree.location, expression); 
    }, 
    transformPostfixExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      if(operand == tree.operand) { 
        return tree; 
      } 
      return new PostfixExpression(tree.location, operand, tree.operator); 
    }, 
    transformProgram: function(tree) { 
      var elements = this.transformList(tree.programElements); 
      if(elements == tree.programElements) { 
        return tree; 
      } 
      return new Program(tree.location, elements); 
    }, 
    transformPropertyMethodAssignment: function(tree) { 
      var parameters = this.transformAny(tree.formalParameterList); 
      var functionBody = this.transformFunctionBody(tree.functionBody); 
      if(parameters == tree.formalParameterList && functionBody == tree.functionBody) { 
        return tree; 
      } 
      return new PropertyMethodAssignment(tree.location, tree.name, tree.isGenerator, parameters, functionBody); 
    }, 
    transformPropertyNameAssignment: function(tree) { 
      var value = this.transformAny(tree.value); 
      if(value == tree.value) { 
        return tree; 
      } 
      return new PropertyNameAssignment(tree.location, tree.name, value); 
    }, 
    transformPropertyNameShorthand: function(tree) { 
      return tree; 
    }, 
    transformQuasiLiteralExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var elements = this.transformList(tree.elements); 
      if(operand === tree.operand && elements == tree.elements) return tree; 
      return new QuasiLiteralExpression(tree.location, operand, elements); 
    }, 
    transformQuasiLiteralPortion: function(tree) { 
      return tree; 
    }, 
    transformQuasiSubstitution: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new QuasiSubstitution(tree.location, expression); 
    }, 
    transformRequiresMember: function(tree) { 
      return tree; 
    }, 
    transformRestParameter: function(tree) { 
      return tree; 
    }, 
    transformReturnStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new ReturnStatement(tree.location, expression); 
    }, 
    transformSetAccessor: function(tree) { 
      var parameter = this.transformAny(tree.parameter); 
      var body = this.transformFunctionBody(tree.body); 
      if(parameter === tree.parameter && body === tree.body) return tree; 
      return new SetAccessor(tree.location, tree.propertyName, parameter, body); 
    }, 
    transformSpreadExpression: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new SpreadExpression(tree.location, expression); 
    }, 
    transformSpreadPatternElement: function(tree) { 
      var lvalue = this.transformAny(tree.lvalue); 
      if(lvalue == tree.lvalue) { 
        return tree; 
      } 
      return new SpreadPatternElement(tree.location, lvalue); 
    }, 
    transformStateMachine: function(tree) { 
      throw new Error(); 
    }, 
    transformSuperExpression: function(tree) { 
      return tree; 
    }, 
    transformSwitchStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var caseClauses = this.transformList(tree.caseClauses); 
      if(expression == tree.expression && caseClauses == tree.caseClauses) { 
        return tree; 
      } 
      return new SwitchStatement(tree.location, expression, caseClauses); 
    }, 
    transformThisExpression: function(tree) { 
      return tree; 
    }, 
    transformThrowStatement: function(tree) { 
      var value = this.transformAny(tree.value); 
      if(value == tree.value) { 
        return tree; 
      } 
      return new ThrowStatement(tree.location, value); 
    }, 
    transformTryStatement: function(tree) { 
      var body = this.transformAny(tree.body); 
      var catchBlock = this.transformAny(tree.catchBlock); 
      var finallyBlock = this.transformAny(tree.finallyBlock); 
      if(body == tree.body && catchBlock == tree.catchBlock && finallyBlock == tree.finallyBlock) { 
        return tree; 
      } 
      return new TryStatement(tree.location, body, catchBlock, finallyBlock); 
    }, 
    transformUnaryExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      if(operand == tree.operand) { 
        return tree; 
      } 
      return new UnaryExpression(tree.location, tree.operator, operand); 
    }, 
    transformVariableDeclaration: function(tree) { 
      var lvalue = this.transformAny(tree.lvalue); 
      var initializer = this.transformAny(tree.initializer); 
      if(lvalue == tree.lvalue && initializer == tree.initializer) { 
        return tree; 
      } 
      return new VariableDeclaration(tree.location, lvalue, initializer); 
    }, 
    transformVariableDeclarationList: function(tree) { 
      var declarations = this.transformList(tree.declarations); 
      if(declarations == tree.declarations) { 
        return tree; 
      } 
      return new VariableDeclarationList(tree.location, tree.declarationType, declarations); 
    }, 
    transformVariableStatement: function(tree) { 
      var declarations = this.transformAny(tree.declarations); 
      if(declarations == tree.declarations) { 
        return tree; 
      } 
      return new VariableStatement(tree.location, declarations); 
    }, 
    transformWhileStatement: function(tree) { 
      var condition = this.transformAny(tree.condition); 
      var body = this.transformAny(tree.body); 
      if(condition == tree.condition && body == tree.body) { 
        return tree; 
      } 
      return new WhileStatement(tree.location, condition, body); 
    }, 
    transformWithStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var body = this.transformAny(tree.body); 
      if(expression == tree.expression && body == tree.body) { 
        return tree; 
      } 
      return new WithStatement(tree.location, expression, body); 
    }, 
    transformYieldStatement: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var isYieldFor = tree.isYieldFor; 
      if(expression == tree.expression) { 
        return tree; 
      } 
      return new YieldStatement(tree.location, expression, isYieldFor); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { ParseTreeTransformer: { 
      get: function() { 
        return ParseTreeTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_Token_js =(function() { 
  "use strict"; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var Token = traceur.runtime.createClass({ 
    constructor: function(type, location) { 
      this.type = type; 
      this.location = location; 
    }, 
    toString: function() { 
      return this.type.toString(); 
    }, 
    isAssignmentOperator: function() { 
      switch(this.type) { 
        case TokenType.EQUAL: 
        case TokenType.STAR_EQUAL: 
        case TokenType.SLASH_EQUAL: 
        case TokenType.PERCENT_EQUAL: 
        case TokenType.PLUS_EQUAL: 
        case TokenType.MINUS_EQUAL: 
        case TokenType.LEFT_SHIFT_EQUAL: 
        case TokenType.RIGHT_SHIFT_EQUAL: 
        case TokenType.UNSIGNED_RIGHT_SHIFT_EQUAL: 
        case TokenType.AMPERSAND_EQUAL: 
        case TokenType.CARET_EQUAL: 
        case TokenType.BAR_EQUAL: 
          return true; 

        default: 
          return false; 

      } 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { Token: { 
      get: function() { 
        return Token; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_IdentifierToken_js =(function() { 
  "use strict"; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var IdentifierToken = traceur.runtime.createClass({ 
    constructor: function(location, value) { 
      traceur.runtime.superCall(this, IdentifierToken, "constructor",[TokenType.IDENTIFIER, location]); 
      this.value = value; 
    }, 
    toString: function() { 
      return this.value; 
    } 
  }, Token, true, true); 
  return Object.preventExtensions(Object.create(null, { IdentifierToken: { 
      get: function() { 
        return IdentifierToken; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_Keywords_js =(function() { 
  "use strict"; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var keywords =['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'class', 'const', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'null', 'true', 'false', 'await']; 
  var Keywords = { }; 
  var keywordsByName = Object.create(null); 
  var keywordsByType = Object.create(null); 
  var Keyword = traceur.runtime.createClass({ 
    constructor: function(value, type) { 
      this.value = value; 
      this.type = type; 
    }, 
    toString: function() { 
      return this.value; 
    } 
  }, null, true, false); 
  keywords.forEach((function(value) { 
    var uc = value.toUpperCase(); 
    if(uc.indexOf('__') === 0) { 
      uc = uc.substring(2); 
    } 
    var kw = new Keyword(value, TokenType[uc]); 
    Keywords[uc]= kw; 
    keywordsByName[kw.value]= kw; 
    keywordsByType[kw.type]= kw; 
  })); 
  Keywords.isKeyword = function(value) { 
    return value !== '__proto__' && value in keywordsByName; 
  }; 
  Keywords.getTokenType = function(value) { 
    if(value == '__proto__') return null; 
    return keywordsByName[value].type; 
  }; 
  Keywords.get = function(value) { 
    if(value == '__proto__') return null; 
    return keywordsByName[value]; 
  }; 
  return Object.preventExtensions(Object.create(null, { Keywords: { 
      get: function() { 
        return Keywords; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_PredefinedName_js =(function() { 
  "use strict"; 
  var PredefinedName = { 
    $ARGUMENTS: '$arguments', 
    $THAT: '$that', 
    $VALUE: '$value', 
    ADD_CONTINUATION: 'addContinuation', 
    APPLY: 'apply', 
    ARGUMENTS: 'arguments', 
    ARRAY: 'Array', 
    ASSERT_NAME: 'assertName', 
    BIND: 'bind', 
    CALL: 'call', 
    CALLBACK: 'callback', 
    CAPTURED_ARGUMENTS: '$arguments', 
    CAPTURED_THIS: '$this', 
    CAUGHT_EXCEPTION: '$caughtException', 
    CLOSE: 'close', 
    CONFIGURABLE: 'configurable', 
    CONSTRUCTOR: 'constructor', 
    CONTINUATION: '$continuation', 
    CREATE: 'create', 
    CREATE_CALLBACK: '$createCallback', 
    CREATE_CLASS: 'createClass', 
    CREATE_ERRBACK: '$createErrback', 
    CREATE_NAME: 'createName', 
    CREATE_PROMISE: 'createPromise', 
    CURRENT: 'current', 
    DEFERRED: 'Deferred', 
    DEFINE_PROPERTIES: 'defineProperties', 
    DEFINE_PROPERTY: 'defineProperty', 
    DELETE_PROPERTY: 'deleteProperty', 
    ELEMENT_DELETE: 'elementDelete', 
    ELEMENT_GET: 'elementGet', 
    ELEMENT_HAS: 'elementHas', 
    ELEMENT_SET: 'elementSet', 
    ENUMERABLE: 'enumerable', 
    ERR: '$err', 
    ERRBACK: 'errback', 
    FIELD_INITIALIZER_METHOD: '$field_initializer_', 
    FINALLY_FALL_THROUGH: '$finallyFallThrough', 
    FREEZE: 'freeze', 
    FROM: 'from', 
    GET: 'get', 
    GET_ITERATOR: 'getIterator', 
    GET_MODULE_INSTANCE_BY_URL: 'getModuleInstanceByUrl', 
    GET_PROPERTY: 'getProperty', 
    HAS: 'has', 
    INIT: '$init', 
    IS: 'is', 
    ISNT: 'isnt', 
    IS_DONE: 'isDone', 
    ITERATOR: 'iterator', 
    LENGTH: 'length', 
    MARK_AS_GENERATOR: 'markAsGenerator', 
    MARK_METHODS: 'markMethods', 
    MODULE: 'module', 
    MODULES: 'modules', 
    MOVE_NEXT: 'moveNext', 
    NEW: 'new', 
    NEW_STATE: '$newState', 
    OBJECT: 'Object', 
    OBJECT_NAME: 'Object', 
    OF: 'of', 
    PARAM: '$param', 
    PREVENT_EXTENSIONS: 'preventExtensions', 
    PROTO: '__proto__', 
    PROTOTYPE: 'prototype', 
    PUSH: 'push', 
    RAW: 'raw', 
    REQUIRE: 'require', 
    REQUIRED: 'required', 
    REQUIRES: 'requires', 
    RESOLVE: 'resolve', 
    RESULT: '$result', 
    RUNTIME: 'runtime', 
    SET: 'set', 
    SET_PROPERTY: 'setProperty', 
    SLICE: 'slice', 
    SPREAD: 'spread', 
    SPREAD_NEW: 'spreadNew', 
    STATE: '$state', 
    STORED_EXCEPTION: '$storedException', 
    SUPER_CALL: 'superCall', 
    SUPER_GET: 'superGet', 
    SUPER_SET: 'superSet', 
    THEN: 'then', 
    THIS: 'this', 
    TRACEUR: 'traceur', 
    TYPE_ERROR: 'TypeError', 
    UNDEFINED: 'undefined', 
    VALUE: 'value', 
    WAIT_TASK: '$waitTask', 
    WRITABLE: 'writable', 
    getParameterName: function(index) { 
      return '$' + index; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { PredefinedName: { 
      get: function() { 
        return PredefinedName; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_AtNameToken_js =(function() { 
  "use strict"; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var AtNameToken = traceur.runtime.createClass({ 
    constructor: function(location, value) { 
      traceur.runtime.superCall(this, AtNameToken, "constructor",[TokenType.AT_NAME, location]); 
      this.value = value; 
    }, 
    toString: function() { 
      return this.value; 
    } 
  }, Token, true, true); 
  return Object.preventExtensions(Object.create(null, { AtNameToken: { 
      get: function() { 
        return AtNameToken; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_LiteralToken_js =(function() { 
  "use strict"; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var LiteralToken = traceur.runtime.createClass({ 
    constructor: function(type, value, location) { 
      traceur.runtime.superCall(this, LiteralToken, "constructor",[type, location]); 
      this.value = value; 
    }, 
    toString: function() { 
      return this.value; 
    } 
  }, Token, true, true); 
  return Object.preventExtensions(Object.create(null, { LiteralToken: { 
      get: function() { 
        return LiteralToken; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_SourcePosition_js =(function() { 
  "use strict"; 
  var SourcePosition = traceur.runtime.createClass({ 
    constructor: function(source, offset, line, column) { 
      this.source = source; 
      this.offset = offset; 
      this.line = line; 
      this.column = column; 
    }, 
    toString: function() { 
      var name = this.source ? this.source.name: ''; 
      return("" + name + ":" +(this.line + 1) + ":" +(this.column + 1)); 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { SourcePosition: { 
      get: function() { 
        return SourcePosition; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_Scanner_js =(function() { 
  "use strict"; 
  var destructuring$AtNameToken = $src_syntax_AtNameToken_js, AtNameToken = destructuring$AtNameToken.AtNameToken; 
  var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
  var destructuring$Keywords = $src_syntax_Keywords_js, Keywords = destructuring$Keywords.Keywords; 
  var destructuring$LiteralToken = $src_syntax_LiteralToken_js, LiteralToken = destructuring$LiteralToken.LiteralToken; 
  var destructuring$SourcePosition = $src_util_SourcePosition_js, SourcePosition = destructuring$SourcePosition.SourcePosition; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  function isWhitespace(ch) { 
    switch(ch) { 
      case '\u0009': 
      case '\u000B': 
      case '\u000C': 
      case '\u0020': 
      case '\u00A0': 
      case '\uFEFF': 
      case '\n': 
      case '\r': 
      case '\u2028': 
      case '\u2029': 
        return true; 

      default: 
        return false; 

    } 
  } 
  function isLineTerminator(ch) { 
    switch(ch) { 
      case '\n': 
      case '\r': 
      case '\u2028': 
      case '\u2029': 
        return true; 

      default: 
        return false; 

    } 
  } 
  function isDecimalDigit(ch) { 
    var cc = ch.charCodeAt(0); 
    return cc >= 48 && cc <= 57; 
  } 
  function isHexDigit(ch) { 
    var cc = ch.charCodeAt(0); 
    return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102; 
  } 
  function isIdentifierStart(ch) { 
    switch(ch) { 
      case '$': 
      case '_': 
        return true; 

      default: 
        return isUnicodeLetter(ch); 

    } 
  } 
  var unicodeLetterTable =[[65, 90],[97, 122],[170, 170],[181, 181],[186, 186],[192, 214],[216, 246],[248, 705],[710, 721],[736, 740],[748, 748],[750, 750],[880, 884],[886, 887],[890, 893],[902, 902],[904, 906],[908, 908],[910, 929],[931, 1013],[1015, 1153],[1162, 1319],[1329, 1366],[1369, 1369],[1377, 1415],[1488, 1514],[1520, 1522],[1568, 1610],[1646, 1647],[1649, 1747],[1749, 1749],[1765, 1766],[1774, 1775],[1786, 1788],[1791, 1791],[1808, 1808],[1810, 1839],[1869, 1957],[1969, 1969],[1994, 2026],[2036, 2037],[2042, 2042],[2048, 2069],[2074, 2074],[2084, 2084],[2088, 2088],[2112, 2136],[2308, 2361],[2365, 2365],[2384, 2384],[2392, 2401],[2417, 2423],[2425, 2431],[2437, 2444],[2447, 2448],[2451, 2472],[2474, 2480],[2482, 2482],[2486, 2489],[2493, 2493],[2510, 2510],[2524, 2525],[2527, 2529],[2544, 2545],[2565, 2570],[2575, 2576],[2579, 2600],[2602, 2608],[2610, 2611],[2613, 2614],[2616, 2617],[2649, 2652],[2654, 2654],[2674, 2676],[2693, 2701],[2703, 2705],[2707, 2728],[2730, 2736],[2738, 2739],[2741, 2745],[2749, 2749],[2768, 2768],[2784, 2785],[2821, 2828],[2831, 2832],[2835, 2856],[2858, 2864],[2866, 2867],[2869, 2873],[2877, 2877],[2908, 2909],[2911, 2913],[2929, 2929],[2947, 2947],[2949, 2954],[2958, 2960],[2962, 2965],[2969, 2970],[2972, 2972],[2974, 2975],[2979, 2980],[2984, 2986],[2990, 3001],[3024, 3024],[3077, 3084],[3086, 3088],[3090, 3112],[3114, 3123],[3125, 3129],[3133, 3133],[3160, 3161],[3168, 3169],[3205, 3212],[3214, 3216],[3218, 3240],[3242, 3251],[3253, 3257],[3261, 3261],[3294, 3294],[3296, 3297],[3313, 3314],[3333, 3340],[3342, 3344],[3346, 3386],[3389, 3389],[3406, 3406],[3424, 3425],[3450, 3455],[3461, 3478],[3482, 3505],[3507, 3515],[3517, 3517],[3520, 3526],[3585, 3632],[3634, 3635],[3648, 3654],[3713, 3714],[3716, 3716],[3719, 3720],[3722, 3722],[3725, 3725],[3732, 3735],[3737, 3743],[3745, 3747],[3749, 3749],[3751, 3751],[3754, 3755],[3757, 3760],[3762, 3763],[3773, 3773],[3776, 3780],[3782, 3782],[3804, 3805],[3840, 3840],[3904, 3911],[3913, 3948],[3976, 3980],[4096, 4138],[4159, 4159],[4176, 4181],[4186, 4189],[4193, 4193],[4197, 4198],[4206, 4208],[4213, 4225],[4238, 4238],[4256, 4293],[4304, 4346],[4348, 4348],[4352, 4680],[4682, 4685],[4688, 4694],[4696, 4696],[4698, 4701],[4704, 4744],[4746, 4749],[4752, 4784],[4786, 4789],[4792, 4798],[4800, 4800],[4802, 4805],[4808, 4822],[4824, 4880],[4882, 4885],[4888, 4954],[4992, 5007],[5024, 5108],[5121, 5740],[5743, 5759],[5761, 5786],[5792, 5866],[5870, 5872],[5888, 5900],[5902, 5905],[5920, 5937],[5952, 5969],[5984, 5996],[5998, 6000],[6016, 6067],[6103, 6103],[6108, 6108],[6176, 6263],[6272, 6312],[6314, 6314],[6320, 6389],[6400, 6428],[6480, 6509],[6512, 6516],[6528, 6571],[6593, 6599],[6656, 6678],[6688, 6740],[6823, 6823],[6917, 6963],[6981, 6987],[7043, 7072],[7086, 7087],[7104, 7141],[7168, 7203],[7245, 7247],[7258, 7293],[7401, 7404],[7406, 7409],[7424, 7615],[7680, 7957],[7960, 7965],[7968, 8005],[8008, 8013],[8016, 8023],[8025, 8025],[8027, 8027],[8029, 8029],[8031, 8061],[8064, 8116],[8118, 8124],[8126, 8126],[8130, 8132],[8134, 8140],[8144, 8147],[8150, 8155],[8160, 8172],[8178, 8180],[8182, 8188],[8305, 8305],[8319, 8319],[8336, 8348],[8450, 8450],[8455, 8455],[8458, 8467],[8469, 8469],[8473, 8477],[8484, 8484],[8486, 8486],[8488, 8488],[8490, 8493],[8495, 8505],[8508, 8511],[8517, 8521],[8526, 8526],[8544, 8584],[11264, 11310],[11312, 11358],[11360, 11492],[11499, 11502],[11520, 11557],[11568, 11621],[11631, 11631],[11648, 11670],[11680, 11686],[11688, 11694],[11696, 11702],[11704, 11710],[11712, 11718],[11720, 11726],[11728, 11734],[11736, 11742],[11823, 11823],[12293, 12295],[12321, 12329],[12337, 12341],[12344, 12348],[12353, 12438],[12445, 12447],[12449, 12538],[12540, 12543],[12549, 12589],[12593, 12686],[12704, 12730],[12784, 12799],[13312, 13312],[19893, 19893],[19968, 19968],[40907, 40907],[40960, 42124],[42192, 42237],[42240, 42508],[42512, 42527],[42538, 42539],[42560, 42606],[42623, 42647],[42656, 42735],[42775, 42783],[42786, 42888],[42891, 42894],[42896, 42897],[42912, 42921],[43002, 43009],[43011, 43013],[43015, 43018],[43020, 43042],[43072, 43123],[43138, 43187],[43250, 43255],[43259, 43259],[43274, 43301],[43312, 43334],[43360, 43388],[43396, 43442],[43471, 43471],[43520, 43560],[43584, 43586],[43588, 43595],[43616, 43638],[43642, 43642],[43648, 43695],[43697, 43697],[43701, 43702],[43705, 43709],[43712, 43712],[43714, 43714],[43739, 43741],[43777, 43782],[43785, 43790],[43793, 43798],[43808, 43814],[43816, 43822],[43968, 44002],[44032, 44032],[55203, 55203],[55216, 55238],[55243, 55291],[63744, 64045],[64048, 64109],[64112, 64217],[64256, 64262],[64275, 64279],[64285, 64285],[64287, 64296],[64298, 64310],[64312, 64316],[64318, 64318],[64320, 64321],[64323, 64324],[64326, 64433],[64467, 64829],[64848, 64911],[64914, 64967],[65008, 65019],[65136, 65140],[65142, 65276],[65313, 65338],[65345, 65370],[65382, 65470],[65474, 65479],[65482, 65487],[65490, 65495],[65498, 65500],[65536, 65547],[65549, 65574],[65576, 65594],[65596, 65597],[65599, 65613],[65616, 65629],[65664, 65786],[65856, 65908],[66176, 66204],[66208, 66256],[66304, 66334],[66352, 66378],[66432, 66461],[66464, 66499],[66504, 66511],[66513, 66517],[66560, 66717],[67584, 67589],[67592, 67592],[67594, 67637],[67639, 67640],[67644, 67644],[67647, 67669],[67840, 67861],[67872, 67897],[68096, 68096],[68112, 68115],[68117, 68119],[68121, 68147],[68192, 68220],[68352, 68405],[68416, 68437],[68448, 68466],[68608, 68680],[69635, 69687],[69763, 69807],[73728, 74606],[74752, 74850],[77824, 78894],[92160, 92728],[110592, 110593],[119808, 119892],[119894, 119964],[119966, 119967],[119970, 119970],[119973, 119974],[119977, 119980],[119982, 119993],[119995, 119995],[119997, 120003],[120005, 120069],[120071, 120074],[120077, 120084],[120086, 120092],[120094, 120121],[120123, 120126],[120128, 120132],[120134, 120134],[120138, 120144],[120146, 120485],[120488, 120512],[120514, 120538],[120540, 120570],[120572, 120596],[120598, 120628],[120630, 120654],[120656, 120686],[120688, 120712],[120714, 120744],[120746, 120770],[120772, 120779],[131072, 131072],[173782, 173782],[173824, 173824],[177972, 177972],[177984, 177984],[178205, 178205],[194560, 195101]]; 
  function isUnicodeLetter(ch) { 
    var cc = ch.charCodeAt(0); 
    for(var i = 0; i < unicodeLetterTable.length; i ++) { 
      if(cc < unicodeLetterTable[i][0]) return false; 
      if(cc <= unicodeLetterTable[i][1]) return true; 
    } 
    return false; 
  } 
  var Scanner = traceur.runtime.createClass({ 
    constructor: function(errorReporter, file, opt_offset) { 
      this.errorReporter_ = errorReporter; 
      this.source_ = file; 
      this.index_ = opt_offset || 0; 
      this.currentTokens_ =[]; 
      this.lastToken_ = null; 
    }, 
    get lastToken() { 
      return this.lastToken_; 
    }, 
    getLineNumberTable_: function() { 
      return this.getFile().lineNumberTable; 
    }, 
    getFile: function() { 
      return this.source_; 
    }, 
    getOffset: function() { 
      return this.currentTokens_.length == 0 ? this.index_: this.peekToken().location.start.offset; 
    }, 
    getPosition: function() { 
      return this.getPosition_(this.getOffset()); 
    }, 
    getPosition_: function(offset) { 
      return this.getLineNumberTable_().getSourcePosition(offset); 
    }, 
    getTokenRange_: function(startOffset) { 
      return this.getLineNumberTable_().getSourceRange(startOffset, this.index_); 
    }, 
    nextToken: function() { 
      this.peekToken(); 
      var token = this.currentTokens_.shift(); 
      this.lastToken_ = token; 
      return token; 
    }, 
    clearTokenLookahead_: function() { 
      this.index_ = this.getOffset(); 
      this.currentTokens_.length = 0; 
    }, 
    clearTokenAndWhitespaceLookahead_: function() { 
      this.index_ = this.lastToken.location.end.offset; 
      this.currentTokens_.length = 0; 
    }, 
    nextRegularExpressionLiteralToken: function() { 
      return this.lastToken_ = this.nextRegularExpressionLiteralToken_(); 
    }, 
    nextRegularExpressionLiteralToken_: function() { 
      this.clearTokenLookahead_(); 
      var beginToken = this.index_; 
      this.nextChar_(); 
      if(! this.skipRegularExpressionBody_()) { 
        return new LiteralToken(TokenType.REGULAR_EXPRESSION, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 
      } 
      if(this.peekChar_() != '/') { 
        this.reportError_('Expected \'/\' in regular expression literal'); 
        return new LiteralToken(TokenType.REGULAR_EXPRESSION, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 
      } 
      this.nextChar_(); 
      while(this.isIdentifierPart_(this.peekChar_())) { 
        this.nextChar_(); 
      } 
      return new LiteralToken(TokenType.REGULAR_EXPRESSION, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 
    }, 
    skipRegularExpressionBody_: function() { 
      if(! this.isRegularExpressionFirstChar_(this.peekChar_())) { 
        this.reportError_('Expected regular expression first char'); 
        return false; 
      } 
      if(! this.skipRegularExpressionChar_()) { 
        return false; 
      } 
      while(! this.isAtEnd_() && this.isRegularExpressionChar_(this.peekChar_())) { 
        if(! this.skipRegularExpressionChar_()) { 
          return false; 
        } 
      } 
      return true; 
    }, 
    skipRegularExpressionChar_: function() { 
      switch(this.peekChar_()) { 
        case '\\': 
          return this.skipRegularExpressionBackslashSequence_(); 

        case '[': 
          return this.skipRegularExpressionClass_(); 

        default: 
          this.nextChar_(); 
          return true; 

      } 
    }, 
    skipRegularExpressionBackslashSequence_: function() { 
      this.nextChar_(); 
      if(isLineTerminator(this.peekChar_())) { 
        this.reportError_('New line not allowed in regular expression literal'); 
        return false; 
      } 
      this.nextChar_(); 
      return true; 
    }, 
    skipRegularExpressionClass_: function() { 
      this.nextChar_(); 
      while(! this.isAtEnd_() && this.peekRegularExpressionClassChar_()) { 
        if(! this.skipRegularExpressionClassChar_()) { 
          return false; 
        } 
      } 
      if(this.peekChar_() != ']') { 
        this.reportError_('\']\' expected'); 
        return false; 
      } 
      this.nextChar_(); 
      return true; 
    }, 
    peekRegularExpressionClassChar_: function() { 
      return this.peekChar_() != ']' && ! isLineTerminator(this.peekChar_()); 
    }, 
    skipRegularExpressionClassChar_: function() { 
      if(this.peek_('\\')) { 
        return this.skipRegularExpressionBackslashSequence_(); 
      } 
      this.nextChar_(); 
      return true; 
    }, 
    isRegularExpressionFirstChar_: function(ch) { 
      return this.isRegularExpressionChar_(ch) && ch != '*'; 
    }, 
    isRegularExpressionChar_: function(ch) { 
      switch(ch) { 
        case '/': 
          return false; 

        case '\\': 
        case '[': 
          return true; 

        default: 
          return ! isLineTerminator(ch); 

      } 
    }, 
    nextQuasiLiteralPortionToken: function() { 
      this.clearTokenLookahead_(); 
      var beginToken = this.index_; 
      if(this.isAtEnd_()) { 
        return this.lastToken_ = this.createToken_(TokenType.END_OF_FILE, beginToken); 
      } 
      this.skipQuasiLiteralPortion_(); 
      return this.lastToken_ = new LiteralToken(TokenType.QUASI_LITERAL_PORTION, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 
    }, 
    nextQuasiSubstitutionToken: function() { 
      this.clearTokenLookahead_(); 
      var beginToken = this.index_; 
      var ch = this.nextChar_(); 
      traceur.assert(ch == '$'); 
      return this.lastToken_ = this.createToken_(TokenType.DOLLAR, beginToken); 
    }, 
    nextQuasiIdentifier: function() { 
      this.clearTokenLookahead_(); 
      var beginToken = this.index_; 
      var ch = this.nextChar_(); 
      return this.scanIdentifierOrKeyword(beginToken, ch); 
    }, 
    peekQuasiToken: function(type) { 
      this.clearTokenLookahead_(); 
      var ch = this.peekChar_(); 
      switch(type) { 
        case TokenType.IDENTIFIER: 
          return isIdentifierStart(ch); 

        case TokenType.END_OF_FILE: 
          return ch == '\x00'; 

        default: 
          return ch == type; 

      } 
    }, 
    skipQuasiLiteralPortion_: function() { 
      while(! this.isAtEnd_()) { 
        if(this.peek_('`')) { 
          break; 
        } 
        if(this.peek_('$')) { 
          var ch = this.peekChar_(1); 
          if(ch == '{') { 
            break; 
          } 
        } 
        if(this.peek_('\\')) { 
          this.skipStringLiteralEscapeSequence_(); 
        } else { 
          this.nextChar_(); 
        } 
      } 
    }, 
    peekToken: function(opt_index) { 
      return this.peekToken_(opt_index || 0, true); 
    }, 
    peekTokenNoLineTerminator: function(opt_index) { 
      this.clearTokenAndWhitespaceLookahead_(); 
      return this.peekToken_(opt_index || 0, false); 
    }, 
    peekToken_: function(index, allowLineTerminator) { 
      while(this.currentTokens_.length <= index) { 
        var token = this.scanToken_(allowLineTerminator); 
        if(! token) return null; 
        this.currentTokens_.push(token); 
      } 
      return this.currentTokens_[index]; 
    }, 
    isAtEnd_: function() { 
      return this.index_ >= this.source_.contents.length; 
    }, 
    skipWhitespace_: function(allowLineTerminator) { 
      while(! this.isAtEnd_() && this.peekWhitespace_(allowLineTerminator)) { 
        this.nextChar_(); 
      } 
    }, 
    peekWhitespace_: function(allowLineTerminator) { 
      return isWhitespace(this.peekChar_()) &&(allowLineTerminator || ! isLineTerminator(this.peekChar_())); 
    }, 
    skipComments_: function(allowLineTerminator) { 
      while(this.skipComment_(allowLineTerminator)) { } 
    }, 
    skipComment_: function(allowLineTerminator) { 
      this.skipWhitespace_(allowLineTerminator); 
      if(! this.isAtEnd_() && this.peek_('/')) { 
        switch(this.peekChar_(1)) { 
          case '/': 
            this.skipSingleLineComment_(); 
            return true; 

          case '*': 
            this.skipMultiLineComment_(); 
            return true; 

        } 
      } 
      return false; 
    }, 
    skipSingleLineComment_: function() { 
      while(! this.isAtEnd_() && ! isLineTerminator(this.peekChar_())) { 
        this.nextChar_(); 
      } 
    }, 
    skipMultiLineComment_: function() { 
      this.nextChar_(); 
      this.nextChar_(); 
      while(! this.isAtEnd_() &&(this.peekChar_() != '*' || this.peekChar_(1) != '/')) { 
        this.nextChar_(); 
      } 
      this.nextChar_(); 
      this.nextChar_(); 
    }, 
    scanToken_: function(allowLineTerminator) { 
      this.skipComments_(allowLineTerminator); 
      var beginToken = this.index_; 
      if(this.isAtEnd_()) return this.createToken_(TokenType.END_OF_FILE, beginToken); 
      var ch = this.nextChar_(); 
      if(! allowLineTerminator && isLineTerminator(ch)) return null; 
      switch(ch) { 
        case '{': 
          return this.createToken_(TokenType.OPEN_CURLY, beginToken); 

        case '}': 
          return this.createToken_(TokenType.CLOSE_CURLY, beginToken); 

        case '(': 
          return this.createToken_(TokenType.OPEN_PAREN, beginToken); 

        case ')': 
          return this.createToken_(TokenType.CLOSE_PAREN, beginToken); 

        case '[': 
          return this.createToken_(TokenType.OPEN_SQUARE, beginToken); 

        case ']': 
          return this.createToken_(TokenType.CLOSE_SQUARE, beginToken); 

        case '.': 
          if(isDecimalDigit(this.peekChar_())) { 
            return this.scanNumberPostPeriod_(beginToken); 
          } 
          if(this.peek_('.') && this.peekChar_(1) == '.') { 
            this.nextChar_(); 
            this.nextChar_(); 
            return this.createToken_(TokenType.DOT_DOT_DOT, beginToken); 
          } 
          if(this.peek_('{')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.PERIOD_OPEN_CURLY, beginToken); 
          } 
          return this.createToken_(TokenType.PERIOD, beginToken); 

        case ';': 
          return this.createToken_(TokenType.SEMI_COLON, beginToken); 

        case ',': 
          return this.createToken_(TokenType.COMMA, beginToken); 

        case '~': 
          return this.createToken_(TokenType.TILDE, beginToken); 

        case '?': 
          return this.createToken_(TokenType.QUESTION, beginToken); 

        case ':': 
          return this.createToken_(TokenType.COLON, beginToken); 

        case '<': 
          switch(this.peekChar_()) { 
            case '<': 
              this.nextChar_(); 
              if(this.peek_('=')) { 
                this.nextChar_(); 
                return this.createToken_(TokenType.LEFT_SHIFT_EQUAL, beginToken); 
              } 
              return this.createToken_(TokenType.LEFT_SHIFT, beginToken); 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.LESS_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.OPEN_ANGLE, beginToken); 

          } 

        case '>': 
          switch(this.peekChar_()) { 
            case '>': 
              this.nextChar_(); 
              switch(this.peekChar_()) { 
                case '=': 
                  this.nextChar_(); 
                  return this.createToken_(TokenType.RIGHT_SHIFT_EQUAL, beginToken); 

                case '>': 
                  this.nextChar_(); 
                  if(this.peek_('=')) { 
                    this.nextChar_(); 
                    return this.createToken_(TokenType.UNSIGNED_RIGHT_SHIFT_EQUAL, beginToken); 
                  } 
                  return this.createToken_(TokenType.UNSIGNED_RIGHT_SHIFT, beginToken); 

                default: 
                  return this.createToken_(TokenType.RIGHT_SHIFT, beginToken); 

              } 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.GREATER_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.CLOSE_ANGLE, beginToken); 

          } 

        case '=': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            if(this.peek_('=')) { 
              this.nextChar_(); 
              return this.createToken_(TokenType.EQUAL_EQUAL_EQUAL, beginToken); 
            } 
            return this.createToken_(TokenType.EQUAL_EQUAL, beginToken); 
          } 
          if(this.peek_('>')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.ARROW, beginToken); 
          } 
          return this.createToken_(TokenType.EQUAL, beginToken); 

        case '!': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            if(this.peek_('=')) { 
              this.nextChar_(); 
              return this.createToken_(TokenType.NOT_EQUAL_EQUAL, beginToken); 
            } 
            return this.createToken_(TokenType.NOT_EQUAL, beginToken); 
          } 
          return this.createToken_(TokenType.BANG, beginToken); 

        case '*': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.STAR_EQUAL, beginToken); 
          } 
          return this.createToken_(TokenType.STAR, beginToken); 

        case '%': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.PERCENT_EQUAL, beginToken); 
          } 
          return this.createToken_(TokenType.PERCENT, beginToken); 

        case '^': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.CARET_EQUAL, beginToken); 
          } 
          return this.createToken_(TokenType.CARET, beginToken); 

        case '/': 
          if(this.peek_('=')) { 
            this.nextChar_(); 
            return this.createToken_(TokenType.SLASH_EQUAL, beginToken); 
          } 
          return this.createToken_(TokenType.SLASH, beginToken); 

        case '+': 
          switch(this.peekChar_()) { 
            case '+': 
              this.nextChar_(); 
              return this.createToken_(TokenType.PLUS_PLUS, beginToken); 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.PLUS_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.PLUS, beginToken); 

          } 

        case '-': 
          switch(this.peekChar_()) { 
            case '-': 
              this.nextChar_(); 
              return this.createToken_(TokenType.MINUS_MINUS, beginToken); 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.MINUS_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.MINUS, beginToken); 

          } 

        case '&': 
          switch(this.peekChar_()) { 
            case '&': 
              this.nextChar_(); 
              return this.createToken_(TokenType.AND, beginToken); 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.AMPERSAND_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.AMPERSAND, beginToken); 

          } 

        case '|': 
          switch(this.peekChar_()) { 
            case '|': 
              this.nextChar_(); 
              return this.createToken_(TokenType.OR, beginToken); 

            case '=': 
              this.nextChar_(); 
              return this.createToken_(TokenType.BAR_EQUAL, beginToken); 

            default: 
              return this.createToken_(TokenType.BAR, beginToken); 

          } 

        case '`': 
          return this.createToken_(TokenType.BACK_QUOTE, beginToken); 

        case '@': 
          return this.scanAtName_(beginToken); 

        case '0': 
          return this.scanPostZero_(beginToken); 

        case '1': 
        case '2': 
        case '3': 
        case '4': 
        case '5': 
        case '6': 
        case '7': 
        case '8': 
        case '9': 
          return this.scanPostDigit_(beginToken); 

        case '"': 
        case '\'': 
          return this.scanStringLiteral_(beginToken, ch); 

        default: 
          return this.scanIdentifierOrKeyword(beginToken, ch); 

      } 
    }, 
    scanNumberPostPeriod_: function(beginToken) { 
      this.skipDecimalDigits_(); 
      return this.scanExponentOfNumericLiteral_(beginToken); 
    }, 
    scanPostDigit_: function(beginToken) { 
      this.skipDecimalDigits_(); 
      return this.scanFractionalNumericLiteral_(beginToken); 
    }, 
    scanPostZero_: function(beginToken) { 
      switch(this.peekChar_()) { 
        case 'x': 
        case 'X': 
          this.nextChar_(); 
          if(! isHexDigit(this.peekChar_())) { 
            this.reportError_('Hex Integer Literal must contain at least one digit'); 
          } 
          this.skipHexDigits_(); 
          return new LiteralToken(TokenType.NUMBER, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 

        case '.': 
          return this.scanFractionalNumericLiteral_(beginToken); 

        case '0': 
        case '1': 
        case '2': 
        case '3': 
        case '4': 
        case '5': 
        case '6': 
        case '7': 
        case '8': 
        case '9': 
          return this.scanPostDigit_(beginToken); 

        default: 
          return new LiteralToken(TokenType.NUMBER, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 

      } 
    }, 
    createToken_: function(type, beginToken) { 
      return new Token(type, this.getTokenRange_(beginToken)); 
    }, 
    scanUnicode: function(beginToken, ch) { 
      this.reportError_(this.getPosition_(beginToken), 'Unimplemented: Unicode escape sequence'); 
      return this.createToken_(TokenType.ERROR, beginToken); 
    }, 
    scanIdentifierOrKeyword: function(beginToken, ch) { 
      if(ch == '\\') { 
        return this.scanUnicode(beginToken, ch); 
      } 
      if(! isIdentifierStart(ch)) { 
        this.reportError_(this.getPosition_(beginToken), 'Character code \'' + ch.charCodeAt(0) + '\' is not a valid identifier start char'); 
        return this.createToken_(TokenType.ERROR, beginToken); 
      } 
      while(this.isIdentifierPart_(this.peekChar_())) { 
        this.nextChar_(); 
      } 
      if(ch == '\\') { 
        return this.scanUnicode(beginToken, ch); 
      } 
      var value = this.source_.contents.substring(beginToken, this.index_); 
      if(Keywords.isKeyword(value)) { 
        return new Token(Keywords.getTokenType(value), this.getTokenRange_(beginToken)); 
      } 
      return new IdentifierToken(this.getTokenRange_(beginToken), value); 
    }, 
    isIdentifierPart_: function(ch) { 
      return isIdentifierStart(ch) || isDecimalDigit(ch); 
    }, 
    scanAtName_: function(beginToken) { 
      var ch = this.nextChar_(); 
      var identifierToken = this.scanIdentifierOrKeyword(beginToken, ch); 
      if(identifierToken.type === TokenType.ERROR) return identifierToken; 
      var value = identifierToken.value; 
      return new AtNameToken(this.getTokenRange_(beginToken), value); 
    }, 
    scanStringLiteral_: function(beginIndex, terminator) { 
      while(this.peekStringLiteralChar_(terminator)) { 
        if(! this.skipStringLiteralChar_()) { 
          return new LiteralToken(TokenType.STRING, this.getTokenString_(beginIndex), this.getTokenRange_(beginIndex)); 
        } 
      } 
      if(this.peekChar_() != terminator) { 
        this.reportError_(this.getPosition_(beginIndex), 'Unterminated String Literal'); 
      } else { 
        this.nextChar_(); 
      } 
      return new LiteralToken(TokenType.STRING, this.getTokenString_(beginIndex), this.getTokenRange_(beginIndex)); 
    }, 
    getTokenString_: function(beginIndex) { 
      return this.source_.contents.substring(beginIndex, this.index_); 
    }, 
    peekStringLiteralChar_: function(terminator) { 
      return ! this.isAtEnd_() && this.peekChar_() != terminator && ! isLineTerminator(this.peekChar_()); 
    }, 
    skipStringLiteralChar_: function() { 
      if(this.peek_('\\')) { 
        return this.skipStringLiteralEscapeSequence_(); 
      } 
      this.nextChar_(); 
      return true; 
    }, 
    skipStringLiteralEscapeSequence_: function() { 
      this.nextChar_(); 
      if(this.isAtEnd_()) { 
        this.reportError_('Unterminated string literal escape sequence'); 
        return false; 
      } 
      if(isLineTerminator(this.peekChar_())) { 
        this.skipLineTerminator_(); 
        return true; 
      } 
      switch(this.nextChar_()) { 
        case '\'': 
        case '"': 
        case '\\': 
        case 'b': 
        case 'f': 
        case 'n': 
        case 'r': 
        case 't': 
        case 'v': 
        case '0': 
          return true; 

        case 'x': 
          return this.skipHexDigit_() && this.skipHexDigit_(); 

        case 'u': 
          return this.skipHexDigit_() && this.skipHexDigit_() && this.skipHexDigit_() && this.skipHexDigit_(); 

        default: 
          return true; 

      } 
    }, 
    skipHexDigit_: function() { 
      if(! isHexDigit(this.peekChar_())) { 
        this.reportError_('Hex digit expected'); 
        return false; 
      } 
      this.nextChar_(); 
      return true; 
    }, 
    skipLineTerminator_: function() { 
      var first = this.nextChar_(); 
      if(first == '\r' && this.peek_('\n')) { 
        this.nextChar_(); 
      } 
    }, 
    scanFractionalNumericLiteral_: function(beginToken) { 
      if(this.peek_('.')) { 
        this.nextChar_(); 
        this.skipDecimalDigits_(); 
      } 
      return this.scanExponentOfNumericLiteral_(beginToken); 
    }, 
    scanExponentOfNumericLiteral_: function(beginToken) { 
      switch(this.peekChar_()) { 
        case 'e': 
        case 'E': 
          this.nextChar_(); 
          switch(this.peekChar_()) { 
            case '+': 
            case '-': 
              this.nextChar_(); 
              break; 

          } 
          if(! isDecimalDigit(this.peekChar_())) { 
            this.reportError_('Exponent part must contain at least one digit'); 
          } 
          this.skipDecimalDigits_(); 
          break; 

        default: 
          break; 

      } 
      return new LiteralToken(TokenType.NUMBER, this.getTokenString_(beginToken), this.getTokenRange_(beginToken)); 
    }, 
    skipDecimalDigits_: function() { 
      while(isDecimalDigit(this.peekChar_())) { 
        this.nextChar_(); 
      } 
    }, 
    skipHexDigits_: function() { 
      while(isHexDigit(this.peekChar_())) { 
        this.nextChar_(); 
      } 
    }, 
    nextChar_: function() { 
      if(this.isAtEnd_()) { 
        return '\x00'; 
      } 
      return this.source_.contents.charAt(this.index_ ++); 
    }, 
    peek_: function(ch) { 
      return this.peekChar_() == ch; 
    }, 
    peekChar_: function(opt_offset) { 
      return this.source_.contents.charAt(this.index_ +(opt_offset || 0)) || '\x00'; 
    }, 
    reportError_: function(var_args) { 
      var position, message; 
      if(arguments.length == 1) { 
        position = this.getPosition(); 
        message = arguments[0]; 
      } else { 
        position = arguments[0]; 
        message = arguments[1]; 
      } 
      this.errorReporter_.reportError(position, message); 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { Scanner: { 
      get: function() { 
        return Scanner; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_SourceRange_js =(function() { 
  "use strict"; 
  var SourceRange = traceur.runtime.createClass({ constructor: function(start, end) { 
      this.start = start; 
      this.end = end; 
    } }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { SourceRange: { 
      get: function() { 
        return SourceRange; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_Parser_js =(function() { 
  "use strict"; 
  var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
  var destructuring$Keywords = $src_syntax_Keywords_js, Keywords = destructuring$Keywords.Keywords; 
  var destructuring$MutedErrorReporter = $src_util_MutedErrorReporter_js, MutedErrorReporter = destructuring$MutedErrorReporter.MutedErrorReporter; 
  var destructuring$NullTree = $src_syntax_trees_NullTree_js, NullTree = destructuring$NullTree.NullTree; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$Scanner = $src_syntax_Scanner_js, Scanner = destructuring$Scanner.Scanner; 
  var destructuring$SourceRange = $src_util_SourceRange_js, SourceRange = destructuring$SourceRange.SourceRange; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$options = $src_options_js, options = destructuring$options.parseOptions; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var ArgumentList = trees.ArgumentList; 
  var ArrayComprehension = trees.ArrayComprehension; 
  var ArrayLiteralExpression = trees.ArrayLiteralExpression; 
  var ArrayPattern = trees.ArrayPattern; 
  var ArrowFunctionExpression = trees.ArrowFunctionExpression; 
  var AtNameDeclaration = trees.AtNameDeclaration; 
  var AtNameExpression = trees.AtNameExpression; 
  var AwaitStatement = trees.AwaitStatement; 
  var BinaryOperator = trees.BinaryOperator; 
  var BindThisParameter = trees.BindThisParameter; 
  var BindingElement = trees.BindingElement; 
  var BindingIdentifier = trees.BindingIdentifier; 
  var Block = trees.Block; 
  var BreakStatement = trees.BreakStatement; 
  var CallExpression = trees.CallExpression; 
  var CaseClause = trees.CaseClause; 
  var Catch = trees.Catch; 
  var CascadeExpression = trees.CascadeExpression; 
  var ClassDeclaration = trees.ClassDeclaration; 
  var ClassExpression = trees.ClassExpression; 
  var CommaExpression = trees.CommaExpression; 
  var ComprehensionFor = trees.ComprehensionFor; 
  var ConditionalExpression = trees.ConditionalExpression; 
  var ContinueStatement = trees.ContinueStatement; 
  var DebuggerStatement = trees.DebuggerStatement; 
  var DefaultClause = trees.DefaultClause; 
  var DoWhileStatement = trees.DoWhileStatement; 
  var EmptyStatement = trees.EmptyStatement; 
  var ExportDeclaration = trees.ExportDeclaration; 
  var ExportMapping = trees.ExportMapping; 
  var ExportMappingList = trees.ExportMappingList; 
  var ExportSpecifier = trees.ExportSpecifier; 
  var ExportSpecifierSet = trees.ExportSpecifierSet; 
  var ExpressionStatement = trees.ExpressionStatement; 
  var Finally = trees.Finally; 
  var ForOfStatement = trees.ForOfStatement; 
  var ForInStatement = trees.ForInStatement; 
  var ForStatement = trees.ForStatement; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GeneratorComprehension = trees.GeneratorComprehension; 
  var GetAccessor = trees.GetAccessor; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var IfStatement = trees.IfStatement; 
  var ImportDeclaration = trees.ImportDeclaration; 
  var ImportBinding = trees.ImportBinding; 
  var ImportSpecifier = trees.ImportSpecifier; 
  var ImportSpecifierSet = trees.ImportSpecifierSet; 
  var LabelledStatement = trees.LabelledStatement; 
  var LiteralExpression = trees.LiteralExpression; 
  var MemberExpression = trees.MemberExpression; 
  var MemberLookupExpression = trees.MemberLookupExpression; 
  var MissingPrimaryExpression = trees.MissingPrimaryExpression; 
  var ModuleDeclaration = trees.ModuleDeclaration; 
  var ModuleDefinition = trees.ModuleDefinition; 
  var ModuleExpression = trees.ModuleExpression; 
  var ModuleRequire = trees.ModuleRequire; 
  var ModuleSpecifier = trees.ModuleSpecifier; 
  var NameStatement = trees.NameStatement; 
  var NewExpression = trees.NewExpression; 
  var ObjectLiteralExpression = trees.ObjectLiteralExpression; 
  var ObjectPattern = trees.ObjectPattern; 
  var ObjectPatternField = trees.ObjectPatternField; 
  var ParenExpression = trees.ParenExpression; 
  var PostfixExpression = trees.PostfixExpression; 
  var Program = trees.Program; 
  var PropertyMethodAssignment = trees.PropertyMethodAssignment; 
  var PropertyNameAssignment = trees.PropertyNameAssignment; 
  var PropertyNameShorthand = trees.PropertyNameShorthand; 
  var QuasiLiteralExpression = trees.QuasiLiteralExpression; 
  var QuasiLiteralPortion = trees.QuasiLiteralPortion; 
  var QuasiSubstitution = trees.QuasiSubstitution; 
  var RestParameter = trees.RestParameter; 
  var ReturnStatement = trees.ReturnStatement; 
  var SetAccessor = trees.SetAccessor; 
  var SpreadExpression = trees.SpreadExpression; 
  var SpreadPatternElement = trees.SpreadPatternElement; 
  var SuperExpression = trees.SuperExpression; 
  var SwitchStatement = trees.SwitchStatement; 
  var ThisExpression = trees.ThisExpression; 
  var ThrowStatement = trees.ThrowStatement; 
  var TryStatement = trees.TryStatement; 
  var UnaryExpression = trees.UnaryExpression; 
  var VariableDeclaration = trees.VariableDeclaration; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableStatement = trees.VariableStatement; 
  var WhileStatement = trees.WhileStatement; 
  var WithStatement = trees.WithStatement; 
  var YieldStatement = trees.YieldStatement; 
  var Expression = { 
    NO_IN: 'NO_IN', 
    NORMAL: 'NORMAL' 
  }; 
  var DestructuringInitializer = { 
    REQUIRED: 'REQUIRED', 
    OPTIONAL: 'OPTIONAL' 
  }; 
  function followedByCommaOrCloseSquare(token) { 
    return token.type === TokenType.COMMA || token.type === TokenType.CLOSE_SQUARE; 
  } 
  function followedByCommaOrCloseCurly(token) { 
    return token.type === TokenType.COMMA || token.type === TokenType.CLOSE_CURLY; 
  } 
  function followedByInOrOf(token) { 
    return token.type === TokenType.IN || token.type === TokenType.IDENTIFIER && token.value === PredefinedName.OF; 
  } 
  var Initializer = { 
    ALLOWED: 'ALLOWED', 
    REQUIRED: 'REQUIRED' 
  }; 
  var Parser = traceur.runtime.createClass({ 
    constructor: function(errorReporter, var_args) { 
      this.errorReporter_ = errorReporter; 
      var scanner; 
      if(arguments[1]instanceof Scanner) { 
        scanner = arguments[1]; 
      } else { 
        scanner = new Scanner(errorReporter, arguments[1], arguments[2]); 
      } 
      this.scanner_ = scanner; 
      this.allowYield_ = false; 
    }, 
    parseProgram: function(opt_load) { 
      var start = this.getTreeStartLocation_(); 
      var programElements = this.parseProgramElements_(! ! opt_load); 
      this.eat_(TokenType.END_OF_FILE); 
      return new Program(this.getTreeLocation_(start), programElements); 
    }, 
    parseProgramElements_: function(load) { 
      var result =[]; 
      while(! this.peek_(TokenType.END_OF_FILE)) { 
        var programElement = this.parseProgramElement_(load); 
        if(! programElement) { 
          return null; 
        } 
        result.push(programElement); 
      } 
      return result; 
    }, 
    peekProgramElement_: function() { 
      return this.peekFunction_() || this.peekVariableDeclarationList_() || this.peekImportDeclaration_() || this.peekExportDeclaration_() || this.peekModuleDeclaration_() || this.peekClassDeclaration_() || this.peekStatement_(); 
    }, 
    parseProgramElement_: function(load) { 
      if(this.peekVariableDeclarationList_()) { 
        return this.parseVariableStatement_(); 
      } 
      if(this.peekImportDeclaration_(load)) { 
        return this.parseImportDeclaration_(load); 
      } 
      if(this.peekExportDeclaration_(load)) { 
        return this.parseExportDeclaration_(load); 
      } 
      if(this.peekModuleDeclaration_(load)) { 
        return this.parseModuleDeclaration_(load); 
      } 
      return this.parseStatement_(); 
    }, 
    peekModuleDefinition_: function() { 
      return this.peekPredefinedString_(PredefinedName.MODULE) && this.peek_(TokenType.IDENTIFIER, 1) && this.peek_(TokenType.OPEN_CURLY, 2); 
    }, 
    parseModuleDefinition_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      this.eatId_(); 
      var name = this.eatId_(); 
      this.eat_(TokenType.OPEN_CURLY); 
      var result =[]; 
      while(this.peekModuleElement_()) { 
        result.push(this.parseModuleElement_(load)); 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new ModuleDefinition(this.getTreeLocation_(start), name, result); 
    }, 
    parseModuleSpecifier_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      var identifier = this.eatId_(); 
      this.eatId_(PredefinedName.FROM); 
      var expression = this.parseModuleExpression_(load); 
      return new ModuleSpecifier(this.getTreeLocation_(start), identifier, expression); 
    }, 
    parseModuleExpression_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      var reference = this.parseModuleReference_(load); 
      var identifierNames =[]; 
      while(this.peek_(TokenType.PERIOD) && this.peekIdName_(1)) { 
        this.eat_(TokenType.PERIOD); 
        identifierNames.push(this.eatIdName_()); 
      } 
      return new ModuleExpression(this.getTreeLocation_(start), reference, identifierNames); 
    }, 
    parseModuleReference_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      if(load && this.peek_(TokenType.STRING)) { 
        var url = this.eat_(TokenType.STRING); 
        return new ModuleRequire(this.getTreeLocation_(start), url); 
      } 
      return this.parseIdentifierExpression_(); 
    }, 
    peekModuleElement_: function() { 
      return this.peekProgramElement_(); 
    }, 
    parseModuleElement_: function(load) { 
      return this.parseProgramElement_(load); 
    }, 
    peekImportDeclaration_: function() { 
      return options.modules && this.peek_(TokenType.IMPORT); 
    }, 
    parseImportDeclaration_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.IMPORT); 
      var importBindings =[]; 
      importBindings.push(this.parseImportBinding_(load)); 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        importBindings.push(this.parseImportBinding_(load)); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ImportDeclaration(this.getTreeLocation_(start), importBindings); 
    }, 
    parseImportBinding_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      var importSpecifierSet = this.parseImportSpecifierSet_(); 
      this.eatId_(PredefinedName.FROM); 
      var moduleExpression = this.parseModuleExpression_(load); 
      return new ImportBinding(this.getTreeLocation_(start), moduleExpression, importSpecifierSet); 
    }, 
    parseImportSpecifierSet_: function() { 
      if(this.peek_(TokenType.OPEN_CURLY)) { 
        var start = this.getTreeStartLocation_(); 
        this.eat_(TokenType.OPEN_CURLY); 
        var specifiers =[this.parseImportSpecifier_()]; 
        while(this.peek_(TokenType.COMMA)) { 
          this.eat_(TokenType.COMMA); 
          if(this.peek_(TokenType.CLOSE_CURLY)) break; 
          specifiers.push(this.parseImportSpecifier_()); 
        } 
        this.eat_(TokenType.CLOSE_CURLY); 
        return new ImportSpecifierSet(this.getTreeLocation_(start), specifiers); 
      } 
      if(this.peek_(TokenType.STAR)) { 
        var star = this.eat_(TokenType.STAR); 
        return new ImportSpecifierSet(this.getTreeLocation_(start), star); 
      } 
      return this.parseIdentifierNameExpression_(); 
    }, 
    parseImportSpecifier_: function() { 
      var start = this.getTreeStartLocation_(); 
      var lhs = this.eatIdName_(); 
      var rhs = null; 
      if(this.peek_(TokenType.COLON)) { 
        this.eat_(TokenType.COLON); 
        rhs = this.eatId_(); 
      } 
      return new ImportSpecifier(this.getTreeLocation_(start), lhs, rhs); 
    }, 
    peekExportDeclaration_: function(load) { 
      return options.modules && this.peek_(TokenType.EXPORT); 
    }, 
    parseExportDeclaration_: function(load) { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.EXPORT); 
      var exportTree; 
      switch(this.peekType_()) { 
        case TokenType.CONST: 
        case TokenType.LET: 
        case TokenType.VAR: 
          exportTree = this.parseVariableStatement_(); 
          break; 

        case TokenType.FUNCTION: 
          exportTree = this.parseFunctionDeclaration_(); 
          break; 

        case TokenType.CLASS: 
          exportTree = this.parseClassDeclaration_(); 
          break; 

        case TokenType.IDENTIFIER: 
          if(this.peekModuleDeclaration_(load)) { 
            exportTree = this.parseModuleDeclaration_(load); 
          } else { 
            exportTree = this.parseExportMappingList_(); 
          } 
          break; 

        case TokenType.OPEN_CURLY: 
          exportTree = this.parseExportMappingList_(); 
          break; 

        default: 
          this.reportError_('Unexpected symbol \'' + this.peekToken_() + '\''); 
          return null; 

      } 
      return new ExportDeclaration(this.getTreeLocation_(start), exportTree); 
    }, 
    parseExportMappingList_: function() { 
      var start = this.getTreeStartLocation_(); 
      var mappings =[this.parseExportMapping_()]; 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        mappings.push(this.parseExportMapping_()); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ExportMappingList(this.getTreeEndLocation_(start), mappings); 
    }, 
    peekExportMapping_: function() { 
      return this.peek_(TokenType.OPEN_CURLY) || this.peekId_(); 
    }, 
    parseExportMapping_: function() { 
      var start = this.getTreeStartLocation_(); 
      var specifierSet = this.parseExportSpecifierSet_(); 
      var expression = null; 
      if(this.peekPredefinedString_(PredefinedName.FROM)) { 
        this.eatId_(PredefinedName.FROM); 
        expression = this.parseModuleExpression_(false); 
      } 
      return new ExportMapping(this.getTreeLocation_(start), expression, specifierSet); 
    }, 
    peekExportSpecifierSet_: function() { 
      return this.peek_(TokenType.OPEN_CURLY) || this.peekIdName_(); 
    }, 
    parseExportSpecifierSet_: function() { 
      if(! this.peek_(TokenType.OPEN_CURLY)) return this.parseIdentifierExpression_(); 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.OPEN_CURLY); 
      var specifiers =[this.parseExportSpecifier_()]; 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        if(this.peek_(TokenType.CLOSE_CURLY)) break; 
        specifiers.push(this.parseExportSpecifier_()); 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new ExportSpecifierSet(this.getTreeLocation_(start), specifiers); 
    }, 
    parseExportSpecifier_: function() { 
      var start = this.getTreeStartLocation_(); 
      var lhs, rhs = null; 
      if(this.peek_(TokenType.COLON, 1)) { 
        lhs = this.eatIdName_(); 
        this.eat_(TokenType.COLON); 
        rhs = this.eatId_(); 
      } else { 
        lhs = this.eatId_(); 
      } 
      return new ExportSpecifier(this.getTreeLocation_(start), lhs, rhs); 
    }, 
    peekId_: function(opt_index) { 
      return this.peek_(TokenType.IDENTIFIER, opt_index); 
    }, 
    peekIdName_: function(opt_index) { 
      var type = this.peekType_(opt_index); 
      return type == TokenType.IDENTIFIER || Keywords.isKeyword(type); 
    }, 
    peekModuleDeclaration_: function() { 
      return options.modules && this.peekPredefinedString_(PredefinedName.MODULE) && this.peek_(TokenType.IDENTIFIER, 1) &&(this.peekPredefinedString_(PredefinedName.FROM, 2) || this.peek_(TokenType.OPEN_CURLY, 2)); 
    }, 
    parseModuleDeclaration_: function(load) { 
      if(this.peekModuleDefinition_(load)) return this.parseModuleDefinition_(load); 
      var start = this.getTreeStartLocation_(); 
      this.eatId_(); 
      var specifiers =[this.parseModuleSpecifier_(load)]; 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        specifiers.push(this.parseModuleSpecifier_(load)); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ModuleDeclaration(this.getTreeLocation_(start), specifiers); 
    }, 
    peekClassDeclaration_: function() { 
      return options.classes && this.peek_(TokenType.CLASS) && this.peekId_(1); 
    }, 
    parseClassShared_: function(constr) { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.CLASS); 
      var name = null; 
      if(constr == ClassDeclaration || ! this.peek_(TokenType.EXTENDS) && ! this.peek_(TokenType.OPEN_CURLY)) { 
        name = this.parseBindingIdentifier_(); 
      } 
      var superClass = null; 
      if(this.peek_(TokenType.EXTENDS)) { 
        this.eat_(TokenType.EXTENDS); 
        superClass = this.parseAssignmentExpression(); 
      } 
      this.eat_(TokenType.OPEN_CURLY); 
      var elements = this.parseClassElements_(); 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new constr(this.getTreeLocation_(start), name, superClass, elements); 
    }, 
    parseClassDeclaration_: function() { 
      return this.parseClassShared_(ClassDeclaration); 
    }, 
    parseClassExpression_: function() { 
      return this.parseClassShared_(ClassExpression); 
    }, 
    parseClassElements_: function() { 
      var result =[]; 
      while(this.peekClassElement_()) { 
        result.push(this.parseClassElement_()); 
      } 
      return result; 
    }, 
    peekClassElement_: function() { 
      return options.classes &&(this.peekPropertyMethodAssignment_() || this.peekGetAccessor_() || this.peekSetAccessor_()); 
    }, 
    parseClassElement_: function() { 
      if(this.peekGetAccessor_()) return this.parseGetAccessor_(); 
      if(this.peekSetAccessor_()) return this.parseSetAccessor_(); 
      return this.parsePropertyMethodAssignment_(); 
    }, 
    parseSourceElement_: function() { 
      if(this.peekFunction_()) { 
        return this.parseFunctionDeclaration_(); 
      } 
      if(this.peekClassDeclaration_()) { 
        return this.parseClassDeclaration_(); 
      } 
      if(this.peekLet_()) { 
        return this.parseVariableStatement_(); 
      } 
      if(this.peekNameStatement_()) return this.parseNameStatement_(); 
      return this.parseStatementStandard_(); 
    }, 
    peekLet_: function() { 
      return options.blockBinding && this.peek_(TokenType.LET); 
    }, 
    peekConst_: function() { 
      return options.blockBinding && this.peek_(TokenType.CONST); 
    }, 
    peekNameStatement_: function() { 
      return options.privateNameSyntax && this.peek_(TokenType.PRIVATE) && this.peek_(TokenType.AT_NAME, 1); 
    }, 
    peekAtNameExpression_: function() { 
      return options.privateNameSyntax && this.peek_(TokenType.AT_NAME); 
    }, 
    peekSourceElement_: function() { 
      return this.peekFunction_() || this.peekClassDeclaration_() || this.peekStatementStandard_() || this.peekLet_() || this.peekAtNameExpression_() || this.peekNameStatement_(); 
    }, 
    peekFunction_: function(opt_index) { 
      var index = opt_index || 0; 
      return this.peek_(TokenType.FUNCTION, index) || this.peek_(TokenType.POUND, index); 
    }, 
    parseFunctionDeclaration_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.nextToken_(); 
      var isGenerator = this.eatOpt_(TokenType.STAR) != null; 
      return this.parseFunctionDeclarationTail_(start, isGenerator, this.parseBindingIdentifier_()); 
    }, 
    parseFunctionDeclarationTail_: function(start, isGenerator, name) { 
      this.eat_(TokenType.OPEN_PAREN); 
      var formalParameterList = this.parseFormalParameterList_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var functionBody = this.parseFunctionBody_(isGenerator); 
      return new FunctionDeclaration(this.getTreeLocation_(start), name, isGenerator, formalParameterList, functionBody); 
    }, 
    parseFunctionExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.nextToken_(); 
      var isGenerator = this.eatOpt_(TokenType.STAR) != null; 
      var name = null; 
      if(this.peekBindingIdentifier_()) { 
        name = this.parseBindingIdentifier_(); 
      } 
      this.eat_(TokenType.OPEN_PAREN); 
      var formalParameterList = this.parseFormalParameterList_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var functionBody = this.parseFunctionBody_(isGenerator); 
      return new FunctionDeclaration(this.getTreeLocation_(start), name, isGenerator, formalParameterList, functionBody); 
    }, 
    parseFormalParameterList_: function() { 
      var start = this.getTreeStartLocation_(); 
      var formals; 
      if(this.peekRest_()) { 
        formals =[this.parseRestParameter_()]; 
      } else { 
        formals = this.parseFormalsList_(); 
        if(this.peek_(TokenType.COMMA)) { 
          this.eat_(TokenType.COMMA); 
          formals.push(this.parseRestParameter_()); 
        } 
      } 
      return new FormalParameterList(this.getTreeLocation_(start), formals); 
    }, 
    parseFormalsList_: function() { 
      var formals =[]; 
      while(this.peekFormalParameter_()) { 
        var parameter = this.parseFormalParameter_(); 
        formals.push(parameter); 
        if(this.peek_(TokenType.COMMA) && this.peekFormalParameter_(1)) this.eat_(TokenType.COMMA); 
      } 
      return formals; 
    }, 
    peekFormalParameter_: function(opt_index) { 
      var index = opt_index || 0; 
      return this.peekBindingIdentifier_(index) || this.peekPattern_(index); 
    }, 
    parseFormalParameter_: function(opt_initializerAllowed) { 
      return this.parseBindingElement_(opt_initializerAllowed); 
    }, 
    parseRestParameter_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DOT_DOT_DOT); 
      return new RestParameter(this.getTreeLocation_(start), this.parseBindingIdentifier_()); 
    }, 
    parseFunctionBody_: function(isGenerator) { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.OPEN_CURLY); 
      var allowYield = this.allowYield_; 
      this.allowYield_ = isGenerator; 
      var result = this.parseSourceElementList_(); 
      this.allowYield_ = allowYield; 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new Block(this.getTreeLocation_(start), result); 
    }, 
    parseSourceElementList_: function() { 
      var result =[]; 
      while(this.peekSourceElement_()) { 
        var sourceElement = this.parseSourceElement_(); 
        if(! sourceElement) { 
          return null; 
        } 
        result.push(sourceElement); 
      } 
      return result; 
    }, 
    parseSpreadExpression_: function() { 
      if(! options.spread) { 
        return this.parseMissingPrimaryExpression_(); 
      } 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DOT_DOT_DOT); 
      var operand = this.parseAssignmentExpression(); 
      return new SpreadExpression(this.getTreeLocation_(start), operand); 
    }, 
    parseStatement_: function() { 
      return this.parseSourceElement_(); 
    }, 
    parseStatementStandard_: function() { 
      switch(this.peekType_()) { 
        case TokenType.OPEN_CURLY: 
          return this.parseBlock_(); 

        case TokenType.AWAIT: 
          return this.parseAwaitStatement_(); 

        case TokenType.CONST: 
          if(! options.blockBinding) { 
            this.reportUnexpectedToken_(); 
            return null; 
          } 

        case TokenType.VAR: 
          return this.parseVariableStatement_(); 

        case TokenType.SEMI_COLON: 
          return this.parseEmptyStatement_(); 

        case TokenType.IF: 
          return this.parseIfStatement_(); 

        case TokenType.DO: 
          return this.parseDoWhileStatement_(); 

        case TokenType.WHILE: 
          return this.parseWhileStatement_(); 

        case TokenType.FOR: 
          return this.parseForStatement_(); 

        case TokenType.CONTINUE: 
          return this.parseContinueStatement_(); 

        case TokenType.BREAK: 
          return this.parseBreakStatement_(); 

        case TokenType.RETURN: 
          return this.parseReturnStatement_(); 

        case TokenType.YIELD: 
          return this.parseYieldStatement_(); 

        case TokenType.WITH: 
          return this.parseWithStatement_(); 

        case TokenType.SWITCH: 
          return this.parseSwitchStatement_(); 

        case TokenType.THROW: 
          return this.parseThrowStatement_(); 

        case TokenType.TRY: 
          return this.parseTryStatement_(); 

        case TokenType.DEBUGGER: 
          return this.parseDebuggerStatement_(); 

        default: 
          if(this.peekLabelledStatement_()) { 
            return this.parseLabelledStatement_(); 
          } 
          return this.parseExpressionStatement_(); 

      } 
    }, 
    peekStatement_: function() { 
      return this.peekSourceElement_(); 
    }, 
    peekStatementStandard_: function() { 
      switch(this.peekType_()) { 
        case TokenType.CONST: 
          return options.blockBinding; 

        case TokenType.YIELD: 
          return options.generators; 

        case TokenType.AWAIT: 
          return options.deferredFunctions; 

        case TokenType.OPEN_CURLY: 
        case TokenType.VAR: 
        case TokenType.SEMI_COLON: 
        case TokenType.IF: 
        case TokenType.DO: 
        case TokenType.WHILE: 
        case TokenType.FOR: 
        case TokenType.CONTINUE: 
        case TokenType.BREAK: 
        case TokenType.RETURN: 
        case TokenType.WITH: 
        case TokenType.SWITCH: 
        case TokenType.THROW: 
        case TokenType.TRY: 
        case TokenType.DEBUGGER: 
        case TokenType.IDENTIFIER: 
        case TokenType.THIS: 
        case TokenType.CLASS: 
        case TokenType.SUPER: 
        case TokenType.NUMBER: 
        case TokenType.STRING: 
        case TokenType.NULL: 
        case TokenType.TRUE: 
        case TokenType.SLASH: 
        case TokenType.SLASH_EQUAL: 
        case TokenType.FALSE: 
        case TokenType.OPEN_SQUARE: 
        case TokenType.OPEN_PAREN: 
        case TokenType.NEW: 
        case TokenType.DELETE: 
        case TokenType.VOID: 
        case TokenType.TYPEOF: 
        case TokenType.PLUS_PLUS: 
        case TokenType.MINUS_MINUS: 
        case TokenType.PLUS: 
        case TokenType.MINUS: 
        case TokenType.TILDE: 
        case TokenType.BANG: 
        case TokenType.BACK_QUOTE: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseBlock_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.OPEN_CURLY); 
      var result = this.parseSourceElementList_(); 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new Block(this.getTreeLocation_(start), result); 
    }, 
    parseStatementList_: function() { 
      var result =[]; 
      while(this.peekStatement_()) { 
        result.push(this.parseStatement_()); 
      } 
      return result; 
    }, 
    parseVariableStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      var declarations = this.parseVariableDeclarationList_(); 
      this.checkInitializers_(declarations); 
      this.eatPossibleImplicitSemiColon_(); 
      return new VariableStatement(this.getTreeLocation_(start), declarations); 
    }, 
    parseVariableDeclarationList_: function(opt_expressionIn, opt_initializer) { 
      var expressionIn = opt_expressionIn || Expression.NORMAL; 
      var initializer = opt_initializer || DestructuringInitializer.REQUIRED; 
      var token = this.peekType_(); 
      switch(token) { 
        case TokenType.CONST: 
        case TokenType.LET: 
          if(! options.blockBinding) debugger; 

        case TokenType.VAR: 
          this.eat_(token); 
          break; 

        default: 
          throw Error('unreachable'); 

      } 
      var start = this.getTreeStartLocation_(); 
      var declarations =[]; 
      declarations.push(this.parseVariableDeclaration_(token, expressionIn, initializer)); 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        declarations.push(this.parseVariableDeclaration_(token, expressionIn, initializer)); 
      } 
      return new VariableDeclarationList(this.getTreeLocation_(start), token, declarations); 
    }, 
    parseVariableDeclaration_: function(binding, expressionIn, opt_initializer) { 
      var initRequired = opt_initializer !== DestructuringInitializer.OPTIONAL; 
      var start = this.getTreeStartLocation_(); 
      var lvalue; 
      if(this.peekPattern_()) lvalue = this.parseBindingPattern_(); else lvalue = this.parseBindingIdentifier_(); 
      var initializer = null; 
      if(this.peek_(TokenType.EQUAL)) initializer = this.parseInitializer_(expressionIn); else if(lvalue.isPattern() && initRequired) this.reportError_('destructuring must have an initializer'); 
      return new VariableDeclaration(this.getTreeLocation_(start), lvalue, initializer); 
    }, 
    parseInitializer_: function(expressionIn) { 
      this.eat_(TokenType.EQUAL); 
      return this.parseAssignmentExpression(expressionIn); 
    }, 
    parseNameStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.PRIVATE); 
      var declarations =[]; 
      declarations.push(this.parseAtNameDeclaration_()); 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        declarations.push(this.parseAtNameDeclaration_()); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new NameStatement(this.getTreeLocation_(start), declarations); 
    }, 
    parseAtNameDeclaration_: function() { 
      var start = this.getTreeStartLocation_(); 
      var atName = this.eat_(TokenType.AT_NAME); 
      var initializer = null; 
      if(this.peek_(TokenType.EQUAL)) initializer = this.parseInitializer_(Expression.IN); 
      return new AtNameDeclaration(this.getTreeLocation_(start), atName, initializer); 
    }, 
    parseEmptyStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.SEMI_COLON); 
      return new EmptyStatement(this.getTreeLocation_(start)); 
    }, 
    parseExpressionStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      var expression = this.parseExpression_(); 
      this.eatPossibleImplicitSemiColon_(); 
      return new ExpressionStatement(this.getTreeLocation_(start), expression); 
    }, 
    parseIfStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.IF); 
      this.eat_(TokenType.OPEN_PAREN); 
      var condition = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var ifClause = this.parseStatement_(); 
      var elseClause = null; 
      if(this.peek_(TokenType.ELSE)) { 
        this.eat_(TokenType.ELSE); 
        elseClause = this.parseStatement_(); 
      } 
      return new IfStatement(this.getTreeLocation_(start), condition, ifClause, elseClause); 
    }, 
    parseDoWhileStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DO); 
      var body = this.parseStatement_(); 
      this.eat_(TokenType.WHILE); 
      this.eat_(TokenType.OPEN_PAREN); 
      var condition = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      this.eatPossibleImplicitSemiColon_(); 
      return new DoWhileStatement(this.getTreeLocation_(start), body, condition); 
    }, 
    parseWhileStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.WHILE); 
      this.eat_(TokenType.OPEN_PAREN); 
      var condition = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseStatement_(); 
      return new WhileStatement(this.getTreeLocation_(start), condition, body); 
    }, 
    parseForStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.FOR); 
      this.eat_(TokenType.OPEN_PAREN); 
      var validate =(function(variables, kind) { 
        if(variables.declarations.length > 1) { 
          this.reportError_(kind + ' statement may not have more than one variable declaration'); 
        } 
        var declaration = variables.declarations[0]; 
        if(declaration.lvalue.isPattern() && declaration.initializer) { 
          this.reportError_(declaration.initializer.location, 'initializer is not allowed in ' + kind + ' loop with pattern'); 
        } 
      }).bind(this); 
      if(this.peekVariableDeclarationList_()) { 
        var variables = this.parseVariableDeclarationList_(Expression.NO_IN, DestructuringInitializer.OPTIONAL); 
        if(this.peek_(TokenType.IN)) { 
          validate(variables, 'for-in'); 
          var declaration = variables.declarations[0]; 
          if(options.blockBinding &&(variables.declarationType == TokenType.LET || variables.declarationType == TokenType.CONST)) { 
            if(declaration.initializer != null) { 
              this.reportError_('let/const in for-in statement may not have initializer'); 
            } 
          } 
          return this.parseForInStatement_(start, variables); 
        } else if(this.peekOf_()) { 
          validate(variables, 'for-of'); 
          var declaration = variables.declarations[0]; 
          if(declaration.initializer != null) { 
            this.reportError_('for-of statement may not have initializer'); 
          } 
          return this.parseForOfStatement_(start, variables); 
        } else { 
          this.checkInitializers_(variables); 
          return this.parseForStatement2_(start, variables); 
        } 
      } 
      if(this.peek_(TokenType.SEMI_COLON)) { 
        return this.parseForStatement2_(start, null); 
      } 
      var initializer = this.parseExpression_(Expression.NO_IN); 
      if(initializer.isLeftHandSideExpression() &&(this.peek_(TokenType.IN) || this.peekOf_())) { 
        initializer = this.transformLeftHandSideExpression_(initializer); 
        if(this.peekOf_()) return this.parseForOfStatement_(start, initializer); 
        return this.parseForInStatement_(start, initializer); 
      } 
      return this.parseForStatement2_(start, initializer); 
    }, 
    peekOf_: function() { 
      return options.forOf && this.peekPredefinedString_(PredefinedName.OF); 
    }, 
    parseForOfStatement_: function(start, initializer) { 
      this.eatId_(); 
      var collection = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseStatement_(); 
      return new ForOfStatement(this.getTreeLocation_(start), initializer, collection, body); 
    }, 
    checkInitializers_: function(variables) { 
      if(options.blockBinding && variables.declarationType == TokenType.CONST) { 
        var type = variables.declarationType; 
        for(var i = 0; i < variables.declarations.length; i ++) { 
          if(! this.checkInitializer_(type, variables.declarations[i])) { 
            break; 
          } 
        } 
      } 
    }, 
    checkInitializer_: function(type, declaration) { 
      if(options.blockBinding && type == TokenType.CONST && declaration.initializer == null) { 
        this.reportError_('const variables must have an initializer'); 
        return false; 
      } 
      return true; 
    }, 
    peekVariableDeclarationList_: function() { 
      switch(this.peekType_()) { 
        case TokenType.VAR: 
          return true; 

        case TokenType.CONST: 
        case TokenType.LET: 
          return options.blockBinding; 

        default: 
          return false; 

      } 
    }, 
    parseForStatement2_: function(start, initializer) { 
      this.eat_(TokenType.SEMI_COLON); 
      var condition = null; 
      if(! this.peek_(TokenType.SEMI_COLON)) { 
        condition = this.parseExpression_(); 
      } 
      this.eat_(TokenType.SEMI_COLON); 
      var increment = null; 
      if(! this.peek_(TokenType.CLOSE_PAREN)) { 
        increment = this.parseExpression_(); 
      } 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseStatement_(); 
      return new ForStatement(this.getTreeLocation_(start), initializer, condition, increment, body); 
    }, 
    parseForInStatement_: function(start, initializer) { 
      this.eat_(TokenType.IN); 
      var collection = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseStatement_(); 
      return new ForInStatement(this.getTreeLocation_(start), initializer, collection, body); 
    }, 
    parseContinueStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.CONTINUE); 
      var name = null; 
      if(! this.peekImplicitSemiColon_()) { 
        name = this.eatIdOpt_(); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ContinueStatement(this.getTreeLocation_(start), name); 
    }, 
    parseBreakStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.BREAK); 
      var name = null; 
      if(! this.peekImplicitSemiColon_()) { 
        name = this.eatIdOpt_(); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new BreakStatement(this.getTreeLocation_(start), name); 
    }, 
    parseReturnStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.RETURN); 
      var expression = null; 
      if(! this.peekImplicitSemiColon_()) { 
        expression = this.parseExpression_(); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ReturnStatement(this.getTreeLocation_(start), expression); 
    }, 
    parseYieldStatement_: function() { 
      if(! this.allowYield_) { 
        return this.parseMissingPrimaryExpression_("'yield' expressions are only allowed inside 'function*'"); 
      } 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.YIELD); 
      var expression = null; 
      var isYieldFor = this.eatOpt_(TokenType.STAR) != null; 
      if(isYieldFor || ! this.peekImplicitSemiColon_()) { 
        expression = this.parseExpression_(); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new YieldStatement(this.getTreeLocation_(start), expression, isYieldFor); 
    }, 
    parseAwaitStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.AWAIT); 
      var identifier = null; 
      if(this.peek_(TokenType.IDENTIFIER) && this.peek_(TokenType.EQUAL, 1)) { 
        identifier = this.eatId_(); 
        this.eat_(TokenType.EQUAL); 
      } 
      var expression = this.parseExpression_(); 
      this.eatPossibleImplicitSemiColon_(); 
      return new AwaitStatement(this.getTreeLocation_(start), identifier, expression); 
    }, 
    parseWithStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.WITH); 
      this.eat_(TokenType.OPEN_PAREN); 
      var expression = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseStatement_(); 
      return new WithStatement(this.getTreeLocation_(start), expression, body); 
    }, 
    parseSwitchStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.SWITCH); 
      this.eat_(TokenType.OPEN_PAREN); 
      var expression = this.parseExpression_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      this.eat_(TokenType.OPEN_CURLY); 
      var caseClauses = this.parseCaseClauses_(); 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new SwitchStatement(this.getTreeLocation_(start), expression, caseClauses); 
    }, 
    parseCaseClauses_: function() { 
      var foundDefaultClause = false; 
      var result =[]; 
      while(true) { 
        var start = this.getTreeStartLocation_(); 
        switch(this.peekType_()) { 
          case TokenType.CASE: 
            this.eat_(TokenType.CASE); 
            var expression = this.parseExpression_(); 
            this.eat_(TokenType.COLON); 
            var statements = this.parseCaseStatementsOpt_(); 
            result.push(new CaseClause(this.getTreeLocation_(start), expression, statements)); 
            break; 

          case TokenType.DEFAULT: 
            if(foundDefaultClause) { 
              this.reportError_('Switch statements may have at most one default clause'); 
            } else { 
              foundDefaultClause = true; 
            } 
            this.eat_(TokenType.DEFAULT); 
            this.eat_(TokenType.COLON); 
            result.push(new DefaultClause(this.getTreeLocation_(start), this.parseCaseStatementsOpt_())); 
            break; 

          default: 
            return result; 

        } 
      } 
    }, 
    parseCaseStatementsOpt_: function() { 
      return this.parseStatementList_(); 
    }, 
    parseLabelledStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      var name = this.eatId_(); 
      this.eat_(TokenType.COLON); 
      return new LabelledStatement(this.getTreeLocation_(start), name, this.parseStatement_()); 
    }, 
    peekLabelledStatement_: function() { 
      return this.peek_(TokenType.IDENTIFIER) && this.peek_(TokenType.COLON, 1); 
    }, 
    parseThrowStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.THROW); 
      var value = null; 
      if(! this.peekImplicitSemiColon_()) { 
        value = this.parseExpression_(); 
      } 
      this.eatPossibleImplicitSemiColon_(); 
      return new ThrowStatement(this.getTreeLocation_(start), value); 
    }, 
    parseTryStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.TRY); 
      var body = this.parseBlock_(); 
      var catchBlock = null; 
      if(this.peek_(TokenType.CATCH)) { 
        catchBlock = this.parseCatch_(); 
      } 
      var finallyBlock = null; 
      if(this.peek_(TokenType.FINALLY)) { 
        finallyBlock = this.parseFinallyBlock_(); 
      } 
      if(catchBlock == null && finallyBlock == null) { 
        this.reportError_("'catch' or 'finally' expected."); 
      } 
      return new TryStatement(this.getTreeLocation_(start), body, catchBlock, finallyBlock); 
    }, 
    parseCatch_: function() { 
      var start = this.getTreeStartLocation_(); 
      var catchBlock; 
      this.eat_(TokenType.CATCH); 
      this.eat_(TokenType.OPEN_PAREN); 
      var binding; 
      if(this.peekPattern_()) binding = this.parseBindingPattern_(); else binding = this.parseBindingIdentifier_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var catchBody = this.parseBlock_(); 
      catchBlock = new Catch(this.getTreeLocation_(start), binding, catchBody); 
      return catchBlock; 
    }, 
    parseFinallyBlock_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.FINALLY); 
      var finallyBlock = this.parseBlock_(); 
      return new Finally(this.getTreeLocation_(start), finallyBlock); 
    }, 
    parseDebuggerStatement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DEBUGGER); 
      this.eatPossibleImplicitSemiColon_(); 
      return new DebuggerStatement(this.getTreeLocation_(start)); 
    }, 
    parsePrimaryExpression_: function() { 
      switch(this.peekType_()) { 
        case TokenType.CLASS: 
          return options.classes ? this.parseClassExpression_(): this.parseMissingPrimaryExpression_(); 

        case TokenType.SUPER: 
          return this.parseSuperExpression_(); 

        case TokenType.THIS: 
          return this.parseThisExpression_(); 

        case TokenType.IDENTIFIER: 
          return this.parseIdentifierExpression_(); 

        case TokenType.NUMBER: 
        case TokenType.STRING: 
        case TokenType.TRUE: 
        case TokenType.FALSE: 
        case TokenType.NULL: 
          return this.parseLiteralExpression_(); 

        case TokenType.OPEN_SQUARE: 
          return this.parseArrayLiteral_(); 

        case TokenType.OPEN_CURLY: 
          return this.parseObjectLiteral_(); 

        case TokenType.OPEN_PAREN: 
          return this.parseParenExpression_(); 

        case TokenType.SLASH: 
        case TokenType.SLASH_EQUAL: 
          return this.parseRegularExpressionLiteral_(); 

        case TokenType.BACK_QUOTE: 
          return this.parseQuasiLiteral_(null); 

        case TokenType.AT_NAME: 
          return this.parseAtNameExpression_(); 

        default: 
          return this.parseMissingPrimaryExpression_(); 

      } 
    }, 
    parseSuperExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.SUPER); 
      return new SuperExpression(this.getTreeLocation_(start)); 
    }, 
    parseThisExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.THIS); 
      return new ThisExpression(this.getTreeLocation_(start)); 
    }, 
    peekBindingIdentifier_: function(opt_index) { 
      return this.peekId_(opt_index || 0); 
    }, 
    parseBindingIdentifier_: function() { 
      var start = this.getTreeStartLocation_(); 
      var identifier = this.eatId_(); 
      return new BindingIdentifier(this.getTreeLocation_(start), identifier); 
    }, 
    parseIdentifierExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var identifier = this.eatId_(); 
      return new IdentifierExpression(this.getTreeLocation_(start), identifier); 
    }, 
    parseIdentifierNameExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var identifier = this.eatIdName_(); 
      return new IdentifierExpression(this.getTreeLocation_(start), identifier); 
    }, 
    parseAtNameExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var atName = this.eat_(TokenType.AT_NAME); 
      return new AtNameExpression(this.getTreeLocation_(start), atName); 
    }, 
    parseLiteralExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var literal = this.nextLiteralToken_(); 
      return new LiteralExpression(this.getTreeLocation_(start), literal); 
    }, 
    nextLiteralToken_: function() { 
      return this.nextToken_(); 
    }, 
    parseRegularExpressionLiteral_: function() { 
      var start = this.getTreeStartLocation_(); 
      var literal = this.nextRegularExpressionLiteralToken_(); 
      return new LiteralExpression(this.getTreeLocation_(start), literal); 
    }, 
    peekSpread_: function() { 
      return this.peek_(TokenType.DOT_DOT_DOT); 
    }, 
    parseArrayLiteral_: function() { 
      var start = this.getTreeStartLocation_(); 
      var expression; 
      var elements =[]; 
      var allowFor = options.arrayComprehension; 
      this.eat_(TokenType.OPEN_SQUARE); 
      while(this.peek_(TokenType.COMMA) || this.peekSpread_() || this.peekAssignmentExpression_()) { 
        if(this.peek_(TokenType.COMMA)) { 
          expression = new NullTree(); 
          allowFor = false; 
        } else { 
          expression = this.parseAssignmentOrSpread_(); 
        } 
        if(allowFor && this.peek_(TokenType.FOR)) return this.parseArrayComprehension_(start, expression); 
        allowFor = false; 
        elements.push(expression); 
        if(! this.peek_(TokenType.CLOSE_SQUARE)) { 
          this.eat_(TokenType.COMMA); 
        } 
      } 
      this.eat_(TokenType.CLOSE_SQUARE); 
      return new ArrayLiteralExpression(this.getTreeLocation_(start), elements); 
    }, 
    parseArrayComprehension_: function(start, expression) { 
      var comprehensionForList = this.parseComprehensionForList_(); 
      var ifExpression = this.parseComprehensionIf_(); 
      this.eat_(TokenType.CLOSE_SQUARE); 
      return new ArrayComprehension(this.getTreeLocation_(start), expression, comprehensionForList, ifExpression); 
    }, 
    parseObjectLiteral_: function() { 
      var start = this.getTreeStartLocation_(); 
      var result =[]; 
      this.eat_(TokenType.OPEN_CURLY); 
      while(this.peekPropertyAssignment_()) { 
        if(this.peekGetAccessor_()) { 
          result.push(this.parseGetAccessor_()); 
          if(! this.eatPropertyOptionalComma_()) break; 
        } else if(this.peekSetAccessor_()) { 
          result.push(this.parseSetAccessor_()); 
          if(! this.eatPropertyOptionalComma_()) break; 
        } else if(this.peekPropertyMethodAssignment_()) { 
          result.push(this.parsePropertyMethodAssignment_()); 
          if(! this.eatPropertyOptionalComma_()) break; 
        } else { 
          result.push(this.parsePropertyNameAssignment_()); 
          if(! this.eatOpt_(TokenType.COMMA)) { 
            break; 
          } 
        } 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new ObjectLiteralExpression(this.getTreeLocation_(start), result); 
    }, 
    eatPropertyOptionalComma_: function() { 
      return this.eatOpt_(TokenType.COMMA) || options.propertyOptionalComma; 
    }, 
    peekPropertyAssignment_: function() { 
      var index = + this.peek_(TokenType.STAR); 
      return this.peekPropertyName_(index); 
    }, 
    peekPropertyName_: function(tokenIndex) { 
      var type = this.peekType_(tokenIndex); 
      switch(type) { 
        case TokenType.AT_NAME: 
          return options.privateNameSyntax; 

        case TokenType.IDENTIFIER: 
        case TokenType.STRING: 
        case TokenType.NUMBER: 
          return true; 

        default: 
          return Keywords.isKeyword(type); 

      } 
    }, 
    peekGetAccessor_: function() { 
      return this.peekPredefinedString_(PredefinedName.GET) && this.peekPropertyName_(1); 
    }, 
    peekPredefinedString_: function(string, opt_index) { 
      var index = opt_index || 0; 
      return this.peek_(TokenType.IDENTIFIER, index) && this.peekToken_(index).value === string; 
    }, 
    parseGetAccessor_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eatId_(); 
      var propertyName = this.nextToken_(); 
      this.eat_(TokenType.OPEN_PAREN); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseFunctionBody_(false); 
      return new GetAccessor(this.getTreeLocation_(start), propertyName, body); 
    }, 
    peekSetAccessor_: function() { 
      return this.peekPredefinedString_(PredefinedName.SET) && this.peekPropertyName_(1); 
    }, 
    parseSetAccessor_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eatId_(); 
      var propertyName = this.nextToken_(); 
      this.eat_(TokenType.OPEN_PAREN); 
      var parameter = this.parsePropertySetParameterList_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var body = this.parseFunctionBody_(false); 
      return new SetAccessor(this.getTreeLocation_(start), propertyName, parameter, body); 
    }, 
    parsePropertySetParameterList_: function() { 
      var start = this.getTreeStartLocation_(); 
      var binding; 
      if(this.peekPattern_()) binding = this.parseBindingPattern_(); else binding = this.parseBindingIdentifier_(); 
      return new BindingElement(this.getTreeLocation_(start), binding, null); 
    }, 
    parsePropertyNameAssignment_: function() { 
      var start = this.getTreeStartLocation_(); 
      if(this.peek_(TokenType.COLON, 1)) { 
        var name = this.nextToken_(); 
        this.eat_(TokenType.COLON); 
        var value = this.parseAssignmentExpression(); 
        return new PropertyNameAssignment(this.getTreeLocation_(start), name, value); 
      } else { 
        return this.parsePropertyNameShorthand_(); 
      } 
    }, 
    peekPropertyMethodAssignment_: function() { 
      var index = + this.peek_(TokenType.STAR); 
      return options.propertyMethods && this.peekPropertyName_(index) && this.peek_(TokenType.OPEN_PAREN, index + 1); 
    }, 
    parsePropertyMethodAssignment_: function() { 
      var start = this.getTreeStartLocation_(); 
      var isGenerator = this.eatOpt_(TokenType.STAR) != null; 
      var name = this.nextToken_(); 
      this.eat_(TokenType.OPEN_PAREN); 
      var formalParameterList = this.parseFormalParameterList_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      var functionBody = this.parseFunctionBody_(isGenerator); 
      return new PropertyMethodAssignment(this.getTreeLocation_(start), name, isGenerator, formalParameterList, functionBody); 
    }, 
    parsePropertyNameShorthand_: function() { 
      var start = this.getTreeStartLocation_(); 
      var name = this.eatId_(); 
      if(! options.propertyNameShorthand) { 
        this.eat_(TokenType.COLON); 
        return null; 
      } 
      return new PropertyNameShorthand(this.getTreeLocation_(start), name); 
    }, 
    parseParenExpression_: function() { 
      return this.parseArrowFunction_(); 
    }, 
    parseMissingPrimaryExpression_: function(opt_message) { 
      var start = this.getTreeStartLocation_(); 
      this.reportError_(opt_message || 'primary expression expected'); 
      var token = this.nextToken_(); 
      return new MissingPrimaryExpression(this.getTreeLocation_(start), token); 
    }, 
    peekExpression_: function(opt_index) { 
      switch(this.peekType_(opt_index || 0)) { 
        case TokenType.BACK_QUOTE: 
          return options.quasi; 

        case TokenType.AT_NAME: 
          return options.privateNameSyntax; 

        case TokenType.BANG: 
        case TokenType.CLASS: 
        case TokenType.DELETE: 
        case TokenType.FALSE: 
        case TokenType.FUNCTION: 
        case TokenType.IDENTIFIER: 
        case TokenType.MINUS: 
        case TokenType.MINUS_MINUS: 
        case TokenType.NEW: 
        case TokenType.NULL: 
        case TokenType.NUMBER: 
        case TokenType.OPEN_CURLY: 
        case TokenType.OPEN_PAREN: 
        case TokenType.OPEN_SQUARE: 
        case TokenType.PLUS: 
        case TokenType.PLUS_PLUS: 
        case TokenType.SLASH: 
        case TokenType.SLASH_EQUAL: 
        case TokenType.STRING: 
        case TokenType.SUPER: 
        case TokenType.THIS: 
        case TokenType.TILDE: 
        case TokenType.TRUE: 
        case TokenType.TYPEOF: 
        case TokenType.VOID: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseExpression_: function(opt_expressionIn) { 
      var expressionIn = opt_expressionIn || Expression.IN; 
      var start = this.getTreeStartLocation_(); 
      var result = this.parseAssignmentExpression(expressionIn); 
      if(this.peek_(TokenType.COMMA)) { 
        var exprs =[]; 
        exprs.push(result); 
        while(this.peek_(TokenType.COMMA) && this.peekAssignmentExpression_(1)) { 
          this.eat_(TokenType.COMMA); 
          exprs.push(this.parseAssignmentExpression(expressionIn)); 
        } 
        return new CommaExpression(this.getTreeLocation_(start), exprs); 
      } 
      return result; 
    }, 
    peekAssignmentExpression_: function(opt_index) { 
      return this.peekExpression_(opt_index || 0); 
    }, 
    parseAssignmentExpression: function(opt_expressionIn) { 
      if(this.peekBindingIdentifier_() && this.peekArrow_(1)) return this.parseArrowFunction_(); 
      var expressionIn = opt_expressionIn || Expression.NORMAL; 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseConditional_(expressionIn); 
      if(this.peekAssignmentOperator_()) { 
        if(this.peek_(TokenType.EQUAL)) left = this.transformLeftHandSideExpression_(left); 
        if(! left.isLeftHandSideExpression() && ! left.isPattern()) { 
          this.reportError_('Left hand side of assignment must be new, call, member, function, primary expressions or destructuring pattern'); 
        } 
        var operator = this.nextToken_(); 
        var right = this.parseAssignmentExpression(expressionIn); 
        return new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    transformLeftHandSideExpression_: function(tree) { 
      switch(tree.type) { 
        case ParseTreeType.ARRAY_LITERAL_EXPRESSION: 
        case ParseTreeType.OBJECT_LITERAL_EXPRESSION: 
          var errorReporter = new MutedErrorReporter(); 
          var p = new Parser(errorReporter, this.scanner_.getFile(), tree.location.start.offset); 
          var transformedTree = p.parseAssignmentPattern_(); 
          if(! errorReporter.hadError()) return transformedTree; 
          break; 

        case ParseTreeType.PAREN_EXPRESSION: 
          var expression = this.transformLeftHandSideExpression_(tree.expression); 
          if(expression !== tree.expression) return new ParenExpression(tree.location, expression); 

      } 
      return tree; 
    }, 
    peekAssignmentOperator_: function() { 
      var token = this.peekToken_(); 
      return ! ! token && token.isAssignmentOperator(); 
    }, 
    parseConditional_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var condition = this.parseLogicalOR_(expressionIn); 
      if(this.peek_(TokenType.QUESTION)) { 
        this.eat_(TokenType.QUESTION); 
        var left = this.parseAssignmentExpression(); 
        this.eat_(TokenType.COLON); 
        var right = this.parseAssignmentExpression(expressionIn); 
        return new ConditionalExpression(this.getTreeLocation_(start), condition, left, right); 
      } 
      return condition; 
    }, 
    parseLogicalOR_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseLogicalAND_(expressionIn); 
      while(this.peek_(TokenType.OR)) { 
        var operator = this.eat_(TokenType.OR); 
        var right = this.parseLogicalAND_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    parseLogicalAND_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseBitwiseOR_(expressionIn); 
      while(this.peek_(TokenType.AND)) { 
        var operator = this.eat_(TokenType.AND); 
        var right = this.parseBitwiseOR_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    parseBitwiseOR_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseBitwiseXOR_(expressionIn); 
      while(this.peek_(TokenType.BAR)) { 
        var operator = this.eat_(TokenType.BAR); 
        var right = this.parseBitwiseXOR_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    parseBitwiseXOR_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseBitwiseAND_(expressionIn); 
      while(this.peek_(TokenType.CARET)) { 
        var operator = this.eat_(TokenType.CARET); 
        var right = this.parseBitwiseAND_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    parseBitwiseAND_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseEquality_(expressionIn); 
      while(this.peek_(TokenType.AMPERSAND)) { 
        var operator = this.eat_(TokenType.AMPERSAND); 
        var right = this.parseEquality_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    parseEquality_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseRelational_(expressionIn); 
      while(this.peekEqualityOperator_()) { 
        var operator = this.nextToken_(); 
        var right = this.parseRelational_(expressionIn); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    peekEqualityOperator_: function() { 
      switch(this.peekType_()) { 
        case TokenType.EQUAL_EQUAL: 
        case TokenType.NOT_EQUAL: 
        case TokenType.EQUAL_EQUAL_EQUAL: 
        case TokenType.NOT_EQUAL_EQUAL: 
          return true; 

        default: 
          if(! options.isExpression) return false; 
          var token = this.peekTokenNoLineTerminator_(); 
          return token && token.type === TokenType.IDENTIFIER &&(token.value === PredefinedName.IS || token.value === PredefinedName.ISNT); 

      } 
    }, 
    parseRelational_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseShiftExpression_(); 
      while(this.peekRelationalOperator_(expressionIn)) { 
        var operator = this.nextToken_(); 
        var right = this.parseShiftExpression_(); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    peekRelationalOperator_: function(expressionIn) { 
      switch(this.peekType_()) { 
        case TokenType.OPEN_ANGLE: 
        case TokenType.CLOSE_ANGLE: 
        case TokenType.GREATER_EQUAL: 
        case TokenType.LESS_EQUAL: 
        case TokenType.INSTANCEOF: 
          return true; 

        case TokenType.IN: 
          return expressionIn == Expression.NORMAL; 

        default: 
          return false; 

      } 
    }, 
    parseShiftExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseAdditiveExpression_(); 
      while(this.peekShiftOperator_()) { 
        var operator = this.nextToken_(); 
        var right = this.parseAdditiveExpression_(); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    peekShiftOperator_: function() { 
      switch(this.peekType_()) { 
        case TokenType.LEFT_SHIFT: 
        case TokenType.RIGHT_SHIFT: 
        case TokenType.UNSIGNED_RIGHT_SHIFT: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseAdditiveExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseMultiplicativeExpression_(); 
      while(this.peekAdditiveOperator_()) { 
        var operator = this.nextToken_(); 
        var right = this.parseMultiplicativeExpression_(); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    peekAdditiveOperator_: function() { 
      switch(this.peekType_()) { 
        case TokenType.PLUS: 
        case TokenType.MINUS: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseMultiplicativeExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var left = this.parseUnaryExpression_(); 
      while(this.peekMultiplicativeOperator_()) { 
        var operator = this.nextToken_(); 
        var right = this.parseUnaryExpression_(); 
        left = new BinaryOperator(this.getTreeLocation_(start), left, operator, right); 
      } 
      return left; 
    }, 
    peekMultiplicativeOperator_: function() { 
      switch(this.peekType_()) { 
        case TokenType.STAR: 
        case TokenType.SLASH: 
        case TokenType.PERCENT: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseUnaryExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      if(this.peekUnaryOperator_()) { 
        var operator = this.nextToken_(); 
        var operand = this.parseUnaryExpression_(); 
        return new UnaryExpression(this.getTreeLocation_(start), operator, operand); 
      } 
      return this.parsePostfixExpression_(); 
    }, 
    peekUnaryOperator_: function() { 
      switch(this.peekType_()) { 
        case TokenType.DELETE: 
        case TokenType.VOID: 
        case TokenType.TYPEOF: 
        case TokenType.PLUS_PLUS: 
        case TokenType.MINUS_MINUS: 
        case TokenType.PLUS: 
        case TokenType.MINUS: 
        case TokenType.TILDE: 
        case TokenType.BANG: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parsePostfixExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var operand = this.parseLeftHandSideExpression_(); 
      while(this.peekPostfixOperator_()) { 
        var operator = this.nextToken_(); 
        operand = new PostfixExpression(this.getTreeLocation_(start), operand, operator); 
      } 
      return operand; 
    }, 
    peekPostfixOperator_: function() { 
      if(this.peekImplicitSemiColon_()) { 
        return false; 
      } 
      switch(this.peekType_()) { 
        case TokenType.PLUS_PLUS: 
        case TokenType.MINUS_MINUS: 
          return true; 

        default: 
          return false; 

      } 
    }, 
    parseLeftHandSideExpression_: function() { 
      var start = this.getTreeStartLocation_(); 
      var operand = this.parseNewExpression_(); 
      if(!(operand instanceof NewExpression) || operand.args != null) { 
        while(this.peekCallSuffix_()) { 
          switch(this.peekType_()) { 
            case TokenType.OPEN_PAREN: 
              var args = this.parseArguments_(); 
              operand = new CallExpression(this.getTreeLocation_(start), operand, args); 
              break; 

            case TokenType.OPEN_SQUARE: 
              this.eat_(TokenType.OPEN_SQUARE); 
              var member = this.parseExpression_(); 
              this.eat_(TokenType.CLOSE_SQUARE); 
              operand = new MemberLookupExpression(this.getTreeLocation_(start), operand, member); 
              break; 

            case TokenType.PERIOD: 
              this.eat_(TokenType.PERIOD); 
              operand = new MemberExpression(this.getTreeLocation_(start), operand, this.eatIdName_()); 
              break; 

            case TokenType.PERIOD_OPEN_CURLY: 
              var expressions = this.parseCascadeExpressions_(); 
              operand = new CascadeExpression(this.getTreeLocation_(start), operand, expressions); 
              break; 

            case TokenType.BACK_QUOTE: 
              operand = this.parseQuasiLiteral_(operand); 
              break; 

          } 
        } 
      } 
      return operand; 
    }, 
    peekCallSuffix_: function() { 
      return this.peek_(TokenType.OPEN_PAREN) || this.peek_(TokenType.OPEN_SQUARE) || this.peek_(TokenType.PERIOD) || options.quasi && this.peek_(TokenType.BACK_QUOTE) || options.cascadeExpression && this.peek_(TokenType.PERIOD_OPEN_CURLY); 
    }, 
    parseMemberExpressionNoNew_: function() { 
      var start = this.getTreeStartLocation_(); 
      var operand; 
      if(this.peekFunction_()) { 
        operand = this.parseFunctionExpression_(); 
      } else { 
        operand = this.parsePrimaryExpression_(); 
      } 
      while(this.peekMemberExpressionSuffix_()) { 
        switch(this.peekType_()) { 
          case TokenType.OPEN_SQUARE: 
            this.eat_(TokenType.OPEN_SQUARE); 
            var member = this.parseExpression_(); 
            this.eat_(TokenType.CLOSE_SQUARE); 
            operand = new MemberLookupExpression(this.getTreeLocation_(start), operand, member); 
            break; 

          case TokenType.PERIOD: 
            this.eat_(TokenType.PERIOD); 
            var name; 
            if(this.peek_(TokenType.AT_NAME)) name = this.eat_(TokenType.AT_NAME); else name = this.eatIdName_(); 
            operand = new MemberExpression(this.getTreeLocation_(start), operand, name); 
            break; 

          case TokenType.PERIOD_OPEN_CURLY: 
            var expressions = this.parseCascadeExpressions_(); 
            operand = new CascadeExpression(this.getTreeLocation_(start), operand, expressions); 
            break; 

          case TokenType.BACK_QUOTE: 
            operand = this.parseQuasiLiteral_(operand); 
            break; 

        } 
      } 
      return operand; 
    }, 
    parseCascadeExpressions_: function() { 
      this.eat_(TokenType.PERIOD_OPEN_CURLY); 
      var expressions =[]; 
      while(this.peekId_() && this.peekAssignmentExpression_()) { 
        expressions.push(this.parseCascadeExpression_()); 
        this.eatPossibleImplicitSemiColon_(); 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return expressions; 
    }, 
    parseCascadeExpression_: function() { 
      var expr = this.parseAssignmentExpression(); 
      var operand; 
      switch(expr.type) { 
        case ParseTreeType.CALL_EXPRESSION: 
        case ParseTreeType.MEMBER_EXPRESSION: 
        case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
        case ParseTreeType.CASCADE_EXPRESSION: 
          operand = expr.operand; 
          break; 

        case ParseTreeType.BINARY_OPERATOR: 
          operand = expr.left; 
          break; 

        default: 
          this.reportError_(expr.location, 'Invalid expression. Type: ' + expr.type); 

      } 
      if(operand) { 
        switch(operand.type) { 
          case ParseTreeType.MEMBER_EXPRESSION: 
          case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
          case ParseTreeType.CALL_EXPRESSION: 
          case ParseTreeType.CASCADE_EXPRESSION: 
          case ParseTreeType.IDENTIFIER_EXPRESSION: 
            break; 

          default: 
            this.reportError_(operand.location, 'Invalid expression: ' + operand.type); 

        } 
      } 
      if(expr.type == ParseTreeType.BINARY_OPERATOR && ! expr.operator.isAssignmentOperator()) { 
        this.reportError_(expr.operator, 'Invalid operator: ' + expr.operator); 
      } 
      return expr; 
    }, 
    peekMemberExpressionSuffix_: function() { 
      return this.peek_(TokenType.OPEN_SQUARE) || this.peek_(TokenType.PERIOD) || options.quasi && this.peek_(TokenType.BACK_QUOTE) || options.cascadeExpression && this.peek_(TokenType.PERIOD_OPEN_CURLY); 
    }, 
    parseNewExpression_: function() { 
      if(this.peek_(TokenType.NEW)) { 
        var start = this.getTreeStartLocation_(); 
        this.eat_(TokenType.NEW); 
        var operand = this.parseNewExpression_(); 
        var args = null; 
        if(this.peek_(TokenType.OPEN_PAREN)) { 
          args = this.parseArguments_(); 
        } 
        return new NewExpression(this.getTreeLocation_(start), operand, args); 
      } else { 
        return this.parseMemberExpressionNoNew_(); 
      } 
    }, 
    parseArguments_: function() { 
      var start = this.getTreeStartLocation_(); 
      var args =[]; 
      this.eat_(TokenType.OPEN_PAREN); 
      while(this.peekAssignmentOrRest_()) { 
        args.push(this.parseAssignmentOrSpread_()); 
        if(! this.peek_(TokenType.CLOSE_PAREN)) { 
          this.eat_(TokenType.COMMA); 
        } 
      } 
      this.eat_(TokenType.CLOSE_PAREN); 
      return new ArgumentList(this.getTreeLocation_(start), args); 
    }, 
    peekRest_: function(opt_index) { 
      return options.restParameters && this.peek_(TokenType.DOT_DOT_DOT, opt_index || 0); 
    }, 
    peekAssignmentOrRest_: function() { 
      return this.peekRest_() || this.peekAssignmentExpression_(); 
    }, 
    parseAssignmentOrSpread_: function() { 
      if(this.peekSpread_()) { 
        return this.parseSpreadExpression_(); 
      } 
      return this.parseAssignmentExpression(); 
    }, 
    parseArrowFunction_: function(expressionIn) { 
      var start = this.getTreeStartLocation_(); 
      var formals, coverFormals; 
      if(this.peekBindingIdentifier_() && this.peekArrow_(1)) { 
        var id = this.parseBindingIdentifier_(); 
        formals =[new BindingElement(id.location, id, null)]; 
      } else { 
        this.eat_(TokenType.OPEN_PAREN); 
        if(this.peek_(TokenType.CLOSE_PAREN)) { 
          this.eat_(TokenType.CLOSE_PAREN); 
          formals =[]; 
        } else if(this.peekRest_()) { 
          formals =[this.parseRestParameter_()]; 
          this.eat_(TokenType.CLOSE_PAREN); 
        } else { 
          coverFormals = this.parseExpression_(); 
          if(coverFormals.type === ParseTreeType.MISSING_PRIMARY_EXPRESSION) return coverFormals; 
          if(this.peek_(TokenType.COMMA) && this.peekRest_(1)) { 
            this.eat_(TokenType.COMMA); 
            formals = this.reparseAsFormalsList_(coverFormals); 
            if(formals) formals.push(this.parseRestParameter_()); 
            this.eat_(TokenType.CLOSE_PAREN); 
          } else if(this.peek_(TokenType.FOR) && options.generatorComprehension) { 
            return this.parseGeneratorComprehension_(start, coverFormals); 
          } else { 
            this.eat_(TokenType.CLOSE_PAREN); 
            if(this.peek_(TokenType.ARROW)) formals = this.reparseAsFormalsList_(coverFormals); 
          } 
        } 
      } 
      if(! formals) return new ParenExpression(this.getTreeLocation_(start), coverFormals); 
      this.eat_(TokenType.ARROW); 
      var body = this.parseConciseBody_(); 
      var startLoc = this.getTreeLocation_(start); 
      return new ArrowFunctionExpression(startLoc, new FormalParameterList(startLoc, formals), body); 
    }, 
    reparseAsFormalsList_: function(coverFormals) { 
      var errorReporter = new MutedErrorReporter(); 
      var p = new Parser(errorReporter, this.scanner_.getFile(), coverFormals.location.start.offset); 
      var formals = p.parseFormalsList_(); 
      if(errorReporter.hadError() || ! formals.length || formals[formals.length - 1].location.end.offset !== coverFormals.location.end.offset) { 
        return null; 
      } 
      return formals; 
    }, 
    peekArrow_: function(opt_index) { 
      return options.arrowFunctions && this.peek_(TokenType.ARROW, opt_index); 
    }, 
    parseConciseBody_: function() { 
      if(this.peek_(TokenType.OPEN_CURLY)) return this.parseBlock_(); 
      return this.parseAssignmentExpression(); 
    }, 
    parseGeneratorComprehension_: function(start, expression) { 
      var comprehensionForList = this.parseComprehensionForList_(); 
      var ifExpression = this.parseComprehensionIf_(); 
      this.eat_(TokenType.CLOSE_PAREN); 
      return new GeneratorComprehension(this.getTreeLocation_(start), expression, comprehensionForList, ifExpression); 
    }, 
    parseComprehensionForList_: function() { 
      var comprehensionForList =[]; 
      while(this.peek_(TokenType.FOR)) { 
        this.eat_(TokenType.FOR); 
        var innerStart = this.getTreeStartLocation_(); 
        var left = this.parseForBinding_(); 
        this.eatId_(PredefinedName.OF); 
        var iterator = this.parseExpression_(); 
        comprehensionForList.push(new ComprehensionFor(this.getTreeLocation_(innerStart), left, iterator)); 
      } 
      return comprehensionForList; 
    }, 
    parseComprehensionIf_: function() { 
      if(this.peek_(TokenType.IF)) { 
        this.eat_(TokenType.IF); 
        return this.parseExpression_(); 
      } 
      return null; 
    }, 
    parseForBinding_: function() { 
      if(this.peekPattern_()) return this.parseBindingPattern_(); 
      return this.parseBindingIdentifier_(); 
    }, 
    peekPattern_: function(opt_index) { 
      var index = opt_index || 0; 
      return options.destructuring &&(this.peekObjectPattern_(index) || this.peekArrayPattern_(index)); 
    }, 
    peekArrayPattern_: function(opt_index) { 
      return this.peek_(TokenType.OPEN_SQUARE, opt_index || 0); 
    }, 
    peekObjectPattern_: function(opt_index) { 
      return this.peek_(TokenType.OPEN_CURLY, opt_index || 0); 
    }, 
    parseBindingPattern_: function() { 
      if(this.peekArrayPattern_()) return this.parseArrayBindingPattern_(); 
      return this.parseObjectBindingPattern_(); 
    }, 
    parseArrayBindingPattern_: function() { 
      var start = this.getTreeStartLocation_(); 
      var elements =[]; 
      this.eat_(TokenType.OPEN_SQUARE); 
      while(this.peekBindingElement_() || this.peek_(TokenType.COMMA) || this.peekRest_()) { 
        this.parseElisionOpt_(elements); 
        if(this.peekRest_()) { 
          elements.push(this.parseBindingRestElement_()); 
          break; 
        } else { 
          elements.push(this.parseBindingElement_()); 
          if(this.peek_(TokenType.COMMA) && ! this.peek_(TokenType.CLOSE_SQUARE, 1)) { 
            this.eat_(TokenType.COMMA); 
          } 
        } 
      } 
      this.eat_(TokenType.CLOSE_SQUARE); 
      return new ArrayPattern(this.getTreeLocation_(start), elements); 
    }, 
    parseBindingElementList_: function(elements) { 
      this.parseElisionOpt_(elements); 
      elements.push(this.parseBindingElement_()); 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        this.parseElisionOpt_(elements); 
        elements.push(this.parseBindingElement_()); 
      } 
    }, 
    parseElisionOpt_: function(elements) { 
      while(this.peek_(TokenType.COMMA)) { 
        this.eat_(TokenType.COMMA); 
        elements.push(null); 
      } 
    }, 
    peekBindingElement_: function() { 
      return this.peekBindingIdentifier_() || this.peekPattern_(); 
    }, 
    parseBindingElement_: function(opt_initializer) { 
      var start = this.getTreeStartLocation_(); 
      var binding; 
      if(this.peekPattern_()) binding = this.parseBindingPattern_(); else binding = this.parseBindingIdentifier_(); 
      var initializer = null; 
      if(this.peek_(TokenType.EQUAL) || opt_initializer === Initializer.REQUIRED) { 
        initializer = this.parseInitializer_(); 
      } 
      return new BindingElement(this.getTreeLocation_(start), binding, initializer); 
    }, 
    parseBindingRestElement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DOT_DOT_DOT); 
      var identifier = this.parseBindingIdentifier_(); 
      return new SpreadPatternElement(this.getTreeLocation_(start), identifier); 
    }, 
    parseObjectBindingPattern_: function() { 
      var start = this.getTreeStartLocation_(); 
      var elements =[]; 
      this.eat_(TokenType.OPEN_CURLY); 
      while(this.peekBindingProperty_()) { 
        elements.push(this.parseBindingProperty_()); 
        if(! this.peek_(TokenType.COMMA)) break; 
        this.eat_(TokenType.COMMA); 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new ObjectPattern(this.getTreeLocation_(start), elements); 
    }, 
    peekBindingProperty_: function() { 
      return this.peekBindingIdentifier_() || this.peekPropertyName_(); 
    }, 
    parseBindingProperty_: function() { 
      var start = this.getTreeStartLocation_(); 
      if(this.peek_(TokenType.COLON, 1)) { 
        var propertyName = this.nextToken_(); 
        this.eat_(TokenType.COLON); 
        var binding = this.parseBindingElement_(); 
        return new ObjectPatternField(this.getTreeLocation_(start), propertyName, binding); 
      } 
      var binding = this.parseBindingIdentifier_(); 
      var initializer = null; 
      if(this.peek_(TokenType.EQUAL)) initializer = this.parseInitializer_(); 
      return new BindingElement(this.getTreeLocation_(start), binding, initializer); 
    }, 
    parseAssignmentPattern_: function() { 
      if(this.peekObjectPattern_()) return this.parseObjectAssignmentPattern_(); 
      return this.parseArrayAssignmentPattern_(); 
    }, 
    parseObjectAssignmentPattern_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.OPEN_CURLY); 
      var fields =[]; 
      var field; 
      while(this.peekId_() || this.peekPropertyName_()) { 
        if(this.peek_(TokenType.COLON, 1)) { 
          var fieldStart = this.getTreeStartLocation_(); 
          var name = this.nextToken_(); 
          this.eat_(TokenType.COLON); 
          var left = this.parseLeftHandSideExpression_(); 
          left = this.transformLeftHandSideExpression_(left); 
          field = new ObjectPatternField(this.getTreeLocation_(start), name, left); 
        } else { 
          field = this.parseIdentifierExpression_(); 
        } 
        fields.push(field); 
        if(this.peek_(TokenType.COMMA)) this.eat_(TokenType.COMMA); else break; 
      } 
      this.eat_(TokenType.CLOSE_CURLY); 
      return new ObjectPattern(this.getTreeLocation_(start), fields); 
    }, 
    parseArrayAssignmentPattern_: function() { 
      var start = this.getTreeStartLocation_(); 
      var elements =[]; 
      this.eat_(TokenType.OPEN_SQUARE); 
      while(this.peek_(TokenType.COMMA) || this.peekRest_() || this.peekAssignmentExpression_()) { 
        this.parseElisionOpt_(elements); 
        if(this.peekRest_()) { 
          elements.push(this.parseAssignmentRestElement_()); 
          break; 
        } else { 
          elements.push(this.parseAssignmentElement_()); 
          if(this.peek_(TokenType.COMMA) && ! this.peek_(TokenType.CLOSE_SQUARE, 1)) { 
            this.eat_(TokenType.COMMA); 
          } 
        } 
      } 
      this.eat_(TokenType.CLOSE_SQUARE); 
      return new ArrayPattern(this.getTreeLocation_(start), elements); 
    }, 
    parseAssignmentRestElement_: function() { 
      var start = this.getTreeStartLocation_(); 
      this.eat_(TokenType.DOT_DOT_DOT); 
      var left = this.parseLeftHandSideExpression_(); 
      left = this.transformLeftHandSideExpression_(left); 
      return new SpreadPatternElement(this.getTreeLocation_(start), left); 
    }, 
    parseAssignmentElement_: function() { 
      var tree = this.parseLeftHandSideExpression_(); 
      return this.transformLeftHandSideExpression_(tree); 
    }, 
    parseQuasiLiteral_: function(operand) { 
      if(! options.quasi) { 
        return this.parseMissingPrimaryExpression_(); 
      } 
      function pushSubst(tree) { 
        elements.push(new QuasiSubstitution(tree.location, tree)); 
      } 
      var start = operand ? operand.location.start: this.getTreeStartLocation_(); 
      this.eat_(TokenType.BACK_QUOTE); 
      var elements =[]; 
      while(! this.peekEndOfQuasiLiteral_()) { 
        var token = this.nextQuasiLiteralPortionToken_(); 
        elements.push(new QuasiLiteralPortion(this.getTreeLocation_(start), token)); 
        if(! this.peekQuasiToken_(TokenType.DOLLAR)) break; 
        token = this.nextQuasiSubstitutionToken_(); 
        traceur.assert(token.type == TokenType.DOLLAR); 
        this.eat_(TokenType.OPEN_CURLY); 
        var expression = this.parseExpression_(); 
        if(! expression) return this.parseMissingPrimaryExpression_(); 
        pushSubst(expression); 
        this.eat_(TokenType.CLOSE_CURLY); 
      } 
      this.eat_(TokenType.BACK_QUOTE); 
      return new QuasiLiteralExpression(this.getTreeLocation_(start), operand, elements); 
    }, 
    eatPossibleImplicitSemiColon_: function() { 
      if(this.peek_(TokenType.SEMI_COLON) && this.peekToken_().location.start.line == this.getLastLine_()) { 
        this.eat_(TokenType.SEMI_COLON); 
        return; 
      } 
      if(this.peekImplicitSemiColon_()) { 
        return; 
      } 
      this.reportError_('Semi-colon expected'); 
    }, 
    peekImplicitSemiColon_: function() { 
      return this.getNextLine_() > this.getLastLine_() || this.peek_(TokenType.SEMI_COLON) || this.peek_(TokenType.CLOSE_CURLY) || this.peek_(TokenType.END_OF_FILE); 
    }, 
    getLastLine_: function() { 
      return this.scanner_.lastToken.location.end.line; 
    }, 
    getNextLine_: function() { 
      return this.peekToken_().location.start.line; 
    }, 
    eatOpt_: function(expectedTokenType) { 
      if(this.peek_(expectedTokenType)) { 
        return this.eat_(expectedTokenType); 
      } 
      return null; 
    }, 
    eatIdOpt_: function() { 
      return(this.peek_(TokenType.IDENTIFIER)) ? this.eatId_(): null; 
    }, 
    eatId_: function(opt_expected) { 
      var result = this.eat_(TokenType.IDENTIFIER); 
      if(opt_expected) { 
        if(! result || result.value !== opt_expected) { 
          if(! result) result = this.peekToken_(); 
          this.reportError_(result, 'expected "' + opt_expected + '"'); 
          return null; 
        } 
      } 
      return result; 
    }, 
    eatIdName_: function() { 
      var t = this.nextToken_(); 
      if(t.type != TokenType.IDENTIFIER) { 
        if(! Keywords.isKeyword(t.type)) { 
          this.reportExpectedError_(t, 'identifier'); 
          return null; 
        } 
        return new IdentifierToken(t.location, t.type); 
      } 
      return t; 
    }, 
    eat_: function(expectedTokenType) { 
      var token = this.nextToken_(); 
      if(token.type != expectedTokenType) { 
        this.reportExpectedError_(token, expectedTokenType); 
        return null; 
      } 
      return token; 
    }, 
    reportExpectedError_: function(token, expected) { 
      this.reportError_(token, "'" + expected + "' expected"); 
    }, 
    getTreeStartLocation_: function() { 
      return this.peekToken_().location.start; 
    }, 
    getTreeEndLocation_: function() { 
      return this.scanner_.lastToken.location.end; 
    }, 
    getTreeLocation_: function(start) { 
      return new SourceRange(start, this.getTreeEndLocation_()); 
    }, 
    nextToken_: function() { 
      return this.scanner_.nextToken(); 
    }, 
    nextRegularExpressionLiteralToken_: function() { 
      return this.scanner_.nextRegularExpressionLiteralToken(); 
    }, 
    nextQuasiLiteralPortionToken_: function() { 
      return this.scanner_.nextQuasiLiteralPortionToken(); 
    }, 
    nextQuasiIdentifier_: function() { 
      return this.scanner_.nextQuasiIdentifier(); 
    }, 
    nextQuasiSubstitutionToken_: function() { 
      return this.scanner_.nextQuasiSubstitutionToken(); 
    }, 
    peekEndOfQuasiLiteral_: function() { 
      return this.peekQuasiToken_(TokenType.BACK_QUOTE) || this.peekQuasiToken_(TokenType.END_OF_FILE); 
    }, 
    peekQuasiToken_: function(type) { 
      return this.scanner_.peekQuasiToken(type); 
    }, 
    peek_: function(expectedType, opt_index) { 
      return this.peekType_(opt_index || 0) == expectedType; 
    }, 
    peekType_: function(opt_index) { 
      return this.peekToken_(opt_index || 0).type; 
    }, 
    peekToken_: function(opt_index) { 
      return this.scanner_.peekToken(opt_index || 0); 
    }, 
    peekTokenNoLineTerminator_: function(opt_index) { 
      return this.scanner_.peekTokenNoLineTerminator(opt_index || 0); 
    }, 
    reportError_: function(var_args) { 
      if(arguments.length == 1) { 
        this.errorReporter_.reportError(this.scanner_.getPosition(), arguments[0]); 
      } else { 
        var location = arguments[0]; 
        if(location instanceof Token) { 
          location = location.location; 
        } 
        this.errorReporter_.reportError(location.start, arguments[1]); 
      } 
    }, 
    reportUnexpectedToken_: function() { 
      this.reportError_(this.peekToken_(), 'Unexpected token'); 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { Parser: { 
      get: function() { 
        return Parser; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_LineNumberTable_js =(function() { 
  "use strict"; 
  var destructuring$SourcePosition = $src_util_SourcePosition_js, SourcePosition = destructuring$SourcePosition.SourcePosition; 
  var destructuring$SourceRange = $src_util_SourceRange_js, SourceRange = destructuring$SourceRange.SourceRange; 
  function binarySearch(arr, target) { 
    var left = 0; 
    var right = arr.length - 1; 
    while(left <= right) { 
      var mid =(left + right) >> 1; 
      if(target > arr[mid]) { 
        left = mid + 1; 
      } else if(target < arr[mid]) { 
        right = mid - 1; 
      } else { 
        return mid; 
      } 
    } 
    return -(left + 1); 
  } 
  var MAX_INT_REPRESENTATION = 9007199254740992; 
  function computeLineStartOffsets(source) { 
    var lineStartOffsets =[]; 
    lineStartOffsets.push(0); 
    for(var index = 0; index < source.length; index ++) { 
      var ch = source.charAt(index); 
      if(isLineTerminator(ch)) { 
        if(index < source.length && ch == '\r' && source.charAt(index + 1) == '\n') { 
          index ++; 
        } 
        lineStartOffsets.push(index + 1); 
      } 
    } 
    lineStartOffsets.push(MAX_INT_REPRESENTATION); 
    return lineStartOffsets; 
  } 
  function isLineTerminator(ch) { 
    switch(ch) { 
      case '\n': 
      case '\r': 
      case '\u2028': 
      case '\u2029': 
        return true; 

      default: 
        return false; 

    } 
  } 
  var LineNumberTable = traceur.runtime.createClass({ 
    constructor: function(sourceFile) { 
      this.sourceFile_ = sourceFile; 
      this.lineStartOffsets_ = computeLineStartOffsets(sourceFile.contents); 
    }, 
    getSourcePosition: function(offset) { 
      var line = this.getLine(offset); 
      return new SourcePosition(this.sourceFile_, offset, line, this.getColumn(line, offset)); 
    }, 
    getLine: function(offset) { 
      var index = binarySearch(this.lineStartOffsets_, offset); 
      if(index >= 0) { 
        return index; 
      } 
      return - index - 2; 
    }, 
    offsetOfLine: function(line) { 
      return this.lineStartOffsets_[line]; 
    }, 
    getColumn: function(var_args) { 
      var line, offset; 
      if(arguments.length >= 2) { 
        line = arguments[0]; 
        offset = arguments[1]; 
      } else { 
        offset = arguments[0]; 
        line = this.getLine(offset); 
      } 
      return offset - this.offsetOfLine(line); 
    }, 
    getSourceRange: function(startOffset, endOffset) { 
      return new SourceRange(this.getSourcePosition(startOffset), this.getSourcePosition(endOffset)); 
    } 
  }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { LineNumberTable: { 
      get: function() { 
        return LineNumberTable; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_SourceFile_js =(function() { 
  "use strict"; 
  var destructuring$LineNumberTable = $src_syntax_LineNumberTable_js, LineNumberTable = destructuring$LineNumberTable.LineNumberTable; 
  var SourceFile = traceur.runtime.createClass({ constructor: function(name, contents) { 
      this.name = name; 
      this.contents = contents; 
      this.lineNumberTable = new LineNumberTable(this); 
      this.uid = traceur.getUid(); 
    } }, null, true, false); 
  return Object.preventExtensions(Object.create(null, { SourceFile: { 
      get: function() { 
        return SourceFile; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ParseTreeFactory_js =(function() { 
  "use strict"; 
  var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
  var destructuring$LiteralToken = $src_syntax_LiteralToken_js, LiteralToken = destructuring$LiteralToken.LiteralToken; 
  var destructuring$ParseTree$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTree = destructuring$ParseTree$ParseTreeType.ParseTree, ParseTreeType = destructuring$ParseTree$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var ArgumentList = trees.ArgumentList; 
  var ArrayLiteralExpression = trees.ArrayLiteralExpression; 
  var ArrayPattern = trees.ArrayPattern; 
  var BinaryOperator = trees.BinaryOperator; 
  var BindingElement = trees.BindingElement; 
  var BindingIdentifier = trees.BindingIdentifier; 
  var Block = trees.Block; 
  var BreakStatement = trees.BreakStatement; 
  var CallExpression = trees.CallExpression; 
  var CascadeExpression = trees.CascadeExpression; 
  var CaseClause = trees.CaseClause; 
  var Catch = trees.Catch; 
  var ClassDeclaration = trees.ClassDeclaration; 
  var CommaExpression = trees.CommaExpression; 
  var ConditionalExpression = trees.ConditionalExpression; 
  var ContinueStatement = trees.ContinueStatement; 
  var DefaultClause = trees.DefaultClause; 
  var DoWhileStatement = trees.DoWhileStatement; 
  var EmptyStatement = trees.EmptyStatement; 
  var ExpressionStatement = trees.ExpressionStatement; 
  var Finally = trees.Finally; 
  var ForInStatement = trees.ForInStatement; 
  var ForOfStatement = trees.ForOfStatement; 
  var ForStatement = trees.ForStatement; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GetAccessor = trees.GetAccessor; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var IfStatement = trees.IfStatement; 
  var LabelledStatement = trees.LabelledStatement; 
  var LiteralExpression = trees.LiteralExpression; 
  var MemberExpression = trees.MemberExpression; 
  var MemberLookupExpression = trees.MemberLookupExpression; 
  var NewExpression = trees.NewExpression; 
  var ObjectLiteralExpression = trees.ObjectLiteralExpression; 
  var ObjectPattern = trees.ObjectPattern; 
  var ObjectPatternField = trees.ObjectPatternField; 
  var ParenExpression = trees.ParenExpression; 
  var PostfixExpression = trees.PostfixExpression; 
  var Program = trees.Program; 
  var PropertyNameAssignment = trees.PropertyNameAssignment; 
  var RestParameter = trees.RestParameter; 
  var ReturnStatement = trees.ReturnStatement; 
  var YieldStatement = trees.YieldStatement; 
  var SetAccessor = trees.SetAccessor; 
  var SpreadExpression = trees.SpreadExpression; 
  var SpreadPatternElement = trees.SpreadPatternElement; 
  var SwitchStatement = trees.SwitchStatement; 
  var ThisExpression = trees.ThisExpression; 
  var ThrowStatement = trees.ThrowStatement; 
  var TryStatement = trees.TryStatement; 
  var UnaryExpression = trees.UnaryExpression; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableDeclaration = trees.VariableDeclaration; 
  var VariableStatement = trees.VariableStatement; 
  var WhileStatement = trees.WhileStatement; 
  var WithStatement = trees.WithStatement; 
  var slice = Array.prototype.slice.call.bind(Array.prototype.slice); 
  var map = Array.prototype.map.call.bind(Array.prototype.map); 
  function createOperatorToken(operator) { 
    return new Token(operator, null); 
  } 
  function createIdentifierToken(identifier) { 
    return new IdentifierToken(null, identifier); 
  } 
  function createPropertyNameToken(propertyName) { 
    return createIdentifierToken(propertyName); 
  } 
  function createStringLiteralToken(value) { 
    return new LiteralToken(TokenType.STRING, JSON.stringify(value), null); 
  } 
  function createBooleanLiteralToken(value) { 
    return new Token(value ? TokenType.TRUE: TokenType.FALSE, null); 
  } 
  function createNullLiteralToken() { 
    return new LiteralToken(TokenType.NULL, 'null', null); 
  } 
  function createNumberLiteralToken(value) { 
    return new LiteralToken(TokenType.NUMBER, String(value), null); 
  } 
  function createEmptyParameters() { 
    return[]; 
  } 
  function createStatementList(statementsOrHead, var_args) { 
    if(statementsOrHead instanceof Array) { 
      var result = statementsOrHead.slice(); 
      result.push.apply(result, slice(arguments, 1)); 
      return result; 
    } 
    return slice(arguments); 
  } 
  function createBindingElement(arg) { 
    var binding = createBindingIdentifier(arg); 
    return new BindingElement(null, binding, null); 
  } 
  function createParameterList(arg0, var_args) { 
    if(typeof arg0 == 'string') { 
      var parameterList = map(arguments, createBindingElement); 
      return new FormalParameterList(null, parameterList); 
    } 
    if(typeof arg0 == 'number') return createParameterListHelper(arg0, false); 
    if(arg0 instanceof IdentifierToken) { 
      return new FormalParameterList(null,[createBindingElement(arg0)]); 
    } 
    var builder = arg0.map(createBindingElement); 
    return new FormalParameterList(null, builder); 
  } 
  function createParameterListHelper(numberOfParameters, hasRestParams) { 
    var builder =[]; 
    for(var index = 0; index < numberOfParameters; index ++) { 
      var parameterName = PredefinedName.getParameterName(index); 
      var isRestParameter = index == numberOfParameters - 1 && hasRestParams; 
      builder.push(isRestParameter ? createRestParameter(parameterName): createBindingElement(parameterName)); 
    } 
    return new FormalParameterList(null, builder); 
  } 
  function createParameterListWithRestParams(numberOfParameters) { 
    return createParameterListHelper(numberOfParameters, true); 
  } 
  function createParameterReference(index) { 
    return createIdentifierExpression(PredefinedName.getParameterName(index)); 
  } 
  function createEmptyParameterList() { 
    return new FormalParameterList(null,[]); 
  } 
  function createEmptyList() { 
    return[]; 
  } 
  function createArgumentList(numberListOrFirst, var_args) { 
    if(typeof numberListOrFirst == 'number') { 
      return createArgumentListFromParameterList(createParameterList(numberListOrFirst)); 
    } 
    var list; 
    if(numberListOrFirst instanceof Array) list = numberListOrFirst; else list = slice(arguments); 
    return new ArgumentList(null, list); 
  } 
  function createArgumentListFromParameterList(formalParameterList) { 
    var builder = formalParameterList.parameters.map(function(parameter) { 
      if(parameter.isRestParameter()) { 
        return createSpreadExpression(createIdentifierExpression(parameter.identifier)); 
      } else { 
        return parameter; 
      } 
    }); 
    return new ArgumentList(null, builder); 
  } 
  function createEmptyArgumentList() { 
    return new ArgumentList(null, createEmptyList()); 
  } 
  function createArrayLiteralExpression(list) { 
    return new ArrayLiteralExpression(null, list); 
  } 
  function createEmptyArrayLiteralExpression() { 
    return createArrayLiteralExpression(createEmptyList()); 
  } 
  function createArrayPattern(list) { 
    return new ArrayPattern(null, list); 
  } 
  function createAssignmentExpression(lhs, rhs) { 
    return new BinaryOperator(null, lhs, createOperatorToken(TokenType.EQUAL), rhs); 
  } 
  function createBinaryOperator(left, operator, right) { 
    return new BinaryOperator(null, left, operator, right); 
  } 
  function createBindingIdentifier(identifier) { 
    if(typeof identifier === 'string') identifier = createIdentifierToken(identifier); else if(identifier.type === ParseTreeType.BINDING_IDENTIFIER) return identifier; else if(identifier.type === ParseTreeType.IDENTIFIER_EXPRESSION) return new BindingIdentifier(identifier.location, identifier.identifierToken); 
    return new BindingIdentifier(null, identifier); 
  } 
  function createEmptyStatement() { 
    return new EmptyStatement(null); 
  } 
  function createEmptyBlock() { 
    return createBlock(createEmptyList()); 
  } 
  function createBlock(statements) { 
    if(statements instanceof ParseTree) statements = slice(arguments); 
    return new Block(null, statements); 
  } 
  function createScopedStatements(statements) { 
    if(statements instanceof ParseTree) statements = slice(arguments); 
    return createScopedBlock(createBlock(statements)); 
  } 
  function createScopedBlock(block) { 
    return createExpressionStatement(createScopedExpression(block)); 
  } 
  function createScopedExpression(block) { 
    return createCallCall(createParenExpression(createFunctionExpression(createEmptyParameterList(), block)), createThisExpression()); 
  } 
  function createCallExpression(operand, opt_args) { 
    var args = opt_args || createEmptyArgumentList(); 
    return new CallExpression(null, operand, args); 
  } 
  function createBoundCall(func, thisTree) { 
    return createCallExpression(createMemberExpression(func.type == ParseTreeType.FUNCTION_DECLARATION ? createParenExpression(func): func, PredefinedName.BIND), createArgumentList(thisTree)); 
  } 
  function createBreakStatement(opt_name) { 
    return new BreakStatement(null, opt_name || null); 
  } 
  function createCallCall(func, thisExpression, args, var_args) { 
    if(args instanceof ParseTree) args = slice(arguments, 2); 
    var builder =[]; 
    builder.push(thisExpression); 
    builder.push.apply(builder, args); 
    return createCallExpression(createMemberExpression(func, PredefinedName.CALL), createArgumentList(builder)); 
  } 
  function createCallCallStatement(func, thisExpression, var_args) { 
    var args = slice(arguments, 2); 
    return createExpressionStatement(createCallCall(func, thisExpression, args)); 
  } 
  function createCaseClause(expression, statements) { 
    return new CaseClause(null, expression, statements); 
  } 
  function createCatch(identifier, catchBody) { 
    identifier = createBindingIdentifier(identifier); 
    return new Catch(null, identifier, catchBody); 
  } 
  function createCascadeExpression(operand, expressions) { 
    return new CascadeExpression(null, operand, expressions); 
  } 
  function createClassDeclaration(name, superClass, elements) { 
    return new ClassDeclaration(null, name, superClass, elements); 
  } 
  function createCommaExpression(expressions) { 
    return new CommaExpression(null, expressions); 
  } 
  function createConditionalExpression(condition, left, right) { 
    return new ConditionalExpression(null, condition, left, right); 
  } 
  function createContinueStatement(opt_name) { 
    return new ContinueStatement(null, opt_name || null); 
  } 
  function createDefaultClause(statements) { 
    return new DefaultClause(null, statements); 
  } 
  function createDoWhileStatement(body, condition) { 
    return new DoWhileStatement(null, body, condition); 
  } 
  function createAssignmentStatement(lhs, rhs) { 
    return createExpressionStatement(createAssignmentExpression(lhs, rhs)); 
  } 
  function createCallStatement(operand, opt_args) { 
    if(opt_args) { 
      return createExpressionStatement(createCallExpression(operand, opt_args)); 
    } 
    return createExpressionStatement(createCallExpression(operand)); 
  } 
  function createExpressionStatement(expression) { 
    return new ExpressionStatement(null, expression); 
  } 
  function createFinally(block) { 
    return new Finally(null, block); 
  } 
  function createForOfStatement(initializer, collection, body) { 
    return new ForOfStatement(null, initializer, collection, body); 
  } 
  function createForInStatement(initializer, collection, body) { 
    return new ForInStatement(null, initializer, collection, body); 
  } 
  function createForStatement(variables, condition, increment, body) { 
    return new ForStatement(null, variables, condition, increment, body); 
  } 
  function createFunctionExpressionFormals(formalParameters, functionBody) { 
    if(formalParameters instanceof Array) formalParameters = createParameterList(formalParameters); 
    return new FunctionDeclaration(null, null, false, formalParameters, functionBody); 
  } 
  function createFunctionDeclaration(name, formalParameterList, functionBody) { 
    if(name !== null) name = createBindingIdentifier(name); 
    return new FunctionDeclaration(null, name, false, formalParameterList, functionBody); 
  } 
  function createFunctionExpression(formalParameterList, functionBody) { 
    return new FunctionDeclaration(null, null, false, formalParameterList, functionBody); 
  } 
  function createGetAccessor(propertyName, body) { 
    if(typeof propertyName == 'string') propertyName = createPropertyNameToken(propertyName); 
    return new GetAccessor(null, propertyName, body); 
  } 
  function createIdentifierExpression(identifier) { 
    if(typeof identifier == 'string') identifier = createIdentifierToken(identifier); else if(identifier instanceof BindingIdentifier) identifier = identifier.identifierToken; 
    return new IdentifierExpression(null, identifier); 
  } 
  function createUndefinedExpression() { 
    return createIdentifierExpression(PredefinedName.UNDEFINED); 
  } 
  function createIfStatement(condition, ifClause, opt_elseClause) { 
    return new IfStatement(null, condition, ifClause, opt_elseClause || null); 
  } 
  function createLabelledStatement(name, statement) { 
    return new LabelledStatement(null, name, statement); 
  } 
  function createStringLiteral(value) { 
    return new LiteralExpression(null, createStringLiteralToken(value)); 
  } 
  function createBooleanLiteral(value) { 
    return new LiteralExpression(null, createBooleanLiteralToken(value)); 
  } 
  function createTrueLiteral() { 
    return createBooleanLiteral(true); 
  } 
  function createFalseLiteral() { 
    return createBooleanLiteral(false); 
  } 
  function createNullLiteral() { 
    return new LiteralExpression(null, createNullLiteralToken()); 
  } 
  function createNumberLiteral(value) { 
    return new LiteralExpression(null, createNumberLiteralToken(value)); 
  } 
  function createMemberExpression(operand, memberName, memberNames) { 
    if(typeof operand == 'string' || operand instanceof IdentifierToken) operand = createIdentifierExpression(operand); 
    if(typeof memberName == 'string') memberName = createIdentifierToken(memberName); 
    var tree = new MemberExpression(null, operand, memberName); 
    for(var i = 2; i < arguments.length; i ++) { 
      tree = createMemberExpression(tree, arguments[i]); 
    } 
    return tree; 
  } 
  function createMemberLookupExpression(operand, memberExpression) { 
    return new MemberLookupExpression(null, operand, memberExpression); 
  } 
  function createThisExpression(memberName) { 
    if(memberName) return createMemberExpression(createThisExpression(), memberName); 
    return new ThisExpression(null); 
  } 
  function createNewExpression(operand, args) { 
    return new NewExpression(null, operand, args); 
  } 
  function createObjectFreeze(value) { 
    return createCallExpression(createMemberExpression(PredefinedName.OBJECT, PredefinedName.FREEZE), createArgumentList(value)); 
  } 
  function createObjectPreventExtensions(value) { 
    return createCallExpression(createMemberExpression(PredefinedName.OBJECT, PredefinedName.PREVENT_EXTENSIONS), createArgumentList(value)); 
  } 
  function createObjectCreate(protoExpression, descriptors) { 
    var argumentList =[protoExpression]; 
    if(descriptors) argumentList.push(descriptors); 
    return createCallExpression(createMemberExpression(PredefinedName.OBJECT, PredefinedName.CREATE), createArgumentList(argumentList)); 
  } 
  function createPropertyDescriptor(descr) { 
    var propertyNameAndValues = Object.keys(descr).map(function(name) { 
      var value = descr[name]; 
      if(!(value instanceof ParseTree)) value = createBooleanLiteral(! ! value); 
      return createPropertyNameAssignment(name, value); 
    }); 
    return createObjectLiteralExpression(propertyNameAndValues); 
  } 
  function createDefineProperty(tree, name, descr) { 
    if(typeof name === 'string') name = createStringLiteral(name); 
    return createCallExpression(createMemberExpression(PredefinedName.OBJECT, PredefinedName.DEFINE_PROPERTY), createArgumentList(tree, name, createPropertyDescriptor(descr))); 
  } 
  function createObjectLiteralExpression(propertyNameAndValues) { 
    if(propertyNameAndValues instanceof ParseTree) propertyNameAndValues = slice(arguments); 
    return new ObjectLiteralExpression(null, propertyNameAndValues); 
  } 
  function createObjectPattern(list) { 
    return new ObjectPattern(null, list); 
  } 
  function createObjectPatternField(identifier, element) { 
    identifier = createBindingIdentifier(identifier); 
    return new ObjectPatternField(null, identifier, element); 
  } 
  function createParenExpression(expression) { 
    return new ParenExpression(null, expression); 
  } 
  function createPostfixExpression(operand, operator) { 
    return new PostfixExpression(null, operand, operator); 
  } 
  function createProgram(programElements) { 
    return new Program(null, programElements); 
  } 
  function createPropertyNameAssignment(identifier, value) { 
    if(typeof identifier == 'string') identifier = createIdentifierToken(identifier); 
    return new PropertyNameAssignment(null, identifier, value); 
  } 
  function createRestParameter(identifier) { 
    return new RestParameter(null, createBindingIdentifier(identifier)); 
  } 
  function createReturnStatement(expression) { 
    return new ReturnStatement(null, expression); 
  } 
  function createYieldStatement(expression, isYieldFor) { 
    return new YieldStatement(null, expression, isYieldFor); 
  } 
  function createSetAccessor(propertyName, parameter, body) { 
    if(typeof propertyName == 'string') propertyName = createPropertyNameToken(propertyName); 
    if(typeof parameter == 'string') parameter = createIdentifierToken(parameter); 
    return new SetAccessor(null, propertyName, parameter, body); 
  } 
  function createSpreadExpression(expression) { 
    return new SpreadExpression(null, expression); 
  } 
  function createSpreadPatternElement(lvalue) { 
    return new SpreadPatternElement(null, lvalue); 
  } 
  function createSwitchStatement(expression, caseClauses) { 
    return new SwitchStatement(null, expression, caseClauses); 
  } 
  function createThrowStatement(value) { 
    return new ThrowStatement(null, value); 
  } 
  function createTryStatement(body, catchOrFinallyBlock, opt_finallyBlock) { 
    var catchBlock, finallyBlock; 
    if(arguments.length > 2) { 
      catchBlock = arguments[1]; 
      finallyBlock = arguments[2]; 
    } else { 
      catchBlock = null; 
      finallyBlock = arguments[1]; 
    } 
    return new TryStatement(null, body, catchBlock, finallyBlock); 
  } 
  function createUnaryExpression(operator, operand) { 
    return new UnaryExpression(null, operator, operand); 
  } 
  function createUseStrictDirective() { 
    return createExpressionStatement(createStringLiteral('use strict')); 
  } 
  function createVariableDeclarationList(binding, identifierOrDeclarations, initializer) { 
    if(identifierOrDeclarations instanceof Array) { 
      var declarations = identifierOrDeclarations; 
      return new VariableDeclarationList(null, binding, declarations); 
    } 
    var identifier = identifierOrDeclarations; 
    return createVariableDeclarationList(binding,[createVariableDeclaration(identifier, initializer)]); 
  } 
  function createVariableDeclaration(identifier, initializer) { 
    if(!(identifier instanceof ParseTree) || identifier.type !== ParseTreeType.BINDING_IDENTIFIER && identifier.type !== ParseTreeType.OBJECT_PATTERN && identifier.type !== ParseTreeType.ARRAY_PATTERN) { 
      identifier = createBindingIdentifier(identifier); 
    } 
    return new VariableDeclaration(null, identifier, initializer); 
  } 
  function createVariableStatement(listOrBinding, identifier, initializer) { 
    if(listOrBinding instanceof VariableDeclarationList) return new VariableStatement(null, listOrBinding); 
    var binding = listOrBinding; 
    var list = createVariableDeclarationList(binding, identifier, initializer); 
    return createVariableStatement(list); 
  } 
  function createVoid0() { 
    return createParenExpression(createUnaryExpression(createOperatorToken(TokenType.VOID), createNumberLiteral(0))); 
  } 
  function createWhileStatement(condition, body) { 
    return new WhileStatement(null, condition, body); 
  } 
  function createWithStatement(expression, body) { 
    return new WithStatement(null, expression, body); 
  } 
  function createAssignStateStatement(state) { 
    return createAssignmentStatement(createIdentifierExpression(PredefinedName.STATE), createNumberLiteral(state)); 
  } 
  return Object.preventExtensions(Object.create(null, { 
    createOperatorToken: { 
      get: function() { 
        return createOperatorToken; 
      }, 
      enumerable: true 
    }, 
    createIdentifierToken: { 
      get: function() { 
        return createIdentifierToken; 
      }, 
      enumerable: true 
    }, 
    createPropertyNameToken: { 
      get: function() { 
        return createPropertyNameToken; 
      }, 
      enumerable: true 
    }, 
    createStringLiteralToken: { 
      get: function() { 
        return createStringLiteralToken; 
      }, 
      enumerable: true 
    }, 
    createBooleanLiteralToken: { 
      get: function() { 
        return createBooleanLiteralToken; 
      }, 
      enumerable: true 
    }, 
    createNullLiteralToken: { 
      get: function() { 
        return createNullLiteralToken; 
      }, 
      enumerable: true 
    }, 
    createNumberLiteralToken: { 
      get: function() { 
        return createNumberLiteralToken; 
      }, 
      enumerable: true 
    }, 
    createEmptyParameters: { 
      get: function() { 
        return createEmptyParameters; 
      }, 
      enumerable: true 
    }, 
    createStatementList: { 
      get: function() { 
        return createStatementList; 
      }, 
      enumerable: true 
    }, 
    createBindingElement: { 
      get: function() { 
        return createBindingElement; 
      }, 
      enumerable: true 
    }, 
    createParameterList: { 
      get: function() { 
        return createParameterList; 
      }, 
      enumerable: true 
    }, 
    createParameterListWithRestParams: { 
      get: function() { 
        return createParameterListWithRestParams; 
      }, 
      enumerable: true 
    }, 
    createParameterReference: { 
      get: function() { 
        return createParameterReference; 
      }, 
      enumerable: true 
    }, 
    createEmptyParameterList: { 
      get: function() { 
        return createEmptyParameterList; 
      }, 
      enumerable: true 
    }, 
    createEmptyList: { 
      get: function() { 
        return createEmptyList; 
      }, 
      enumerable: true 
    }, 
    createArgumentList: { 
      get: function() { 
        return createArgumentList; 
      }, 
      enumerable: true 
    }, 
    createArgumentListFromParameterList: { 
      get: function() { 
        return createArgumentListFromParameterList; 
      }, 
      enumerable: true 
    }, 
    createEmptyArgumentList: { 
      get: function() { 
        return createEmptyArgumentList; 
      }, 
      enumerable: true 
    }, 
    createArrayLiteralExpression: { 
      get: function() { 
        return createArrayLiteralExpression; 
      }, 
      enumerable: true 
    }, 
    createEmptyArrayLiteralExpression: { 
      get: function() { 
        return createEmptyArrayLiteralExpression; 
      }, 
      enumerable: true 
    }, 
    createArrayPattern: { 
      get: function() { 
        return createArrayPattern; 
      }, 
      enumerable: true 
    }, 
    createAssignmentExpression: { 
      get: function() { 
        return createAssignmentExpression; 
      }, 
      enumerable: true 
    }, 
    createBinaryOperator: { 
      get: function() { 
        return createBinaryOperator; 
      }, 
      enumerable: true 
    }, 
    createBindingIdentifier: { 
      get: function() { 
        return createBindingIdentifier; 
      }, 
      enumerable: true 
    }, 
    createEmptyStatement: { 
      get: function() { 
        return createEmptyStatement; 
      }, 
      enumerable: true 
    }, 
    createEmptyBlock: { 
      get: function() { 
        return createEmptyBlock; 
      }, 
      enumerable: true 
    }, 
    createBlock: { 
      get: function() { 
        return createBlock; 
      }, 
      enumerable: true 
    }, 
    createScopedStatements: { 
      get: function() { 
        return createScopedStatements; 
      }, 
      enumerable: true 
    }, 
    createScopedBlock: { 
      get: function() { 
        return createScopedBlock; 
      }, 
      enumerable: true 
    }, 
    createScopedExpression: { 
      get: function() { 
        return createScopedExpression; 
      }, 
      enumerable: true 
    }, 
    createCallExpression: { 
      get: function() { 
        return createCallExpression; 
      }, 
      enumerable: true 
    }, 
    createBoundCall: { 
      get: function() { 
        return createBoundCall; 
      }, 
      enumerable: true 
    }, 
    createBreakStatement: { 
      get: function() { 
        return createBreakStatement; 
      }, 
      enumerable: true 
    }, 
    createCallCall: { 
      get: function() { 
        return createCallCall; 
      }, 
      enumerable: true 
    }, 
    createCallCallStatement: { 
      get: function() { 
        return createCallCallStatement; 
      }, 
      enumerable: true 
    }, 
    createCaseClause: { 
      get: function() { 
        return createCaseClause; 
      }, 
      enumerable: true 
    }, 
    createCatch: { 
      get: function() { 
        return createCatch; 
      }, 
      enumerable: true 
    }, 
    createCascadeExpression: { 
      get: function() { 
        return createCascadeExpression; 
      }, 
      enumerable: true 
    }, 
    createClassDeclaration: { 
      get: function() { 
        return createClassDeclaration; 
      }, 
      enumerable: true 
    }, 
    createCommaExpression: { 
      get: function() { 
        return createCommaExpression; 
      }, 
      enumerable: true 
    }, 
    createConditionalExpression: { 
      get: function() { 
        return createConditionalExpression; 
      }, 
      enumerable: true 
    }, 
    createContinueStatement: { 
      get: function() { 
        return createContinueStatement; 
      }, 
      enumerable: true 
    }, 
    createDefaultClause: { 
      get: function() { 
        return createDefaultClause; 
      }, 
      enumerable: true 
    }, 
    createDoWhileStatement: { 
      get: function() { 
        return createDoWhileStatement; 
      }, 
      enumerable: true 
    }, 
    createAssignmentStatement: { 
      get: function() { 
        return createAssignmentStatement; 
      }, 
      enumerable: true 
    }, 
    createCallStatement: { 
      get: function() { 
        return createCallStatement; 
      }, 
      enumerable: true 
    }, 
    createExpressionStatement: { 
      get: function() { 
        return createExpressionStatement; 
      }, 
      enumerable: true 
    }, 
    createFinally: { 
      get: function() { 
        return createFinally; 
      }, 
      enumerable: true 
    }, 
    createForOfStatement: { 
      get: function() { 
        return createForOfStatement; 
      }, 
      enumerable: true 
    }, 
    createForInStatement: { 
      get: function() { 
        return createForInStatement; 
      }, 
      enumerable: true 
    }, 
    createForStatement: { 
      get: function() { 
        return createForStatement; 
      }, 
      enumerable: true 
    }, 
    createFunctionExpressionFormals: { 
      get: function() { 
        return createFunctionExpressionFormals; 
      }, 
      enumerable: true 
    }, 
    createFunctionDeclaration: { 
      get: function() { 
        return createFunctionDeclaration; 
      }, 
      enumerable: true 
    }, 
    createFunctionExpression: { 
      get: function() { 
        return createFunctionExpression; 
      }, 
      enumerable: true 
    }, 
    createGetAccessor: { 
      get: function() { 
        return createGetAccessor; 
      }, 
      enumerable: true 
    }, 
    createIdentifierExpression: { 
      get: function() { 
        return createIdentifierExpression; 
      }, 
      enumerable: true 
    }, 
    createUndefinedExpression: { 
      get: function() { 
        return createUndefinedExpression; 
      }, 
      enumerable: true 
    }, 
    createIfStatement: { 
      get: function() { 
        return createIfStatement; 
      }, 
      enumerable: true 
    }, 
    createLabelledStatement: { 
      get: function() { 
        return createLabelledStatement; 
      }, 
      enumerable: true 
    }, 
    createStringLiteral: { 
      get: function() { 
        return createStringLiteral; 
      }, 
      enumerable: true 
    }, 
    createBooleanLiteral: { 
      get: function() { 
        return createBooleanLiteral; 
      }, 
      enumerable: true 
    }, 
    createTrueLiteral: { 
      get: function() { 
        return createTrueLiteral; 
      }, 
      enumerable: true 
    }, 
    createFalseLiteral: { 
      get: function() { 
        return createFalseLiteral; 
      }, 
      enumerable: true 
    }, 
    createNullLiteral: { 
      get: function() { 
        return createNullLiteral; 
      }, 
      enumerable: true 
    }, 
    createNumberLiteral: { 
      get: function() { 
        return createNumberLiteral; 
      }, 
      enumerable: true 
    }, 
    createMemberExpression: { 
      get: function() { 
        return createMemberExpression; 
      }, 
      enumerable: true 
    }, 
    createMemberLookupExpression: { 
      get: function() { 
        return createMemberLookupExpression; 
      }, 
      enumerable: true 
    }, 
    createThisExpression: { 
      get: function() { 
        return createThisExpression; 
      }, 
      enumerable: true 
    }, 
    createNewExpression: { 
      get: function() { 
        return createNewExpression; 
      }, 
      enumerable: true 
    }, 
    createObjectFreeze: { 
      get: function() { 
        return createObjectFreeze; 
      }, 
      enumerable: true 
    }, 
    createObjectPreventExtensions: { 
      get: function() { 
        return createObjectPreventExtensions; 
      }, 
      enumerable: true 
    }, 
    createObjectCreate: { 
      get: function() { 
        return createObjectCreate; 
      }, 
      enumerable: true 
    }, 
    createPropertyDescriptor: { 
      get: function() { 
        return createPropertyDescriptor; 
      }, 
      enumerable: true 
    }, 
    createDefineProperty: { 
      get: function() { 
        return createDefineProperty; 
      }, 
      enumerable: true 
    }, 
    createObjectLiteralExpression: { 
      get: function() { 
        return createObjectLiteralExpression; 
      }, 
      enumerable: true 
    }, 
    createObjectPattern: { 
      get: function() { 
        return createObjectPattern; 
      }, 
      enumerable: true 
    }, 
    createObjectPatternField: { 
      get: function() { 
        return createObjectPatternField; 
      }, 
      enumerable: true 
    }, 
    createParenExpression: { 
      get: function() { 
        return createParenExpression; 
      }, 
      enumerable: true 
    }, 
    createPostfixExpression: { 
      get: function() { 
        return createPostfixExpression; 
      }, 
      enumerable: true 
    }, 
    createProgram: { 
      get: function() { 
        return createProgram; 
      }, 
      enumerable: true 
    }, 
    createPropertyNameAssignment: { 
      get: function() { 
        return createPropertyNameAssignment; 
      }, 
      enumerable: true 
    }, 
    createRestParameter: { 
      get: function() { 
        return createRestParameter; 
      }, 
      enumerable: true 
    }, 
    createReturnStatement: { 
      get: function() { 
        return createReturnStatement; 
      }, 
      enumerable: true 
    }, 
    createYieldStatement: { 
      get: function() { 
        return createYieldStatement; 
      }, 
      enumerable: true 
    }, 
    createSetAccessor: { 
      get: function() { 
        return createSetAccessor; 
      }, 
      enumerable: true 
    }, 
    createSpreadExpression: { 
      get: function() { 
        return createSpreadExpression; 
      }, 
      enumerable: true 
    }, 
    createSpreadPatternElement: { 
      get: function() { 
        return createSpreadPatternElement; 
      }, 
      enumerable: true 
    }, 
    createSwitchStatement: { 
      get: function() { 
        return createSwitchStatement; 
      }, 
      enumerable: true 
    }, 
    createThrowStatement: { 
      get: function() { 
        return createThrowStatement; 
      }, 
      enumerable: true 
    }, 
    createTryStatement: { 
      get: function() { 
        return createTryStatement; 
      }, 
      enumerable: true 
    }, 
    createUnaryExpression: { 
      get: function() { 
        return createUnaryExpression; 
      }, 
      enumerable: true 
    }, 
    createUseStrictDirective: { 
      get: function() { 
        return createUseStrictDirective; 
      }, 
      enumerable: true 
    }, 
    createVariableDeclarationList: { 
      get: function() { 
        return createVariableDeclarationList; 
      }, 
      enumerable: true 
    }, 
    createVariableDeclaration: { 
      get: function() { 
        return createVariableDeclaration; 
      }, 
      enumerable: true 
    }, 
    createVariableStatement: { 
      get: function() { 
        return createVariableStatement; 
      }, 
      enumerable: true 
    }, 
    createVoid0: { 
      get: function() { 
        return createVoid0; 
      }, 
      enumerable: true 
    }, 
    createWhileStatement: { 
      get: function() { 
        return createWhileStatement; 
      }, 
      enumerable: true 
    }, 
    createWithStatement: { 
      get: function() { 
        return createWithStatement; 
      }, 
      enumerable: true 
    }, 
    createAssignStateStatement: { 
      get: function() { 
        return createAssignStateStatement; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_codegeneration_RuntimeInliner_js =(function() { 
  "use strict"; 
  var destructuring$MutedErrorReporter = $src_util_MutedErrorReporter_js, MutedErrorReporter = destructuring$MutedErrorReporter.MutedErrorReporter; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$Parser = $src_syntax_Parser_js, Parser = destructuring$Parser.Parser; 
  var destructuring$SourceFile = $src_syntax_SourceFile_js, SourceFile = destructuring$SourceFile.SourceFile; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createIdentifierExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createIdentifierExpression = destructuring$createIdentifierExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createVariableDeclaration = destructuring$createIdentifierExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createIdentifierExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createIdentifierExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var Program = trees.Program; 
  var shared = { toObject: "function(value) {\n        if (value == null)\n          throw TypeError();\n        return Object(value);\n      }" }; 
  function parse(source, name) { 
    var file = new SourceFile(name + '@runtime', source); 
    var errorReporter = new MutedErrorReporter(); 
    return new Parser(errorReporter, file).parseAssignmentExpression(); 
  } 
  function RuntimeInliner(identifierGenerator) { 
    this.identifierGenerator = identifierGenerator; 
    this.map_ = Object.create(null); 
  } 
  RuntimeInliner.prototype = createObject(ParseTreeTransformer.prototype, { 
    transformProgram: function(tree) { 
      var names = Object.keys(this.map_); 
      if(! names.length) return tree; 
      var vars = names.filter(function(name) { 
        return ! this.map_[name].inserted; 
      }, this).map(function(name) { 
        var item = this.map_[name]; 
        item.inserted = true; 
        return createVariableDeclaration(item.uid, item.expression); 
      }, this); 
      if(! vars.length) return tree; 
      var variableStatement = createVariableStatement(createVariableDeclarationList(TokenType.VAR, vars)); 
      var programElements =[variableStatement]; 
      [].push.apply(programElements, tree.programElements); 
      return new Program(tree.location, programElements); 
    }, 
    register: function(name, source) { 
      if(name in this.map_) return; 
      var self = this; 
      source = source.replace(/%([a-zA-Z0-9_$]+)/g, function(_, name) { 
        if(name in shared) { 
          self.register(name, shared[name]); 
        } 
        return self.getAsString(name); 
      }); 
      var uid = this.identifierGenerator.generateUniqueIdentifier(); 
      this.map_[name]= { 
        expression: parse(source, name), 
        uid: uid, 
        inserted: false 
      }; 
    }, 
    getAsIdentifierExpression: function(name) { 
      return createIdentifierExpression(this.map_[name].uid); 
    }, 
    getAsString: function(name) { 
      return this.map_[name].uid; 
    }, 
    get: function(name, opt_source) { 
      if(!(name in this.map_)) { 
        if(name in shared) opt_source = shared[name]; 
        traceur.assert(opt_source); 
        this.register(name, opt_source); 
      } 
      return this.getAsIdentifierExpression(name); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { RuntimeInliner: { 
      get: function() { 
        return RuntimeInliner; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_UniqueIdentifierGenerator_js =(function() { 
  "use strict"; 
  function UniqueIdentifierGenerator() { 
    this.identifierIndex = 0; 
    this.nameMap_ = Object.create(null); 
  } 
  UniqueIdentifierGenerator.prototype = { 
    generateUniqueIdentifier: function() { 
      return '$__' + this.identifierIndex ++; 
    }, 
    getUniqueIdentifier: function(name) { 
      var newName = this.nameMap_[name]; 
      if(! newName) return this.nameMap_[name]= this.generateUniqueIdentifier(); 
      return newName; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { UniqueIdentifierGenerator: { 
      get: function() { 
        return UniqueIdentifierGenerator; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_symbols_Project_js =(function() { 
  "use strict"; 
  var destructuring$ArrayMap = $src_util_ArrayMap_js, ArrayMap = destructuring$ArrayMap.ArrayMap; 
  var destructuring$ExportSymbol = $src_semantics_symbols_ExportSymbol_js, ExportSymbol = destructuring$ExportSymbol.ExportSymbol; 
  var destructuring$ModuleSymbol = $src_semantics_symbols_ModuleSymbol_js, ModuleSymbol = destructuring$ModuleSymbol.ModuleSymbol; 
  var destructuring$ObjectMap = $src_util_ObjectMap_js, ObjectMap = destructuring$ObjectMap.ObjectMap; 
  var destructuring$RuntimeInliner = $src_codegeneration_RuntimeInliner_js, RuntimeInliner = destructuring$RuntimeInliner.RuntimeInliner; 
  var destructuring$UniqueIdentifierGenerator = $src_codegeneration_UniqueIdentifierGenerator_js, UniqueIdentifierGenerator = destructuring$UniqueIdentifierGenerator.UniqueIdentifierGenerator; 
  var destructuring$resolveUrl = $src_util_url_js, resolveUrl = destructuring$resolveUrl.resolveUrl; 
  function addAll(self, other) { 
    for(var key in other) { 
      self[key]= other[key]; 
    } 
  } 
  function values(map) { 
    return Object.keys(map).map((function(key) { 
      return map[key]; 
    })); 
  } 
  var standardModuleUrlRegExp = /^@\w+$/; 
  var standardModuleCache = Object.create(null); 
  function getStandardModule(url) { 
    if(!(url in standardModuleCache)) { 
      var symbol = new ModuleSymbol(null, null, null, url); 
      var moduleInstance = traceur.runtime.modules[url]; 
      Object.keys(moduleInstance).forEach((function(name) { 
        symbol.addExport(name, new ExportSymbol(null, name, null)); 
      })); 
      standardModuleCache[url]= symbol; 
    } 
    return standardModuleCache[url]; 
  } 
  function Project(url) { 
    this.identifierGenerator = new UniqueIdentifierGenerator(); 
    this.runtimeInliner = new RuntimeInliner(this.identifierGenerator); 
    this.sourceFiles_ = Object.create(null); 
    this.parseTrees_ = new ObjectMap(); 
    this.rootModule_ = new ModuleSymbol(null, null, null, url); 
    this.modulesByUrl_ = Object.create(null); 
    this.moduleExports_ = new ArrayMap(); 
  } 
  Project.prototype = { 
    get url() { 
      return this.rootModule_.url; 
    }, 
    createClone: function() { 
      var p = new Project(this.url); 
      addAll(p.sourceFiles_, this.sourceFiles_); 
      p.parseTrees_.addAll(this.parseTrees_); 
      p.objectClass_ = this.objectClass_; 
      return p; 
    }, 
    hasFile: function(name) { 
      return name in this.sourceFiles_; 
    }, 
    addFile: function(file) { 
      this.sourceFiles_[file.name]= file; 
    }, 
    getFile: function(name) { 
      return this.sourceFiles_[name]; 
    }, 
    getSourceFiles: function() { 
      return values(this.sourceFiles_); 
    }, 
    getSourceTrees: function() { 
      return this.parseTrees_.values(); 
    }, 
    setParseTree: function(file, tree) { 
      if(this.sourceFiles_[file.name]!= file) { 
        throw new Error(); 
      } 
      this.parseTrees_.put(file, tree); 
    }, 
    getParseTree: function(file) { 
      return this.parseTrees_.get(file); 
    }, 
    getRootModule: function() { 
      return this.rootModule_; 
    }, 
    addExternalModule: function(module) { 
      traceur.assert(! this.hasModuleForUrl(module.url)); 
      this.modulesByUrl_[module.url]= module; 
    }, 
    getModuleForUrl: function(url) { 
      url = resolveUrl(this.url, url); 
      traceur.assert(this.hasModuleForUrl(url)); 
      if(standardModuleUrlRegExp.test(url)) return getStandardModule(url); 
      return this.modulesByUrl_[url]; 
    }, 
    hasModuleForUrl: function(url) { 
      if(standardModuleUrlRegExp.test(url)) return url in traceur.runtime.modules; 
      url = resolveUrl(this.url, url); 
      return url in this.modulesByUrl_; 
    }, 
    setModuleForStarTree: function(tree, symbol) { 
      this.moduleExports_.put(tree, symbol); 
    }, 
    getModuleForStarTree: function(tree) { 
      return this.moduleExports_.get(tree); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { Project: { 
      get: function() { 
        return Project; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_VariableBinder_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var Block = trees.Block; 
  var Catch = trees.Catch; 
  var ForInStatement = trees.ForInStatement; 
  var ForStatement = trees.ForStatement; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var ObjectPatternField = trees.ObjectPatternField; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableDeclaration = trees.VariableDeclaration; 
  function variablesInBlock(tree, includeFunctionScope) { 
    var binder = new VariableBinder(includeFunctionScope, tree); 
    binder.visitAny(tree); 
    return binder.identifiers_; 
  } 
  ; 
  function variablesInFunction(tree) { 
    var binder = new VariableBinder(true, tree.functionBody); 
    binder.bindVariablesInFunction_(tree); 
    return binder.identifiers_; 
  } 
  ; 
  var VariableBinder = traceur.runtime.createClass({ 
    constructor: function(includeFunctionScope, scope) { 
      traceur.runtime.superCall(this, VariableBinder, "constructor",[]); 
      this.includeFunctionScope_ = includeFunctionScope; 
      this.scope_ = scope || null; 
      this.block_ = null; 
      this.identifiers_ = Object.create(null); 
    }, 
    bindVariablesInFunction_: function(tree) { 
      var parameters = tree.formalParameterList.parameters; 
      for(var i = 0; i < parameters.length; i ++) { 
        this.bindParameter_(parameters[i]); 
      } 
      this.visitAny(tree.functionBody); 
    }, 
    visitBlock: function(tree) { 
      var parentBlock = this.block_; 
      this.block_ = tree; 
      tree.statements.forEach((function(s) { 
        if(s.type == ParseTreeType.FUNCTION_DECLARATION) { 
          this.bindFunctionDeclaration_(s); 
        } else { 
          this.visitAny(s); 
        } 
      }).bind(this)); 
      this.block_ = parentBlock; 
    }, 
    bindFunctionDeclaration_: function(tree) { 
      if(tree.name != null && this.block_ == this.scope_) { 
        this.bind_(tree.name.identifierToken); 
      } 
    }, 
    visitFunctionDeclaration: function(tree) { }, 
    visitVariableDeclarationList: function(tree) { 
      if((tree.declarationType == TokenType.VAR && this.includeFunctionScope_) ||(tree.declarationType != TokenType.VAR && this.block_ == this.scope_)) { 
        traceur.runtime.superCall(this, VariableBinder, "visitVariableDeclarationList",[tree]); 
      } else { 
        var decls = tree.declarations; 
        for(var i = 0; i < decls.length; i ++) { 
          this.visitAny(decls[i].initializer); 
        } 
      } 
    }, 
    visitVariableDeclaration: function(tree) { 
      this.bindVariableDeclaration_(tree.lvalue); 
      traceur.runtime.superCall(this, VariableBinder, "visitVariableDeclaration",[tree]); 
    }, 
    bind_: function(identifier) { 
      traceur.assert(typeof identifier.value == 'string'); 
      this.identifiers_[identifier.value]= true; 
    }, 
    bindParameter_: function(parameter) { 
      if(parameter.isRestParameter()) { 
        this.bind_(parameter.identifier); 
      } else { 
        this.bindVariableDeclaration_(parameter.binding); 
      } 
    }, 
    bindVariableDeclaration_: function(tree) { 
      switch(tree.type) { 
        case ParseTreeType.BINDING_IDENTIFIER: 
          this.bind_(tree.identifierToken); 
          break; 

        case ParseTreeType.ARRAY_PATTERN: 
          var elements = tree.elements; 
          for(var i = 0; i < elements.length; i ++) { 
            this.bindVariableDeclaration_(elements[i]); 
          } 
          break; 

        case ParseTreeType.SPREAD_PATTERN_ELEMENT: 
          this.bindVariableDeclaration_(tree.lvalue); 
          break; 

        case ParseTreeType.OBJECT_PATTERN: 
          var fields = tree.fields; 
          for(var i = 0; i < fields.length; i ++) { 
            this.bindVariableDeclaration_(fields[i]); 
          } 
          break; 

        case ParseTreeType.OBJECT_PATTERN_FIELD: 
          var field = tree; 
          if(field.element == null) { 
            this.bind_(field.identifier); 
          } else { 
            this.bindVariableDeclaration_(field.element); 
          } 
          break; 

        case ParseTreeType.PAREN_EXPRESSION: 
          this.bindVariableDeclaration_(tree.expression); 
          break; 

        default: 
          throw new Error('unreachable'); 

      } 
    } 
  }, ParseTreeVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { 
    variablesInBlock: { 
      get: function() { 
        return variablesInBlock; 
      }, 
      enumerable: true 
    }, 
    variablesInFunction: { 
      get: function() { 
        return variablesInFunction; 
      }, 
      enumerable: true 
    }, 
    VariableBinder: { 
      get: function() { 
        return VariableBinder; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_util_TestErrorReporter_js =(function() { 
  "use strict"; 
  var destructuring$ErrorReporter = $src_util_ErrorReporter_js, ErrorReporter = destructuring$ErrorReporter.ErrorReporter; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var TestErrorReporter = traceur.runtime.createClass({ 
    constructor: function() { 
      this.errors =[]; 
    }, 
    reportMessageInternal: function(location, kind, format, args) { 
      if(kind !== 'error') return; 
      this.errors.push(ErrorReporter.format(location, format, args)); 
    }, 
    hasMatchingError: function(expected) { 
      return this.errors.some((function(error) { 
        return error.indexOf(expected) !== - 1; 
      })); 
    } 
  }, ErrorReporter, true, true); 
  return Object.preventExtensions(Object.create(null, { TestErrorReporter: { 
      get: function() { 
        return TestErrorReporter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_util_StringBuilder_js =(function() { 
  "use strict"; 
  var StringBuilder = traceur.runtime.createClass({ 
    constructor: function() { 
      this.strings_ =[]; 
      this.length = 0; 
    }, 
    append: function(str) { 
      str = str.toString(); 
      this.length += str.length; 
      this.strings_.push(str); 
      return this; 
    }, 
    toString: function() { 
      return this.strings_.join(''); 
    }, 
    lastChar: function() { 
      var last = this.strings_[this.strings_.length - 1]; 
      if(last) { 
        last = last[last.length - 1]; 
      } 
      return last; 
    }, 
    deleteLastChar: function() { 
      var lastString = this.strings_.length - 1; 
      var last = this.strings_[lastString]; 
      if(last) { 
        this.strings_[lastString]= last.substring(0, last.length - 1); 
      } 
    } 
  }, null, true, false); 
  ; 
  return Object.preventExtensions(Object.create(null, { StringBuilder: { 
      get: function() { 
        return StringBuilder; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_outputgeneration_ParseTreeWriter_js =(function() { 
  "use strict"; 
  var destructuring$Keywords = $src_syntax_Keywords_js, Keywords = destructuring$Keywords.Keywords; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$StringBuilder = $src_util_StringBuilder_js, StringBuilder = destructuring$StringBuilder.StringBuilder; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var NEW_LINE = '\n'; 
  var PRETTY_PRINT = true; 
  var ParseTreeWriter = traceur.runtime.createClass({ 
    constructor: function(highlighted, showLineNumbers) { 
      traceur.runtime.superCall(this, ParseTreeWriter, "constructor",[]); 
      this.highlighted_ = highlighted; 
      this.showLineNumbers_ = showLineNumbers; 
      this.result_ = new StringBuilder(); 
      this.currentLine_ = new StringBuilder(); 
      this.currentLineComment_ = null; 
      this.indentDepth_ = 0; 
    }, 
    visitAny: function(tree) { 
      if(! tree) { 
        return; 
      } 
      if(tree === this.highlighted_) { 
        this.write_('\x1B[41m'); 
      } 
      if(tree.location !== null && tree.location.start !== null && this.showLineNumbers_) { 
        var line = tree.location.start.line + 1; 
        var column = tree.location.start.column; 
        this.currentLineComment_ = 'Line: ' + line + '.' + column; 
      } 
      this.currentLocation = tree.location; 
      traceur.runtime.superCall(this, ParseTreeWriter, "visitAny",[tree]); 
      if(tree === this.highlighted_) { 
        this.write_('\x1B[0m'); 
      } 
    }, 
    visitArgumentList: function(tree) { 
      this.write_(TokenType.OPEN_PAREN); 
      this.writeList_(tree.args, TokenType.COMMA, false); 
      this.write_(TokenType.CLOSE_PAREN); 
    }, 
    visitArrayComprehension: function(tree) { 
      this.write_(TokenType.OPEN_SQUARE); 
      this.visitAny(tree.expression); 
      this.visitList(tree.comprehensionForList); 
      if(tree.ifExpression) { 
        this.write_(TokenType.IF); 
        this.visitAny(tree.ifExpression); 
      } 
      this.write_(TokenType.CLOSE_SQUARE); 
    }, 
    visitArrayLiteralExpression: function(tree) { 
      this.write_(TokenType.OPEN_SQUARE); 
      this.writeList_(tree.elements, TokenType.COMMA, false); 
      this.write_(TokenType.CLOSE_SQUARE); 
    }, 
    visitArrayPattern: function(tree) { 
      this.write_(TokenType.OPEN_SQUARE); 
      this.writeList_(tree.elements, TokenType.COMMA, false); 
      this.write_(TokenType.CLOSE_SQUARE); 
    }, 
    visitArrowFunctionExpression: function(tree) { 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.formalParameters); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.write_(TokenType.ARROW); 
      this.visitAny(tree.functionBody); 
    }, 
    visitAtNameExpression: function(tree) { 
      this.write_(tree.atNameToken); 
    }, 
    visitAtNameDeclaration: function(tree) { 
      this.write_(tree.atNameToken); 
      if(tree.initializer) { 
        this.write_(TokenType.EQUAL); 
        this.visitAny(tree.initializer); 
      } 
    }, 
    visitAwaitStatement: function(tree) { 
      this.write_(TokenType.AWAIT); 
      if(tree.identifier !== null) { 
        this.write_(tree.identifier); 
        this.write_(TokenType.EQUAL); 
      } 
      this.visitAny(tree.expression); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitBinaryOperator: function(tree) { 
      this.visitAny(tree.left); 
      this.write_(tree.operator); 
      this.visitAny(tree.right); 
    }, 
    visitBindThisParameter: function(tree) { 
      this.write_(TokenType.THIS); 
      this.write_(TokenType.EQUAL); 
      this.visitAny(tree.expression); 
    }, 
    visitBindingElement: function(tree) { 
      this.visitAny(tree.binding); 
      if(tree.initializer) { 
        this.write_(TokenType.EQUAL); 
        this.visitAny(tree.initializer); 
      } 
    }, 
    visitBindingIdentifier: function(tree) { 
      this.write_(tree.identifierToken); 
    }, 
    visitBlock: function(tree) { 
      this.write_(TokenType.OPEN_CURLY); 
      this.writelnList_(tree.statements); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitBreakStatement: function(tree) { 
      this.write_(TokenType.BREAK); 
      if(tree.name !== null) { 
        this.write_(tree.name); 
      } 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitCallExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.visitAny(tree.args); 
    }, 
    visitCaseClause: function(tree) { 
      this.write_(TokenType.CASE); 
      this.visitAny(tree.expression); 
      this.write_(TokenType.COLON); 
      this.indentDepth_ ++; 
      this.writelnList_(tree.statements); 
      this.indentDepth_ --; 
    }, 
    visitCatch: function(tree) { 
      this.write_(TokenType.CATCH); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.binding); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.catchBody); 
    }, 
    visitCascadeExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.write_(TokenType.PERIOD_OPEN_CURLY); 
      this.writelnList_(tree.expressions, TokenType.SEMI_COLON, false); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitClassShared_: function(tree) { 
      this.write_(TokenType.CLASS); 
      if(tree.name) this.write_(tree.name); 
      if(tree.superClass !== null) { 
        this.write_(TokenType.EXTENDS); 
        this.visitAny(tree.superClass); 
      } 
      this.write_(TokenType.OPEN_CURLY); 
      this.writelnList_(tree.elements); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitClassDeclaration: function(tree) { 
      this.visitClassShared_(tree); 
    }, 
    visitClassExpression: function(tree) { 
      this.visitClassShared_(tree); 
    }, 
    visitCommaExpression: function(tree) { 
      this.writeList_(tree.expressions, TokenType.COMMA, false); 
    }, 
    visitComprehensionFor: function(tree) { 
      this.write_(TokenType.FOR); 
      this.visitAny(tree.left); 
      this.write_(PredefinedName.OF); 
      this.visitAny(tree.iterator); 
    }, 
    visitConditionalExpression: function(tree) { 
      this.visitAny(tree.condition); 
      this.write_(TokenType.QUESTION); 
      this.visitAny(tree.left); 
      this.write_(TokenType.COLON); 
      this.visitAny(tree.right); 
    }, 
    visitContinueStatement: function(tree) { 
      this.write_(TokenType.CONTINUE); 
      if(tree.name !== null) { 
        this.write_(tree.name); 
      } 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitDebuggerStatement: function(tree) { 
      this.write_(TokenType.DEBUGGER); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitDefaultClause: function(tree) { 
      this.write_(TokenType.DEFAULT); 
      this.write_(TokenType.COLON); 
      this.indentDepth_ ++; 
      this.writelnList_(tree.statements); 
      this.indentDepth_ --; 
    }, 
    visitDoWhileStatement: function(tree) { 
      this.write_(TokenType.DO); 
      this.visitAny(tree.body); 
      this.write_(TokenType.WHILE); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.condition); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitEmptyStatement: function(tree) { 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitExportDeclaration: function(tree) { 
      this.write_(TokenType.EXPORT); 
      this.visitAny(tree.declaration); 
    }, 
    visitExportMappingList: function(tree) { 
      this.writeList_(tree.paths, TokenType.COMMA, false); 
    }, 
    visitExportMapping: function(tree) { 
      this.visitAny(tree.specifierSet); 
      if(tree.moduleExpression) { 
        this.write_(PredefinedName.FROM); 
        this.visitAny(tree.moduleExpression); 
      } 
    }, 
    visitExportSpecifier: function(tree) { 
      this.write_(tree.lhs); 
      if(tree.rhs) { 
        this.write_(TokenType.COLON); 
        this.write_(tree.rhs); 
      } 
    }, 
    visitExportSpecifierSet: function(tree) { 
      this.write_(TokenType.OPEN_CURLY); 
      this.writeList_(tree.specifiers, TokenType.COMMA, false); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitExpressionStatement: function(tree) { 
      this.visitAny(tree.expression); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitFinally: function(tree) { 
      this.write_(TokenType.FINALLY); 
      this.visitAny(tree.block); 
    }, 
    visitForOfStatement: function(tree) { 
      this.write_(TokenType.FOR); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.initializer); 
      this.write_(PredefinedName.OF); 
      this.visitAny(tree.collection); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitForInStatement: function(tree) { 
      this.write_(TokenType.FOR); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.initializer); 
      this.write_(TokenType.IN); 
      this.visitAny(tree.collection); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitForStatement: function(tree) { 
      this.write_(TokenType.FOR); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.initializer); 
      this.write_(TokenType.SEMI_COLON); 
      this.visitAny(tree.condition); 
      this.write_(TokenType.SEMI_COLON); 
      this.visitAny(tree.increment); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitFormalParameterList: function(tree) { 
      var first = true; 
      for(var i = 0; i < tree.parameters.length; i ++) { 
        var parameter = tree.parameters[i]; 
        if(first) { 
          first = false; 
        } else { 
          this.write_(TokenType.COMMA); 
        } 
        this.visitAny(parameter); 
      } 
    }, 
    visitFunctionDeclaration: function(tree) { 
      this.write_(Keywords.FUNCTION); 
      if(tree.isGenerator) { 
        this.write_(TokenType.STAR); 
      } 
      this.visitAny(tree.name); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.formalParameterList); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.functionBody); 
    }, 
    visitGeneratorComprehension: function(tree) { 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.expression); 
      this.visitList(tree.comprehensionForList); 
      if(tree.ifExpression) { 
        this.write_(TokenType.IF); 
        this.visitAny(tree.ifExpression); 
      } 
      this.write_(TokenType.CLOSE_PAREN); 
    }, 
    visitGetAccessor: function(tree) { 
      this.write_(PredefinedName.GET); 
      this.write_(tree.propertyName); 
      this.write_(TokenType.OPEN_PAREN); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitIdentifierExpression: function(tree) { 
      this.write_(tree.identifierToken); 
    }, 
    visitIfStatement: function(tree) { 
      this.write_(TokenType.IF); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.condition); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.ifClause); 
      if(tree.elseClause) { 
        this.write_(TokenType.ELSE); 
        this.visitAny(tree.elseClause); 
      } 
    }, 
    visitImportDeclaration: function(tree) { 
      this.write_(TokenType.IMPORT); 
      this.writeList_(tree.importPathList, TokenType.COMMA, false); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitImportBinding: function(tree) { 
      this.visitAny(tree.importSpecifierSet); 
      if(tree.moduleExpression) { 
        this.write_(PredefinedName.FROM); 
        this.visitAny(tree.moduleExpression); 
      } 
    }, 
    visitImportSpecifier: function(tree) { 
      this.write_(tree.importedName); 
      if(tree.destinationName !== null) { 
        this.write_(TokenType.COLON); 
        this.write_(tree.destinationName); 
      } 
    }, 
    visitImportSpecifierSet: function(tree) { 
      if(tree.specifiers.type == TokenType.STAR) this.write_(TokenType.STAR); else this.visitList(tree.specifiers); 
    }, 
    visitLabelledStatement: function(tree) { 
      this.write_(tree.name); 
      this.write_(TokenType.COLON); 
      this.visitAny(tree.statement); 
    }, 
    visitLiteralExpression: function(tree) { 
      this.write_(tree.literalToken); 
    }, 
    visitMemberExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.write_(TokenType.PERIOD); 
      this.write_(tree.memberName); 
    }, 
    visitMemberLookupExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.write_(TokenType.OPEN_SQUARE); 
      this.visitAny(tree.memberExpression); 
      this.write_(TokenType.CLOSE_SQUARE); 
    }, 
    visitMissingPrimaryExpression: function(tree) { 
      this.write_('MissingPrimaryExpression'); 
    }, 
    visitModuleDeclaration: function(tree) { 
      this.write_(PredefinedName.MODULE); 
      this.writeList_(tree.specifiers, TokenType.COMMA, false); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitModuleDefinition: function(tree) { 
      this.write_(PredefinedName.MODULE); 
      this.write_(tree.name); 
      this.write_(TokenType.OPEN_CURLY); 
      this.writeln_(); 
      this.writeList_(tree.elements, null, true); 
      this.write_(TokenType.CLOSE_CURLY); 
      this.writeln_(); 
    }, 
    visitModuleExpression: function(tree) { 
      this.visitAny(tree.reference); 
      for(var i = 0; i < tree.identifiers.length; i ++) { 
        this.write_(TokenType.PERIOD); 
        this.write_(tree.identifiers[i]); 
      } 
    }, 
    visitModuleRequire: function(tree) { 
      this.write_(tree.url); 
    }, 
    visitModuleSpecifier: function(tree) { 
      this.write_(tree.identifier); 
      this.write_(PredefinedName.FROM); 
      this.visitAny(tree.expression); 
    }, 
    visitNameStatement: function(tree) { 
      this.write_(TokenType.PRIVATE); 
      this.writeList_(tree.declarations, TokenType.COMMA, false); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitNewExpression: function(tree) { 
      this.write_(TokenType.NEW); 
      this.visitAny(tree.operand); 
      this.visitAny(tree.args); 
    }, 
    visitNullTree: function(tree) { }, 
    visitObjectLiteralExpression: function(tree) { 
      this.write_(TokenType.OPEN_CURLY); 
      if(tree.propertyNameAndValues.length > 1) this.writeln_(); 
      this.writelnList_(tree.propertyNameAndValues, TokenType.COMMA); 
      if(tree.propertyNameAndValues.length > 1) this.writeln_(); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitObjectPattern: function(tree) { 
      this.write_(TokenType.OPEN_CURLY); 
      this.writelnList_(tree.fields, TokenType.COMMA); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitObjectPatternField: function(tree) { 
      this.write_(tree.identifier); 
      if(tree.element !== null) { 
        this.write_(TokenType.COLON); 
        this.visitAny(tree.element); 
      } 
    }, 
    visitParenExpression: function(tree) { 
      this.write_(TokenType.OPEN_PAREN); 
      traceur.runtime.superCall(this, ParseTreeWriter, "visitParenExpression",[tree]); 
      this.write_(TokenType.CLOSE_PAREN); 
    }, 
    visitPostfixExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.write_(tree.operator); 
    }, 
    visitProgram: function(tree) { 
      this.writelnList_(tree.programElements); 
    }, 
    visitPropertyMethodAssignment: function(tree) { 
      if(tree.isGenerator) this.write_(TokenType.STAR); 
      this.write_(tree.name); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.formalParameterList); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.functionBody); 
    }, 
    visitPropertyNameAssignment: function(tree) { 
      this.write_(tree.name); 
      this.write_(TokenType.COLON); 
      this.visitAny(tree.value); 
    }, 
    visitPropertyNameShorthand: function(tree) { 
      this.write_(tree.name); 
    }, 
    visitQuasiLiteralExpression: function(tree) { 
      this.visitAny(tree.operand); 
      this.writeRaw_(TokenType.BACK_QUOTE); 
      this.visitList(tree.elements); 
      this.writeRaw_(TokenType.BACK_QUOTE); 
    }, 
    visitQuasiLiteralPortion: function(tree) { 
      this.writeRaw_(tree.value); 
    }, 
    visitQuasiSubstitution: function(tree) { 
      this.writeRaw_(TokenType.DOLLAR); 
      this.writeRaw_(TokenType.OPEN_CURLY); 
      this.visitAny(tree.expression); 
      this.writeRaw_(TokenType.CLOSE_CURLY); 
    }, 
    visitRequiresMember: function(tree) { 
      this.write_(PredefinedName.REQUIRES); 
      this.write_(tree.name); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitReturnStatement: function(tree) { 
      this.write_(TokenType.RETURN); 
      this.visitAny(tree.expression); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitRestParameter: function(tree) { 
      this.write_(TokenType.DOT_DOT_DOT); 
      this.write_(tree.identifier); 
    }, 
    visitSetAccessor: function(tree) { 
      this.write_(PredefinedName.SET); 
      this.write_(tree.propertyName); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.parameter); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitSpreadExpression: function(tree) { 
      this.write_(TokenType.DOT_DOT_DOT); 
      this.visitAny(tree.expression); 
    }, 
    visitSpreadPatternElement: function(tree) { 
      this.write_(TokenType.DOT_DOT_DOT); 
      this.visitAny(tree.lvalue); 
    }, 
    visitStateMachine: function(tree) { 
      throw new Error('State machines cannot be converted to source'); 
    }, 
    visitSuperExpression: function(tree) { 
      this.write_(TokenType.SUPER); 
    }, 
    visitSwitchStatement: function(tree) { 
      this.write_(TokenType.SWITCH); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.expression); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.write_(TokenType.OPEN_CURLY); 
      this.writelnList_(tree.caseClauses); 
      this.write_(TokenType.CLOSE_CURLY); 
    }, 
    visitThisExpression: function(tree) { 
      this.write_(TokenType.THIS); 
    }, 
    visitThrowStatement: function(tree) { 
      this.write_(TokenType.THROW); 
      this.visitAny(tree.value); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitTryStatement: function(tree) { 
      this.write_(TokenType.TRY); 
      this.visitAny(tree.body); 
      this.visitAny(tree.catchBlock); 
      this.visitAny(tree.finallyBlock); 
    }, 
    visitUnaryExpression: function(tree) { 
      this.write_(tree.operator); 
      this.visitAny(tree.operand); 
    }, 
    visitVariableDeclarationList: function(tree) { 
      this.write_(tree.declarationType); 
      this.writeList_(tree.declarations, TokenType.COMMA, false); 
    }, 
    visitVariableDeclaration: function(tree) { 
      this.visitAny(tree.lvalue); 
      if(tree.initializer !== null) { 
        this.write_(TokenType.EQUAL); 
        this.visitAny(tree.initializer); 
      } 
    }, 
    visitVariableStatement: function(tree) { 
      traceur.runtime.superCall(this, ParseTreeWriter, "visitVariableStatement",[tree]); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    visitWhileStatement: function(tree) { 
      this.write_(TokenType.WHILE); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.condition); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitWithStatement: function(tree) { 
      this.write_(TokenType.WITH); 
      this.write_(TokenType.OPEN_PAREN); 
      this.visitAny(tree.expression); 
      this.write_(TokenType.CLOSE_PAREN); 
      this.visitAny(tree.body); 
    }, 
    visitYieldStatement: function(tree) { 
      this.write_(TokenType.YIELD); 
      if(tree.isYieldFor) { 
        this.write_(TokenType.STAR); 
      } 
      this.visitAny(tree.expression); 
      this.write_(TokenType.SEMI_COLON); 
    }, 
    writeln_: function() { 
      if(this.currentLineComment_ !== null) { 
        while(this.currentLine_.length < 80) { 
          this.currentLine_.append(' '); 
        } 
        this.currentLine_.append(' // ').append(this.currentLineComment_); 
        this.currentLineComment_ = null; 
      } 
      this.result_.append(this.currentLine_.toString()); 
      this.result_.append(NEW_LINE); 
      this.outputLineCount ++; 
      this.currentLine_ = new StringBuilder(); 
    }, 
    writelnList_: function(list, delimiter) { 
      if(delimiter) { 
        this.writeList_(list, delimiter, true); 
      } else { 
        if(list.length > 0) this.writeln_(); 
        this.writeList_(list, null, true); 
        if(list.length > 0) this.writeln_(); 
      } 
    }, 
    writeList_: function(list, delimiter, writeNewLine) { 
      var first = true; 
      for(var i = 0; i < list.length; i ++) { 
        var element = list[i]; 
        if(first) { 
          first = false; 
        } else { 
          if(delimiter !== null) { 
            this.write_(delimiter); 
          } 
          if(writeNewLine) { 
            this.writeln_(); 
          } 
        } 
        this.visitAny(element); 
      } 
    }, 
    writeTokenList_: function(list, delimiter, writeNewLine) { 
      var first = true; 
      for(var i = 0; i < list.length; i ++) { 
        var element = list[i]; 
        if(first) { 
          first = false; 
        } else { 
          if(delimiter !== null) { 
            this.write_(delimiter); 
          } 
          if(writeNewLine) { 
            this.writeln_(); 
          } 
        } 
        this.write_(element); 
      } 
    }, 
    writeRaw_: function(value) { 
      if(value !== null) { 
        this.currentLine_.append(value.toString()); 
      } 
    }, 
    write_: function(value) { 
      if(value === TokenType.CLOSE_CURLY) { 
        this.indentDepth_ --; 
      } 
      var spaceBefore = true; 
      var spaceAfter = true; 
      switch(value) { 
        case TokenType.PERIOD: 
        case TokenType.OPEN_SQUARE: 
        case TokenType.OPEN_PAREN: 
        case TokenType.CLOSE_SQUARE: 
          spaceBefore = false; 
          spaceAfter = false; 
          break; 

        case TokenType.COLON: 
        case TokenType.COMMA: 
        case TokenType.SEMI_COLON: 
        case TokenType.CLOSE_PAREN: 
          spaceBefore = false; 
          break; 

      } 
      if(value !== null) { 
        if(PRETTY_PRINT) { 
          if(this.currentLine_.length === 0) { 
            for(var i = 0, indent = this.indentDepth_ * 2; i < indent; ++ i) { 
              this.currentLine_.append(' '); 
            } 
          } else { 
            if(spaceBefore === false && this.currentLine_.lastChar() === ' ') { 
              this.currentLine_.deleteLastChar(); 
            } 
          } 
        } 
        this.currentLine_.append(value.toString()); 
        if(spaceAfter) { 
          this.currentLine_.append(' '); 
        } 
      } 
      if(value === TokenType.OPEN_CURLY) { 
        this.indentDepth_ ++; 
      } 
    } 
  }, ParseTreeVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ParseTreeWriter: { 
      get: function() { 
        return ParseTreeWriter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_outputgeneration_ParseTreeMapWriter_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeWriter = $src_outputgeneration_ParseTreeWriter_js, ParseTreeWriter = destructuring$ParseTreeWriter.ParseTreeWriter; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function ParseTreeMapWriter(highlighted, showLineNumbers, sourceMapGenerator) { 
    ParseTreeWriter.call(this, highlighted, showLineNumbers); 
    this.sourceMapGenerator_ = sourceMapGenerator; 
    this.outputLineCount = 0; 
  } 
  ParseTreeMapWriter.prototype = createObject(ParseTreeWriter.prototype, { 
    write_: function(value) { 
      if(this.currentLocation) { 
        this.addMapping(); 
      } 
      ParseTreeWriter.prototype.write_.apply(this,[value]); 
    }, 
    addMapping: function() { 
      var mapping = { 
        generated: { 
          line: this.outputLineCount + 1, 
          column: this.currentLine_.length 
        }, 
        original: { 
          line: this.currentLocation.start.line + 1, 
          column: this.currentLocation.start.column 
        }, 
        source: this.currentLocation.start.source.name 
      }; 
      this.sourceMapGenerator_.addMapping(mapping); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ParseTreeMapWriter: { 
      get: function() { 
        return ParseTreeMapWriter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_outputgeneration_TreeWriter_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeMapWriter = $src_outputgeneration_ParseTreeMapWriter_js, ParseTreeMapWriter = destructuring$ParseTreeMapWriter.ParseTreeMapWriter; 
  var destructuring$ParseTreeWriter = $src_outputgeneration_ParseTreeWriter_js, ParseTreeWriter = destructuring$ParseTreeWriter.ParseTreeWriter; 
  function TreeWriter() { } 
  TreeWriter.write = function(tree, opt_options) { 
    var showLineNumbers; 
    var highlighted = null; 
    var sourceMapGenerator; 
    if(opt_options) { 
      showLineNumbers = opt_options.showLineNumbers; 
      highlighted = opt_options.highlighted || null; 
      sourceMapGenerator = opt_options.sourceMapGenerator; 
    } 
    var writer; 
    if(sourceMapGenerator) { 
      writer = new ParseTreeMapWriter(highlighted, showLineNumbers, sourceMapGenerator); 
    } else { 
      writer = new ParseTreeWriter(highlighted, showLineNumbers); 
    } 
    writer.visitAny(tree); 
    if(writer.currentLine_.length > 0) { 
      writer.writeln_(); 
    } 
    if(sourceMapGenerator) { 
      opt_options.sourceMap = sourceMapGenerator.toString(); 
    } 
    return writer.result_.toString(); 
  }; 
  return Object.preventExtensions(Object.create(null, { TreeWriter: { 
      get: function() { 
        return TreeWriter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_ParseTreeValidator_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$TreeWriter = $src_outputgeneration_TreeWriter_js, TreeWriter = destructuring$TreeWriter.TreeWriter; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var NewExpression = trees.NewExpression; 
  var ValidationError = traceur.runtime.createClass({ constructor: function(tree, message) { 
      this.tree = tree; 
      this.message = message; 
    } }, Error, true, true); 
  var ParseTreeValidator = traceur.runtime.createClass({ 
    fail_: function(tree, message) { 
      throw new ValidationError(tree, message); 
    }, 
    check_: function(condition, tree, message) { 
      if(! condition) { 
        this.fail_(tree, message); 
      } 
    }, 
    checkVisit_: function(condition, tree, message) { 
      this.check_(condition, tree, message); 
      this.visitAny(tree); 
    }, 
    checkType_: function(type, tree, message) { 
      this.checkVisit_(tree.type === type, tree, message); 
    }, 
    visitArgumentList: function(tree) { 
      for(var i = 0; i < tree.args.length; i ++) { 
        var argument = tree.args[i]; 
        this.checkVisit_(argument.isAssignmentOrSpread(), argument, 'assignment or spread expected'); 
      } 
    }, 
    visitArrayLiteralExpression: function(tree) { 
      for(var i = 0; i < tree.elements.length; i ++) { 
        var element = tree.elements[i]; 
        this.checkVisit_(element.isNull() || element.isAssignmentOrSpread(), element, 'assignment or spread expected'); 
      } 
    }, 
    visitArrayPattern: function(tree) { 
      for(var i = 0; i < tree.elements.length; i ++) { 
        var element = tree.elements[i]; 
        this.checkVisit_(element === null || element.type === ParseTreeType.BINDING_ELEMENT || element.type == ParseTreeType.IDENTIFIER_EXPRESSION || element.isLeftHandSideExpression() || element.isPattern() || element.isSpreadPatternElement(), element, 'null, sub pattern, left hand side expression or spread expected'); 
        if(element && element.isSpreadPatternElement()) { 
          this.check_(i ===(tree.elements.length - 1), element, 'spread in array patterns must be the last element'); 
        } 
      } 
    }, 
    visitAwaitStatement: function(tree) { 
      this.checkVisit_(tree.expression.isExpression(), tree.expression, 'await must be expression'); 
    }, 
    visitBinaryOperator: function(tree) { 
      switch(tree.operator.type) { 
        case TokenType.EQUAL: 
        case TokenType.STAR_EQUAL: 
        case TokenType.SLASH_EQUAL: 
        case TokenType.PERCENT_EQUAL: 
        case TokenType.PLUS_EQUAL: 
        case TokenType.MINUS_EQUAL: 
        case TokenType.LEFT_SHIFT_EQUAL: 
        case TokenType.RIGHT_SHIFT_EQUAL: 
        case TokenType.UNSIGNED_RIGHT_SHIFT_EQUAL: 
        case TokenType.AMPERSAND_EQUAL: 
        case TokenType.CARET_EQUAL: 
        case TokenType.BAR_EQUAL: 
          this.check_(tree.left.isLeftHandSideExpression() || tree.left.isPattern(), tree.left, 'left hand side expression or pattern expected'); 
          this.check_(tree.right.isArrowFunctionExpression(), tree.right, 'assignment expression expected'); 
          break; 

        case TokenType.AND: 
        case TokenType.OR: 
        case TokenType.BAR: 
        case TokenType.CARET: 
        case TokenType.AMPERSAND: 
        case TokenType.EQUAL_EQUAL: 
        case TokenType.NOT_EQUAL: 
        case TokenType.EQUAL_EQUAL_EQUAL: 
        case TokenType.NOT_EQUAL_EQUAL: 
        case TokenType.OPEN_ANGLE: 
        case TokenType.CLOSE_ANGLE: 
        case TokenType.GREATER_EQUAL: 
        case TokenType.LESS_EQUAL: 
        case TokenType.INSTANCEOF: 
        case TokenType.IN: 
        case TokenType.LEFT_SHIFT: 
        case TokenType.RIGHT_SHIFT: 
        case TokenType.UNSIGNED_RIGHT_SHIFT: 
        case TokenType.PLUS: 
        case TokenType.MINUS: 
        case TokenType.STAR: 
        case TokenType.SLASH: 
        case TokenType.PERCENT: 
          this.check_(tree.left.isArrowFunctionExpression(), tree.left, 'assignment expression expected'); 
          this.check_(tree.right.isArrowFunctionExpression(), tree.right, 'assignment expression expected'); 
          break; 

        case TokenType.IDENTIFIER: 
          var foundIsIdentifier = false; 
          switch(tree.operator.value) { 
            case PredefinedName.IS: 
            case PredefinedName.ISNT: 
              foundIsIdentifier = true; 

          } 
          if(foundIsIdentifier) break; 

        default: 
          this.fail_(tree, 'unexpected binary operator'); 

      } 
      this.visitAny(tree.left); 
      this.visitAny(tree.right); 
    }, 
    visitBindingElement: function(tree) { 
      var binding = tree.binding; 
      this.checkVisit_(binding.type == ParseTreeType.BINDING_IDENTIFIER || binding.type == ParseTreeType.OBJECT_PATTERN || binding.type == ParseTreeType.ARRAY_PATTERN, binding, 'expected valid binding element'); 
      this.visitAny(tree.initializer); 
    }, 
    visitBlock: function(tree) { 
      for(var i = 0; i < tree.statements.length; i ++) { 
        var statement = tree.statements[i]; 
        this.checkVisit_(statement.isSourceElement(), statement, 'statement or function declaration expected'); 
      } 
    }, 
    visitCallExpression: function(tree) { 
      this.check_(tree.operand.isMemberExpression(), tree.operand, 'member expression expected'); 
      if(tree.operand instanceof NewExpression) { 
        this.check_(tree.operand.args !== null, tree.operand, 'new args expected'); 
      } 
      this.visitAny(tree.operand); 
      this.visitAny(tree.args); 
    }, 
    visitCaseClause: function(tree) { 
      this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      for(var i = 0; i < tree.statements.length; i ++) { 
        var statement = tree.statements[i]; 
        this.checkVisit_(statement.isStatement(), statement, 'statement expected'); 
      } 
    }, 
    visitCatch: function(tree) { 
      this.checkVisit_(tree.binding.isPattern() || tree.binding.type == ParseTreeType.BINDING_IDENTIFIER, tree.binding, 'binding identifier expected'); 
      this.checkVisit_(tree.catchBody.type === ParseTreeType.BLOCK, tree.catchBody, 'block expected'); 
    }, 
    visitClassDeclaration: function(tree) { 
      for(var i = 0; i < tree.elements.length; i ++) { 
        var element = tree.elements[i]; 
        switch(element.type) { 
          case ParseTreeType.GET_ACCESSOR: 
          case ParseTreeType.SET_ACCESSOR: 
          case ParseTreeType.PROPERTY_METHOD_ASSIGNMENT: 
            break; 

          default: 
            this.fail_(element, 'class element expected'); 

        } 
        this.visitAny(element); 
      } 
    }, 
    visitCommaExpression: function(tree) { 
      for(var i = 0; i < tree.expressions.length; i ++) { 
        var expression = tree.expressions[i]; 
        this.checkVisit_(expression.isArrowFunctionExpression(), expression, 'expression expected'); 
      } 
    }, 
    visitConditionalExpression: function(tree) { 
      this.checkVisit_(tree.condition.isArrowFunctionExpression(), tree.condition, 'expression expected'); 
      this.checkVisit_(tree.left.isArrowFunctionExpression(), tree.left, 'expression expected'); 
      this.checkVisit_(tree.right.isArrowFunctionExpression(), tree.right, 'expression expected'); 
    }, 
    visitDefaultClause: function(tree) { 
      for(var i = 0; i < tree.statements.length; i ++) { 
        var statement = tree.statements[i]; 
        this.checkVisit_(statement.isStatement(), statement, 'statement expected'); 
      } 
    }, 
    visitDoWhileStatement: function(tree) { 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
      this.checkVisit_(tree.condition.isExpression(), tree.condition, 'expression expected'); 
    }, 
    visitExportDeclaration: function(tree) { 
      var declType = tree.declaration.type; 
      this.checkVisit_(declType == ParseTreeType.VARIABLE_STATEMENT || declType == ParseTreeType.FUNCTION_DECLARATION || declType == ParseTreeType.MODULE_DEFINITION || declType == ParseTreeType.MODULE_DECLARATION || declType == ParseTreeType.CLASS_DECLARATION || declType == ParseTreeType.EXPORT_MAPPING_LIST, tree.declaration, 'expected valid export tree'); 
    }, 
    visitExportMapping: function(tree) { 
      if(tree.moduleExpression) { 
        this.checkVisit_(tree.moduleExpression.type == ParseTreeType.MODULE_EXPRESSION, tree.moduleExpression, 'module expression expected'); 
      } 
      var specifierType = tree.specifierSet.type; 
      this.checkVisit_(specifierType == ParseTreeType.EXPORT_SPECIFIER_SET || specifierType == ParseTreeType.IDENTIFIER_EXPRESSION, tree.specifierSet, 'specifier set or identifier expected'); 
    }, 
    visitExportMappingList: function(tree) { 
      this.check_(tree.paths.length > 0, tree, 'expected at least one path'); 
      for(var i = 0; i < tree.paths.length; i ++) { 
        var path = tree.paths[i]; 
        var type = path.type; 
        this.checkVisit_(type == ParseTreeType.EXPORT_MAPPING, path, 'expected export mapping'); 
      } 
    }, 
    visitExportSpecifierSet: function(tree) { 
      this.check_(tree.specifiers.length > 0, tree, 'expected at least one identifier'); 
      for(var i = 0; i < tree.specifiers.length; i ++) { 
        var specifier = tree.specifiers[i]; 
        this.checkVisit_(specifier.type == ParseTreeType.EXPORT_SPECIFIER || specifier.type == ParseTreeType.IDENTIFIER_EXPRESSION, specifier, 'expected valid export specifier'); 
      } 
    }, 
    visitExpressionStatement: function(tree) { 
      this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
    }, 
    visitFinally: function(tree) { 
      this.checkVisit_(tree.block.type === ParseTreeType.BLOCK, tree.block, 'block expected'); 
    }, 
    visitForOfStatement: function(tree) { 
      this.checkVisit_(tree.initializer.isPattern() || tree.initializer.type === ParseTreeType.IDENTIFIER_EXPRESSION || tree.initializer.type === ParseTreeType.VARIABLE_DECLARATION_LIST && tree.initializer.declarations.length === 1, tree.initializer, 'for-each statement may not have more than one variable declaration'); 
      this.checkVisit_(tree.collection.isExpression(), tree.collection, 'expression expected'); 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
    }, 
    visitForInStatement: function(tree) { 
      if(tree.initializer.type === ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        this.checkVisit_(tree.initializer.declarations.length <= 1, tree.initializer, 'for-in statement may not have more than one variable declaration'); 
      } else { 
        this.checkVisit_(tree.initializer.isPattern() || tree.initializer.isExpression(), tree.initializer, 'variable declaration, expression or ' + 'pattern expected'); 
      } 
      this.checkVisit_(tree.collection.isExpression(), tree.collection, 'expression expected'); 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
    }, 
    visitFormalParameterList: function(tree) { 
      for(var i = 0; i < tree.parameters.length; i ++) { 
        var parameter = tree.parameters[i]; 
        switch(parameter.type) { 
          case ParseTreeType.BINDING_ELEMENT: 
            break; 

          case ParseTreeType.REST_PARAMETER: 
            this.checkVisit_(i === tree.parameters.length - 1, parameter, 'rest parameters must be the last parameter in a parameter' + ' list'); 
            this.checkType_(ParseTreeType.BINDING_IDENTIFIER, parameter.identifier, 'binding identifier expected'); 
            break; 

          default: 
            this.fail_(parameter, 'parameters must be identifiers or rest' + ' parameters. Found: ' + parameter.type); 
            break; 

        } 
        this.visitAny(parameter); 
      } 
    }, 
    visitForStatement: function(tree) { 
      if(tree.initializer !== null && ! tree.initializer.isNull()) { 
        this.checkVisit_(tree.initializer.isExpression() || tree.initializer.type === ParseTreeType.VARIABLE_DECLARATION_LIST, tree.initializer, 'variable declaration list or expression expected'); 
      } 
      if(tree.condition !== null) { 
        this.checkVisit_(tree.condition.isExpression(), tree.condition, 'expression expected'); 
      } 
      if(tree.increment !== null) { 
        this.checkVisit_(tree.condition.isExpression(), tree.increment, 'expression expected'); 
      } 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
    }, 
    visitFunctionDeclaration: function(tree) { 
      if(tree.name !== null) { 
        this.checkType_(ParseTreeType.BINDING_IDENTIFIER, tree.name, 'binding identifier expected'); 
      } 
      this.checkType_(ParseTreeType.FORMAL_PARAMETER_LIST, tree.formalParameterList, 'formal parameters expected'); 
      this.checkType_(ParseTreeType.BLOCK, tree.functionBody, 'block expected'); 
    }, 
    visitGetAccessor: function(tree) { 
      this.checkType_(ParseTreeType.BLOCK, tree.body, 'block expected'); 
    }, 
    visitIfStatement: function(tree) { 
      this.checkVisit_(tree.condition.isExpression(), tree.condition, 'expression expected'); 
      this.checkVisit_(tree.ifClause.isStatement(), tree.ifClause, 'statement expected'); 
      if(tree.elseClause !== null) { 
        this.checkVisit_(tree.elseClause.isStatement(), tree.elseClause, 'statement expected'); 
      } 
    }, 
    visitLabelledStatement: function(tree) { 
      this.checkVisit_(tree.statement.isStatement(), tree.statement, 'statement expected'); 
    }, 
    visitMemberExpression: function(tree) { 
      this.check_(tree.operand.isMemberExpression(), tree.operand, 'member expression expected'); 
      if(tree.operand instanceof NewExpression) { 
        this.check_(tree.operand.args !== null, tree.operand, 'new args expected'); 
      } 
      this.visitAny(tree.operand); 
    }, 
    visitMemberLookupExpression: function(tree) { 
      this.check_(tree.operand.isMemberExpression(), tree.operand, 'member expression expected'); 
      if(tree.operand instanceof NewExpression) { 
        this.check_(tree.operand.args !== null, tree.operand, 'new args expected'); 
      } 
      this.visitAny(tree.operand); 
    }, 
    visitMissingPrimaryExpression: function(tree) { 
      this.fail_(tree, 'parse tree contains errors'); 
    }, 
    visitModuleDeclaration: function(tree) { 
      for(var i = 0; i < tree.specifiers.length; i ++) { 
        var specifier = tree.specifiers[i]; 
        this.checkType_(ParseTreeType.MODULE_SPECIFIER, specifier, 'module specifier expected'); 
      } 
    }, 
    visitModuleDefinition: function(tree) { 
      for(var i = 0; i < tree.elements.length; i ++) { 
        var element = tree.elements[i]; 
        this.checkVisit_((element.isStatement() && element.type !== ParseTreeType.BLOCK) || element.type === ParseTreeType.CLASS_DECLARATION || element.type === ParseTreeType.EXPORT_DECLARATION || element.type === ParseTreeType.IMPORT_DECLARATION || element.type === ParseTreeType.MODULE_DEFINITION || element.type === ParseTreeType.MODULE_DECLARATION, element, 'module element expected'); 
      } 
    }, 
    visitModuleRequire: function(tree) { 
      this.check_(tree.url.type == TokenType.STRING, tree.url, 'string expected'); 
    }, 
    visitModuleSpecifier: function(tree) { 
      this.checkType_(ParseTreeType.MODULE_EXPRESSION, tree.expression, 'module expression expected'); 
    }, 
    visitNewExpression: function(tree) { 
      this.checkVisit_(tree.operand.isMemberExpression(), tree.operand, 'member expression expected'); 
      this.visitAny(tree.args); 
    }, 
    visitObjectLiteralExpression: function(tree) { 
      for(var i = 0; i < tree.propertyNameAndValues.length; i ++) { 
        var propertyNameAndValue = tree.propertyNameAndValues[i]; 
        switch(propertyNameAndValue.type) { 
          case ParseTreeType.GET_ACCESSOR: 
          case ParseTreeType.SET_ACCESSOR: 
          case ParseTreeType.PROPERTY_METHOD_ASSIGNMENT: 
          case ParseTreeType.PROPERTY_NAME_ASSIGNMENT: 
          case ParseTreeType.PROPERTY_NAME_SHORTHAND: 
            break; 

          default: 
            this.fail_(propertyNameAndValue, 'accessor, property name assignment or property method assigment expected'); 

        } 
        this.visitAny(propertyNameAndValue); 
      } 
    }, 
    visitObjectPattern: function(tree) { 
      for(var i = 0; i < tree.fields.length; i ++) { 
        var field = tree.fields[i]; 
        this.checkVisit_(field.type === ParseTreeType.OBJECT_PATTERN_FIELD || field.type === ParseTreeType.BINDING_ELEMENT || field.type === ParseTreeType.IDENTIFIER_EXPRESSION, field, 'object pattern field expected'); 
      } 
    }, 
    visitObjectPatternField: function(tree) { 
      this.checkVisit_(tree.element.type === ParseTreeType.BINDING_ELEMENT || tree.element.isPattern() || tree.element.isLeftHandSideExpression(), tree.element, 'binding element expected'); 
    }, 
    visitParenExpression: function(tree) { 
      if(tree.expression.isPattern()) { 
        this.visitAny(tree.expression); 
      } else { 
        this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      } 
    }, 
    visitPostfixExpression: function(tree) { 
      this.checkVisit_(tree.operand.isArrowFunctionExpression(), tree.operand, 'assignment expression expected'); 
    }, 
    visitProgram: function(tree) { 
      for(var i = 0; i < tree.programElements.length; i ++) { 
        var programElement = tree.programElements[i]; 
        this.checkVisit_(programElement.isProgramElement(), programElement, 'global program element expected'); 
      } 
    }, 
    visitPropertyNameAssignment: function(tree) { 
      this.checkVisit_(tree.value.isArrowFunctionExpression(), tree.value, 'assignment expression expected'); 
    }, 
    visitPropertyNameShorthand: function(tree) { }, 
    visitQuasiLiteralExpression: function(tree) { 
      if(tree.operand) { 
        this.checkVisit_(tree.operand.isMemberExpression(), tree.operand, 'member or call expression expected'); 
      } 
      for(var i = 0; i < tree.elements.length; i ++) { 
        var element = tree.elements[i]; 
        if(i % 2) { 
          this.checkType_(ParseTreeType.QUASI_SUBSTITUTION, element, 'Quasi substitution expected'); 
        } else { 
          this.checkType_(ParseTreeType.QUASI_LITERAL_PORTION, element, 'Quasi literal portion expected'); 
        } 
      } 
    }, 
    visitReturnStatement: function(tree) { 
      if(tree.expression !== null) { 
        this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      } 
    }, 
    visitSetAccessor: function(tree) { 
      this.checkType_(ParseTreeType.BLOCK, tree.body, 'block expected'); 
    }, 
    visitSpreadExpression: function(tree) { 
      this.checkVisit_(tree.expression.isArrowFunctionExpression(), tree.expression, 'assignment expression expected'); 
    }, 
    visitStateMachine: function(tree) { 
      this.fail_(tree, 'State machines are never valid outside of the ' + 'GeneratorTransformer pass.'); 
    }, 
    visitSwitchStatement: function(tree) { 
      this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      var defaultCount = 0; 
      for(var i = 0; i < tree.caseClauses.length; i ++) { 
        var caseClause = tree.caseClauses[i]; 
        if(caseClause.type === ParseTreeType.DEFAULT_CLAUSE) { 
          ++ defaultCount; 
          this.checkVisit_(defaultCount <= 1, caseClause, 'no more than one default clause allowed'); 
        } else { 
          this.checkType_(ParseTreeType.CASE_CLAUSE, caseClause, 'case or default clause expected'); 
        } 
      } 
    }, 
    visitThrowStatement: function(tree) { 
      if(tree.value === null) { 
        return; 
      } 
      this.checkVisit_(tree.value.isExpression(), tree.value, 'expression expected'); 
    }, 
    visitTryStatement: function(tree) { 
      this.checkType_(ParseTreeType.BLOCK, tree.body, 'block expected'); 
      if(tree.catchBlock !== null && ! tree.catchBlock.isNull()) { 
        this.checkType_(ParseTreeType.CATCH, tree.catchBlock, 'catch block expected'); 
      } 
      if(tree.finallyBlock !== null && ! tree.finallyBlock.isNull()) { 
        this.checkType_(ParseTreeType.FINALLY, tree.finallyBlock, 'finally block expected'); 
      } 
      if((tree.catchBlock === null || tree.catchBlock.isNull()) &&(tree.finallyBlock === null || tree.finallyBlock.isNull())) { 
        this.fail_(tree, 'either catch or finally must be present'); 
      } 
    }, 
    visitUnaryExpression: function(tree) { 
      this.checkVisit_(tree.operand.isArrowFunctionExpression(), tree.operand, 'assignment expression expected'); 
    }, 
    visitVariableDeclaration: function(tree) { 
      this.checkVisit_(tree.lvalue.isPattern() || tree.lvalue.type == ParseTreeType.BINDING_IDENTIFIER, tree.lvalue, 'binding identifier expected, found: ' + tree.lvalue.type); 
      if(tree.initializer !== null) { 
        this.checkVisit_(tree.initializer.isArrowFunctionExpression(), tree.initializer, 'assignment expression expected'); 
      } 
    }, 
    visitWhileStatement: function(tree) { 
      this.checkVisit_(tree.condition.isExpression(), tree.condition, 'expression expected'); 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
    }, 
    visitWithStatement: function(tree) { 
      this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      this.checkVisit_(tree.body.isStatement(), tree.body, 'statement expected'); 
    }, 
    visitYieldStatement: function(tree) { 
      if(tree.expression !== null) { 
        this.checkVisit_(tree.expression.isExpression(), tree.expression, 'expression expected'); 
      } 
    }, 
    constructor: function() { 
      var args = Array.prototype.slice.call(arguments, 0); 
      traceur.runtime.superCall(this, ParseTreeValidator, "constructor", $__1(args)); 
    } 
  }, ParseTreeVisitor, false, true); 
  ParseTreeValidator.validate = function(tree) { 
    var validator = new ParseTreeValidator(); 
    try { 
      validator.visitAny(tree); 
    } catch(e) { 
      if(!(e instanceof ValidationError)) { 
        throw e; 
      } 
      var location = null; 
      if(e.tree !== null) { 
        location = e.tree.location; 
      } 
      if(location === null) { 
        location = tree.location; 
      } 
      var locationString = location !== null ? location.start.toString(): '(unknown)'; 
      throw Error('Parse tree validation failure \'' + e.message + '\' at ' + locationString + ':\n\n' + TreeWriter.write(tree, { 
        highlighted: e.tree, 
        showLineNumbers: true 
      }) + '\n'); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { ParseTreeValidator: { 
      get: function() { 
        return ParseTreeValidator; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_outputgeneration_ProjectWriter_js =(function() { 
  "use strict"; 
  var destructuring$TreeWriter = $src_outputgeneration_TreeWriter_js, TreeWriter = destructuring$TreeWriter.TreeWriter; 
  function ProjectWriter() { } 
  ProjectWriter.write = function(results, opt_options) { 
    return results.keys().map(function(file) { 
      return TreeWriter.write(results.get(file), opt_options); 
    }).join(''); 
  }; 
  return Object.preventExtensions(Object.create(null, { ProjectWriter: { 
      get: function() { 
        return ProjectWriter; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_outputgeneration_SourceMapIntegration_js =(function() { 
  "use strict"; 
  var base64 = this.sourceMapModule['base64']; 
  var base64Vlq = this.sourceMapModule['base64-vlq']; 
  var binarySearch = this.sourceMapModule['binary-search']; 
  var util = this.sourceMapModule['util']; 
  var SourceMapGenerator = this.sourceMapModule['source-map-generator']; 
  var SourceMapConsumer = this.sourceMapModule['source-map-consumer']; 
  var SourceNode = this.sourceMapModule['source-node']; 
  return Object.preventExtensions(Object.create(null, { 
    base64: { 
      get: function() { 
        return base64; 
      }, 
      enumerable: true 
    }, 
    base64Vlq: { 
      get: function() { 
        return base64Vlq; 
      }, 
      enumerable: true 
    }, 
    binarySearch: { 
      get: function() { 
        return binarySearch; 
      }, 
      enumerable: true 
    }, 
    util: { 
      get: function() { 
        return util; 
      }, 
      enumerable: true 
    }, 
    SourceMapGenerator: { 
      get: function() { 
        return SourceMapGenerator; 
      }, 
      enumerable: true 
    }, 
    SourceMapConsumer: { 
      get: function() { 
        return SourceMapConsumer; 
      }, 
      enumerable: true 
    }, 
    SourceNode: { 
      get: function() { 
        return SourceNode; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_codegeneration_module_ModuleRequireVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$canonicalizeUrl = $src_util_url_js, canonicalizeUrl = destructuring$canonicalizeUrl.canonicalizeUrl; 
  var destructuring$createObject$evaluateStringLiteral = $src_util_util_js, createObject = destructuring$createObject$evaluateStringLiteral.createObject, evaluateStringLiteral = destructuring$createObject$evaluateStringLiteral.evaluateStringLiteral; 
  var ModuleRequireVisitor = traceur.runtime.createClass({ 
    constructor: function(reporter) { 
      traceur.runtime.superCall(this, ModuleRequireVisitor, "constructor",[]); 
      this.urls_ = Object.create(null); 
    }, 
    get requireUrls() { 
      return Object.keys(this.urls_); 
    }, 
    visitModuleRequire: function(tree) { 
      this.urls_[canonicalizeUrl(evaluateStringLiteral(tree.url))]= true; 
    } 
  }, ParseTreeVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { ModuleRequireVisitor: { 
      get: function() { 
        return ModuleRequireVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ModuleTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createArgumentList, createBindingIdentifier = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBindingIdentifier, createBlock = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBlock, createCallExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCallExpression, createEmptyParameterList = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createEmptyParameterList, createExpressionStatement = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createExpressionStatement, createFunctionExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createFunctionExpression, createIdentifierExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createMemberExpression, createNullLiteral = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createNullLiteral, createObjectCreate = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createObjectCreate, createObjectLiteralExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createObjectLiteralExpression, createObjectPreventExtensions = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createObjectPreventExtensions, createProgram = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createProgram, createPropertyDescriptor = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createPropertyDescriptor, createPropertyNameAssignment = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createPropertyNameAssignment, createReturnStatement = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createReturnStatement, createScopedExpression = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createScopedExpression, createUseStrictDirective = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createUseStrictDirective, createVariableDeclaration = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createArgumentList$createBindingIdentifier$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNullLiteral$createObjectCreate$createObjectLiteralExpression$createObjectPreventExtensions$createProgram$createPropertyDescriptor$createPropertyNameAssignment$createReturnStatement$createScopedExpression$createUseStrictDirective$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var BindingElement = trees.BindingElement; 
  var BindingIdentifier = trees.BindingIdentifier; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var LiteralExpression = trees.LiteralExpression; 
  var ObjectPattern = trees.ObjectPattern; 
  var ObjectPatternField = trees.ObjectPatternField; 
  var Program = trees.Program; 
  var CLASS_DECLARATION = ParseTreeType.CLASS_DECLARATION; 
  var EXPORT_DECLARATION = ParseTreeType.EXPORT_DECLARATION; 
  var EXPORT_MAPPING_LIST = ParseTreeType.EXPORT_MAPPING_LIST; 
  var EXPORT_SPECIFIER = ParseTreeType.EXPORT_SPECIFIER; 
  var FUNCTION_DECLARATION = ParseTreeType.FUNCTION_DECLARATION; 
  var IDENTIFIER_EXPRESSION = ParseTreeType.IDENTIFIER_EXPRESSION; 
  var IMPORT_DECLARATION = ParseTreeType.IMPORT_DECLARATION; 
  var MODULE_DECLARATION = ParseTreeType.MODULE_DECLARATION; 
  var MODULE_DEFINITION = ParseTreeType.MODULE_DEFINITION; 
  var MODULE_REQUIRE = ParseTreeType.MODULE_REQUIRE; 
  var VARIABLE_STATEMENT = ParseTreeType.VARIABLE_STATEMENT; 
  function toBindingIdentifier(tree) { 
    return new BindingIdentifier(tree.location, tree.identifierToken); 
  } 
  function getGetterExport(project, symbol) { 
    var name = symbol.name; 
    var tree = symbol.tree; 
    var returnExpression; 
    switch(tree.type) { 
      case EXPORT_SPECIFIER: 
        returnExpression = transformSpecifier(project, tree.lhs, symbol.relatedTree); 
        break; 

      case IDENTIFIER_EXPRESSION: 
        if(! symbol.relatedTree) { 
          returnExpression = tree; 
        } else { 
          returnExpression = transformSpecifier(project, tree.identifierToken, symbol.relatedTree); 
        } 
        break; 

      default: 
        returnExpression = createIdentifierExpression(name); 
        break; 

    } 
    var fun = createFunctionExpression(createEmptyParameterList(), createBlock(createReturnStatement(returnExpression))); 
    var descriptor = createPropertyDescriptor({ 
      get: fun, 
      enumerable: true 
    }); 
    return createPropertyNameAssignment(name, descriptor); 
  } 
  function transformSpecifier(project, identifierToken, moduleExpression) { 
    if(moduleExpression) { 
      var operand = new ModuleTransformer(project).transformAny(moduleExpression); 
      return createMemberExpression(operand, identifierToken); 
    } 
    return createIdentifierExpression(identifierToken); 
  } 
  function ModuleTransformer(project) { 
    ParseTreeTransformer.call(this); 
    this.project_ = project; 
  } 
  ModuleTransformer.prototype = createObject(ParseTreeTransformer.prototype, { 
    transformModuleExpression: function(tree) { 
      var reference = tree.reference; 
      if(reference.type == MODULE_REQUIRE) { 
        return createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.GET_MODULE_INSTANCE_BY_URL), createArgumentList(new LiteralExpression(null, reference.url))); 
      } 
      if(tree.identifiers.length == 0) return reference; 
      return createMemberExpression(reference, tree.identifiers); 
    }, 
    transformModuleSpecifier: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      return createVariableDeclaration(tree.identifier, expression); 
    }, 
    transformImportDeclaration: function(tree) { 
      var declarations = this.transformList(tree.importPathList); 
      return createVariableStatement(createVariableDeclarationList(TokenType.VAR, declarations)); 
    }, 
    transformImportBinding: function(tree) { 
      var importSpecifierSet; 
      if(tree.importSpecifierSet.type == ParseTreeType.IDENTIFIER_EXPRESSION) { 
        var field = new BindingElement(tree.location, createBindingIdentifier(tree.importSpecifierSet.identifierToken), null); 
        importSpecifierSet = new ObjectPattern(tree.location,[field]); 
      } else { 
        importSpecifierSet = this.transformAny(tree.importSpecifierSet); 
      } 
      var moduleExpression = this.transformAny(tree.moduleExpression); 
      return createVariableDeclaration(importSpecifierSet, moduleExpression); 
    }, 
    transformImportSpecifierSet: function(tree) { 
      var fields; 
      if(tree.specifiers.type === TokenType.STAR) { 
        var module = this.project_.getModuleForStarTree(tree); 
        var fields = module.getExports().map((function(exportSymbol) { 
          return new BindingElement(tree.location, createBindingIdentifier(exportSymbol.name), null); 
        })); 
      } else { 
        fields = this.transformList(tree.specifiers); 
      } 
      return new ObjectPattern(null, fields); 
    }, 
    transformImportSpecifier: function(tree) { 
      if(tree.rhs) { 
        var binding = new BindingIdentifier(tree.location, tree.rhs); 
        var bindingElement = new BindingElement(tree.location, binding, null); 
        return new ObjectPatternField(tree.location, tree.lhs, bindingElement); 
      } 
      return new BindingElement(tree.location, createBindingIdentifier(tree.lhs), null); 
    } 
  }); 
  ModuleTransformer.transform = function(project, tree) { 
    var module = project.getRootModule(); 
    var elements = tree.programElements.map((function(element) { 
      switch(element.type) { 
        case MODULE_DEFINITION: 
          return transformDefinition(project, module, element); 

        case MODULE_DECLARATION: 
          return transformDeclaration(project, module, element); 

        case IMPORT_DECLARATION: 
          return new ModuleTransformer(project).transformAny(element); 

        default: 
          return element; 

      } 
    })); 
    return new Program(tree.location, elements); 
  }; 
  ModuleTransformer.transformAsModule = function(project, module, tree) { 
    var callExpression = transformModuleElements(project, module, tree.programElements); 
    return createProgram([createExpressionStatement(callExpression)]); 
  }; 
  function transformModuleElements(project, module, elements) { 
    var statements =[]; 
    statements.push(createUseStrictDirective()); 
    elements.forEach((function(element) { 
      switch(element.type) { 
        case MODULE_DECLARATION: 
          statements.push(transformDeclaration(project, module, element)); 
          break; 

        case MODULE_DEFINITION: 
          statements.push(transformDefinition(project, module, element)); 
          break; 

        case EXPORT_DECLARATION: 
          var declaration = element.declaration; 
          switch(declaration.type) { 
            case MODULE_DEFINITION: 
              statements.push(transformDefinition(project, module, declaration)); 
              break; 

            case MODULE_DECLARATION: 
              statements.push(transformDeclaration(project, module, declaration)); 
              break; 

            case EXPORT_MAPPING_LIST: 
              break; 

            case CLASS_DECLARATION: 
            case FUNCTION_DECLARATION: 
            case VARIABLE_STATEMENT: 
              statements.push(declaration); 
              break; 

            default: 
              throw new Error('unreachable'); 

          } 
          break; 

        case IMPORT_DECLARATION: 
          var transformer = new ModuleTransformer(project); 
          statements.push(transformer.transformAny(element)); 
          break; 

        default: 
          statements.push(element); 

      } 
    })); 
    var properties = module.getExports().map((function(exp) { 
      return getGetterExport(project, exp); 
    })); 
    var descriptors = createObjectLiteralExpression(properties); 
    statements.push(createReturnStatement(createObjectPreventExtensions(createObjectCreate(createNullLiteral(), descriptors)))); 
    return createScopedExpression(createBlock(statements)); 
  } 
  function transformDefinition(project, parent, tree) { 
    var module = parent.getModule(tree.name.value); 
    var callExpression = transformModuleElements(project, module, tree.elements); 
    return createVariableStatement(TokenType.VAR, module.name, callExpression); 
  } 
  function transformDeclaration(project, parent, tree) { 
    var transformer = new ModuleTransformer(project); 
    var list = tree.specifiers.map(transformer.transformAny, transformer); 
    var variableDeclarationList = createVariableDeclarationList(TokenType.VAR, list); 
    return createVariableStatement(variableDeclarationList); 
  } 
  return Object.preventExtensions(Object.create(null, { ModuleTransformer: { 
      get: function() { 
        return ModuleTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_AlphaRenamer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$createFunctionDeclaration$createIdentifierExpression = $src_codegeneration_ParseTreeFactory_js, createFunctionDeclaration = destructuring$createFunctionDeclaration$createIdentifierExpression.createFunctionDeclaration, createIdentifierExpression = destructuring$createFunctionDeclaration$createIdentifierExpression.createIdentifierExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var destructuring$variablesInBlock$variablesInFunction = $src_semantics_VariableBinder_js, variablesInBlock = destructuring$variablesInBlock$variablesInFunction.variablesInBlock, variablesInFunction = destructuring$variablesInBlock$variablesInFunction.variablesInFunction; 
  var Block = trees.Block; 
  var Catch = trees.Catch; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var IdentifierExpression = trees.IdentifierExpression; 
  function AlphaRenamer(oldName, newName) { 
    ParseTreeTransformer.call(this); 
    this.oldName_ = oldName; 
    this.newName_ = newName; 
  } 
  AlphaRenamer.rename = function(tree, oldName, newName) { 
    return new AlphaRenamer(oldName, newName).transformAny(tree); 
  }; 
  var proto = ParseTreeTransformer.prototype; 
  AlphaRenamer.prototype = createObject(proto, { 
    transformBlock: function(tree) { 
      if(this.oldName_ in variablesInBlock(tree)) { 
        return tree; 
      } else { 
        return proto.transformBlock.call(this, tree); 
      } 
    }, 
    transformIdentifierExpression: function(tree) { 
      if(this.oldName_ == tree.identifierToken.value) { 
        return createIdentifierExpression(this.newName_); 
      } else { 
        return tree; 
      } 
    }, 
    transformThisExpression: function(tree) { 
      if(this.oldName_ !== PredefinedName.THIS) return tree; 
      return createIdentifierExpression(this.newName_); 
    }, 
    transformFunctionDeclaration: function(tree) { 
      if(this.oldName_ == tree.name) { 
        tree = createFunctionDeclaration(this.newName_, tree.formalParameterList, tree.functionBody); 
      } 
      var doNotRecurse = this.oldName_ === PredefinedName.ARGUMENTS || this.oldName_ === PredefinedName.THIS || this.oldName_ in variablesInFunction(tree); 
      if(doNotRecurse) return tree; else return proto.transformFunctionDeclaration.call(this, tree); 
    }, 
    transformCatch: function(tree) { 
      if(! tree.binding.isPattern() && this.oldName_ === tree.binding.identifierToken.value) { 
        return tree; 
      } 
      return proto.transformCatch.call(this, tree); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { AlphaRenamer: { 
      get: function() { 
        return AlphaRenamer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_FindVisitor_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var foundSentinel = { }; 
  var FindVisitor = traceur.runtime.createClass({ 
    constructor: function(tree, keepOnGoing) { 
      this.found_ = false; 
      this.keepOnGoing_ = keepOnGoing; 
      try { 
        this.visitAny(tree); 
      } catch(ex) { 
        if(ex !== foundSentinel) throw ex; 
      } 
    }, 
    get found() { 
      return this.found_; 
    }, 
    set found(v) { 
      if(v) { 
        this.found_ = true; 
        if(! this.keepOnGoing_) throw foundSentinel; 
      } 
    } 
  }, ParseTreeVisitor, true, true); 
  return Object.preventExtensions(Object.create(null, { FindVisitor: { 
      get: function() { 
        return FindVisitor; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_FindInFunctionScope_js =(function() { 
  "use strict"; 
  var destructuring$FindVisitor = $src_codegeneration_FindVisitor_js, FindVisitor = destructuring$FindVisitor.FindVisitor; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function FindInFunctionScope(tree) { 
    FindVisitor.call(this, tree); 
  } 
  FindInFunctionScope.prototype = createObject(FindVisitor.prototype, { 
    visitFunctionDeclaration: function(tree) { }, 
    visitSetAccessor: function(tree) { }, 
    visitGetAccessor: function(tree) { }, 
    visitPropertyMethodAssignment: function(tree) { } 
  }); 
  return Object.preventExtensions(Object.create(null, { FindInFunctionScope: { 
      get: function() { 
        return FindInFunctionScope; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_TempVarTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createBlock$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createBlock = destructuring$createBlock$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBlock, createVariableDeclaration = destructuring$createBlock$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createBlock$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createBlock$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var Program = trees.Program; 
  function transformStatements(self, statements) { 
    self.tempVarStack_.push([]); 
    var transformedStatements = self.transformList(statements); 
    var vars = self.tempVarStack_.pop(); 
    if(! vars.length) return transformedStatements; 
    var variableStatement = createVariableStatement(createVariableDeclarationList(TokenType.VAR, vars)); 
    transformedStatements =[variableStatement].concat(transformedStatements); 
    return transformedStatements; 
  } 
  function getVars(self) { 
    var vars = self.tempVarStack_[self.tempVarStack_.length - 1]; 
    if(! vars) throw new Error('Invalid use of addTempVar'); 
    return vars; 
  } 
  function TempVarTransformer(identifierGenerator) { 
    this.identifierGenerator = identifierGenerator; 
    this.tempVarStack_ =[]; 
  } 
  var proto = ParseTreeTransformer.prototype; 
  TempVarTransformer.prototype = createObject(proto, { 
    transformProgram: function(tree) { 
      var elements = transformStatements(this, tree.programElements); 
      if(elements == tree.programElements) { 
        return tree; 
      } 
      return new Program(null, elements); 
    }, 
    transformFunctionBody: function(tree) { 
      var statements = transformStatements(this, tree.statements); 
      if(statements == tree.statements) return tree; 
      return createBlock(statements); 
    }, 
    addTempVar: function(opt_initializer) { 
      var vars = getVars(this); 
      var uid = this.identifierGenerator.generateUniqueIdentifier(); 
      vars.push(createVariableDeclaration(uid, opt_initializer || null)); 
      return uid; 
    }, 
    removeTempVar: function(name) { 
      var vars = getVars(this); 
      var index = - 1; 
      for(var i = 0; i < vars.length; i ++) { 
        if(vars[i].lvalue.identifierToken.value === name) { 
          index = i; 
          break; 
        } 
      } 
      if(index !== - 1) vars.splice(index, 1); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { TempVarTransformer: { 
      get: function() { 
        return TempVarTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ComprehensionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$AlphaRenamer = $src_codegeneration_AlphaRenamer_js, AlphaRenamer = destructuring$AlphaRenamer.AlphaRenamer; 
  var destructuring$FindInFunctionScope = $src_codegeneration_FindInFunctionScope_js, FindInFunctionScope = destructuring$FindInFunctionScope.FindInFunctionScope; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList = $src_codegeneration_ParseTreeFactory_js, createBlock = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createBlock, createCallExpression = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createCallExpression, createEmptyParameterList = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createEmptyParameterList, createForOfStatement = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createForOfStatement, createIdentifierExpression = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createIdentifierExpression, createIfStatement = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createIfStatement, createParenExpression = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createParenExpression, createThisExpression = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createThisExpression, createVariableDeclarationList = destructuring$createBlock$createCallExpression$createEmptyParameterList$createForOfStatement$createIdentifierExpression$createIfStatement$createParenExpression$createThisExpression$createVariableDeclarationList.createVariableDeclarationList; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  function ThisFinder(tree) { 
    FindInFunctionScope.call(this, tree); 
  } 
  ThisFinder.prototype = createObject(FindInFunctionScope.prototype, { visitThisExpression: function(tree) { 
      this.found = true; 
    } }); 
  function ArgumentsFinder(tree) { 
    FindInFunctionScope.call(this, tree); 
  } 
  ArgumentsFinder.prototype = createObject(FindInFunctionScope.prototype, { visitIdentifierExpression: function(tree) { 
      if(tree.identifierToken.value === PredefinedName.ARGUMENTS) this.found = true; 
    } }); 
  function ComprehensionTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
  } 
  var proto = TempVarTransformer.prototype; 
  ComprehensionTransformer.prototype = createObject(proto, { transformComprehension: function(tree, statement, isGenerator, initStatement, returnStatement) { 
      var bindingKind = isGenerator ? TokenType.VAR: TokenType.LET; 
      if(tree.ifExpression) { 
        var ifExpression = this.transformAny(tree.ifExpression); 
        statement = createIfStatement(ifExpression, statement); 
      } 
      for(var i = tree.comprehensionForList.length - 1; i >= 0; i --) { 
        var item = tree.comprehensionForList[i]; 
        var left = this.transformAny(item.left); 
        var iterator = this.transformAny(item.iterator); 
        var initializer = createVariableDeclarationList(bindingKind, left, null); 
        statement = createForOfStatement(initializer, iterator, statement); 
      } 
      var argumentsFinder = new ArgumentsFinder(statement); 
      if(argumentsFinder.found) { 
        var tempVar = this.addTempVar(createIdentifierExpression(PredefinedName.ARGUMENTS)); 
        statement = AlphaRenamer.rename(statement, PredefinedName.ARGUMENTS, tempVar); 
      } 
      var thisFinder = new ThisFinder(statement); 
      if(thisFinder.found) { 
        var tempVar = this.addTempVar(createThisExpression()); 
        statement = AlphaRenamer.rename(statement, PredefinedName.THIS, tempVar); 
      } 
      var statements =[]; 
      if(initStatement) statements.push(initStatement); 
      statements.push(statement); 
      if(returnStatement) statements.push(returnStatement); 
      var func = new FunctionDeclaration(null, null, isGenerator, createEmptyParameterList(), createBlock(statements)); 
      return createParenExpression(createCallExpression(func)); 
    } }); 
  return Object.preventExtensions(Object.create(null, { ComprehensionTransformer: { 
      get: function() { 
        return ComprehensionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ArrayComprehensionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ComprehensionTransformer = $src_codegeneration_ComprehensionTransformer_js, ComprehensionTransformer = destructuring$ComprehensionTransformer.ComprehensionTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArrayLiteralExpression = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createArrayLiteralExpression, createAssignmentStatement = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createAssignmentStatement, createIdentifierExpression = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createMemberLookupExpression = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createMemberLookupExpression, createNumberLiteral = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createNumberLiteral, createPostfixExpression = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createPostfixExpression, createReturnStatement = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createReturnStatement, createVariableDeclaration = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createArrayLiteralExpression$createAssignmentStatement$createIdentifierExpression$createMemberLookupExpression$createNumberLiteral$createPostfixExpression$createReturnStatement$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function ArrayComprehensionTransformer(identifierGenerator) { 
    ComprehensionTransformer.call(this, identifierGenerator); 
  } 
  ArrayComprehensionTransformer.transformTree = function(identifierGenerator, tree) { 
    return new ArrayComprehensionTransformer(identifierGenerator).transformAny(tree); 
  }; 
  ArrayComprehensionTransformer.prototype = createObject(ComprehensionTransformer.prototype, { transformArrayComprehension: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var indexName = this.identifierGenerator.generateUniqueIdentifier(); 
      var resultName = this.identifierGenerator.generateUniqueIdentifier(); 
      var resultIdentifier = createIdentifierExpression(resultName); 
      var initStatement = createVariableStatement(createVariableDeclarationList(TokenType.VAR,[createVariableDeclaration(indexName, createNumberLiteral(0)), createVariableDeclaration(resultName, createArrayLiteralExpression([]))])); 
      var statement = createAssignmentStatement(createMemberLookupExpression(resultIdentifier, createPostfixExpression(createIdentifierExpression(indexName), TokenType.PLUS_PLUS)), expression); 
      var returnStatement = createReturnStatement(resultIdentifier); 
      var isGenerator = false; 
      return this.transformComprehension(tree, statement, isGenerator, initStatement, returnStatement); 
    } }); 
  return Object.preventExtensions(Object.create(null, { ArrayComprehensionTransformer: { 
      get: function() { 
        return ArrayComprehensionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ArrowFunctionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$FindInFunctionScope = $src_codegeneration_FindInFunctionScope_js, FindInFunctionScope = destructuring$FindInFunctionScope.FindInFunctionScope; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createArgumentList, createBlock = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createBlock, createCallExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createCallExpression, createFunctionExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createFunctionExpression, createMemberExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createMemberExpression, createParenExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createParenExpression, createReturnStatement = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createReturnStatement, createThisExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionExpression$createMemberExpression$createParenExpression$createReturnStatement$createThisExpression.createThisExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FormalParameterList = trees.FormalParameterList; 
  var ThisExpression = trees.ThisExpression; 
  function ThisFinder(tree) { 
    FindInFunctionScope.call(this, tree); 
  } 
  ThisFinder.prototype = createObject(FindInFunctionScope.prototype, { visitThisExpression: function(tree) { 
      this.found = true; 
    } }); 
  function ArrowFunctionTransformer(reporter) { 
    this.reporter_ = reporter; 
  } 
  ArrowFunctionTransformer.transformTree = function(reporter, tree) { 
    return new ArrowFunctionTransformer(reporter).transformAny(tree); 
  }; 
  ArrowFunctionTransformer.prototype = createObject(ParseTreeTransformer.prototype, { transformArrowFunctionExpression: function(tree) { 
      var parameters; 
      if(tree.formalParameters) { 
        parameters = this.transformAny(tree.formalParameters).parameters; 
      } else { 
        parameters =[]; 
      } 
      var functionBody = this.transformAny(tree.functionBody); 
      if(functionBody.type != ParseTreeType.BLOCK) { 
        functionBody = createBlock(createReturnStatement(functionBody)); 
      } 
      var result = createParenExpression(createFunctionExpression(new FormalParameterList(null, parameters), functionBody)); 
      var finder = new ThisFinder(functionBody); 
      if(finder.found) { 
        return createCallExpression(createMemberExpression(result, PredefinedName.BIND), createArgumentList(createThisExpression())); 
      } 
      return result; 
    } }); 
  return Object.preventExtensions(Object.create(null, { ArrowFunctionTransformer: { 
      get: function() { 
        return ArrowFunctionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_OperatorExpander_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression = $src_codegeneration_ParseTreeFactory_js, createAssignmentExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createAssignmentExpression, createBinaryOperator = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createBinaryOperator, createCommaExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createCommaExpression, createIdentifierExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createIdentifierExpression, createMemberExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createMemberExpression, createMemberLookupExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createMemberLookupExpression, createOperatorToken = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createOperatorToken, createParenExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createOperatorToken$createParenExpression.createParenExpression; 
  function getBinaryOperator(type) { 
    switch(type) { 
      case TokenType.STAR_EQUAL: 
        return TokenType.STAR; 

      case TokenType.SLASH_EQUAL: 
        return TokenType.SLASH; 

      case TokenType.PERCENT_EQUAL: 
        return TokenType.PERCENT; 

      case TokenType.PLUS_EQUAL: 
        return TokenType.PLUS; 

      case TokenType.MINUS_EQUAL: 
        return TokenType.MINUS; 

      case TokenType.LEFT_SHIFT_EQUAL: 
        return TokenType.LEFT_SHIFT; 

      case TokenType.RIGHT_SHIFT_EQUAL: 
        return TokenType.RIGHT_SHIFT; 

      case TokenType.UNSIGNED_RIGHT_SHIFT_EQUAL: 
        return TokenType.UNSIGNED_RIGHT_SHIFT; 

      case TokenType.AMPERSAND_EQUAL: 
        return TokenType.AMPERSAND; 

      case TokenType.CARET_EQUAL: 
        return TokenType.CARET; 

      case TokenType.BAR_EQUAL: 
        return TokenType.BAR; 

      default: 
        throw Error('unreachable'); 

    } 
  } 
  function expandMemberLookupExpression(tree, tempVarTransformer) { 
    var tmp1; 
    var expressions =[]; 
    if(tree.left.operand.type == ParseTreeType.SUPER_EXPRESSION || tree.left.operand.type == ParseTreeType.IDENTIFIER_EXPRESSION) { 
      tmp1 = tree.left.operand; 
    } else { 
      tmp1 = createIdentifierExpression(tempVarTransformer.addTempVar()); 
      expressions.push(createAssignmentExpression(tmp1, tree.left.operand)); 
    } 
    var tmp2 = createIdentifierExpression(tempVarTransformer.addTempVar()); 
    expressions.push(createAssignmentExpression(tmp2, tree.left.memberExpression), createAssignmentExpression(createMemberLookupExpression(tmp1, tmp2), createBinaryOperator(createMemberLookupExpression(tmp1, tmp2), createOperatorToken(getBinaryOperator(tree.operator.type)), tree.right))); 
    return createParenExpression(createCommaExpression(expressions)); 
  } 
  function expandMemberExpression(tree, tempVarTransformer) { 
    var tmp; 
    var expressions =[]; 
    if(tree.left.operand.type == ParseTreeType.SUPER_EXPRESSION || tree.left.operand.type == ParseTreeType.IDENTIFIER_EXPRESSION) { 
      tmp = tree.left.operand; 
    } else { 
      tmp = createIdentifierExpression(tempVarTransformer.addTempVar()); 
      expressions.push(createAssignmentExpression(tmp, tree.left.operand)); 
    } 
    expressions.push(createAssignmentExpression(createMemberExpression(tmp, tree.left.memberName), createBinaryOperator(createMemberExpression(tmp, tree.left.memberName), createOperatorToken(getBinaryOperator(tree.operator.type)), tree.right))); 
    return createParenExpression(createCommaExpression(expressions)); 
  } 
  return Object.preventExtensions(Object.create(null, { 
    expandMemberLookupExpression: { 
      get: function() { 
        return expandMemberLookupExpression; 
      }, 
      enumerable: true 
    }, 
    expandMemberExpression: { 
      get: function() { 
        return expandMemberExpression; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_codegeneration_AtNameMemberTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createAssignmentExpression, createCallCall = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCallCall, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCallExpression, createCommaExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCommaExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createMemberExpression, createParenExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createParenExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$expandMemberExpression = $src_codegeneration_OperatorExpander_js, expandMemberExpression = destructuring$expandMemberExpression.expandMemberExpression; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var AtNameExpression = trees.AtNameExpression; 
  var DELETE_PROPERTY = PredefinedName.DELETE_PROPERTY; 
  var GET_PROPERTY = PredefinedName.GET_PROPERTY; 
  var RUNTIME = PredefinedName.RUNTIME; 
  var SET_PROPERTY = PredefinedName.SET_PROPERTY; 
  var TRACEUR = PredefinedName.TRACEUR; 
  function AtNameMemberTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
  } 
  AtNameMemberTransformer.transformTree = function(identifierGenerator, tree) { 
    return new AtNameMemberTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var base = TempVarTransformer.prototype; 
  AtNameMemberTransformer.prototype = createObject(base, { 
    transformBinaryOperator: function(tree) { 
      if(tree.left.type === ParseTreeType.MEMBER_EXPRESSION && tree.left.memberName.type === TokenType.AT_NAME && tree.operator.isAssignmentOperator()) { 
        if(tree.operator.type !== TokenType.EQUAL) { 
          tree = expandMemberExpression(tree, this); 
          return this.transformAny(tree); 
        } 
        var operand = this.transformAny(tree.left.operand); 
        var memberName = tree.left.memberName; 
        var atNameExpression = new AtNameExpression(memberName.location, memberName); 
        var value = this.transformAny(tree.right); 
        return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, SET_PROPERTY), createArgumentList(operand, atNameExpression, value)); 
      } 
      return base.transformBinaryOperator.call(this, tree); 
    }, 
    transformCallExpression: function(tree) { 
      if(tree.operand.type !== ParseTreeType.MEMBER_EXPRESSION || tree.operand.memberName.type !== TokenType.AT_NAME) return base.transformCallExpression.call(this, tree); 
      var operand = this.transformAny(tree.operand.operand); 
      var memberName = tree.operand.memberName; 
      var ident = createIdentifierExpression(this.addTempVar()); 
      var elements = tree.args.args.map(this.transformAny, this); 
      var atNameExpression = new AtNameExpression(memberName.location, memberName); 
      var callExpr = createCallCall(createCallExpression(createMemberExpression(TRACEUR, RUNTIME, GET_PROPERTY), createArgumentList(ident, atNameExpression)), ident, elements); 
      var expressions =[createAssignmentExpression(ident, operand), callExpr]; 
      return createParenExpression(createCommaExpression(expressions)); 
    }, 
    transformMemberExpression: function(tree) { 
      if(tree.memberName.type !== TokenType.AT_NAME) return base.transformMemberExpression.call(this, tree); 
      var atNameExpression = new AtNameExpression(tree.memberName.location, tree.memberName); 
      return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, GET_PROPERTY), createArgumentList(tree.operand, atNameExpression)); 
    }, 
    transformUnaryExpression: function(tree) { 
      if(tree.operator.type !== TokenType.DELETE || tree.operand.type !== ParseTreeType.MEMBER_EXPRESSION || tree.operand.memberName.type !== TokenType.AT_NAME) { 
        return base.transformUnaryExpression.call(this, tree); 
      } 
      var operand = this.transformAny(tree.operand.operand); 
      var memberName = tree.operand.memberName; 
      var atNameExpression = new AtNameExpression(memberName.location, memberName); 
      return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, DELETE_PROPERTY), createArgumentList(operand, atNameExpression)); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { AtNameMemberTransformer: { 
      get: function() { 
        return AtNameMemberTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_BlockBindingTransformer_js =(function() { 
  "use strict"; 
  var destructuring$AlphaRenamer = $src_codegeneration_AlphaRenamer_js, AlphaRenamer = destructuring$AlphaRenamer.AlphaRenamer; 
  var destructuring$NullTree = $src_syntax_trees_NullTree_js, NullTree = destructuring$NullTree.NullTree; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createAssignmentExpression = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createAssignmentExpression, createBindingIdentifier = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBindingIdentifier, createBlock = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBlock, createCatch = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCatch, createEmptyStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createEmptyStatement, createExpressionStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createExpressionStatement, createFinally = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createFinally, createForInStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createForInStatement, createForStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createForStatement, createFunctionDeclaration = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createFunctionDeclaration, createGetAccessor = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createGetAccessor, createIdentifierExpression = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createIdentifierToken = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierToken, createSetAccessor = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createSetAccessor, createThrowStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createThrowStatement, createTryStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createTryStatement, createUndefinedExpression = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createUndefinedExpression, createVariableDeclaration = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createAssignmentExpression$createBindingIdentifier$createBlock$createCatch$createEmptyStatement$createExpressionStatement$createFinally$createForInStatement$createForStatement$createFunctionDeclaration$createGetAccessor$createIdentifierExpression$createIdentifierToken$createSetAccessor$createThrowStatement$createTryStatement$createUndefinedExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var Block = trees.Block; 
  var ClassDeclaration = trees.ClassDeclaration; 
  var ForInStatement = trees.ForInStatement; 
  var ForStatement = trees.ForStatement; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GetAccessor = trees.GetAccessor; 
  var Program = trees.Program; 
  var SetAccessor = trees.SetAccessor; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableDeclaration = trees.VariableDeclaration; 
  var VariableStatement = trees.VariableStatement; 
  var CONST = TokenType.CONST; 
  var LET = TokenType.LET; 
  var VAR = TokenType.VAR; 
  function BlockBindingTransformer(stateAllocator) { 
    ParseTreeTransformer.call(this); 
  } 
  BlockBindingTransformer.transformTree = function(tree) { 
    return new BlockBindingTransformer().transformAny(tree); 
  }; 
  var ScopeType = { 
    PROGRAM: 'PROGRAM', 
    FUNCTION: 'FUNCTION', 
    BLOCK: 'BLOCK' 
  }; 
  function Scope(parent, type) { 
    this.parent = parent; 
    this.type = type; 
  } 
  Scope.prototype = { 
    blockVariables: null, 
    addBlockScopedVariable: function(value) { 
      if(! this.blockVariables) { 
        this.blockVariables = Object.create(null); 
      } 
      this.blockVariables[value]= true; 
    } 
  }; 
  function Rename(oldName, newName) { 
    this.oldName = oldName; 
    this.newName = newName; 
  } 
  function renameAll(renames, tree) { 
    renames.forEach((function(rename) { 
      tree = AlphaRenamer.rename(tree, rename.oldName, rename.newName); 
    })); 
    return tree; 
  } 
  function toBlock(statement) { 
    return statement.type == ParseTreeType.BLOCK ? statement: createBlock(statement); 
  } 
  var proto = ParseTreeTransformer.prototype; 
  BlockBindingTransformer.prototype = createObject(proto, { 
    scope_: null, 
    createProgramScope_: function() { 
      return new Scope(this.scope__, ScopeType.PROGRAM); 
    }, 
    createFunctionScope_: function() { 
      if(this.scope_ == null) { 
        throw new Error('Top level function scope found.'); 
      } 
      return new Scope(this.scope_, ScopeType.FUNCTION); 
    }, 
    createBlockScope_: function() { 
      if(this.scope_ == null) { 
        throw new Error('Top level block scope found.'); 
      } 
      return new Scope(this.scope_, ScopeType.BLOCK); 
    }, 
    push_: function(scope) { 
      this.scope_ = scope; 
      return scope; 
    }, 
    pop_: function(scope) { 
      if(this.scope_ != scope) { 
        throw new Error('BlockBindingTransformer scope mismatch'); 
      } 
      this.scope_ = scope.parent; 
    }, 
    transformBlock: function(tree) { 
      var scope = this.push_(this.createBlockScope_()); 
      var statements = tree.statements.map((function(statement) { 
        switch(statement.type) { 
          case ParseTreeType.FUNCTION_DECLARATION: 
            return this.transformFunctionDeclarationStatement_(statement); 

          default: 
            return this.transformAny(statement); 

        } 
      }).bind(this)); 
      if(scope.blockVariables != null) { 
        tree = toBlock(this.rewriteAsCatch_(scope.blockVariables, createBlock(statements))); 
      } else if(statements != tree.statements) { 
        tree = createBlock(statements); 
      } 
      this.pop_(scope); 
      return tree; 
    }, 
    rewriteAsCatch_: function(blockVariables, statement) { 
      for(var variable in blockVariables) { 
        statement = createTryStatement(createBlock(createThrowStatement(createUndefinedExpression())), createCatch(createBindingIdentifier(variable), toBlock(statement)), null); 
      } 
      return statement; 
    }, 
    transformClassDeclaration: function(tree) { 
      throw new Error('ClassDeclaration should be transformed away.'); 
    }, 
    transformForInStatement: function(tree) { 
      var treeBody = tree.body; 
      var initializer; 
      if(tree.initializer != null && tree.initializer.type == ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        var variables = tree.initializer; 
        if(variables.declarations.length != 1) { 
          throw new Error('for .. in has != 1 variables'); 
        } 
        var variable = variables.declarations[0]; 
        var variableName = this.getVariableName_(variable); 
        switch(variables.declarationType) { 
          case LET: 
          case CONST: 
            { 
              if(variable.initializer != null) { 
                throw new Error('const/let in for-in may not have an initializer'); 
              } 
              initializer = createVariableDeclarationList(TokenType.VAR, '$' + variableName, null); 
              treeBody = this.prependToBlock_(createVariableStatement(TokenType.LET, variableName, createIdentifierExpression('$' + variableName)), treeBody); 
              break; 
            } 

          case VAR: 
            initializer = this.transformVariables_(variables); 
            break; 

          default: 
            throw new Error('Unreachable.'); 

        } 
      } else { 
        initializer = this.transformAny(tree.initializer); 
      } 
      var result = tree; 
      var collection = this.transformAny(tree.collection); 
      var body = this.transformAny(treeBody); 
      if(initializer != tree.initializer || collection != tree.collection || body != tree.body) { 
        result = createForInStatement(initializer, collection, body); 
      } 
      return result; 
    }, 
    prependToBlock_: function(statement, body) { 
      if(body.type == ParseTreeType.BLOCK) { 
        var block = body; 
        var list =[]; 
        list.push(statement); 
        list.push.apply(list, block.statements); 
        return createBlock(list); 
      } else { 
        return createBlock(statement, body); 
      } 
    }, 
    transformForStatement: function(tree) { 
      var initializer; 
      if(tree.initializer != null && tree.initializer.type == ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        var variables = tree.initializer; 
        switch(variables.declarationType) { 
          case LET: 
          case CONST: 
            return this.transformForLet_(tree, variables); 

          case VAR: 
            initializer = this.transformVariables_(variables); 
            break; 

          default: 
            throw new Error('Reached unreachable.'); 

        } 
      } else { 
        initializer = this.transformAny(tree.initializer); 
      } 
      var condition = this.transformAny(tree.condition); 
      var increment = this.transformAny(tree.increment); 
      var body = this.transformAny(tree.body); 
      var result = tree; 
      if(initializer != tree.initializer || condition != tree.condition || increment != tree.increment || body != tree.body) { 
        result = createForStatement(initializer, condition, increment, body); 
      } 
      return result; 
    }, 
    transformForLet_: function(tree, variables) { 
      var copyFwd =[]; 
      var copyBak =[]; 
      var hoisted =[]; 
      var renames =[]; 
      variables.declarations.forEach((function(variable) { 
        var variableName = this.getVariableName_(variable); 
        var hoistedName = '$' + variableName; 
        var initializer = renameAll(renames, variable.initializer); 
        hoisted.push(createVariableDeclaration(hoistedName, initializer)); 
        copyFwd.push(createVariableDeclaration(variableName, createIdentifierExpression(hoistedName))); 
        copyBak.push(createExpressionStatement(createAssignmentExpression(createIdentifierExpression(hoistedName), createIdentifierExpression(variableName)))); 
        renames.push(new Rename(variableName, hoistedName)); 
      }).bind(this)); 
      var condition = renameAll(renames, tree.condition); 
      var increment = renameAll(renames, tree.increment); 
      var transformedForLoop = createBlock(createVariableStatement(createVariableDeclarationList(TokenType.LET, hoisted)), createForStatement(new NullTree(), condition, increment, createBlock(createVariableStatement(createVariableDeclarationList(TokenType.LET, copyFwd)), createTryStatement(tree.body, new NullTree(), createFinally(createBlock(copyBak)))))); 
      return this.transformAny(transformedForLoop); 
    }, 
    transformFunctionDeclarationStatement_: function(tree) { 
      var body = this.transformFunctionBody(tree.functionBody); 
      if(tree.name != null && this.scope_.type == ScopeType.BLOCK) { 
        this.scope_.addBlockScopedVariable(tree.name.identifierToken.value); 
        return createExpressionStatement(createAssignmentExpression(createIdentifierExpression(tree.name.identifierToken), createFunctionDeclaration(tree.name, tree.formalParameterList, body))); 
      } else if(body != tree.functionBody) { 
        return createFunctionDeclaration(tree.name, tree.formalParameterList, body); 
      } else { 
        return tree; 
      } 
    }, 
    transformProgram: function(tree) { 
      var scope = this.push_(this.createProgramScope_()); 
      var result = proto.transformProgram.call(this, tree); 
      this.pop_(scope); 
      return result; 
    }, 
    transformVariableDeclaration: function(tree) { 
      throw new Error('Should never see variable declaration tree.'); 
    }, 
    transformVariableDeclarationList: function(tree) { 
      throw new Error('Should never see variable declaration list.'); 
    }, 
    transformVariableStatement: function(tree) { 
      if(this.scope_.type == ScopeType.BLOCK) { 
        switch(tree.declarations.declarationType) { 
          case CONST: 
          case LET: 
            return this.transformBlockVariables_(tree.declarations); 

          default: 
            break; 

        } 
      } 
      var variables = this.transformVariables_(tree.declarations); 
      if(variables != tree.declarations) { 
        tree = createVariableStatement(variables); 
      } 
      return tree; 
    }, 
    transformBlockVariables_: function(tree) { 
      var variables = tree.declarations; 
      var comma =[]; 
      variables.forEach((function(variable) { 
        switch(tree.declarationType) { 
          case LET: 
          case CONST: 
            break; 

          default: 
            throw new Error('Only let/const allowed here.'); 

        } 
        var variableName = this.getVariableName_(variable); 
        this.scope_.addBlockScopedVariable(variableName); 
        var initializer = this.transformAny(variable.initializer); 
        if(initializer != null) { 
          comma.push(createAssignmentExpression(createIdentifierExpression(variableName), initializer)); 
        } 
      }).bind(this)); 
      switch(comma.length) { 
        case 0: 
          return createEmptyStatement(); 

        case 1: 
          return createExpressionStatement(comma[0]); 

        default: 
          for(var i = 0; i < comma.length; i ++) { 
            comma[i]= createExpressionStatement(comma[i]); 
          } 
          return createBlock(comma); 

      } 
    }, 
    transformVariables_: function(tree) { 
      var variables = tree.declarations; 
      var transformed = null; 
      for(var index = 0; index < variables.length; index ++) { 
        var variable = variables[index]; 
        var variableName = this.getVariableName_(variable); 
        var initializer = this.transformAny(variable.initializer); 
        if(transformed != null || initializer != variable.initializer) { 
          if(transformed == null) { 
            transformed =[]; 
            transformed.push.apply(transformed, variables.slice(0, index)); 
          } 
          transformed.push(createVariableDeclaration(createIdentifierToken(variableName), initializer)); 
        } 
      } 
      if(transformed != null || tree.declarationType != TokenType.VAR) { 
        var declarations = transformed != null ? transformed: tree.declarations; 
        var declarationType = tree.declarationType != TokenType.VAR ? TokenType.VAR: tree.declarationType; 
        tree = createVariableDeclarationList(declarationType, declarations); 
      } 
      return tree; 
    }, 
    transformFunctionBody: function(body) { 
      var scope = this.push_(this.createFunctionScope_()); 
      body = this.transformBlockStatements_(body); 
      this.pop_(scope); 
      return body; 
    }, 
    transformBlockStatements_: function(tree) { 
      var statements = this.transformSourceElements(tree.statements); 
      if(this.scope_.blockVariables != null) { 
        tree = toBlock(this.rewriteAsCatch_(this.scope_.blockVariables, createBlock(statements))); 
      } else if(statements != tree.statements) { 
        tree = createBlock(statements); 
      } 
      return tree; 
    }, 
    getVariableName_: function(variable) { 
      var lvalue = variable.lvalue; 
      if(lvalue.type == ParseTreeType.BINDING_IDENTIFIER) { 
        return lvalue.identifierToken.value; 
      } 
      throw new Error('Unexpected destructuring declaration found.'); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { BlockBindingTransformer: { 
      get: function() { 
        return BlockBindingTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_CascadeExpressionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression = $src_codegeneration_ParseTreeFactory_js, createAssignmentExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createAssignmentExpression, createBinaryOperator = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createBinaryOperator, createCallExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createCallExpression, createCascadeExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createCascadeExpression, createCommaExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createCommaExpression, createIdentifierExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createIdentifierExpression, createMemberExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createMemberExpression, createMemberLookupExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createMemberLookupExpression, createParenExpression = destructuring$createAssignmentExpression$createBinaryOperator$createCallExpression$createCascadeExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createParenExpression.createParenExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var BinaryOperator = trees.BinaryOperator; 
  function prependMemberExpression(name, rest) { 
    switch(rest.type) { 
      case ParseTreeType.MEMBER_EXPRESSION: 
        return createMemberExpression(prependMemberExpression(name, rest.operand), rest.memberName); 

      case ParseTreeType.MEMBER_LOOKUP_EXPRESSION: 
        return createMemberLookupExpression(prependMemberExpression(name, rest.operand), rest.memberExpression); 

      case ParseTreeType.IDENTIFIER_EXPRESSION: 
        return createMemberExpression(name, rest.identifierToken); 

      case ParseTreeType.CALL_EXPRESSION: 
        return createCallExpression(prependMemberExpression(name, rest.operand), rest.args); 

      case ParseTreeType.CASCADE_EXPRESSION: 
        return createCascadeExpression(prependMemberExpression(name, rest.operand), rest.expressions); 

      default: 
        throw Error('Not reachable'); 

    } 
  } 
  function CascadeExpressionTransformer(identifierGenerator, reporter) { 
    TempVarTransformer.call(this, identifierGenerator); 
    this.reporter_ = reporter; 
  } 
  CascadeExpressionTransformer.transformTree = function(identifierGenerator, reporter, tree) { 
    return new CascadeExpressionTransformer(identifierGenerator, reporter).transformAny(tree); 
  }; 
  var proto = TempVarTransformer.prototype; 
  CascadeExpressionTransformer.prototype = createObject(proto, { 
    transformCascadeExpression: function(tree) { 
      var operand = this.transformAny(tree.operand); 
      var ident = createIdentifierExpression(this.addTempVar()); 
      var expressions = this.transformList(tree.expressions.map(this.desugarExpression_.bind(this, ident))); 
      expressions.unshift(createAssignmentExpression(ident, operand)); 
      expressions.push(ident); 
      return createParenExpression(createCommaExpression(expressions)); 
    }, 
    desugarExpression_: function(ident, tree) { 
      switch(tree.type) { 
        case ParseTreeType.BINARY_OPERATOR: 
          return this.desugarBinaryExpression_(ident, tree); 

        case ParseTreeType.CALL_EXPRESSION: 
          return this.desugarCallExpression_(ident, tree); 

        case ParseTreeType.CASCADE_EXPRESSION: 
          return this.desugarCascadeExpression_(ident, tree); 

        default: 
          this.reporter_.reportError(tree.location.start, 'Unsupported expression type in cascade: %s', tree.type); 

      } 
    }, 
    desugarBinaryExpression_: function(ident, tree) { 
      return createBinaryOperator(prependMemberExpression(ident, tree.left), tree.operator, tree.right); 
    }, 
    desugarCallExpression_: function(ident, tree) { 
      var newOperand = prependMemberExpression(ident, tree.operand); 
      return createCallExpression(newOperand, tree.args); 
    }, 
    desugarCascadeExpression_: function(ident, tree) { 
      var newOperand = prependMemberExpression(ident, tree.operand); 
      return createCascadeExpression(newOperand, tree.expressions); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { CascadeExpressionTransformer: { 
      get: function() { 
        return CascadeExpressionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_SuperTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createArgumentList, createArrayLiteralExpression = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createArrayLiteralExpression, createCallExpression = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createCallExpression, createMemberExpression = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createMemberExpression, createStringLiteral = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createStringLiteral, createThisExpression = destructuring$createArgumentList$createArrayLiteralExpression$createCallExpression$createMemberExpression$createStringLiteral$createThisExpression.createThisExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$expandMemberExpression$expandMemberLookupExpression = $src_codegeneration_OperatorExpander_js, expandMemberExpression = destructuring$expandMemberExpression$expandMemberLookupExpression.expandMemberExpression, expandMemberLookupExpression = destructuring$expandMemberExpression$expandMemberLookupExpression.expandMemberLookupExpression; 
  function SuperTransformer(tempVarTransformer, reporter, className, methodTree) { 
    ParseTreeTransformer.call(this); 
    this.tempVarTransformer_ = tempVarTransformer; 
    this.className_ = className; 
    this.method_ = methodTree; 
    this.reporter_ = reporter; 
  } 
  var proto = ParseTreeTransformer.prototype; 
  SuperTransformer.prototype = createObject(proto, { 
    superFound_: false, 
    get hasSuper() { 
      return this.superFound_; 
    }, 
    transformFunctionDeclaration: function(tree) { 
      return tree; 
    }, 
    transformGetAccessor: function(tree) { 
      return tree; 
    }, 
    transformSetAccessor: function(tree) { 
      return tree; 
    }, 
    transformPropertyMethodAssignMent: function(tree) { 
      return tree; 
    }, 
    transformCallExpression: function(tree) { 
      if(this.method_ && tree.operand.type == ParseTreeType.SUPER_EXPRESSION) { 
        this.superFound_ = true; 
        var methodName = this.method_.name.value; 
        return createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.SUPER_CALL), createArgumentList(createThisExpression(), this.className_, createStringLiteral(methodName), createArrayLiteralExpression(tree.args.args))); 
      } 
      if((tree.operand.type == ParseTreeType.MEMBER_EXPRESSION || tree.operand.type == ParseTreeType.MEMBER_LOOKUP_EXPRESSION) && tree.operand.operand.type == ParseTreeType.SUPER_EXPRESSION) { 
        this.superFound_ = true; 
        var nameExpression; 
        if(tree.operand.type == ParseTreeType.MEMBER_EXPRESSION) { 
          nameExpression = createStringLiteral(tree.operand.memberName.value); 
        } else { 
          nameExpression = tree.operand.memberExpression; 
        } 
        return createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.SUPER_CALL), createArgumentList(createThisExpression(), this.className_, nameExpression, createArrayLiteralExpression(tree.args.args))); 
      } 
      return proto.transformCallExpression.call(this, tree); 
    }, 
    transformMemberShared_: function(tree, name) { 
      return createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.SUPER_GET), createArgumentList(createThisExpression(), this.className_, name)); 
    }, 
    transformMemberExpression: function(tree) { 
      if(tree.operand.type === ParseTreeType.SUPER_EXPRESSION) { 
        return this.transformMemberShared_(tree, createStringLiteral(tree.memberName.value)); 
      } 
      return proto.transformMemberExpression.call(this, tree); 
    }, 
    transformMemberLookupExpression: function(tree) { 
      if(tree.operand.type === ParseTreeType.SUPER_EXPRESSION) return this.transformMemberShared_(tree, tree.memberExpression); 
      return proto.transformMemberLookupExpression.call(this, tree); 
    }, 
    transformBinaryOperator: function(tree) { 
      if(tree.operator.isAssignmentOperator() &&(tree.left.type === ParseTreeType.MEMBER_EXPRESSION || tree.left.type === ParseTreeType.MEMBER_LOOKUP_EXPRESSION) && tree.left.operand.type === ParseTreeType.SUPER_EXPRESSION) { 
        if(tree.operator.type !== TokenType.EQUAL) { 
          if(tree.left.type === ParseTreeType.MEMBER_LOOKUP_EXPRESSION) { 
            tree = expandMemberLookupExpression(tree, this.tempVarTransformer_); 
          } else { 
            tree = expandMemberExpression(tree, this.tempVarTransformer_); 
          } 
          return this.transformAny(tree); 
        } 
        this.superFound_ = true; 
        var name = tree.left.type === ParseTreeType.MEMBER_LOOKUP_EXPRESSION ? tree.left.memberExpression: createStringLiteral(tree.left.memberName.value); 
        return createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.SUPER_SET), createArgumentList(createThisExpression(), this.className_, name, this.transformAny(tree.right))); 
      } 
      return proto.transformBinaryOperator.call(this, tree); 
    }, 
    transformSuperExpression: function(tree) { 
      this.reportError_(tree, '"super" may only be used on the LHS of a member access expression before a call (TODO wording)'); 
      return tree; 
    }, 
    reportError_: function(tree, format, var_args) { 
      var args = Array.prototype.slice.call(arguments); 
      args[0]= tree.location.start; 
      this.reporter_.reportError.apply(this.reporter_, args); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { SuperTransformer: { 
      get: function() { 
        return SuperTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ClassTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$SuperTransformer = $src_codegeneration_SuperTransformer_js, SuperTransformer = destructuring$SuperTransformer.SuperTransformer; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createAssignmentExpression, createBlock = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createBlock, createBooleanLiteral = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createBooleanLiteral, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createCallExpression, createExpressionStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createExpressionStatement, createFunctionExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createFunctionExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createIdentifierExpression, createIdentifierToken = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createIdentifierToken, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createMemberExpression, createNullLiteral = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createNullLiteral, createObjectLiteralExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createObjectLiteralExpression, createParenExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createParenExpression, createPropertyNameAssignment = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createPropertyNameAssignment, createRestParameter = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createRestParameter, createSpreadExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createSpreadExpression, createVariableStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createBooleanLiteral$createCallExpression$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createMemberExpression$createNullLiteral$createObjectLiteralExpression$createParenExpression$createPropertyNameAssignment$createRestParameter$createSpreadExpression$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$transformOptions = $src_options_js, transformOptions = destructuring$transformOptions.transformOptions; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GetAccessor = trees.GetAccessor; 
  var PropertyMethodAssignment = trees.PropertyMethodAssignment; 
  var PropertyNameAssignment = trees.PropertyNameAssignment; 
  var SetAccessor = trees.SetAccessor; 
  var SuperExpression = trees.SuperExpression; 
  var stack =[]; 
  function State(classTree) { 
    this.tree = classTree; 
    this.name = null; 
    this.hasSuper = false; 
  } 
  function peekState() { 
    return stack[stack.length - 1]; 
  } 
  function ClassTransformer(identifierGenerator, reporter) { 
    TempVarTransformer.call(this, identifierGenerator); 
    this.reporter_ = reporter; 
  } 
  ClassTransformer.transform = function(identifierGenerator, reporter, tree) { 
    return new ClassTransformer(identifierGenerator, reporter).transformAny(tree); 
  }; 
  var proto = TempVarTransformer.prototype; 
  ClassTransformer.prototype = createObject(proto, { 
    transformClassShared_: function(tree, name) { 
      var superClass = this.transformAny(tree.superClass); 
      var state = new State(tree); 
      stack.push(state); 
      state.name = createIdentifierExpression(name); 
      var constructor; 
      var elements = tree.elements.map((function(tree) { 
        switch(tree.type) { 
          case ParseTreeType.GET_ACCESSOR: 
            return this.transformGetAccessor_(tree); 

          case ParseTreeType.SET_ACCESSOR: 
            return this.transformSetAccessor_(tree); 

          case ParseTreeType.PROPERTY_METHOD_ASSIGNMENT: 
            if(tree.name.value === PredefinedName.CONSTRUCTOR) return constructor = this.transformConstructor_(tree); 
            return this.transformPropertyMethodAssignment_(tree); 

          default: 
            throw new Error('Unexpected class element: ' + tree.type); 

        } 
      }).bind(this)); 
      if(! constructor) elements.push(this.getDefaultConstructor_(tree)); 
      stack.pop(); 
      var hasConstructor = ! ! constructor; 
      var hasExtendsExpression = ! ! superClass; 
      return[createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.CREATE_CLASS), createArgumentList(createObjectLiteralExpression(elements), superClass || createNullLiteral(), createBooleanLiteral(hasConstructor), createBooleanLiteral(hasExtendsExpression))), state.hasSuper]; 
    }, 
    transformClassDeclaration: function(tree) { 
      return createVariableStatement(transformOptions.blockBinding ? TokenType.LET: TokenType.VAR, tree.name, this.transformClassShared_(tree, tree.name.identifierToken)[0]); 
    }, 
    transformClassExpression: function(tree) { 
      var tempIdent = this.addTempVar(); 
      var transformResult = this.transformClassShared_(tree, tempIdent); 
      var classTree = transformResult[0]; 
      var hasSuper = transformResult[1]; 
      if(hasSuper) { 
        return createParenExpression(createAssignmentExpression(createIdentifierExpression(tempIdent), classTree)); 
      } 
      this.removeTempVar(tempIdent); 
      return classTree; 
    }, 
    transformPropertyMethodAssignment_: function(tree) { 
      var formalParameterList = this.transformAny(tree.formalParameterList); 
      var functionBody = this.transformSuperInBlock_(tree, tree.functionBody); 
      if(formalParameterList === tree.formalParameterList && functionBody === tree.functionBody) { 
        return tree; 
      } 
      return new PropertyMethodAssignment(tree.location, tree.name, tree.isGenerator, formalParameterList, functionBody); 
    }, 
    transformGetAccessor_: function(tree) { 
      var body = this.transformSuperInBlock_(tree, tree.body); 
      if(body === tree.body) return tree; 
      return new GetAccessor(tree.location, tree.propertyName, body); 
    }, 
    transformSetAccessor_: function(tree) { 
      var parameter = this.transformAny(tree.parameter); 
      var body = this.transformSuperInBlock_(tree, tree.body); 
      if(body === tree.body) return tree; 
      return new SetAccessor(tree.location, tree.propertyName, parameter, body); 
    }, 
    transformConstructor_: function(tree) { 
      var state = peekState(); 
      var parameters = this.transformAny(tree.formalParameterList); 
      var functionBody = this.transformSuperInBlock_(tree, tree.functionBody); 
      var func = createFunctionExpression(parameters, functionBody); 
      return createPropertyNameAssignment(PredefinedName.CONSTRUCTOR, func); 
    }, 
    transformSuperInBlock_: function(methodTree, tree) { 
      var state = peekState(); 
      var className = state.name; 
      var superTransformer = new SuperTransformer(this, this.reporter_, className, methodTree); 
      var transformedTree = superTransformer.transformAny(proto.transformAny.call(this, tree)); 
      if(superTransformer.hasSuper) state.hasSuper = true; 
      return transformedTree; 
    }, 
    getDefaultConstructor_: function(tree) { 
      var restParam = createRestParameter('args'); 
      var params = new FormalParameterList(null,[restParam]); 
      var body = createBlock(createExpressionStatement(createCallExpression(new SuperExpression(null), createArgumentList(createSpreadExpression(createIdentifierExpression('args')))))); 
      var constr = new PropertyMethodAssignment(null, createIdentifierToken(PredefinedName.CONSTRUCTOR), false, params, body); 
      return this.transformConstructor_(constr); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ClassTransformer: { 
      get: function() { 
        return ClassTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_CollectionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createAssignmentExpression, createCallCall = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCallCall, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCallExpression, createCommaExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createCommaExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createMemberExpression, createParenExpression = destructuring$createArgumentList$createAssignmentExpression$createCallCall$createCallExpression$createCommaExpression$createIdentifierExpression$createMemberExpression$createParenExpression.createParenExpression; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$expandMemberLookupExpression = $src_codegeneration_OperatorExpander_js, expandMemberLookupExpression = destructuring$expandMemberLookupExpression.expandMemberLookupExpression; 
  var RUNTIME = PredefinedName.RUNTIME; 
  var TRACEUR = PredefinedName.TRACEUR; 
  var ELEMENT_DELETE = PredefinedName.ELEMENT_DELETE; 
  var ELEMENT_GET = PredefinedName.ELEMENT_GET; 
  var ELEMENT_HAS = PredefinedName.ELEMENT_HAS; 
  var ELEMENT_SET = PredefinedName.ELEMENT_SET; 
  function CollectionTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
  } 
  CollectionTransformer.transformTree = function(identifierGenerator, tree) { 
    return new CollectionTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var proto = TempVarTransformer.prototype; 
  CollectionTransformer.prototype = createObject(proto, { 
    transformBinaryOperator: function(tree) { 
      if(tree.operator.type === TokenType.IN) { 
        var name = this.transformAny(tree.left); 
        var object = this.transformAny(tree.right); 
        return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, ELEMENT_HAS), createArgumentList(object, name)); 
      } 
      if(tree.left.type === ParseTreeType.MEMBER_LOOKUP_EXPRESSION && tree.operator.isAssignmentOperator()) { 
        if(tree.operator.type !== TokenType.EQUAL) { 
          tree = expandMemberLookupExpression(tree, this); 
          return this.transformAny(tree); 
        } 
        var operand = this.transformAny(tree.left.operand); 
        var memberExpression = this.transformAny(tree.left.memberExpression); 
        var value = this.transformAny(tree.right); 
        return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, ELEMENT_SET), createArgumentList(operand, memberExpression, value)); 
      } 
      return proto.transformBinaryOperator.call(this, tree); 
    }, 
    transformCallExpression: function(tree) { 
      if(tree.operand.type !== ParseTreeType.MEMBER_LOOKUP_EXPRESSION) return proto.transformCallExpression.call(this, tree); 
      var operand = this.transformAny(tree.operand.operand); 
      var memberExpression = this.transformAny(tree.operand.memberExpression); 
      var ident = createIdentifierExpression(this.addTempVar()); 
      var elements = tree.args.args.map(this.transformAny, this); 
      var callExpr = createCallCall(createCallExpression(createMemberExpression(TRACEUR, RUNTIME, ELEMENT_GET), createArgumentList(ident, memberExpression)), ident, elements); 
      var expressions =[createAssignmentExpression(ident, operand), callExpr]; 
      return createParenExpression(createCommaExpression(expressions)); 
    }, 
    transformMemberLookupExpression: function(tree) { 
      return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, ELEMENT_GET), createArgumentList(tree.operand, tree.memberExpression)); 
    }, 
    transformUnaryExpression: function(tree) { 
      if(tree.operator.type !== TokenType.DELETE || tree.operand.type !== ParseTreeType.MEMBER_LOOKUP_EXPRESSION) { 
        return proto.transformUnaryExpression.call(this, tree); 
      } 
      var operand = this.transformAny(tree.operand.operand); 
      var memberExpression = this.transformAny(tree.operand.memberExpression); 
      return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, ELEMENT_DELETE), createArgumentList(operand, memberExpression)); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { CollectionTransformer: { 
      get: function() { 
        return CollectionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_DefaultParametersTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0 = $src_codegeneration_ParseTreeFactory_js, createBinaryOperator = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createBinaryOperator, createBlock = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createBlock, createConditionalExpression = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createConditionalExpression, createIdentifierExpression = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createIdentifierExpression, createMemberExpression = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createMemberExpression, createMemberLookupExpression = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createMemberLookupExpression, createNumberLiteral = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createNumberLiteral, createOperatorToken = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createOperatorToken, createVariableStatement = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createVariableStatement, createVoid0 = destructuring$createBinaryOperator$createBlock$createConditionalExpression$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createVariableStatement$createVoid0.createVoid0; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var stack =[]; 
  function DefaultParametersTransformer() { 
    ParseTreeTransformer.call(this); 
  } 
  DefaultParametersTransformer.transformTree = function(tree) { 
    return new DefaultParametersTransformer().transformAny(tree); 
  }; 
  DefaultParametersTransformer.prototype = createObject(ParseTreeTransformer.prototype, { 
    transformFunctionDeclaration: function(tree) { 
      stack.push([]); 
      var transformedTree = ParseTreeTransformer.prototype.transformFunctionDeclaration.call(this, tree); 
      var statements = stack.pop(); 
      if(! statements.length) return transformedTree; 
      statements.push.apply(statements, transformedTree.functionBody.statements); 
      return new FunctionDeclaration(transformedTree.location, transformedTree.name, transformedTree.isGenerator, transformedTree.formalParameterList, createBlock(statements)); 
    }, 
    transformFormalParameterList: function(tree) { 
      var parameters =[]; 
      var statements = stack[stack.length - 1]; 
      var changed = false; 
      var defaultToUndefined = false; 
      for(var i = 0; i < tree.parameters.length; i ++) { 
        var param = this.transformAny(tree.parameters[i]); 
        if(param !== tree.parameters[i]) changed = true; 
        if(param.type === ParseTreeType.REST_PARAMETER || ! param.initializer && ! defaultToUndefined) { 
          parameters.push(param); 
        } else { 
          defaultToUndefined = true; 
          changed = true; 
          statements.push(createVariableStatement(TokenType.VAR, param.binding, createConditionalExpression(createBinaryOperator(createMemberLookupExpression(createIdentifierExpression(PredefinedName.ARGUMENTS), createNumberLiteral(i)), createOperatorToken(TokenType.NOT_EQUAL_EQUAL), createVoid0()), createMemberLookupExpression(createIdentifierExpression(PredefinedName.ARGUMENTS), createNumberLiteral(i)), param.initializer || createVoid0()))); 
        } 
      } 
      if(! changed) return tree; 
      return new FormalParameterList(tree.location, parameters); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { DefaultParametersTransformer: { 
      get: function() { 
        return DefaultParametersTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_DestructuringTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createAssignmentExpression, createBinaryOperator = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBinaryOperator, createBindingIdentifier = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBindingIdentifier, createBlock = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBlock, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCallExpression, createCommaExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCommaExpression, createConditionalExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createConditionalExpression, createExpressionStatement = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createExpressionStatement, createIdentifierExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createMemberExpression, createMemberLookupExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createMemberLookupExpression, createNumberLiteral = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createNumberLiteral, createOperatorToken = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createOperatorToken, createParenExpression = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createParenExpression, createStringLiteral = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createStringLiteral, createVariableDeclaration = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createArgumentList$createAssignmentExpression$createBinaryOperator$createBindingIdentifier$createBlock$createCallExpression$createCommaExpression$createConditionalExpression$createExpressionStatement$createIdentifierExpression$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createStringLiteral$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var BindingElement = trees.BindingElement; 
  var BindingIdentifier = trees.BindingIdentifier; 
  var Catch = trees.Catch; 
  var ForInStatement = trees.ForInStatement; 
  var ForOfStatement = trees.ForOfStatement; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var LiteralExpression = trees.LiteralExpression; 
  var SetAccessor = trees.SetAccessor; 
  var VariableDeclaration = trees.VariableDeclaration; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var stack =[]; 
  function Desugaring(rvalue) { 
    this.rvalue = rvalue; 
  } 
  function AssignmentExpressionDesugaring(rvalue) { 
    Desugaring.call(this, rvalue); 
    this.expressions =[]; 
  } 
  AssignmentExpressionDesugaring.prototype = createObject(Desugaring.prototype, { assign: function(lvalue, rvalue) { 
      this.expressions.push(createAssignmentExpression(lvalue, rvalue)); 
    } }); 
  function VariableDeclarationDesugaring(rvalue) { 
    Desugaring.call(this, rvalue); 
    this.declarations =[]; 
  } 
  VariableDeclarationDesugaring.prototype = createObject(Desugaring.prototype, { assign: function(lvalue, rvalue) { 
      if(lvalue.type === ParseTreeType.BINDING_ELEMENT) { 
        this.declarations.push(createVariableDeclaration(lvalue.binding, rvalue)); 
        return; 
      } 
      if(lvalue.type == ParseTreeType.IDENTIFIER_EXPRESSION) lvalue = createBindingIdentifier(lvalue); 
      this.declarations.push(createVariableDeclaration(lvalue, rvalue)); 
    } }); 
  function createConditionalMemberExpression(rvalue, identToken, initializer) { 
    if(identToken.type !== TokenType.IDENTIFIER) { 
      return createConditionalMemberLookupExpression(rvalue, new LiteralExpression(null, identToken), initializer); 
    } 
    if(! initializer) return createMemberExpression(rvalue, identToken); 
    return createConditionalExpression(createBinaryOperator(createStringLiteral(identToken.value), createOperatorToken(TokenType.IN), rvalue), createMemberExpression(rvalue, identToken), initializer); 
  } 
  function createConditionalMemberLookupExpression(rvalue, index, initializer) { 
    if(! initializer) return createMemberLookupExpression(rvalue, index); 
    return createConditionalExpression(createBinaryOperator(index, createOperatorToken(TokenType.IN), rvalue), createMemberLookupExpression(rvalue, index), initializer); 
  } 
  function DestructuringTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
  } 
  DestructuringTransformer.transformTree = function(identifierGenerator, tree) { 
    return new DestructuringTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var proto = TempVarTransformer.prototype; 
  DestructuringTransformer.prototype = createObject(proto, { 
    transformArrayPattern: function(tree) { 
      throw new Error('unreachable'); 
    }, 
    transformObjectPattern: function(tree) { 
      throw new Error('unreachable'); 
    }, 
    transformBinaryOperator: function(tree) { 
      if(tree.operator.type == TokenType.EQUAL && tree.left.isPattern()) { 
        return this.transformAny(this.desugarAssignment_(tree.left, tree.right)); 
      } else { 
        return proto.transformBinaryOperator.call(this, tree); 
      } 
    }, 
    desugarAssignment_: function(lvalue, rvalue) { 
      var tempIdent = createIdentifierExpression(this.addTempVar()); 
      var desugaring = new AssignmentExpressionDesugaring(tempIdent); 
      this.desugarPattern_(desugaring, lvalue); 
      desugaring.expressions.unshift(createAssignmentExpression(tempIdent, rvalue)); 
      desugaring.expressions.push(tempIdent); 
      return createParenExpression(createCommaExpression(desugaring.expressions)); 
    }, 
    transformVariableDeclarationList: function(tree) { 
      if(! this.destructuringInDeclaration_(tree)) { 
        return proto.transformVariableDeclarationList.call(this, tree); 
      } 
      var desugaredDeclarations =[]; 
      tree.declarations.forEach((function(declaration) { 
        if(declaration.lvalue.isPattern()) { 
          desugaredDeclarations.push.apply(desugaredDeclarations, this.desugarVariableDeclaration_(declaration)); 
        } else { 
          desugaredDeclarations.push(declaration); 
        } 
      }).bind(this)); 
      return this.transformVariableDeclarationList(createVariableDeclarationList(tree.declarationType, desugaredDeclarations)); 
    }, 
    transformForInStatement: function(tree) { 
      return this.transformForInOrOf_(tree, proto.transformForInStatement, ForInStatement); 
    }, 
    transformForOfStatement: function(tree) { 
      return this.transformForInOrOf_(tree, proto.transformForOfStatement, ForOfStatement); 
    }, 
    transformForInOrOf_: function(tree, superMethod, constr) { 
      if(! tree.initializer.isPattern() &&(tree.initializer.type !== ParseTreeType.VARIABLE_DECLARATION_LIST || ! this.destructuringInDeclaration_(tree.initializer))) { 
        return superMethod.call(this, tree); 
      } 
      var declarationType, lvalue; 
      if(tree.initializer.isPattern()) { 
        declarationType = null; 
        lvalue = tree.initializer; 
      } else { 
        declarationType = tree.initializer.declarationType; 
        lvalue = tree.initializer.declarations[0].lvalue; 
      } 
      var statements =[]; 
      var binding = this.desugarBinding_(lvalue, statements, declarationType); 
      var initializer = createVariableDeclarationList(TokenType.VAR, binding, null); 
      var collection = this.transformAny(tree.collection); 
      var body = this.transformAny(tree.body); 
      if(body.type !== ParseTreeType.BLOCK) body = createBlock(body); 
      statements.push.apply(statements, body.statements); 
      body = createBlock(statements); 
      return new constr(tree.location, initializer, collection, body); 
    }, 
    transformFunctionDeclaration: function(tree) { 
      stack.push([]); 
      var transformedTree = proto.transformFunctionDeclaration.call(this, tree); 
      var statements = stack.pop(); 
      if(! statements.length) return transformedTree; 
      statements.push.apply(statements, transformedTree.functionBody.statements); 
      return new FunctionDeclaration(transformedTree.location, transformedTree.name, transformedTree.isGenerator, transformedTree.formalParameterList, createBlock(statements)); 
    }, 
    transformSetAccessor: function(tree) { 
      stack.push([]); 
      var transformedTree = proto.transformSetAccessor.call(this, tree); 
      var statements = stack.pop(); 
      if(! statements.length) return transformedTree; 
      statements.push.apply(statements, transformedTree.body.statements); 
      return new SetAccessor(transformedTree.location, transformedTree.propertyName, transformedTree.parameter, createBlock(statements)); 
    }, 
    transformBindingElement: function(tree) { 
      if(! tree.binding.isPattern() || tree.initializer) return tree; 
      var statements = stack[stack.length - 1]; 
      var binding = this.desugarBinding_(tree.binding, statements, TokenType.VAR); 
      return new BindingElement(null, binding, null); 
    }, 
    transformCatch: function(tree) { 
      if(! tree.binding.isPattern()) return proto.transformCatch.call(this, tree); 
      var body = this.transformAny(tree.catchBody); 
      var statements =[]; 
      var binding = this.desugarBinding_(tree.binding, statements, TokenType.LET); 
      statements.push.apply(statements, body.statements); 
      return new Catch(tree.location, binding, createBlock(statements)); 
    }, 
    desugarBinding_: function(bindingTree, statements, declarationType) { 
      var varName = this.gensym_(bindingTree); 
      var binding = createBindingIdentifier(varName); 
      var idExpr = createIdentifierExpression(varName); 
      var desugaring; 
      if(declarationType === null) desugaring = new AssignmentExpressionDesugaring(idExpr); else desugaring = new VariableDeclarationDesugaring(idExpr); 
      this.desugarPattern_(desugaring, bindingTree); 
      if(declarationType === null) { 
        statements.push(createExpressionStatement(createCommaExpression(desugaring.expressions))); 
      } else { 
        statements.push(createVariableStatement(this.transformVariableDeclarationList(createVariableDeclarationList(declarationType, desugaring.declarations)))); 
      } 
      return binding; 
    }, 
    destructuringInDeclaration_: function(tree) { 
      return tree.declarations.some((function(declaration) { 
        return declaration.lvalue.isPattern(); 
      })); 
    }, 
    desugarVariableDeclaration_: function(tree) { 
      var desugaring = new VariableDeclarationDesugaring(createIdentifierExpression(this.gensym_(tree.lvalue))); 
      desugaring.assign(desugaring.rvalue, tree.initializer); 
      this.desugarPattern_(desugaring, tree.lvalue); 
      return desugaring.declarations; 
    }, 
    desugarPattern_: function(desugaring, tree) { 
      switch(tree.type) { 
        case ParseTreeType.ARRAY_PATTERN: 
          { 
            var pattern = tree; 
            for(var i = 0; i < pattern.elements.length; i ++) { 
              var lvalue = pattern.elements[i]; 
              if(lvalue === null) { 
                continue; 
              } else if(lvalue.isSpreadPatternElement()) { 
                desugaring.assign(lvalue.lvalue, createCallExpression(createMemberExpression(PredefinedName.ARRAY, PredefinedName.PROTOTYPE, PredefinedName.SLICE, PredefinedName.CALL), createArgumentList(desugaring.rvalue, createNumberLiteral(i)))); 
              } else { 
                desugaring.assign(lvalue, createConditionalMemberLookupExpression(desugaring.rvalue, createNumberLiteral(i), lvalue.initializer)); 
              } 
            } 
            break; 
          } 

        case ParseTreeType.OBJECT_PATTERN: 
          { 
            var pattern = tree; 
            pattern.fields.forEach((function(field) { 
              var lookup; 
              switch(field.type) { 
                case ParseTreeType.BINDING_ELEMENT: 
                  lookup = createConditionalMemberExpression(desugaring.rvalue, field.binding.identifierToken, field.initializer); 
                  desugaring.assign(createIdentifierExpression(field.binding), lookup); 
                  break; 

                case ParseTreeType.OBJECT_PATTERN_FIELD: 
                  lookup = createConditionalMemberExpression(desugaring.rvalue, field.identifier, field.element.initializer); 
                  desugaring.assign(field.element, lookup); 
                  break; 

                case ParseTreeType.IDENTIFIER_EXPRESSION: 
                  lookup = createMemberExpression(desugaring.rvalue, field.identifierToken); 
                  desugaring.assign(field, lookup); 
                  break; 

                default: 
                  throw Error('unreachable'); 

              } 
            })); 
            break; 
          } 

        case ParseTreeType.PAREN_EXPRESSION: 
          this.desugarPattern_(desugaring, tree.expression); 
          break; 

        default: 
          throw new Error('unreachable'); 

      } 
    }, 
    gensym_: function(tree) { 
      var ids = this.collectLvalueIdentifiers_(Object.create(null), tree); 
      ids = Object.keys(ids).sort(); 
      return 'destructuring$' + ids.join('$'); 
    }, 
    collectLvalueIdentifiers_: function(identifiers, tree) { 
      if(tree === null) return; 
      switch(tree.type) { 
        case ParseTreeType.BINDING_ELEMENT: 
          this.collectLvalueIdentifiers_(identifiers, tree.binding); 
          break; 

        case ParseTreeType.BINDING_IDENTIFIER: 
        case ParseTreeType.IDENTIFIER_EXPRESSION: 
          identifiers[tree.identifierToken.value]= true; 
          break; 

        case ParseTreeType.ARRAY_PATTERN: 
          tree.elements.forEach((function(e) { 
            this.collectLvalueIdentifiers_(identifiers, e); 
          }).bind(this)); 
          break; 

        case ParseTreeType.OBJECT_PATTERN: 
          tree.fields.forEach((function(f) { 
            this.collectLvalueIdentifiers_(identifiers, f); 
          }).bind(this)); 
          break; 

        case ParseTreeType.OBJECT_PATTERN_FIELD: 
          this.collectLvalueIdentifiers_(identifiers, tree.element); 
          break; 

        case ParseTreeType.PAREN_EXPRESSION: 
          this.collectLvalueIdentifiers_(identifiers, tree.expression); 
          break; 

        case ParseTreeType.SPREAD_PATTERN_ELEMENT: 
          this.collectLvalueIdentifiers_(identifiers, tree.lvalue); 
          break; 

        default: 
          throw new Error('unreachable'); 

      } 
      return identifiers; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { DestructuringTransformer: { 
      get: function() { 
        return DestructuringTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ForOfTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createAssignmentExpression, createBlock = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBlock, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createCallExpression, createCallStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createCallStatement, createExpressionStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createExpressionStatement, createFinally = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createFinally, createIfStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createIfStatement, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createMemberExpression, createStringLiteral = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createStringLiteral, createTryStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createTryStatement, createVariableStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createVariableStatement, createWhileStatement = destructuring$createArgumentList$createAssignmentExpression$createBlock$createCallExpression$createCallStatement$createExpressionStatement$createFinally$createIfStatement$createMemberExpression$createStringLiteral$createTryStatement$createVariableStatement$createWhileStatement.createWhileStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function ForOfTransformer(identifierGenerator) { 
    ParseTreeTransformer.call(this); 
    this.identifierGenerator_ = identifierGenerator; 
  } 
  ForOfTransformer.transformTree = function(identifierGenerator, tree) { 
    return new ForOfTransformer(identifierGenerator).transformAny(tree); 
  }; 
  ForOfTransformer.prototype = createObject(ParseTreeTransformer.prototype, { transformForOfStatement: function(original) { 
      var tree = ParseTreeTransformer.prototype.transformForOfStatement.call(this, original); 
      var iter = this.identifierGenerator_.generateUniqueIdentifier(); 
      var initializer = createVariableStatement(TokenType.VAR, iter, createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.GET_ITERATOR), createArgumentList(tree.collection))); 
      var statement; 
      if(tree.initializer.type === ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        statement = createVariableStatement(tree.initializer.declarationType, tree.initializer.declarations[0].lvalue, createMemberExpression(iter, PredefinedName.CURRENT)); 
      } else { 
        statement = createExpressionStatement(createAssignmentExpression(tree.initializer, createMemberExpression(iter, PredefinedName.CURRENT))); 
      } 
      var body = createBlock(statement, tree.body); 
      var loop = createWhileStatement(createCallExpression(createMemberExpression(iter, PredefinedName.MOVE_NEXT)), body); 
      var finallyBody = createIfStatement(createMemberExpression(iter, PredefinedName.CLOSE), createCallStatement(createMemberExpression(iter, PredefinedName.CLOSE))); 
      return createBlock(initializer, createTryStatement(createBlock(loop), null, createFinally(createBlock(finallyBody)))); 
    } }); 
  return Object.preventExtensions(Object.create(null, { ForOfTransformer: { 
      get: function() { 
        return ForOfTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_semantics_FreeVariableChecker_js =(function() { 
  "use strict"; 
  var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$SourcePosition = $src_util_SourcePosition_js, SourcePosition = destructuring$SourcePosition.SourcePosition; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var BindingIdentifier = trees.BindingIdentifier; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var Scope = traceur.runtime.createClass({ constructor: function(parent) { 
      this.parent = parent; 
      this.references = Object.create(null); 
      this.declarations = Object.create(null); 
    } }, null, true, false); 
  function getVariableName(name) { 
    if(name instanceof IdentifierExpression) { 
      name = name.identifierToken; 
    } else if(name instanceof BindingIdentifier) { 
      name = name.identifierToken; 
    } 
    if(name instanceof IdentifierToken) { 
      name = name.value; 
    } 
    return name; 
  } 
  function getIdentifier(tree) { 
    while(tree.type == ParseTreeType.PAREN_EXPRESSION) { 
      tree = tree.expression; 
    } 
    if(tree.type == ParseTreeType.BINDING_IDENTIFIER) { 
      return tree; 
    } 
    return null; 
  } 
  var FreeVariableChecker = traceur.runtime.createClass({ 
    constructor: function(reporter) { 
      traceur.runtime.superCall(this, FreeVariableChecker, "constructor",[]); 
      this.reporter_ = reporter; 
      this.scope_ = null; 
    }, 
    pushScope_: function() { 
      return this.scope_ = new Scope(this.scope_); 
    }, 
    pop_: function(scope) { 
      if(this.scope_ != scope) { 
        throw new Error('FreeVariableChecker scope mismatch'); 
      } 
      this.validateScope_(); 
      this.scope_ = scope.parent; 
    }, 
    visitBlock: function(tree) { 
      this.visitStatements_(tree.statements); 
    }, 
    visitProgram: function(tree, global) { 
      var scope = this.pushScope_(); 
      var object = global; 
      while(object) { 
        Object.getOwnPropertyNames(object).forEach(this.declareVariable_, this); 
        object = Object.getPrototypeOf(object); 
      } 
      this.visitStatements_(tree.programElements); 
      this.pop_(scope); 
    }, 
    visitStatements_: function(statements) { 
      statements.forEach((function(s) { 
        if(s.type == ParseTreeType.FUNCTION_DECLARATION) { 
          this.declareVariable_(s.name); 
        } 
        this.visitAny(s); 
      }).bind(this)); 
    }, 
    visitFunction_: function(name, formalParameterList, body) { 
      var scope = this.pushScope_(); 
      if(name) this.declareVariable_(name); 
      this.declareVariable_(PredefinedName.ARGUMENTS); 
      this.visitAny(formalParameterList); 
      this.visitAny(body); 
      this.pop_(scope); 
    }, 
    visitFunctionDeclaration: function(tree) { 
      this.visitFunction_(tree.name, tree.formalParameterList, tree.functionBody); 
    }, 
    visitArrowFunctionExpression: function(tree) { 
      this.visitFunction_(null, tree.formalParameters, tree.functionBody); 
    }, 
    visitGetAccessor: function(tree) { 
      var scope = this.pushScope_(); 
      this.visitAny(tree.body); 
      this.pop_(scope); 
    }, 
    visitSetAccessor: function(tree) { 
      var scope = this.pushScope_(); 
      this.declareVariable_(tree.parameter.binding); 
      this.visitAny(tree.body); 
      this.pop_(scope); 
    }, 
    visitCatch: function(tree) { 
      var scope = this.pushScope_(); 
      this.visitAny(tree.binding); 
      this.visitAny(tree.catchBody); 
      this.pop_(scope); 
    }, 
    visitVariableDeclarationList: function(tree) { 
      if(tree.declarationType != TokenType.VAR) { 
        throw new Error('let and const should have been rewritten'); 
      } 
      tree.declarations.forEach((function(d) { 
        this.declareVariable_(d.lvalue); 
        this.visitAny(d.initializer); 
      }).bind(this)); 
    }, 
    visitBindingIdentifier: function(tree) { 
      this.declareVariable_(tree); 
    }, 
    visitIdentifierExpression: function(tree) { 
      var name = getVariableName(tree); 
      var scope = this.scope_; 
      if(!(name in scope.references)) { 
        scope.references[name]= tree.location; 
      } 
    }, 
    declareVariable_: function(tree) { 
      var name = getVariableName(tree); 
      if(name) { 
        var scope = this.scope_; 
        if(!(name in scope.declarations)) { 
          scope.declarations[name]= tree.location; 
        } 
      } 
    }, 
    validateScope_: function() { 
      var scope = this.scope_; 
      var errors =[]; 
      for(var name in scope.references) { 
        if(!(name in scope.declarations)) { 
          var location = scope.references[name]; 
          if(! scope.parent) { 
            if(! location) { 
              throw new Error('generated variable ' + name + ' is not defined'); 
            } 
            errors.push([location.start, '%s is not defined', name]); 
          } else if(!(name in scope.parent.references)) { 
            scope.parent.references[name]= location; 
          } 
        } 
      } 
      if(errors.length) { 
        errors.sort((function(x, y) { 
          return x[0].offset - y[0].offset; 
        })); 
        errors.forEach((function(e) { 
          this.reportError_.apply(this, e); 
        }).bind(this)); 
      } 
    }, 
    reportError_: function(location, format, var_args) { 
      var args = Array.prototype.slice.call(arguments); 
      args[0]= location; 
      this.reporter_.reportError.apply(this.reporter_, args); 
    } 
  }, ParseTreeVisitor, true, true); 
  var global = this; 
  FreeVariableChecker.checkProgram = function(reporter, tree) { 
    new FreeVariableChecker(reporter).visitProgram(tree, global); 
  }; 
  return Object.preventExtensions(Object.create(null, { FreeVariableChecker: { 
      get: function() { 
        return FreeVariableChecker; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_GeneratorComprehensionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ComprehensionTransformer = $src_codegeneration_ComprehensionTransformer_js, ComprehensionTransformer = destructuring$ComprehensionTransformer.ComprehensionTransformer; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$createYieldStatement = $src_codegeneration_ParseTreeFactory_js, createYieldStatement = destructuring$createYieldStatement.createYieldStatement; 
  function GeneratorComprehensionTransformer(identifierGenerator) { 
    ComprehensionTransformer.call(this, identifierGenerator); 
  } 
  GeneratorComprehensionTransformer.transformTree = function(identifierGenerator, tree) { 
    return new GeneratorComprehensionTransformer(identifierGenerator).transformAny(tree); 
  }; 
  GeneratorComprehensionTransformer.prototype = createObject(ComprehensionTransformer.prototype, { transformGeneratorComprehension: function(tree) { 
      var expression = this.transformAny(tree.expression); 
      var statement = createYieldStatement(expression); 
      var isGenerator = true; 
      return this.transformComprehension(tree, statement, isGenerator); 
    } }); 
  return Object.preventExtensions(Object.create(null, { GeneratorComprehensionTransformer: { 
      get: function() { 
        return GeneratorComprehensionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_State_js =(function() { 
  "use strict"; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList = $src_codegeneration_ParseTreeFactory_js, createAssignStateStatement = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createAssignStateStatement, createAssignmentStatement = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createAssignmentStatement, createBreakStatement = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createBreakStatement, createCaseClause = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createCaseClause, createIdentifierExpression = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createIdentifierExpression, createNumberLiteral = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createNumberLiteral, createStatementList = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createStatementList, createStatementList = destructuring$createAssignStateStatement$createAssignmentStatement$createBreakStatement$createCaseClause$createIdentifierExpression$createNumberLiteral$createStatementList.createStatementList; 
  function State(id) { 
    this.id = id; 
  } 
  State.INVALID_STATE = - 1; 
  State.generateJump = function(enclosingFinally, fallThroughState) { 
    return createStatementList(State.generateAssignState(enclosingFinally, fallThroughState), createBreakStatement()); 
  }; 
  State.generateJumpThroughFinally = function(finallyState, destination) { 
    return createStatementList(State.generateAssignStateOutOfFinally_(destination, finallyState), createBreakStatement()); 
  }; 
  State.generateAssignState = function(enclosingFinally, fallThroughState) { 
    var assignState; 
    if(isFinallyExit(enclosingFinally, fallThroughState)) { 
      assignState = State.generateAssignStateOutOfFinally(enclosingFinally, fallThroughState); 
    } else { 
      assignState = createStatementList(createAssignStateStatement(fallThroughState)); 
    } 
    return assignState; 
  }; 
  function isFinallyExit(enclosingFinally, destination) { 
    return enclosingFinally != null && enclosingFinally.tryStates.indexOf(destination) < 0; 
  } 
  State.generateAssignStateOutOfFinally = function(enclosingFinally, destination) { 
    return State.generateAssignStateOutOfFinally_(destination, enclosingFinally.finallyState); 
  }; 
  State.generateAssignStateOutOfFinally_ = function(destination, finallyState) { 
    return createStatementList(createAssignStateStatement(finallyState), createAssignmentStatement(createIdentifierExpression(PredefinedName.FINALLY_FALL_THROUGH), createNumberLiteral(destination))); 
  }; 
  State.replaceStateList = function(oldStates, oldState, newState) { 
    var states =[]; 
    for(var i = 0; i < oldStates.length; i ++) { 
      states.push(State.replaceStateId(oldStates[i], oldState, newState)); 
    } 
    return states; 
  }; 
  State.replaceStateId = function(current, oldState, newState) { 
    return current == oldState ? newState: current; 
  }; 
  State.replaceAllStates = function(exceptionBlocks, oldState, newState) { 
    var result =[]; 
    for(var i = 0; i < exceptionBlocks.length; i ++) { 
      result.push(exceptionBlocks[i].replaceState(oldState, newState)); 
    } 
    return result; 
  }; 
  State.prototype = { 
    transformMachineState: function(enclosingFinally, machineEndState, reporter) { 
      return createCaseClause(createNumberLiteral(this.id), this.transform(enclosingFinally, machineEndState, reporter)); 
    }, 
    transformBreak: function(labelSet, breakState) { 
      return this; 
    }, 
    transformBreakOrContinue: function(labelSet, breakState, continueState) { 
      return this; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { State: { 
      get: function() { 
        return State; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_FallThroughState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function FallThroughState(id, fallThroughState, statements) { 
    State.call(this, id); 
    this.fallThroughState = fallThroughState; 
    this.statements = statements; 
  } 
  FallThroughState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new FallThroughState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.statements); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      var statements =[]; 
      statements.push.apply(statements, this.statements); 
      statements.push.apply(statements, State.generateJump(enclosingFinally, this.fallThroughState)); 
      return statements; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { FallThroughState: { 
      get: function() { 
        return FallThroughState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_BreakState_js =(function() { 
  "use strict"; 
  var destructuring$FallThroughState = $src_codegeneration_generator_FallThroughState_js, FallThroughState = destructuring$FallThroughState.FallThroughState; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$createStatementList = $src_codegeneration_ParseTreeFactory_js, createStatementList = destructuring$createStatementList.createStatementList; 
  function BreakState(id, label) { 
    State.call(this, id); 
    this.label = label; 
  } 
  BreakState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new BreakState(State.replaceStateId(this.id, oldState, newState), this.label); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      throw new Error('These should be removed before the transform step'); 
    }, 
    transformBreak: function(labelSet, breakState) { 
      if(this.label == null || this.label in labelSet) { 
        return new FallThroughState(this.id, breakState, createStatementList()); 
      } 
      return this; 
    }, 
    transformBreakOrContinue: function(labelSet, breakState, continueState) { 
      return this.transformBreak(labelSet, breakState); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { BreakState: { 
      get: function() { 
        return BreakState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_ContinueState_js =(function() { 
  "use strict"; 
  var destructuring$FallThroughState = $src_codegeneration_generator_FallThroughState_js, FallThroughState = destructuring$FallThroughState.FallThroughState; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$createStatementList = $src_codegeneration_ParseTreeFactory_js, createStatementList = destructuring$createStatementList.createStatementList; 
  function ContinueState(id, label) { 
    State.call(this, id); 
    this.label = label; 
  } 
  ContinueState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new ContinueState(State.replaceStateId(this.id, oldState, newState), this.label); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      throw new Error('These should be removed before the transform step'); 
    }, 
    transformBreakOrContinue: function(labelSet, breakState, continueState) { 
      if(this.label == null || this.label in labelSet) { 
        return new FallThroughState(this.id, continueState, createStatementList()); 
      } 
      return this; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ContinueState: { 
      get: function() { 
        return ContinueState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_TryState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var Kind = { 
    CATCH: 'catch', 
    FINALLY: 'finally' 
  }; 
  function TryState(kind, tryStates, nestedTrys) { 
    this.kind = kind; 
    this.tryStates = tryStates; 
    this.nestedTrys = nestedTrys; 
  } 
  TryState.Kind = Kind; 
  TryState.prototype = { 
    replaceAllStates: function(oldState, newState) { 
      return State.replaceStateList(this.tryStates, oldState, newState); 
    }, 
    replaceNestedTrys: function(oldState, newState) { 
      var states =[]; 
      for(var i = 0; i < this.nestedTrys.length; i ++) { 
        states.push(this.nestedTrys[i].replaceState(oldState, newState)); 
      } 
      return states; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { TryState: { 
      get: function() { 
        return TryState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_syntax_trees_StateMachine_js =(function() { 
  "use strict"; 
  var destructuring$ParseTree$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTree = destructuring$ParseTree$ParseTreeType.ParseTree, ParseTreeType = destructuring$ParseTree$ParseTreeType.ParseTreeType; 
  var destructuring$TryState = $src_codegeneration_generator_TryState_js, TryState = destructuring$TryState.TryState; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  ParseTreeType.STATE_MACHINE = 'STATE_MACHINE'; 
  function StateMachine(startState, fallThroughState, states, exceptionBlocks) { 
    ParseTree.call(this, ParseTreeType.STATE_MACHINE, null); 
    this.startState = startState; 
    this.fallThroughState = fallThroughState; 
    this.states = states; 
    this.exceptionBlocks = exceptionBlocks; 
  } 
  function addCatchOrFinallyStates(kind, enclosingMap, tryStates) { 
    for(var i = 0; i < tryStates.length; i ++) { 
      var tryState = tryStates[i]; 
      if(tryState.kind == kind) { 
        for(var j = 0; j < tryState.tryStates.length; j ++) { 
          var id = tryState.tryStates[j]; 
          enclosingMap[id]= tryState; 
        } 
      } 
      addCatchOrFinallyStates(kind, enclosingMap, tryState.nestedTrys); 
    } 
  } 
  function addAllCatchStates(tryStates, catches) { 
    for(var i = 0; i < tryStates.length; i ++) { 
      var tryState = tryStates[i]; 
      if(tryState.kind == TryState.Kind.CATCH) { 
        catches.push(tryState); 
      } 
      addAllCatchStates(tryState.nestedTrys, catches); 
    } 
  } 
  StateMachine.prototype = createObject(ParseTree.prototype, { 
    hasExceptionBlocks: function() { 
      return this.exceptionBlocks.length > 0; 
    }, 
    getAllStateIDs: function() { 
      var result =[]; 
      for(var i = 0; i < this.states.length; i ++) { 
        result.push(this.states[i].id); 
      } 
      return result; 
    }, 
    getEnclosingFinallyMap: function() { 
      var enclosingMap = Object.create(null); 
      addCatchOrFinallyStates(TryState.Kind.FINALLY, enclosingMap, this.exceptionBlocks); 
      return enclosingMap; 
    }, 
    getEnclosingCatchMap: function() { 
      var enclosingMap = Object.create(null); 
      addCatchOrFinallyStates(TryState.Kind.CATCH, enclosingMap, this.exceptionBlocks); 
      return enclosingMap; 
    }, 
    allCatchStates: function() { 
      var catches =[]; 
      addAllCatchStates(this.exceptionBlocks, catches); 
      return catches; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { StateMachine: { 
      get: function() { 
        return StateMachine; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_BreakContinueTransformer_js =(function() { 
  "use strict"; 
  var destructuring$BreakState = $src_codegeneration_generator_BreakState_js, BreakState = destructuring$BreakState.BreakState; 
  var destructuring$ContinueState = $src_codegeneration_generator_ContinueState_js, ContinueState = destructuring$ContinueState.ContinueState; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$StateMachine = $src_syntax_trees_StateMachine_js, StateMachine = destructuring$StateMachine.StateMachine; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var BreakStatement = trees.BreakStatement; 
  var ContinueStatement = trees.ContinueStatement; 
  var DoWhileStatement = trees.DoWhileStatement; 
  var ForOfStatement = trees.ForOfStatement; 
  var ForStatement = trees.ForStatement; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var SwitchStatement = trees.SwitchStatement; 
  var WhileStatement = trees.WhileStatement; 
  function BreakContinueTransformer(stateAllocator) { 
    ParseTreeTransformer.call(this); 
    this.transformBreaks_ = true; 
    this.stateAllocator_ = stateAllocator; 
  } 
  function safeGetLabel(tree) { 
    return tree.name ? tree.name.value: null; 
  } 
  var proto = ParseTreeTransformer.prototype; 
  BreakContinueTransformer.prototype = createObject(proto, { 
    allocateState_: function() { 
      return this.stateAllocator_.allocateState(); 
    }, 
    stateToStateMachine_: function(newState) { 
      var fallThroughState = this.allocateState_(); 
      return new StateMachine(newState.id, fallThroughState,[newState],[]); 
    }, 
    transformBreakStatement: function(tree) { 
      return this.transformBreaks_ ? this.stateToStateMachine_(new BreakState(this.allocateState_(), safeGetLabel(tree))): tree; 
    }, 
    transformContinueStatement: function(tree) { 
      return this.stateToStateMachine_(new ContinueState(this.allocateState_(), safeGetLabel(tree))); 
    }, 
    transformDoWhileStatement: function(tree) { 
      return tree; 
    }, 
    transformForOfStatement: function(tree) { 
      return tree; 
    }, 
    transformForStatement: function(tree) { 
      return tree; 
    }, 
    transformFunctionDeclaration: function(tree) { 
      return tree; 
    }, 
    transformStateMachine: function(tree) { 
      return tree; 
    }, 
    transformSwitchStatement: function(tree) { 
      var oldState = this.transformBreaks_; 
      this.transformBreaks = false; 
      var result = proto.transformSwitchStatement.call(this, tree); 
      this.transformBreaks_ = oldState; 
      return result; 
    }, 
    transformWhileStatement: function(tree) { 
      return tree; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { BreakContinueTransformer: { 
      get: function() { 
        return BreakContinueTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_CatchState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$TryState = $src_codegeneration_generator_TryState_js, TryState = destructuring$TryState.TryState; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function CatchState(identifier, catchState, fallThroughState, allStates, nestedTrys) { 
    TryState.call(this, TryState.Kind.CATCH, allStates, nestedTrys); 
    this.identifier = identifier; 
    this.catchState = catchState; 
    this.fallThroughState = fallThroughState; 
  } 
  CatchState.prototype = createObject(TryState.prototype, { replaceState: function(oldState, newState) { 
      return new CatchState(this.identifier, State.replaceStateId(this.catchState, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.replaceAllStates(oldState, newState), this.replaceNestedTrys(oldState, newState)); 
    } }); 
  return Object.preventExtensions(Object.create(null, { CatchState: { 
      get: function() { 
        return CatchState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_ConditionalState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createBlock$createIfStatement = $src_codegeneration_ParseTreeFactory_js, createBlock = destructuring$createBlock$createIfStatement.createBlock, createIfStatement = destructuring$createBlock$createIfStatement.createIfStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function ConditionalState(id, ifState, elseState, condition) { 
    State.call(this, id); 
    this.ifState = ifState; 
    this.elseState = elseState; 
    this.condition = condition; 
  } 
  ConditionalState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new ConditionalState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.ifState, oldState, newState), State.replaceStateId(this.elseState, oldState, newState), this.condition); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      return[createIfStatement(this.condition, createBlock(State.generateJump(enclosingFinally, this.ifState)), createBlock(State.generateJump(enclosingFinally, this.elseState)))]; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ConditionalState: { 
      get: function() { 
        return ConditionalState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_FinallyFallThroughState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function FinallyFallThroughState(id) { 
    State.call(this, id); 
  } 
  FinallyFallThroughState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new FinallyFallThroughState(State.replaceStateId(this.id, oldState, newState)); 
    }, 
    transformMachineState: function(enclosingFinally, machineEndState, reporter) { 
      return null; 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      throw new Error('these are generated in addFinallyFallThroughDispatches'); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { FinallyFallThroughState: { 
      get: function() { 
        return FinallyFallThroughState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_FinallyState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$TryState = $src_codegeneration_generator_TryState_js, TryState = destructuring$TryState.TryState; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function FinallyState(finallyState, fallThroughState, allStates, nestedTrys) { 
    TryState.call(this, TryState.Kind.FINALLY, allStates, nestedTrys); 
    this.finallyState = finallyState; 
    this.fallThroughState = fallThroughState; 
  } 
  FinallyState.prototype = createObject(TryState.prototype, { replaceState: function(oldState, newState) { 
      return new FinallyState(State.replaceStateId(this.finallyState, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.replaceAllStates(oldState, newState), this.replaceNestedTrys(oldState, newState)); 
    } }); 
  return Object.preventExtensions(Object.create(null, { FinallyState: { 
      get: function() { 
        return FinallyState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_StateAllocator_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  function StateAllocator() { } 
  StateAllocator.prototype = { 
    nextState_: State.INVALID_STATE + 1, 
    allocateState: function() { 
      return this.nextState_ ++; 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { StateAllocator: { 
      get: function() { 
        return StateAllocator; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_SwitchState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createBreakStatement$createStatementList = $src_codegeneration_ParseTreeFactory_js, createBreakStatement = destructuring$createBreakStatement$createStatementList.createBreakStatement, createStatementList = destructuring$createBreakStatement$createStatementList.createStatementList; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var CaseClause = trees.CaseClause; 
  var DefaultClause = trees.DefaultClause; 
  var SwitchStatement = trees.SwitchStatement; 
  function SwitchClause(first, second) { 
    this.first = first; 
    this.second = second; 
  } 
  function SwitchState(id, expression, clauses) { 
    State.call(this, id); 
    this.expression = expression; 
    this.clauses = clauses; 
  } 
  SwitchState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      var clauses = this.clauses.map((function(clause) { 
        return new SwitchClause(clause.first, State.replaceStateId(clause.second, oldState, newState)); 
      })); 
      return new SwitchState(State.replaceStateId(this.id, oldState, newState), this.expression, clauses); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      var clauses =[]; 
      for(var i = 0; i < this.clauses.length; i ++) { 
        var clause = this.clauses[i]; 
        if(clause.first == null) { 
          clauses.push(new DefaultClause(null, State.generateJump(enclosingFinally, clause.second))); 
        } else { 
          clauses.push(new CaseClause(null, clause.first, State.generateJump(enclosingFinally, clause.second))); 
        } 
      } 
      return createStatementList(new SwitchStatement(null, this.expression, clauses), createBreakStatement()); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { 
    SwitchClause: { 
      get: function() { 
        return SwitchClause; 
      }, 
      enumerable: true 
    }, 
    SwitchState: { 
      get: function() { 
        return SwitchState; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var $src_codegeneration_generator_CPSTransformer_js =(function() { 
  "use strict"; 
  var destructuring$BreakContinueTransformer = $src_codegeneration_generator_BreakContinueTransformer_js, BreakContinueTransformer = destructuring$BreakContinueTransformer.BreakContinueTransformer; 
  var destructuring$CatchState = $src_codegeneration_generator_CatchState_js, CatchState = destructuring$CatchState.CatchState; 
  var destructuring$ConditionalState = $src_codegeneration_generator_ConditionalState_js, ConditionalState = destructuring$ConditionalState.ConditionalState; 
  var destructuring$FallThroughState = $src_codegeneration_generator_FallThroughState_js, FallThroughState = destructuring$FallThroughState.FallThroughState; 
  var destructuring$FinallyFallThroughState = $src_codegeneration_generator_FinallyFallThroughState_js, FinallyFallThroughState = destructuring$FinallyFallThroughState.FinallyFallThroughState; 
  var destructuring$FinallyState = $src_codegeneration_generator_FinallyState_js, FinallyState = destructuring$FinallyState.FinallyState; 
  var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$StateAllocator = $src_codegeneration_generator_StateAllocator_js, StateAllocator = destructuring$StateAllocator.StateAllocator; 
  var destructuring$StateMachine = $src_syntax_trees_StateMachine_js, StateMachine = destructuring$StateMachine.StateMachine; 
  var destructuring$SwitchClause$SwitchState = $src_codegeneration_generator_SwitchState_js, SwitchClause = destructuring$SwitchClause$SwitchState.SwitchClause, SwitchState = destructuring$SwitchClause$SwitchState.SwitchState; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$TryState = $src_codegeneration_generator_TryState_js, TryState = destructuring$TryState.TryState; 
  var destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement = $src_codegeneration_ParseTreeFactory_js, createArrayLiteralExpression = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createArrayLiteralExpression, createAssignStateStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createAssignStateStatement, createAssignmentExpression = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createAssignmentExpression, createAssignmentStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createAssignmentStatement, createBinaryOperator = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBinaryOperator, createBindingIdentifier = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBindingIdentifier, createBlock = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBlock, createBoundCall = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBoundCall, createBreakStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createBreakStatement, createCaseClause = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createCaseClause, createCatch = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createCatch, createDefaultClause = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createDefaultClause, createEmptyParameterList = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createEmptyParameterList, createEmptyStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createEmptyStatement, createExpressionStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createExpressionStatement, createFunctionExpression = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createFunctionExpression, createIdentifierExpression = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createIdentifierExpression, createIdentifierToken = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createIdentifierToken, createNumberLiteral = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createNumberLiteral, createOperatorToken = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createOperatorToken, createStatementList = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createStatementList, createStringLiteral = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createStringLiteral, createSwitchStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createSwitchStatement, createThisExpression = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createThisExpression, createThrowStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createThrowStatement, createTrueLiteral = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createTrueLiteral, createTryStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createTryStatement, createVariableStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createVariableStatement, createWhileStatement = destructuring$createArrayLiteralExpression$createAssignStateStatement$createAssignmentExpression$createAssignmentStatement$createBinaryOperator$createBindingIdentifier$createBlock$createBoundCall$createBreakStatement$createCaseClause$createCatch$createDefaultClause$createEmptyParameterList$createEmptyStatement$createExpressionStatement$createFunctionExpression$createIdentifierExpression$createIdentifierToken$createNumberLiteral$createOperatorToken$createStatementList$createStringLiteral$createSwitchStatement$createThisExpression$createThrowStatement$createTrueLiteral$createTryStatement$createVariableStatement$createWhileStatement.createWhileStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var destructuring$variablesInBlock = $src_semantics_VariableBinder_js, variablesInBlock = destructuring$variablesInBlock.variablesInBlock; 
  var CaseClause = trees.CaseClause; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var SwitchStatement = trees.SwitchStatement; 
  function CPSTransformer(reporter) { 
    ParseTreeTransformer.call(this); 
    this.reporter = reporter; 
    this.stateAllocator_ = new StateAllocator(); 
    this.labelSet_ = Object.create(null); 
  } 
  var proto = ParseTreeTransformer.prototype; 
  CPSTransformer.prototype = createObject(proto, { 
    allocateState: function() { 
      return this.stateAllocator_.allocateState(); 
    }, 
    transformBlock: function(tree) { 
      this.clearLabels_(); 
      var transformedTree = proto.transformBlock.call(this, tree); 
      var machine = this.transformStatementList_(transformedTree.statements); 
      return machine == null ? transformedTree: machine; 
    }, 
    transformStatementList_: function(someTransformed) { 
      if(! this.containsStateMachine_(someTransformed)) { 
        return null; 
      } 
      var currentMachine = this.ensureTransformed_(someTransformed[0]); 
      for(var index = 1; index < someTransformed.length; index ++) { 
        currentMachine = this.createSequence_(currentMachine, this.ensureTransformed_(someTransformed[index])); 
      } 
      return currentMachine; 
    }, 
    containsStateMachine_: function(statements) { 
      if(statements instanceof Array) { 
        for(var i = 0; i < statements.length; i ++) { 
          if(statements[i].type == ParseTreeType.STATE_MACHINE) { 
            return true; 
          } 
        } 
        return false; 
      } 
      traceur.assert(statements instanceof SwitchStatement); 
      for(var i = 0; i < statements.caseClauses.length; i ++) { 
        var clause = statements.caseClauses[i]; 
        if(clause.type == ParseTreeType.CASE_CLAUSE) { 
          if(this.containsStateMachine_(clause.statements)) { 
            return true; 
          } 
        } else { 
          if(this.containsStateMachine_(clause.statements)) { 
            return true; 
          } 
        } 
      } 
      return false; 
    }, 
    transformCaseClause: function(tree) { 
      var result = proto.transformCaseClause.call(this, tree); 
      var machine = this.transformStatementList_(result.statements); 
      return machine == null ? result: new CaseClause(null, result.expression, createStatementList(machine)); 
    }, 
    transformDoWhileStatement: function(tree) { 
      var labels = this.clearLabels_(); 
      var result = proto.transformDoWhileStatement.call(this, tree); 
      if(result.body.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      var loopBodyMachine = result.body; 
      var startState = loopBodyMachine.startState; 
      var conditionState = loopBodyMachine.fallThroughState; 
      var fallThroughState = this.allocateState(); 
      var states =[]; 
      this.addLoopBodyStates_(loopBodyMachine, conditionState, fallThroughState, labels, states); 
      states.push(new ConditionalState(conditionState, startState, fallThroughState, result.condition)); 
      return new StateMachine(startState, fallThroughState, states, loopBodyMachine.exceptionBlocks); 
    }, 
    addLoopBodyStates_: function(loopBodyMachine, continueState, breakState, labels, states) { 
      for(var i = 0; i < loopBodyMachine.states.length; i ++) { 
        var state = loopBodyMachine.states[i]; 
        states.push(state.transformBreakOrContinue(labels, breakState, continueState)); 
      } 
    }, 
    transformForStatement: function(tree) { 
      var labels = this.clearLabels_(); 
      var result = proto.transformForStatement.call(this, tree); 
      if(result.body.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      var loopBodyMachine = result.body; 
      var incrementState = loopBodyMachine.fallThroughState; 
      var conditionState = result.increment == null && result.condition != null ? incrementState: this.allocateState(); 
      var startState = result.initializer == null ? conditionState: this.allocateState(); 
      var fallThroughState = this.allocateState(); 
      var states =[]; 
      if(result.initializer != null) { 
        states.push(new FallThroughState(startState, conditionState, createStatementList(createExpressionStatement(result.initializer)))); 
      } 
      if(result.condition != null) { 
        states.push(new ConditionalState(conditionState, loopBodyMachine.startState, fallThroughState, result.condition)); 
      } else { 
        states.push(new FallThroughState(conditionState, loopBodyMachine.startState, createStatementList())); 
      } 
      if(result.increment != null) { 
        states.push(new FallThroughState(incrementState, conditionState, createStatementList(createExpressionStatement(result.increment)))); 
      } 
      this.addLoopBodyStates_(loopBodyMachine, incrementState, fallThroughState, labels, states); 
      return new StateMachine(startState, fallThroughState, states, loopBodyMachine.exceptionBlocks); 
    }, 
    transformForInStatement: function(tree) { 
      return tree; 
    }, 
    transformForOfStatement: function(tree) { 
      throw new Error('for of statements should be transformed before this pass'); 
    }, 
    transformIfStatement: function(tree) { 
      this.clearLabels_(); 
      var result = proto.transformIfStatement.call(this, tree); 
      if(result.ifClause.type != ParseTreeType.STATE_MACHINE &&(result.elseClause == null || result.elseClause.type != ParseTreeType.STATE_MACHINE)) { 
        return result; 
      } 
      var ifClause = this.ensureTransformed_(result.ifClause); 
      var elseClause = this.ensureTransformed_(result.elseClause); 
      var startState = this.allocateState(); 
      var fallThroughState = ifClause.fallThroughState; 
      var ifState = ifClause.startState; 
      var elseState = elseClause == null ? fallThroughState: elseClause.startState; 
      var states =[]; 
      var exceptionBlocks =[]; 
      states.push(new ConditionalState(startState, ifState, elseState, result.condition)); 
      states.push.apply(states, ifClause.states); 
      exceptionBlocks.push.apply(exceptionBlocks, ifClause.exceptionBlocks); 
      if(elseClause != null) { 
        this.replaceAndAddStates_(elseClause.states, elseClause.fallThroughState, fallThroughState, states); 
        exceptionBlocks.push.apply(exceptionBlocks, State.replaceAllStates(elseClause.exceptionBlocks, elseClause.fallThroughState, fallThroughState)); 
      } 
      return new StateMachine(startState, fallThroughState, states, exceptionBlocks); 
    }, 
    replaceAndAddStates_: function(oldStates, oldState, newState, newStates) { 
      for(var i = 0; i < oldStates.length; i ++) { 
        newStates.push(oldStates[i].replaceState(oldState, newState)); 
      } 
    }, 
    transformLabelledStatement: function(tree) { 
      var oldLabels = this.addLabel_(tree.name.value); 
      var result = this.transformAny(tree.statement); 
      this.restoreLabels_(oldLabels); 
      return result; 
    }, 
    clearLabels_: function() { 
      var result = this.labelSet_; 
      this.labelSet_ = Object.create(null); 
      return result; 
    }, 
    restoreLabels_: function(oldLabels) { 
      this.labelSet_ = oldLabels; 
    }, 
    addLabel_: function(label) { 
      var oldLabels = this.labelSet_; 
      var labelSet = Object.create(null); 
      for(var k in this.labelSet_) { 
        labelSet[k]= k; 
      } 
      labelSet[label]= label; 
      this.labelSet_ = labelSet; 
      return oldLabels; 
    }, 
    transformSwitchStatement: function(tree) { 
      var labels = this.clearLabels_(); 
      var result = proto.transformSwitchStatement.call(this, tree); 
      if(! this.containsStateMachine_(result)) { 
        return result; 
      } 
      var startState = this.allocateState(); 
      var fallThroughState = this.allocateState(); 
      var nextState = fallThroughState; 
      var states =[]; 
      var clauses =[]; 
      var tryStates =[]; 
      var hasDefault = false; 
      for(var index = result.caseClauses.length - 1; index >= 0; index --) { 
        var clause = result.caseClauses[index]; 
        if(clause.type == ParseTreeType.CASE_CLAUSE) { 
          var caseClause = clause; 
          nextState = this.addSwitchClauseStates_(nextState, fallThroughState, labels, caseClause.statements, states, tryStates); 
          clauses.push(new SwitchClause(caseClause.expression, nextState)); 
        } else { 
          hasDefault = true; 
          var defaultClause = clause; 
          nextState = this.addSwitchClauseStates_(nextState, fallThroughState, labels, defaultClause.statements, states, tryStates); 
          clauses.push(new SwitchClause(null, nextState)); 
        } 
      } 
      if(! hasDefault) { 
        clauses.push(new SwitchClause(null, fallThroughState)); 
      } 
      states.push(new SwitchState(startState, result.expression, clauses.reverse())); 
      return new StateMachine(startState, fallThroughState, states.reverse(), tryStates); 
    }, 
    addSwitchClauseStates_: function(nextState, fallThroughState, labels, statements, states, tryStates) { 
      var machine = this.ensureTransformedList_(statements); 
      for(var i = 0; i < machine.states.length; i ++) { 
        var state = machine.states[i]; 
        var transformedState = state.transformBreak(labels, fallThroughState); 
        states.push(transformedState.replaceState(machine.fallThroughState, nextState)); 
      } 
      tryStates.push.apply(tryStates, machine.exceptionBlocks); 
      return machine.startState; 
    }, 
    transformTryStatement: function(tree) { 
      this.clearLabels_(); 
      var result = proto.transformTryStatement.call(this, tree); 
      if(result.body.type != ParseTreeType.STATE_MACHINE &&(result.catchBlock == null || result.catchBlock.catchBody.type != ParseTreeType.STATE_MACHINE)) { 
        return result; 
      } 
      var tryMachine = this.ensureTransformed_(result.body); 
      if(result.catchBlock != null) { 
        var catchBlock = result.catchBlock; 
        var exceptionName = catchBlock.binding.identifierToken.value; 
        var catchMachine = this.ensureTransformed_(catchBlock.catchBody); 
        var startState = tryMachine.startState; 
        var fallThroughState = tryMachine.fallThroughState; 
        var catchStart = this.allocateState(); 
        var states =[]; 
        states.push.apply(states, tryMachine.states); 
        states.push(new FallThroughState(catchStart, catchMachine.startState, createStatementList(createAssignmentStatement(createIdentifierExpression(exceptionName), createIdentifierExpression(PredefinedName.STORED_EXCEPTION))))); 
        this.replaceAndAddStates_(catchMachine.states, catchMachine.fallThroughState, fallThroughState, states); 
        tryMachine = new StateMachine(startState, fallThroughState, states,[new CatchState(exceptionName, catchStart, fallThroughState, tryMachine.getAllStateIDs(), tryMachine.exceptionBlocks)]); 
      } 
      if(result.finallyBlock != null) { 
        var finallyBlock = result.finallyBlock; 
        var finallyMachine = this.ensureTransformed_(finallyBlock.block); 
        var startState = tryMachine.startState; 
        var fallThroughState = tryMachine.fallThroughState; 
        var states =[]; 
        states.push.apply(states, tryMachine.states); 
        states.push.apply(states, finallyMachine.states); 
        states.push(new FinallyFallThroughState(finallyMachine.fallThroughState)); 
        tryMachine = new StateMachine(startState, fallThroughState, states,[new FinallyState(finallyMachine.startState, finallyMachine.fallThroughState, tryMachine.getAllStateIDs(), tryMachine.exceptionBlocks)]); 
      } 
      return tryMachine; 
    }, 
    transformVariableStatement: function(tree) { 
      var declarations = this.transformVariableDeclarationList(tree.declarations); 
      if(declarations == tree.declarations) { 
        return tree; 
      } 
      if(declarations == null) { 
        return createEmptyStatement(); 
      } 
      if(declarations.type == ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        return createVariableStatement(declarations); 
      } 
      return createExpressionStatement(declarations); 
    }, 
    transformVariableDeclarationList: function(tree) { 
      if(tree.declarationType == TokenType.VAR) { 
        var expressions =[]; 
        for(var i = 0; i < tree.declarations.length; i ++) { 
          var declaration = tree.declarations[i]; 
          if(declaration.initializer != null) { 
            expressions.push(createAssignmentExpression(createIdentifierExpression(this.transformAny(declaration.lvalue)), this.transformAny(declaration.initializer))); 
          } 
        } 
        var list = expressions; 
        if(list.length == 0) { 
          return null; 
        } else if(list.length == 1) { 
          return list[0]; 
        } else { 
          return createArrayLiteralExpression(expressions); 
        } 
      } 
      return proto.transformVariableDeclarationList.call(this, tree); 
    }, 
    transformWhileStatement: function(tree) { 
      var labels = this.clearLabels_(); 
      var result = proto.transformWhileStatement.call(this, tree); 
      if(result.body.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      var loopBodyMachine = result.body; 
      var startState = loopBodyMachine.fallThroughState; 
      var fallThroughState = this.allocateState(); 
      var states =[]; 
      states.push(new ConditionalState(startState, loopBodyMachine.startState, fallThroughState, result.condition)); 
      this.addLoopBodyStates_(loopBodyMachine, startState, fallThroughState, labels, states); 
      return new StateMachine(startState, fallThroughState, states, loopBodyMachine.exceptionBlocks); 
    }, 
    transformWithStatement: function(tree) { 
      var result = proto.transformWithStatement.call(this, tree); 
      if(result.body.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      throw new Error('Unreachable - with statement not allowed in strict mode/harmony'); 
    }, 
    transformThisExpression: function(tree) { 
      return new IdentifierExpression(tree.location, new IdentifierToken(tree.location, PredefinedName.$THAT)); 
    }, 
    transformIdentifierExpression: function(tree) { 
      if(tree.identifierToken.value === PredefinedName.ARGUMENTS) { 
        return new IdentifierExpression(tree.location, new IdentifierToken(tree.location, PredefinedName.$ARGUMENTS)); 
      } 
      return tree; 
    }, 
    generateMachineMethod: function(machine) { 
      return createFunctionExpression(createEmptyParameterList(), createBlock(createWhileStatement(createTrueLiteral(), this.generateMachine(machine)))); 
    }, 
    generateHoistedThis: function() { 
      return createVariableStatement(TokenType.VAR, PredefinedName.$THAT, createThisExpression()); 
    }, 
    generateHoistedArguments: function() { 
      return createVariableStatement(TokenType.VAR, PredefinedName.$ARGUMENTS, createIdentifierExpression(PredefinedName.ARGUMENTS)); 
    }, 
    generateMachine: function(machine) { 
      var enclosingFinallyState = machine.getEnclosingFinallyMap(); 
      var enclosingCatchState = machine.getEnclosingCatchMap(); 
      var rethrowState = this.allocateState(); 
      var machineEndState = this.allocateState(); 
      var body = createSwitchStatement(createIdentifierExpression(PredefinedName.STATE), this.transformMachineStates(machine, machineEndState, rethrowState, enclosingFinallyState)); 
      var caseClauses =[]; 
      this.addExceptionCases_(rethrowState, enclosingFinallyState, enclosingCatchState, machine.getAllStateIDs(), caseClauses); 
      caseClauses.push(createDefaultClause(this.machineUncaughtExceptionStatements(rethrowState))); 
      body = createTryStatement(createBlock(body), createCatch(createBindingIdentifier(PredefinedName.CAUGHT_EXCEPTION), createBlock(createAssignmentStatement(createIdentifierExpression(PredefinedName.STORED_EXCEPTION), createIdentifierExpression(PredefinedName.CAUGHT_EXCEPTION)), createSwitchStatement(createIdentifierExpression(PredefinedName.STATE), caseClauses))), null); 
      return body; 
    }, 
    getMachineVariables: function(tree, machine) { 
      var statements =[]; 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.STATE, createNumberLiteral(machine.startState))); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.STORED_EXCEPTION, null)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.FINALLY_FALL_THROUGH, null)); 
      var liftedIdentifiers = variablesInBlock(tree, true); 
      var allCatchStates = machine.allCatchStates(); 
      for(var i = 0; i < allCatchStates.length; i ++) { 
        liftedIdentifiers[allCatchStates[i].identifier]= true; 
      } 
      var liftedIdentifierList = Object.keys(liftedIdentifiers).sort(); 
      for(var i = 0; i < liftedIdentifierList.length; i ++) { 
        var liftedIdentifier = liftedIdentifierList[i]; 
        statements.push(createVariableStatement(TokenType.VAR, liftedIdentifier, null)); 
      } 
      return statements; 
    }, 
    addExceptionCases_: function(rethrowState, enclosingFinallyState, enclosingCatchState, allStates, caseClauses) { 
      for(var i = 0; i < allStates.length; i ++) { 
        var state = allStates[i]; 
        var finallyState = enclosingFinallyState[state]; 
        var catchState = enclosingCatchState[state]; 
        if(catchState != null && finallyState != null && catchState.tryStates.indexOf(finallyState.finallyState) >= 0) { 
          caseClauses.push(createCaseClause(createNumberLiteral(state), State.generateJumpThroughFinally(finallyState.finallyState, catchState.catchState))); 
        } else if(catchState != null) { 
          caseClauses.push(createCaseClause(createNumberLiteral(state), createStatementList(createAssignStateStatement(catchState.catchState), createBreakStatement()))); 
        } else if(finallyState != null) { 
          caseClauses.push(createCaseClause(createNumberLiteral(state), State.generateJumpThroughFinally(finallyState.finallyState, rethrowState))); 
        } else { } 
      } 
    }, 
    transformFunctionDeclaration: function(tree) { 
      this.clearLabels_(); 
      return tree; 
    }, 
    transformGetAccessor: function(tree) { 
      return tree; 
    }, 
    transformSetAccessor: function(tree) { 
      return tree; 
    }, 
    transformStateMachine: function(tree) { 
      return tree; 
    }, 
    statementToStateMachine_: function(statement) { 
      return this.statementsToStateMachine_([statement]); 
    }, 
    statementsToStateMachine_: function(statements) { 
      var startState = this.allocateState(); 
      var fallThroughState = this.allocateState(); 
      return this.stateToStateMachine_(new FallThroughState(startState, fallThroughState, statements), fallThroughState); 
    }, 
    stateToStateMachine_: function(newState, fallThroughState) { 
      return new StateMachine(newState.id, fallThroughState,[newState],[]); 
    }, 
    transformMachineStates: function(machine, machineEndState, rethrowState, enclosingFinallyState) { 
      var cases =[]; 
      for(var i = 0; i < machine.states.length; i ++) { 
        var state = machine.states[i]; 
        var stateCase = state.transformMachineState(enclosingFinallyState[state.id], machineEndState, this.reporter); 
        if(stateCase != null) { 
          cases.push(stateCase); 
        } 
      } 
      this.addFinallyFallThroughDispatches(null, machine.exceptionBlocks, cases); 
      cases.push(createCaseClause(createNumberLiteral(machine.fallThroughState), this.machineFallThroughStatements(machineEndState))); 
      cases.push(createCaseClause(createNumberLiteral(machineEndState), this.machineEndStatements())); 
      cases.push(createCaseClause(createNumberLiteral(rethrowState), this.machineRethrowStatements(machineEndState))); 
      cases.push(createDefaultClause([createThrowStatement(createBinaryOperator(createStringLiteral('traceur compiler bug: invalid state in state machine'), createOperatorToken(TokenType.PLUS), createIdentifierExpression(PredefinedName.STATE)))])); 
      return cases; 
    }, 
    addFinallyFallThroughDispatches: function(enclosingFinallyState, tryStates, cases) { 
      for(var i = 0; i < tryStates.length; i ++) { 
        var tryState = tryStates[i]; 
        if(tryState.kind == TryState.Kind.FINALLY) { 
          var finallyState = tryState; 
          if(enclosingFinallyState != null) { 
            var caseClauses =[]; 
            var index = 0; 
            for(var j = 0; j < enclosingFinallyState.tryStates.length; j ++) { 
              var destination = enclosingFinallyState.tryStates[j]; 
              index ++; 
              var statements; 
              if(index < enclosingFinallyState.tryStates.length) { 
                statements = createStatementList(); 
              } else { 
                statements = createStatementList(createAssignmentStatement(createIdentifierExpression(PredefinedName.STATE), createIdentifierExpression(PredefinedName.FINALLY_FALL_THROUGH)), createAssignmentStatement(createIdentifierExpression(PredefinedName.FINALLY_FALL_THROUGH), createNumberLiteral(State.INVALID_STATE)), createBreakStatement()); 
              } 
              caseClauses.push(createCaseClause(createNumberLiteral(destination), statements)); 
            } 
            caseClauses.push(createDefaultClause(createStatementList(createAssignStateStatement(enclosingFinallyState.finallyState), createBreakStatement()))); 
            cases.push(createCaseClause(createNumberLiteral(finallyState.fallThroughState), createStatementList(createSwitchStatement(createIdentifierExpression(PredefinedName.FINALLY_FALL_THROUGH), caseClauses), createBreakStatement()))); 
          } else { 
            cases.push(createCaseClause(createNumberLiteral(finallyState.fallThroughState), createStatementList(createAssignmentStatement(createIdentifierExpression(PredefinedName.STATE), createIdentifierExpression(PredefinedName.FINALLY_FALL_THROUGH)), createBreakStatement()))); 
          } 
          this.addFinallyFallThroughDispatches(finallyState, finallyState.nestedTrys, cases); 
        } else { 
          this.addFinallyFallThroughDispatches(enclosingFinallyState, tryState.nestedTrys, cases); 
        } 
      } 
    }, 
    createSequence_: function(head, tail) { 
      var states =[]; 
      states.push.apply(states, head.states); 
      for(var i = 0; i < tail.states.length; i ++) { 
        var tailState = tail.states[i]; 
        states.push(tailState.replaceState(tail.startState, head.fallThroughState)); 
      } 
      var exceptionBlocks =[]; 
      exceptionBlocks.push.apply(exceptionBlocks, head.exceptionBlocks); 
      for(var i = 0; i < tail.exceptionBlocks.length; i ++) { 
        var tryState = tail.exceptionBlocks[i]; 
        exceptionBlocks.push(tryState.replaceState(tail.startState, head.fallThroughState)); 
      } 
      return new StateMachine(head.startState, tail.fallThroughState, states, exceptionBlocks); 
    }, 
    maybeTransformStatement_: function(maybeTransformedStatement) { 
      if(maybeTransformedStatement.type == ParseTreeType.VARIABLE_STATEMENT && maybeTransformedStatement.declarations.declarationType != TokenType.VAR) { 
        this.reporter.reportError(maybeTransformedStatement.location != null ? maybeTransformedStatement.location.start: null, 'traceur: const/let declaration may not be in a block containing a yield.'); 
      } 
      var breakContinueTransformed = new BreakContinueTransformer(this.stateAllocator_).transformAny(maybeTransformedStatement); 
      if(breakContinueTransformed != maybeTransformedStatement) { 
        breakContinueTransformed = this.transformAny(breakContinueTransformed); 
      } 
      return breakContinueTransformed; 
    }, 
    ensureTransformed_: function(statement) { 
      if(statement == null) { 
        return null; 
      } 
      var maybeTransformed = this.maybeTransformStatement_(statement); 
      return maybeTransformed.type == ParseTreeType.STATE_MACHINE ? maybeTransformed: this.statementToStateMachine_(maybeTransformed); 
    }, 
    ensureTransformedList_: function(statements) { 
      var maybeTransformedStatements =[]; 
      var foundMachine = false; 
      for(var i = 0; i < statements.length; i ++) { 
        var statement = statements[i]; 
        var maybeTransformedStatement = this.maybeTransformStatement_(statement); 
        maybeTransformedStatements.push(maybeTransformedStatement); 
        if(maybeTransformedStatement.type == ParseTreeType.STATE_MACHINE) { 
          foundMachine = true; 
        } 
      } 
      if(! foundMachine) { 
        return this.statementsToStateMachine_(statements); 
      } 
      return this.transformStatementList_(maybeTransformedStatements); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { CPSTransformer: { 
      get: function() { 
        return CPSTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_EndState_js =(function() { 
  "use strict"; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function EndState(id) { 
    State.call(this, id); 
  } 
  EndState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new EndState(State.replaceStateId(this.id, oldState, newState)); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      return State.generateJump(enclosingFinally, machineEndState); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { EndState: { 
      get: function() { 
        return EndState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_AsyncTransformer_js =(function() { 
  "use strict"; 
  var destructuring$CPSTransformer = $src_codegeneration_generator_CPSTransformer_js, CPSTransformer = destructuring$CPSTransformer.CPSTransformer; 
  var destructuring$EndState = $src_codegeneration_generator_EndState_js, EndState = destructuring$EndState.EndState; 
  var destructuring$FallThroughState = $src_codegeneration_generator_FallThroughState_js, FallThroughState = destructuring$FallThroughState.FallThroughState; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$StateMachine = $src_syntax_trees_StateMachine_js, StateMachine = destructuring$StateMachine.StateMachine; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createArgumentList, createAssignStateStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createAssignStateStatement, createAssignmentStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createAssignmentStatement, createBlock = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createBlock, createBreakStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createBreakStatement, createCallExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createCallExpression, createCallStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createCallStatement, createEmptyArgumentList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createEmptyArgumentList, createFunctionExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createFunctionExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createMemberExpression, createNewExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createNewExpression, createNumberLiteral = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createNumberLiteral, createParameterList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createParameterList, createParameterReference = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createParameterReference, createReturnStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createReturnStatement, createStatementList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createStatementList, createThrowStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createThrowStatement, createUndefinedExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createUndefinedExpression, createVariableStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createBreakStatement$createCallExpression$createCallStatement$createEmptyArgumentList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createNewExpression$createNumberLiteral$createParameterList$createParameterReference$createReturnStatement$createStatementList$createThrowStatement$createUndefinedExpression$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function AsyncTransformer(reporter) { 
    CPSTransformer.call(this, reporter); 
  } 
  AsyncTransformer.transformAsyncBody = function(reporter, body) { 
    return new AsyncTransformer(reporter).transformAsyncBody(body); 
  }; 
  var proto = CPSTransformer.prototype; 
  AsyncTransformer.prototype = createObject(proto, { 
    transformYieldStatement: function(tree) { 
      this.reporter.reportError(tree.location.start, 'Async function may not have a yield statement.'); 
      return tree; 
    }, 
    transformAwaitStatement: function(tree) { 
      var createTaskState = this.allocateState(); 
      var callbackState = this.allocateState(); 
      var errbackState = this.allocateState(); 
      var fallThroughState = this.allocateState(); 
      var states =[]; 
      states.push(new FallThroughState(createTaskState, callbackState, createStatementList(createAssignmentStatement(createIdentifierExpression(PredefinedName.WAIT_TASK), tree.expression), createCallStatement(createMemberExpression(PredefinedName.WAIT_TASK, PredefinedName.THEN), createArgumentList(createCallExpression(createIdentifierExpression(PredefinedName.CREATE_CALLBACK), createArgumentList(createNumberLiteral(callbackState))), createCallExpression(createIdentifierExpression(PredefinedName.CREATE_ERRBACK), createArgumentList(createNumberLiteral(errbackState))))), createReturnStatement(null)))); 
      var assignment; 
      if(tree.identifier != null) { 
        assignment = createStatementList(createAssignmentStatement(createIdentifierExpression(tree.identifier), createIdentifierExpression(PredefinedName.$VALUE))); 
      } else { 
        assignment = createStatementList(); 
      } 
      states.push(new FallThroughState(callbackState, fallThroughState, assignment)); 
      states.push(new FallThroughState(errbackState, fallThroughState, createStatementList(createThrowStatement(createIdentifierExpression(PredefinedName.ERR))))); 
      return new StateMachine(createTaskState, fallThroughState, states,[]); 
    }, 
    transformFinally: function(tree) { 
      var result = proto.transformFinally.call(this, tree); 
      if(result.block.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      this.reporter.reportError(tree.location.start, 'async not permitted within a finally block.'); 
      return result; 
    }, 
    transformReturnStatement: function(tree) { 
      var result = tree.expression; 
      if(result == null) { 
        result = createUndefinedExpression(); 
      } 
      var startState = this.allocateState(); 
      var endState = this.allocateState(); 
      var completeState = new FallThroughState(startState, endState, createStatementList(this.createCompleteTask_(result))); 
      var end = new EndState(endState); 
      return new StateMachine(startState, this.allocateState(),[completeState, end],[]); 
    }, 
    createCompleteTask_: function(result) { 
      return createCallStatement(createMemberExpression(PredefinedName.RESULT, PredefinedName.CALLBACK), createArgumentList(result)); 
    }, 
    transformAsyncBody: function(tree) { 
      var transformedTree = this.transformAny(tree); 
      if(this.reporter.hadError()) { 
        return tree; 
      } 
      var machine = transformedTree; 
      var statements =[]; 
      statements.push(this.generateHoistedThis()); 
      statements.push.apply(statements, this.getMachineVariables(tree, machine)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.$VALUE, null)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.ERR, null)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.RESULT, createNewExpression(createIdentifierExpression(PredefinedName.DEFERRED), createEmptyArgumentList()))); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.WAIT_TASK, null)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.CONTINUATION, this.generateMachineMethod(machine))); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.CREATE_CALLBACK, createFunctionExpression(createParameterList(PredefinedName.NEW_STATE), createBlock(createReturnStatement(createFunctionExpression(createParameterList(1), createBlock(createAssignmentStatement(createIdentifierExpression(PredefinedName.STATE), createIdentifierExpression(PredefinedName.NEW_STATE)), createAssignmentStatement(createIdentifierExpression(PredefinedName.$VALUE), createParameterReference(0)), createCallStatement(createIdentifierExpression(PredefinedName.CONTINUATION))))))))); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.CREATE_ERRBACK, createFunctionExpression(createParameterList(PredefinedName.NEW_STATE), createBlock(createReturnStatement(createFunctionExpression(createParameterList(1), createBlock(createAssignmentStatement(createIdentifierExpression(PredefinedName.STATE), createIdentifierExpression(PredefinedName.NEW_STATE)), createAssignmentStatement(createIdentifierExpression(PredefinedName.ERR), createParameterReference(0)), createCallStatement(createIdentifierExpression(PredefinedName.CONTINUATION))))))))); 
      statements.push(createCallStatement(createIdentifierExpression(PredefinedName.CONTINUATION))); 
      statements.push(createReturnStatement(createCallExpression(createMemberExpression(PredefinedName.RESULT, PredefinedName.CREATE_PROMISE)))); 
      return createBlock(statements); 
    }, 
    machineUncaughtExceptionStatements: function(rethrowState) { 
      return createStatementList(createAssignStateStatement(rethrowState), createBreakStatement()); 
    }, 
    machineEndStatements: function() { 
      return createStatementList(createReturnStatement(null)); 
    }, 
    machineFallThroughStatements: function(machineEndState) { 
      return createStatementList(this.createCompleteTask_(createUndefinedExpression()), createAssignStateStatement(machineEndState), createBreakStatement()); 
    }, 
    machineRethrowStatements: function(machineEndState) { 
      return createStatementList(createCallStatement(createMemberExpression(PredefinedName.RESULT, PredefinedName.ERRBACK), createArgumentList(createIdentifierExpression(PredefinedName.STORED_EXCEPTION))), createAssignStateStatement(machineEndState), createBreakStatement()); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { AsyncTransformer: { 
      get: function() { 
        return AsyncTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_ForInTransformPass_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createArgumentList, createAssignmentStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createAssignmentStatement, createBinaryOperator = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createBinaryOperator, createBlock = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createBlock, createCallStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createCallStatement, createContinueStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createContinueStatement, createEmptyArrayLiteralExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createEmptyArrayLiteralExpression, createForInStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createForInStatement, createForStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createForStatement, createIdentifierExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createIfStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createIfStatement, createMemberExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createMemberExpression, createMemberLookupExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createMemberLookupExpression, createNumberLiteral = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createNumberLiteral, createOperatorToken = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createOperatorToken, createParenExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createParenExpression, createPostfixExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createPostfixExpression, createUnaryExpression = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createUnaryExpression, createVariableDeclarationList = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createArgumentList$createAssignmentStatement$createBinaryOperator$createBlock$createCallStatement$createContinueStatement$createEmptyArrayLiteralExpression$createForInStatement$createForStatement$createIdentifierExpression$createIfStatement$createMemberExpression$createMemberLookupExpression$createNumberLiteral$createOperatorToken$createParenExpression$createPostfixExpression$createUnaryExpression$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var IdentifierExpression = trees.IdentifierExpression; 
  function ForInTransformPass(identifierGenerator) { 
    ParseTreeTransformer.call(this); 
    this.identifierGenerator_ = identifierGenerator; 
  } 
  ForInTransformPass.transformTree = function(identifierGenerator, tree) { 
    return new ForInTransformPass(identifierGenerator).transformAny(tree); 
  }; 
  ForInTransformPass.prototype = createObject(ParseTreeTransformer.prototype, { transformForInStatement: function(original) { 
      var tree = original; 
      var bodyStatements =[]; 
      var body = this.transformAny(tree.body); 
      if(body.type == ParseTreeType.BLOCK) { 
        bodyStatements.push.apply(bodyStatements, body.statements); 
      } else { 
        bodyStatements.push(body); 
      } 
      var elements =[]; 
      var keys = this.identifierGenerator_.generateUniqueIdentifier(); 
      elements.push(createVariableStatement(TokenType.VAR, keys, createEmptyArrayLiteralExpression())); 
      var collection = this.identifierGenerator_.generateUniqueIdentifier(); 
      elements.push(createVariableStatement(TokenType.VAR, collection, tree.collection)); 
      var p = this.identifierGenerator_.generateUniqueIdentifier(); 
      elements.push(createForInStatement(createVariableDeclarationList(TokenType.VAR, p, null), createIdentifierExpression(collection), createCallStatement(createMemberExpression(keys, PredefinedName.PUSH), createArgumentList(createIdentifierExpression(p))))); 
      var i = this.identifierGenerator_.generateUniqueIdentifier(); 
      var lookup = createMemberLookupExpression(createIdentifierExpression(keys), createIdentifierExpression(i)); 
      var originalKey, assignOriginalKey; 
      if(tree.initializer.type == ParseTreeType.VARIABLE_DECLARATION_LIST) { 
        var decList = tree.initializer; 
        originalKey = createIdentifierExpression(decList.declarations[0].lvalue); 
        assignOriginalKey = createVariableStatement(decList.declarationType, originalKey.identifierToken, lookup); 
      } else if(tree.initializer.type == ParseTreeType.IDENTIFIER_EXPRESSION) { 
        originalKey = tree.initializer; 
        assignOriginalKey = createAssignmentStatement(tree.initializer, lookup); 
      } else { 
        throw new Error('Invalid left hand side of for in loop'); 
      } 
      var innerBlock =[]; 
      innerBlock.push(assignOriginalKey); 
      innerBlock.push(createIfStatement(createUnaryExpression(createOperatorToken(TokenType.BANG), createParenExpression(createBinaryOperator(originalKey, createOperatorToken(TokenType.IN), createIdentifierExpression(collection)))), createContinueStatement(), null)); 
      innerBlock.push.apply(innerBlock, bodyStatements); 
      elements.push(createForStatement(createVariableDeclarationList(TokenType.VAR, i, createNumberLiteral(0)), createBinaryOperator(createIdentifierExpression(i), createOperatorToken(TokenType.OPEN_ANGLE), createMemberExpression(keys, PredefinedName.LENGTH)), createPostfixExpression(createIdentifierExpression(i), createOperatorToken(TokenType.PLUS_PLUS)), createBlock(innerBlock))); 
      return createBlock(elements); 
    } }); 
  return Object.preventExtensions(Object.create(null, { ForInTransformPass: { 
      get: function() { 
        return ForInTransformPass; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_YieldState_js =(function() { 
  "use strict"; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$State = $src_codegeneration_generator_State_js, State = destructuring$State.State; 
  var destructuring$createAssignmentStatement$createMemberExpression$createReturnStatement$createTrueLiteral = $src_codegeneration_ParseTreeFactory_js, createAssignmentStatement = destructuring$createAssignmentStatement$createMemberExpression$createReturnStatement$createTrueLiteral.createAssignmentStatement, createMemberExpression = destructuring$createAssignmentStatement$createMemberExpression$createReturnStatement$createTrueLiteral.createMemberExpression, createReturnStatement = destructuring$createAssignmentStatement$createMemberExpression$createReturnStatement$createTrueLiteral.createReturnStatement, createTrueLiteral = destructuring$createAssignmentStatement$createMemberExpression$createReturnStatement$createTrueLiteral.createTrueLiteral; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function YieldState(id, fallThroughState, expression) { 
    State.call(this, id); 
    this.fallThroughState = fallThroughState; 
    this.expression = expression; 
  } 
  YieldState.prototype = createObject(State.prototype, { 
    replaceState: function(oldState, newState) { 
      return new YieldState(State.replaceStateId(this.id, oldState, newState), State.replaceStateId(this.fallThroughState, oldState, newState), this.expression); 
    }, 
    transform: function(enclosingFinally, machineEndState, reporter) { 
      var result =[]; 
      result.push(createAssignmentStatement(createMemberExpression(PredefinedName.RESULT, PredefinedName.CURRENT), this.expression)); 
      result.push.apply(result, State.generateAssignState(enclosingFinally, this.fallThroughState)); 
      result.push(createReturnStatement(createTrueLiteral())); 
      return result; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { YieldState: { 
      get: function() { 
        return YieldState; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_generator_GeneratorTransformer_js =(function() { 
  "use strict"; 
  var destructuring$CPSTransformer = $src_codegeneration_generator_CPSTransformer_js, CPSTransformer = destructuring$CPSTransformer.CPSTransformer; 
  var destructuring$EndState = $src_codegeneration_generator_EndState_js, EndState = destructuring$EndState.EndState; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$StateMachine = $src_syntax_trees_StateMachine_js, StateMachine = destructuring$StateMachine.StateMachine; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$YieldState = $src_codegeneration_generator_YieldState_js, YieldState = destructuring$YieldState.YieldState; 
  var destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createArgumentList, createAssignStateStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createAssignStateStatement, createAssignmentStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createAssignmentStatement, createBlock = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createBlock, createCallExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createCallExpression, createEmptyParameterList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createEmptyParameterList, createExpressionStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createExpressionStatement, createFalseLiteral = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createFalseLiteral, createFunctionExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createFunctionExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createMemberExpression, createObjectLiteralExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createObjectLiteralExpression, createPropertyNameAssignment = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createPropertyNameAssignment, createReturnStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createReturnStatement, createStatementList = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createStatementList, createStringLiteral = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createStringLiteral, createThisExpression = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createThisExpression, createThrowStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createThrowStatement, createVariableStatement = destructuring$createArgumentList$createAssignStateStatement$createAssignmentStatement$createBlock$createCallExpression$createEmptyParameterList$createExpressionStatement$createFalseLiteral$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectLiteralExpression$createPropertyNameAssignment$createReturnStatement$createStatementList$createStringLiteral$createThisExpression$createThrowStatement$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function GeneratorTransformer(reporter) { 
    CPSTransformer.call(this, reporter); 
  } 
  GeneratorTransformer.transformGeneratorBody = function(reporter, body) { 
    return new GeneratorTransformer(reporter).transformGeneratorBody(body); 
  }; 
  GeneratorTransformer.prototype = createObject(CPSTransformer.prototype, { 
    transformYieldStatement: function(tree) { 
      if(tree.expression != null) { 
        var startState = this.allocateState(); 
        var fallThroughState = this.allocateState(); 
        return this.stateToStateMachine_(new YieldState(startState, fallThroughState, this.transformAny(tree.expression)), fallThroughState); 
      } 
      var stateId = this.allocateState(); 
      return new StateMachine(stateId, this.allocateState(),[new EndState(stateId)],[]); 
    }, 
    transformAwaitStatement: function(tree) { 
      this.reporter.reportError(tree.location.start, 'Generator function may not have an async statement.'); 
      return tree; 
    }, 
    transformFinally: function(tree) { 
      var result = CPSTransformer.prototype.transformFinally.call(this, tree); 
      if(result.block.type != ParseTreeType.STATE_MACHINE) { 
        return result; 
      } 
      this.reporter.reportError(tree.location.start, 'yield not permitted from within a finally block.'); 
      return result; 
    }, 
    transformReturnStatement: function(tree) { 
      this.reporter.reportError(tree.location.start, 'Generator function may not have a return statement.'); 
      return tree; 
    }, 
    transformGeneratorBody: function(tree) { 
      var transformedTree = this.transformAny(tree); 
      if(this.reporter.hadError()) { 
        return tree; 
      } 
      var machine = transformedTree; 
      var statements =[]; 
      statements.push(this.generateHoistedThis()); 
      statements.push(this.generateHoistedArguments()); 
      statements.push.apply(statements, this.getMachineVariables(tree, machine)); 
      statements.push(createVariableStatement(TokenType.VAR, PredefinedName.RESULT, createObjectLiteralExpression(createPropertyNameAssignment(PredefinedName.MOVE_NEXT, this.generateMachineMethod(machine))))); 
      statements.push(createExpressionStatement(createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, PredefinedName.MARK_AS_GENERATOR), createArgumentList(createIdentifierExpression(PredefinedName.RESULT))))); 
      statements.push(createReturnStatement(createIdentifierExpression(PredefinedName.RESULT))); 
      return createBlock(statements); 
    }, 
    machineUncaughtExceptionStatements: function(rethrowState) { 
      return createStatementList(createThrowStatement(createIdentifierExpression(PredefinedName.STORED_EXCEPTION))); 
    }, 
    machineRethrowStatements: function(machineEndState) { 
      return createStatementList(createThrowStatement(createIdentifierExpression(PredefinedName.STORED_EXCEPTION))); 
    }, 
    machineFallThroughStatements: function(machineEndState) { 
      return createStatementList(createAssignStateStatement(machineEndState)); 
    }, 
    machineEndStatements: function() { 
      return[createReturnStatement(createFalseLiteral())]; 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { GeneratorTransformer: { 
      get: function() { 
        return GeneratorTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_GeneratorTransformPass_js =(function() { 
  "use strict"; 
  var destructuring$AsyncTransformer = $src_codegeneration_generator_AsyncTransformer_js, AsyncTransformer = destructuring$AsyncTransformer.AsyncTransformer; 
  var destructuring$ForInTransformPass = $src_codegeneration_generator_ForInTransformPass_js, ForInTransformPass = destructuring$ForInTransformPass.ForInTransformPass; 
  var destructuring$ForOfTransformer = $src_codegeneration_ForOfTransformer_js, ForOfTransformer = destructuring$ForOfTransformer.ForOfTransformer; 
  var destructuring$GeneratorTransformer = $src_codegeneration_generator_GeneratorTransformer_js, GeneratorTransformer = destructuring$GeneratorTransformer.GeneratorTransformer; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeVisitor = $src_syntax_ParseTreeVisitor_js, ParseTreeVisitor = destructuring$ParseTreeVisitor.ParseTreeVisitor; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createForOfStatement$createIdentifierExpression$createVariableDeclarationList$createYieldStatement = $src_codegeneration_ParseTreeFactory_js, createForOfStatement = destructuring$createForOfStatement$createIdentifierExpression$createVariableDeclarationList$createYieldStatement.createForOfStatement, createIdentifierExpression = destructuring$createForOfStatement$createIdentifierExpression$createVariableDeclarationList$createYieldStatement.createIdentifierExpression, createVariableDeclarationList = destructuring$createForOfStatement$createIdentifierExpression$createVariableDeclarationList$createYieldStatement.createVariableDeclarationList, createYieldStatement = destructuring$createForOfStatement$createIdentifierExpression$createVariableDeclarationList$createYieldStatement.createYieldStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$transformOptions = $src_options_js, transformOptions = destructuring$transformOptions.transformOptions; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var GetAccessor = trees.GetAccessor; 
  var SetAccessor = trees.SetAccessor; 
  var YieldFinder = traceur.runtime.createClass({ 
    constructor: function(tree) { 
      this.hasYield = false; 
      this.hasYieldFor = false; 
      this.hasForIn = false; 
      this.hasAsync = false; 
      this.visitAny(tree); 
    }, 
    hasAnyGenerator: function() { 
      return this.hasYield || this.hasAsync; 
    }, 
    visitYieldStatement: function(tree) { 
      this.hasYield = true; 
      this.hasYieldFor = tree.isYieldFor; 
    }, 
    visitAwaitStatement: function(tree) { 
      this.hasAsync = true; 
    }, 
    visitForInStatement: function(tree) { 
      this.hasForIn = true; 
      traceur.runtime.superCall(this, YieldFinder, "visitForInStatement",[tree]); 
    }, 
    visitFunctionDeclaration: function(tree) { }, 
    visitSetAccessor: function(tree) { }, 
    visitGetAccessor: function(tree) { } 
  }, ParseTreeVisitor, true, true); 
  function YieldForTransformer(identifierGenerator) { 
    ParseTreeTransformer.call(this); 
    this.identifierGenerator_ = identifierGenerator; 
  } 
  YieldForTransformer.transformTree = function(identifierGenerator, tree) { 
    return new YieldForTransformer(identifierGenerator).transformAny(tree); 
  }; 
  YieldForTransformer.prototype = createObject(ParseTreeTransformer.prototype, { transformYieldStatement: function(tree) { 
      if(tree.isYieldFor) { 
        var id = createIdentifierExpression(this.identifierGenerator_.generateUniqueIdentifier()); 
        var forEach = createForOfStatement(createVariableDeclarationList(TokenType.VAR, id, null), tree.expression, createYieldStatement(id, false)); 
        var result = ForOfTransformer.transformTree(this.identifierGenerator_, forEach); 
        return result; 
      } 
      return tree; 
    } }); 
  function GeneratorTransformPass(identifierGenerator, reporter) { 
    ParseTreeTransformer.call(this); 
    this.identifierGenerator_ = identifierGenerator; 
    this.reporter_ = reporter; 
  } 
  GeneratorTransformPass.transformTree = function(identifierGenerator, reporter, tree) { 
    return new GeneratorTransformPass(identifierGenerator, reporter).transformAny(tree); 
  }; 
  GeneratorTransformPass.prototype = createObject(ParseTreeTransformer.prototype, { 
    transformFunctionDeclaration: function(tree) { 
      var body = this.transformBody_(tree.functionBody); 
      if(body == tree.functionBody) { 
        return tree; 
      } 
      return new FunctionDeclaration(null, tree.name, false, tree.formalParameterList, body); 
    }, 
    transformBody_: function(tree) { 
      var finder = new YieldFinder(tree); 
      var body = ParseTreeTransformer.prototype.transformBlock.call(this, tree); 
      if(! finder.hasAnyGenerator()) { 
        return body; 
      } 
      if(finder.hasForIn &&(transformOptions.generators || transformOptions.deferredFunctions)) { 
        body = ForInTransformPass.transformTree(this.identifierGenerator_, body); 
      } 
      if(finder.hasYieldFor && transformOptions.generators) { 
        body = YieldForTransformer.transformTree(this.identifierGenerator_, body); 
      } 
      if(finder.hasYield) { 
        if(transformOptions.generators) { 
          body = GeneratorTransformer.transformGeneratorBody(this.reporter_, body); 
        } 
      } else if(transformOptions.deferredFunctions) { 
        body = AsyncTransformer.transformAsyncBody(this.reporter_, body); 
      } 
      return body; 
    }, 
    transformGetAccessor: function(tree) { 
      var body = this.transformBody_(tree.body); 
      if(body == tree.body) { 
        return tree; 
      } 
      return new GetAccessor(null, tree.propertyName, body); 
    }, 
    transformSetAccessor: function(tree) { 
      var body = this.transformBody_(tree.body); 
      if(body == tree.body) { 
        return tree; 
      } 
      return new SetAccessor(null, tree.propertyName, tree.parameter, body); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { GeneratorTransformPass: { 
      get: function() { 
        return GeneratorTransformPass; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_IsExpressionTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken.createArgumentList, createBinaryOperator = destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken.createBinaryOperator, createCallExpression = destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken.createCallExpression, createMemberExpression = destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken.createMemberExpression, createOperatorToken = destructuring$createArgumentList$createBinaryOperator$createCallExpression$createMemberExpression$createOperatorToken.createOperatorToken; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var IS = PredefinedName.IS; 
  var ISNT = PredefinedName.ISNT; 
  var RUNTIME = PredefinedName.RUNTIME; 
  var TRACEUR = PredefinedName.TRACEUR; 
  function isGoodLiteral(tree) { 
    if(tree.type !== ParseTreeType.LITERAL_EXPRESSION) return false; 
    var token = tree.literalToken; 
    if(token.type === TokenType.NUMBER) return Number(token.value) !== 0; 
    return true; 
  } 
  function IsExpressionTransformer() { } 
  IsExpressionTransformer.transformTree = function(tree) { 
    return new IsExpressionTransformer().transformAny(tree); 
  }; 
  IsExpressionTransformer.prototype = createObject(ParseTreeTransformer.prototype, { transformBinaryOperator: function(tree) { 
      var operator = tree.operator; 
      if(operator.type !== TokenType.IDENTIFIER || operator.value !== IS && operator.value !== ISNT) { 
        return ParseTreeTransformer.prototype.transformBinaryOperator.call(this, tree); 
      } 
      var left = this.transformAny(tree.left); 
      var right = this.transformAny(tree.right); 
      if(isGoodLiteral(left) || isGoodLiteral(right)) { 
        var op = operator.value === IS ? TokenType.EQUAL_EQUAL_EQUAL: TokenType.NOT_EQUAL_EQUAL; 
        return createBinaryOperator(left, createOperatorToken(op), right); 
      } 
      return createCallExpression(createMemberExpression(TRACEUR, RUNTIME, operator.value), createArgumentList(left, right)); 
    } }); 
  return Object.preventExtensions(Object.create(null, { IsExpressionTransformer: { 
      get: function() { 
        return IsExpressionTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ObjectLiteralTransformer_js =(function() { 
  "use strict"; 
  var destructuring$FindVisitor = $src_codegeneration_FindVisitor_js, FindVisitor = destructuring$FindVisitor.FindVisitor; 
  var destructuring$Keywords = $src_syntax_Keywords_js, Keywords = destructuring$Keywords.Keywords; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createArgumentList, createAssignmentExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createAssignmentExpression, createBindingIdentifier = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createBindingIdentifier, createCallExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createCallExpression, createCommaExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createCommaExpression, createDefineProperty = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createDefineProperty, createEmptyParameterList = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createEmptyParameterList, createFunctionExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createFunctionExpression, createIdentifierExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createMemberExpression, createObjectCreate = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createObjectCreate, createObjectLiteralExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createObjectLiteralExpression, createParenExpression = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createParenExpression, createPropertyDescriptor = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createPropertyDescriptor, createPropertyNameAssignment = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createPropertyNameAssignment, createStringLiteral = destructuring$createArgumentList$createAssignmentExpression$createBindingIdentifier$createCallExpression$createCommaExpression$createDefineProperty$createEmptyParameterList$createFunctionExpression$createIdentifierExpression$createMemberExpression$createObjectCreate$createObjectLiteralExpression$createParenExpression$createPropertyDescriptor$createPropertyNameAssignment$createStringLiteral.createStringLiteral; 
  var destructuring$createObject$evaluateStringLiteral = $src_util_util_js, createObject = destructuring$createObject$evaluateStringLiteral.createObject, evaluateStringLiteral = destructuring$createObject$evaluateStringLiteral.evaluateStringLiteral; 
  var destructuring$transformOptions = $src_options_js, transformOptions = destructuring$transformOptions.transformOptions; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FormalParameterList = trees.FormalParameterList; 
  var FunctionDeclaration = trees.FunctionDeclaration; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var LiteralExpression = trees.LiteralExpression; 
  function findAtNameInProperty(propertyName) { 
    return function(tree) { 
      if(transformOptions.privateNameSyntax && tree[propertyName].type === TokenType.AT_NAME) { 
        this.found = true; 
      } 
    }; 
  } 
  function AtNameFinder(tree) { 
    this.protoExpression = null; 
    FindVisitor.call(this, tree, true); 
  } 
  AtNameFinder.prototype = createObject(FindVisitor.prototype, { 
    visitPropertyNameAssignment: function(tree) { 
      if(transformOptions.privateNameSyntax && tree.name.type === TokenType.AT_NAME) { 
        this.found = true; 
      } else if(getPropertyNameForToken(tree.name) === '__proto__') { 
        this.protoExpression = tree.value; 
      } 
    }, 
    visitGetAccessor: findAtNameInProperty('propertyName'), 
    visitSetAccessor: findAtNameInProperty('propertyName'), 
    visitPropertyMethodAssignment: findAtNameInProperty('name'), 
    visitPropertyNameShorthand: findAtNameInProperty('name') 
  }); 
  function getPropertyNameForToken(nameToken) { 
    if(nameToken.type === TokenType.STRING) return evaluateStringLiteral(nameToken); 
    return nameToken.value; 
  } 
  function ObjectLiteralTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
    this.protoExpression = null; 
    this.needsAtNameTransform = false; 
    this.seenAccessors = null; 
  } 
  ObjectLiteralTransformer.transformTree = function(identifierGenerator, tree) { 
    return new ObjectLiteralTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var base = TempVarTransformer.prototype; 
  ObjectLiteralTransformer.prototype = createObject(base, { 
    createProperty_: function(name, descr) { 
      if(descr.get || descr.set) { 
        var lookupName = getPropertyNameForToken(name); 
        var oldAccessor = this.seenAccessors[lookupName]; 
        if(oldAccessor) { 
          oldAccessor.get = descr.get || oldAccessor.get; 
          oldAccessor.set = descr.set || oldAccessor.set; 
          delete this.seenAccessors[lookupName]; 
          return null; 
        } else { 
          this.seenAccessors[lookupName]= descr; 
        } 
      } 
      return[name, descr]; 
    }, 
    getPropertyName_: function(token) { 
      switch(token.type) { 
        case TokenType.AT_NAME: 
          return createIdentifierExpression(this.identifierGenerator.getUniqueIdentifier(token.value)); 

        case TokenType.IDENTIFIER: 
          return createStringLiteral(token.value); 

        default: 
          if(Keywords.isKeyword(token.type)) return createStringLiteral(token.type); 
          return new LiteralExpression(token.location, token); 

      } 
    }, 
    transformObjectLiteralExpression: function(tree) { 
      var oldNeedsTransform = this.needsAtNameTransform; 
      var oldSeenAccessors = this.seenAccessors; 
      try { 
        var finder = new AtNameFinder(tree); 
        if(! finder.found) { 
          this.needsAtNameTransform = false; 
          return base.transformObjectLiteralExpression.call(this, tree); 
        } 
        this.needsAtNameTransform = true; 
        this.seenAccessors = Object.create(null); 
        var properties = this.transformList(tree.propertyNameAndValues); 
        properties = properties.filter((function(tree) { 
          return tree; 
        })); 
        var tempVar = this.addTempVar(); 
        var tempVarIdentifierExpression = createIdentifierExpression(tempVar); 
        var expressions = properties.map((function(property) { 
          var name = property[0]; 
          var descr = property[1]; 
          return createDefineProperty(tempVarIdentifierExpression, this.getPropertyName_(name), descr); 
        }).bind(this)); 
        var protoExpression = this.transformAny(finder.protoExpression); 
        var objectExpression; 
        if(protoExpression) objectExpression = createObjectCreate(protoExpression); else objectExpression = createObjectLiteralExpression([]); 
        expressions.unshift(createAssignmentExpression(tempVarIdentifierExpression, objectExpression)); 
        expressions.push(tempVarIdentifierExpression); 
        return createParenExpression(createCommaExpression(expressions)); 
      } finally { 
        this.needsAtNameTransform = oldNeedsTransform; 
        this.seenAccessors = oldSeenAccessors; 
      } 
    }, 
    transformPropertyNameAssignment: function(tree) { 
      if(! this.needsAtNameTransform) return base.transformPropertyNameAssignment.call(this, tree); 
      if(getPropertyNameForToken(tree.name) === '__proto__') return null; 
      return this.createProperty_(tree.name, { 
        value: this.transformAny(tree.value), 
        configurable: true, 
        enumerable: true, 
        writable: true 
      }); 
    }, 
    transformGetAccessor: function(tree) { 
      if(! this.needsAtNameTransform) return base.transformGetAccessor.call(this, tree); 
      var body = this.transformAny(tree.body); 
      var func = createFunctionExpression(createEmptyParameterList(), body); 
      return this.createProperty_(tree.propertyName, { 
        get: func, 
        configurable: true, 
        enumerable: true 
      }); 
    }, 
    transformSetAccessor: function(tree) { 
      if(! this.needsAtNameTransform) return base.transformSetAccessor.call(this, tree); 
      var body = this.transformAny(tree.body); 
      var parameter = this.transformAny(tree.parameter); 
      var parameterList = new FormalParameterList(parameter.location,[parameter]); 
      var func = createFunctionExpression(parameterList, body); 
      return this.createProperty_(tree.propertyName, { 
        set: func, 
        configurable: true, 
        enumerable: true 
      }); 
    }, 
    transformPropertyMethodAssignment: function(tree) { 
      var func = new FunctionDeclaration(tree.location, null, tree.isGenerator, this.transformAny(tree.formalParameterList), this.transformAny(tree.functionBody)); 
      if(! this.needsAtNameTransform) { 
        return createPropertyNameAssignment(tree.name, func); 
      } 
      var body = this.transformAny(tree.functionBody); 
      var parameters = this.transformAny(tree.formalParameterList); 
      return this.createProperty_(tree.name, { 
        value: func, 
        configurable: true, 
        enumerable: true, 
        writable: true 
      }); 
    }, 
    transformPropertyNameShorthand: function(tree) { 
      if(! this.needsAtNameTransform) return base.transformPropertyNameShorthand.call(this, tree); 
      return this.createProperty_(tree.name, { 
        value: new IdentifierExpression(tree.location, tree.name), 
        configurable: true, 
        enumerable: false, 
        writable: true 
      }); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { ObjectLiteralTransformer: { 
      get: function() { 
        return ObjectLiteralTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_PrivateNameSyntaxTransformer_js =(function() { 
  "use strict"; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TempVarTransformer = $src_codegeneration_TempVarTransformer_js, TempVarTransformer = destructuring$TempVarTransformer.TempVarTransformer; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createArgumentList, createCallExpression = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createCallExpression, createEmptyArgumentList = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createEmptyArgumentList, createIdentifierExpression = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createMemberExpression, createVariableDeclaration = destructuring$createArgumentList$createCallExpression$createEmptyArgumentList$createIdentifierExpression$createMemberExpression$createVariableDeclaration.createVariableDeclaration; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var VariableDeclarationList = trees.VariableDeclarationList; 
  var VariableStatement = trees.VariableStatement; 
  function PrivateNameSyntaxTransformer(identifierGenerator) { 
    TempVarTransformer.call(this, identifierGenerator); 
  } 
  PrivateNameSyntaxTransformer.transformTree = function(identifierGenerator, tree) { 
    return new PrivateNameSyntaxTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var base = TempVarTransformer.prototype; 
  PrivateNameSyntaxTransformer.prototype = createObject(base, { 
    getTransformedName_: function(token) { 
      return this.identifierGenerator.getUniqueIdentifier(token.value); 
    }, 
    transformAtNameExpression: function(tree) { 
      var transformedName = this.getTransformedName_(tree.atNameToken); 
      return createIdentifierExpression(transformedName); 
    }, 
    transformNameStatement: function(tree) { 
      var declarations = this.transformList(tree.declarations); 
      return new VariableStatement(tree.location, new VariableDeclarationList(tree.location, TokenType.CONST, declarations)); 
    }, 
    transformAtNameDeclaration: function(tree) { 
      var transformedName = this.getTransformedName_(tree.atNameToken); 
      var args, name; 
      if(tree.initializer) { 
        args = createArgumentList(this.transformAny(tree.initializer)); 
        name = PredefinedName.ASSERT_NAME; 
      } else { 
        args = createEmptyArgumentList(); 
        name = PredefinedName.CREATE_NAME; 
      } 
      return createVariableDeclaration(transformedName, createCallExpression(createMemberExpression(PredefinedName.TRACEUR, PredefinedName.RUNTIME, name), args)); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { PrivateNameSyntaxTransformer: { 
      get: function() { 
        return PrivateNameSyntaxTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_PropertyNameShorthandTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var IdentifierExpression = trees.IdentifierExpression; 
  var PropertyNameAssignment = trees.PropertyNameAssignment; 
  function PropertyNameShorthandTransformer() { } 
  PropertyNameShorthandTransformer.transformTree = function(tree) { 
    return new PropertyNameShorthandTransformer().transformAny(tree); 
  }; 
  PropertyNameShorthandTransformer.prototype = createObject(ParseTreeTransformer.prototype, { transformPropertyNameShorthand: function(tree) { 
      return new PropertyNameAssignment(tree.location, tree.name, new IdentifierExpression(tree.location, tree.name)); 
    } }); 
  return Object.preventExtensions(Object.create(null, { PropertyNameShorthandTransformer: { 
      get: function() { 
        return PropertyNameShorthandTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_QuasiLiteralTransformer_js =(function() { 
  "use strict"; 
  var destructuring$LiteralToken = $src_syntax_LiteralToken_js, LiteralToken = destructuring$LiteralToken.LiteralToken; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createArgumentList, createArrayLiteralExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createArrayLiteralExpression, createAssignmentExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createAssignmentExpression, createBinaryOperator = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createBinaryOperator, createCallExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCallExpression, createCommaExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createCommaExpression, createDefineProperty = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createDefineProperty, createIdentifierExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createMemberExpression, createObjectFreeze = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createObjectFreeze, createObjectLiteralExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createObjectLiteralExpression, createOperatorToken = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createOperatorToken, createParenExpression = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createParenExpression, createVariableDeclaration = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclaration, createVariableDeclarationList = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableDeclarationList, createVariableStatement = destructuring$createArgumentList$createArrayLiteralExpression$createAssignmentExpression$createBinaryOperator$createCallExpression$createCommaExpression$createDefineProperty$createIdentifierExpression$createMemberExpression$createObjectFreeze$createObjectLiteralExpression$createOperatorToken$createParenExpression$createVariableDeclaration$createVariableDeclarationList$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var LiteralExpression = trees.LiteralExpression; 
  var ParenExpression = trees.ParenExpression; 
  var Program = trees.Program; 
  function createCallSiteIdObject(tempVarName, tree) { 
    var elements = tree.elements; 
    var expressions =[createDefineProperty(createAssignmentExpression(createIdentifierExpression(tempVarName), createCookedStringArray(elements)), PredefinedName.RAW, { value: createObjectFreeze(createRawStringArray(elements)) }), createObjectFreeze(createIdentifierExpression(tempVarName))]; 
    return createParenExpression(createCommaExpression(expressions)); 
  } 
  function createRawStringArray(elements) { 
    var items =[]; 
    for(var i = 0; i < elements.length; i += 2) { 
      var str = replaceRaw(JSON.stringify(elements[i].value.value)); 
      var loc = elements[i].location; 
      var expr = new LiteralExpression(loc, new LiteralToken(TokenType.STRING, str, loc)); 
      items.push(expr); 
    } 
    return createArrayLiteralExpression(items); 
  } 
  function createCookedStringLiteralExpression(tree) { 
    var str = cookString(tree.value.value); 
    var loc = tree.location; 
    return new LiteralExpression(loc, new LiteralToken(TokenType.STRING, str, loc)); 
  } 
  function createCookedStringArray(elements) { 
    var items =[]; 
    for(var i = 0; i < elements.length; i += 2) { 
      items.push(createCookedStringLiteralExpression(elements[i])); 
    } 
    return createArrayLiteralExpression(items); 
  } 
  function replaceRaw(s) { 
    return s.replace(/\u2028|\u2029/g, function(c) { 
      switch(c) { 
        case '\u2028': 
          return '\\u2028'; 

        case '\u2029': 
          return '\\u2029'; 

        default: 
          throw Error('Not reachable'); 

      } 
    }); 
  } 
  function cookString(s) { 
    var sb =['"']; 
    var i = 0, k = 1, c, c2; 
    while(i < s.length) { 
      c = s[i ++]; 
      switch(c) { 
        case '\\': 
          c2 = s[i ++]; 
          switch(c2) { 
            case '\n': 
            case '\u2028': 
            case '\u2029': 
              break; 

            case '\r': 
              if(s[i + 1]=== '\n') { 
                i ++; 
              } 
              break; 

            default: 
              sb[k ++]= c; 
              sb[k ++]= c2; 

          } 
          break; 

        case '"': 
          sb[k ++]= '\\"'; 
          break; 

        case '\n': 
          sb[k ++]= '\\n'; 
          break; 

        case '\r': 
          sb[k ++]= '\\r'; 
          break; 

        case '\t': 
          sb[k ++]= '\\t'; 
          break; 

        case '\f': 
          sb[k ++]= '\\f'; 
          break; 

        case '\b': 
          sb[k ++]= '\\b'; 
          break; 

        case '\u2028': 
          sb[k ++]= '\\u2028'; 
          break; 

        case '\u2029': 
          sb[k ++]= '\\u2029'; 
          break; 

        default: 
          sb[k ++]= c; 

      } 
    } 
    sb[k ++]= '"'; 
    return sb.join(''); 
  } 
  function QuasiLiteralTransformer(identifierGenerator) { 
    ParseTreeTransformer.call(this); 
    this.identifierGenerator_ = identifierGenerator; 
    this.tempVarName_ = identifierGenerator.generateUniqueIdentifier(); 
  } 
  QuasiLiteralTransformer.transformTree = function(identifierGenerator, tree) { 
    return new QuasiLiteralTransformer(identifierGenerator).transformAny(tree); 
  }; 
  var proto = ParseTreeTransformer.prototype; 
  QuasiLiteralTransformer.prototype = createObject(proto, { 
    transformProgram: function(tree) { 
      this.callsiteDecls_ =[]; 
      var elements = this.transformList(tree.programElements); 
      if(elements == tree.programElements) { 
        return tree; 
      } 
      if(this.callsiteDecls_.length > 0) { 
        var tempVarStatement = createVariableStatement(createVariableDeclarationList(TokenType.VAR, this.tempVarName_, null)); 
        var varStatement = createVariableStatement(createVariableDeclarationList(TokenType.CONST, this.callsiteDecls_)); 
        elements.unshift(tempVarStatement, varStatement); 
      } 
      return new Program(tree.location, elements); 
    }, 
    transformQuasiLiteralExpression: function(tree) { 
      if(! tree.operand) return this.createDefaultQuasi(tree); 
      var operand = this.transformAny(tree.operand); 
      var elements = tree.elements; 
      var args =[]; 
      var idName = this.identifierGenerator_.generateUniqueIdentifier(); 
      var callsiteId = createCallSiteIdObject(this.tempVarName_, tree); 
      var variableDecl = createVariableDeclaration(idName, callsiteId); 
      this.callsiteDecls_.push(variableDecl); 
      args.push(createIdentifierExpression(idName)); 
      for(var i = 1; i < elements.length; i += 2) { 
        args.push(this.transformAny(elements[i])); 
      } 
      return createCallExpression(operand, createArgumentList(args)); 
    }, 
    transformQuasiSubstitution: function(tree) { 
      var transformedTree = this.transformAny(tree.expression); 
      switch(transformedTree.type) { 
        case ParseTreeType.BINARY_OPERATOR: 
          switch(transformedTree.operator.type) { 
            case TokenType.STAR: 
            case TokenType.PERCENT: 
            case TokenType.SLASH: 
              return transformedTree; 

          } 

        case ParseTreeType.COMMA_EXPRESSION: 
        case ParseTreeType.CONDITIONAL_EXPRESSION: 
          return new ParenExpression(null, transformedTree); 

      } 
      return transformedTree; 
    }, 
    transformQuasiLiteralPortion: function(tree) { 
      return createCookedStringLiteralExpression(tree); 
    }, 
    createDefaultQuasi: function(tree) { 
      var length = tree.elements.length; 
      if(length === 0) { 
        var loc = tree.location; 
        return new LiteralExpression(loc, new LiteralToken(TokenType.STRING, '""', loc)); 
      } 
      var binaryExpression = this.transformAny(tree.elements[0]); 
      if(length == 1) return binaryExpression; 
      var plusToken = createOperatorToken(TokenType.PLUS); 
      for(var i = 1; i < length; i ++) { 
        var element = tree.elements[i]; 
        if(element.type === ParseTreeType.QUASI_LITERAL_PORTION && element.value.value === '') { 
          continue; 
        } 
        var transformedTree = this.transformAny(tree.elements[i]); 
        binaryExpression = createBinaryOperator(binaryExpression, plusToken, transformedTree); 
      } 
      return new ParenExpression(null, binaryExpression); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { QuasiLiteralTransformer: { 
      get: function() { 
        return QuasiLiteralTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_RestParameterTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
  var destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createArgumentList, createBlock = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createBlock, createCallExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createCallExpression, createFunctionDeclaration = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createFunctionDeclaration, createIdentifierExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createIdentifierExpression, createMemberExpression = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createMemberExpression, createNumberLiteral = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createNumberLiteral, createVariableStatement = destructuring$createArgumentList$createBlock$createCallExpression$createFunctionDeclaration$createIdentifierExpression$createMemberExpression$createNumberLiteral$createVariableStatement.createVariableStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var FormalParameterList = trees.FormalParameterList; 
  function RestParameterTransformer() { 
    ParseTreeTransformer.call(this); 
  } 
  RestParameterTransformer.transformTree = function(tree) { 
    return new RestParameterTransformer().transformAny(tree); 
  }; 
  function hasRestParameter(formalParameterList) { 
    var parameters = formalParameterList.parameters; 
    return parameters.length > 0 && parameters[parameters.length - 1].isRestParameter(); 
  } 
  function getRestParameterName(formalParameterList) { 
    var parameters = formalParameterList.parameters; 
    return parameters[parameters.length - 1].identifier.identifierToken.value; 
  } 
  RestParameterTransformer.prototype = createObject(ParseTreeTransformer.prototype, { 
    transformFunctionDeclaration: function(tree) { 
      if(hasRestParameter(tree.formalParameterList)) { 
        return this.desugarRestParameters_(tree); 
      } else { 
        return ParseTreeTransformer.prototype.transformFunctionDeclaration.call(this, tree); 
      } 
    }, 
    desugarRestParameters_: function(tree) { 
      var parametersWithoutRestParam = new FormalParameterList(tree.formalParameterList.location, tree.formalParameterList.parameters.slice(0, tree.formalParameterList.parameters.length - 1)); 
      var sliceExpression = createCallExpression(createMemberExpression(PredefinedName.ARRAY, PredefinedName.PROTOTYPE, 'slice', PredefinedName.CALL), createArgumentList(createIdentifierExpression(PredefinedName.ARGUMENTS), createNumberLiteral(tree.formalParameterList.parameters.length - 1))); 
      var variable = createVariableStatement(TokenType.VAR, getRestParameterName(tree.formalParameterList), sliceExpression); 
      var statements =[]; 
      statements.push(variable); 
      statements.push.apply(statements, tree.functionBody.statements); 
      return createFunctionDeclaration(tree.name, parametersWithoutRestParam, this.transformAny(createBlock(statements))); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { RestParameterTransformer: { 
      get: function() { 
        return RestParameterTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_SpreadTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
  var destructuring$ParseTreeType = $src_syntax_trees_ParseTree_js, ParseTreeType = destructuring$ParseTreeType.ParseTreeType; 
  var destructuring$PredefinedName = $src_syntax_PredefinedName_js, PredefinedName = destructuring$PredefinedName.PredefinedName; 
  var destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement = $src_codegeneration_ParseTreeFactory_js, createArgumentList = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createArgumentList, createArrayLiteralExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createArrayLiteralExpression, createBlock = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createBlock, createBooleanLiteral = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createBooleanLiteral, createCallExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createCallExpression, createFunctionExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createFunctionExpression, createMemberExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createMemberExpression, createMemberLookupExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createMemberLookupExpression, createNullLiteral = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createNullLiteral, createParameterList = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createParameterList, createParameterReference = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createParameterReference, createParenExpression = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createParenExpression, createReturnStatement = destructuring$createArgumentList$createArrayLiteralExpression$createBlock$createBooleanLiteral$createCallExpression$createFunctionExpression$createMemberExpression$createMemberLookupExpression$createNullLiteral$createParameterList$createParameterReference$createParenExpression$createReturnStatement.createReturnStatement; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var APPLY = PredefinedName.APPLY; 
  var SPREAD_CODE = "\n    function(items) {\n      var retval = [];\n      var k = 0;\n      for (var i = 0; i < items.length; i += 2) {\n        var value = items[i + 1];\n        // spread\n        if (items[i]) {\n          value = %toObject(value);\n          for (var j = 0; j < value.length; j++) {\n            retval[k++] = value[j];\n          }\n        } else {\n          retval[k++] = value;\n        }\n      }\n      return retval;\n    }"; 
  var SPREAD_NEW_CODE = "\n    function(ctor, items) {\n      var args = %spread(items);\n      args.unshift(null);\n      return new (Function.prototype.bind.apply(ctor, args));\n    }"; 
  function hasSpreadMember(trees) { 
    return trees.some((function(tree) { 
      return tree.type == ParseTreeType.SPREAD_EXPRESSION; 
    })); 
  } 
  function createInterleavedArgumentsArray(elements) { 
    var args =[]; 
    elements.forEach((function(element) { 
      if(element.type == ParseTreeType.SPREAD_EXPRESSION) { 
        args.push(createBooleanLiteral(true)); 
        args.push(element.expression); 
      } else { 
        args.push(createBooleanLiteral(false)); 
        args.push(element); 
      } 
    })); 
    return createArrayLiteralExpression(args); 
  } 
  function SpreadTransformer(runtimeInliner) { 
    ParseTreeTransformer.call(this); 
    this.runtimeInliner_ = runtimeInliner; 
  } 
  SpreadTransformer.transformTree = function(runtimeInliner, tree) { 
    return new SpreadTransformer(runtimeInliner).transformAny(tree); 
  }; 
  SpreadTransformer.prototype = createObject(ParseTreeTransformer.prototype, { 
    createExpandCall_: function(elements) { 
      if(elements.length === 1) { 
        return createCallExpression(this.toObject_, createArgumentList(elements[0].expression)); 
      } 
      var args = createInterleavedArgumentsArray(elements); 
      return createCallExpression(this.spread_, createArgumentList(args)); 
    }, 
    get spread_() { 
      return this.runtimeInliner_.get('spread', SPREAD_CODE); 
    }, 
    get spreadNew_() { 
      this.runtimeInliner_.register('spread', SPREAD_CODE); 
      return this.runtimeInliner_.get('spreadNew', SPREAD_NEW_CODE); 
    }, 
    get toObject_() { 
      return this.runtimeInliner_.get('toObject'); 
    }, 
    desugarArraySpread_: function(tree) { 
      return this.createExpandCall_(tree.elements); 
    }, 
    desugarCallSpread_: function(tree) { 
      if(tree.operand.type == ParseTreeType.MEMBER_EXPRESSION) { 
        var expression = tree.operand; 
        return this.desugarSpreadMethodCall_(tree, expression.operand, createMemberExpression(createParameterReference(0), expression.memberName)); 
      } else if(tree.operand.type == ParseTreeType.MEMBER_LOOKUP_EXPRESSION) { 
        var lookupExpression = tree.operand; 
        return this.desugarSpreadMethodCall_(tree, lookupExpression.operand, createMemberLookupExpression(createParameterReference(0), lookupExpression.memberExpression)); 
      } 
      return createCallExpression(createMemberExpression(tree.operand, APPLY), createArgumentList(createNullLiteral(), this.createExpandCall_(tree.args.args))); 
    }, 
    desugarSpreadMethodCall_: function(tree, operand, memberLookup) { 
      var body = createBlock(createReturnStatement(createCallExpression(createMemberExpression(memberLookup, APPLY), createArgumentList(createParameterReference(0), createParameterReference(1))))); 
      var func = createParenExpression(createFunctionExpression(createParameterList(2), body)); 
      return createCallExpression(func, createArgumentList(operand, this.createExpandCall_(tree.args.args))); 
    }, 
    desugarNewSpread_: function(tree) { 
      return createCallExpression(this.spreadNew_, createArgumentList(tree.operand, createInterleavedArgumentsArray(tree.args.args))); 
    }, 
    transformArrayLiteralExpression: function(tree) { 
      if(hasSpreadMember(tree.elements)) { 
        return this.desugarArraySpread_(tree); 
      } 
      return ParseTreeTransformer.prototype.transformArrayLiteralExpression.call(this, tree); 
    }, 
    transformCallExpression: function(tree) { 
      if(hasSpreadMember(tree.args.args)) { 
        return this.desugarCallSpread_(tree); 
      } 
      return ParseTreeTransformer.prototype.transformCallExpression.call(this, tree); 
    }, 
    transformNewExpression: function(tree) { 
      if(tree.args != null && hasSpreadMember(tree.args.args)) { 
        return this.desugarNewSpread_(tree); 
      } 
      return ParseTreeTransformer.prototype.transformNewExpression.call(this, tree); 
    } 
  }); 
  return Object.preventExtensions(Object.create(null, { SpreadTransformer: { 
      get: function() { 
        return SpreadTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_ProgramTransformer_js =(function() { 
  "use strict"; 
  var destructuring$ArrayComprehensionTransformer = $src_codegeneration_ArrayComprehensionTransformer_js, ArrayComprehensionTransformer = destructuring$ArrayComprehensionTransformer.ArrayComprehensionTransformer; 
  var destructuring$ArrowFunctionTransformer = $src_codegeneration_ArrowFunctionTransformer_js, ArrowFunctionTransformer = destructuring$ArrowFunctionTransformer.ArrowFunctionTransformer; 
  var destructuring$AtNameMemberTransformer = $src_codegeneration_AtNameMemberTransformer_js, AtNameMemberTransformer = destructuring$AtNameMemberTransformer.AtNameMemberTransformer; 
  var destructuring$BlockBindingTransformer = $src_codegeneration_BlockBindingTransformer_js, BlockBindingTransformer = destructuring$BlockBindingTransformer.BlockBindingTransformer; 
  var destructuring$CascadeExpressionTransformer = $src_codegeneration_CascadeExpressionTransformer_js, CascadeExpressionTransformer = destructuring$CascadeExpressionTransformer.CascadeExpressionTransformer; 
  var destructuring$ClassTransformer = $src_codegeneration_ClassTransformer_js, ClassTransformer = destructuring$ClassTransformer.ClassTransformer; 
  var destructuring$CollectionTransformer = $src_codegeneration_CollectionTransformer_js, CollectionTransformer = destructuring$CollectionTransformer.CollectionTransformer; 
  var destructuring$DefaultParametersTransformer = $src_codegeneration_DefaultParametersTransformer_js, DefaultParametersTransformer = destructuring$DefaultParametersTransformer.DefaultParametersTransformer; 
  var destructuring$DestructuringTransformer = $src_codegeneration_DestructuringTransformer_js, DestructuringTransformer = destructuring$DestructuringTransformer.DestructuringTransformer; 
  var destructuring$ForOfTransformer = $src_codegeneration_ForOfTransformer_js, ForOfTransformer = destructuring$ForOfTransformer.ForOfTransformer; 
  var destructuring$FreeVariableChecker = $src_semantics_FreeVariableChecker_js, FreeVariableChecker = destructuring$FreeVariableChecker.FreeVariableChecker; 
  var destructuring$GeneratorComprehensionTransformer = $src_codegeneration_GeneratorComprehensionTransformer_js, GeneratorComprehensionTransformer = destructuring$GeneratorComprehensionTransformer.GeneratorComprehensionTransformer; 
  var destructuring$GeneratorTransformPass = $src_codegeneration_GeneratorTransformPass_js, GeneratorTransformPass = destructuring$GeneratorTransformPass.GeneratorTransformPass; 
  var destructuring$IsExpressionTransformer = $src_codegeneration_IsExpressionTransformer_js, IsExpressionTransformer = destructuring$IsExpressionTransformer.IsExpressionTransformer; 
  var destructuring$ModuleTransformer = $src_codegeneration_ModuleTransformer_js, ModuleTransformer = destructuring$ModuleTransformer.ModuleTransformer; 
  var destructuring$ObjectLiteralTransformer = $src_codegeneration_ObjectLiteralTransformer_js, ObjectLiteralTransformer = destructuring$ObjectLiteralTransformer.ObjectLiteralTransformer; 
  var destructuring$ObjectMap = $src_util_ObjectMap_js, ObjectMap = destructuring$ObjectMap.ObjectMap; 
  var destructuring$ParseTreeValidator = $src_syntax_ParseTreeValidator_js, ParseTreeValidator = destructuring$ParseTreeValidator.ParseTreeValidator; 
  var destructuring$PrivateNameSyntaxTransformer = $src_codegeneration_PrivateNameSyntaxTransformer_js, PrivateNameSyntaxTransformer = destructuring$PrivateNameSyntaxTransformer.PrivateNameSyntaxTransformer; 
  var destructuring$PropertyNameShorthandTransformer = $src_codegeneration_PropertyNameShorthandTransformer_js, PropertyNameShorthandTransformer = destructuring$PropertyNameShorthandTransformer.PropertyNameShorthandTransformer; 
  var destructuring$QuasiLiteralTransformer = $src_codegeneration_QuasiLiteralTransformer_js, QuasiLiteralTransformer = destructuring$QuasiLiteralTransformer.QuasiLiteralTransformer; 
  var destructuring$RestParameterTransformer = $src_codegeneration_RestParameterTransformer_js, RestParameterTransformer = destructuring$RestParameterTransformer.RestParameterTransformer; 
  var destructuring$SpreadTransformer = $src_codegeneration_SpreadTransformer_js, SpreadTransformer = destructuring$SpreadTransformer.SpreadTransformer; 
  var destructuring$options$transformOptions = $src_options_js, options = destructuring$options$transformOptions.options, transformOptions = destructuring$options$transformOptions.transformOptions; 
  var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
  var ProgramTree = trees.ProgramTree; 
  function ProgramTransformer(reporter, project) { 
    this.project_ = project; 
    this.reporter_ = reporter; 
    this.results_ = new ObjectMap(); 
  } 
  ProgramTransformer.transform = function(reporter, project) { 
    var transformer = new ProgramTransformer(reporter, project); 
    transformer.transform_(); 
    return transformer.results_; 
  }; 
  ProgramTransformer.transformFile = function(reporter, project, sourceFile) { 
    var transformer = new ProgramTransformer(reporter, project); 
    transformer.transformFile_(sourceFile); 
    return transformer.results_; 
  }; 
  ProgramTransformer.transformFileAsModule = function(reporter, project, module, sourceFile) { 
    var transformer = new ProgramTransformer(reporter, project); 
    transformer.transformFileAsModule_(module, sourceFile); 
    return transformer.results_; 
  }; 
  ProgramTransformer.prototype = { 
    transform_: function() { 
      this.project_.getSourceFiles().forEach((function(file) { 
        this.transformFile_(file); 
      }).bind(this)); 
    }, 
    transformFile_: function(file) { 
      var result = this.transform(this.project_.getParseTree(file)); 
      this.results_.put(file, result); 
    }, 
    transformFileAsModule_: function(module, file) { 
      var result = this.transformTree_(this.project_.getParseTree(file), module); 
      this.results_.put(file, result); 
    }, 
    transform: function(tree) { 
      return this.transformTree_(tree); 
    }, 
    transformTree_: function(tree, opt_module) { 
      var identifierGenerator = this.project_.identifierGenerator; 
      var runtimeInliner = this.project_.runtimeInliner; 
      var reporter = this.reporter_; 
      function chain(enabled, transformer, var_args) { 
        if(! enabled) return; 
        if(! reporter.hadError()) { 
          if(options.validate) { 
            ParseTreeValidator.validate(tree); 
          } 
          var args = Array.prototype.slice.call(arguments, 2); 
          args.push(tree); 
          tree = transformer.apply(null, args) || tree; 
        } 
      } 
      if(transformOptions.modules && ! reporter.hadError()) { 
        if(options.validate) { 
          ParseTreeValidator.validate(tree); 
        } 
        tree = this.transformModules_(tree, opt_module); 
      } 
      chain(transformOptions.quasi, QuasiLiteralTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.arrowFunctions, ArrowFunctionTransformer.transformTree, reporter); 
      chain(transformOptions.classes, ClassTransformer.transform, identifierGenerator, reporter); 
      chain(transformOptions.propertyNameShorthand, PropertyNameShorthandTransformer.transformTree); 
      chain(transformOptions.propertyMethods || transformOptions.privateNameSyntax && transformOptions.privateNames, ObjectLiteralTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.isExpression, IsExpressionTransformer.transformTree); 
      chain(transformOptions.generatorComprehension, GeneratorComprehensionTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.arrayComprehension, ArrayComprehensionTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.forOf, ForOfTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.restParameters, RestParameterTransformer.transformTree); 
      chain(transformOptions.defaultParameters, DefaultParametersTransformer.transformTree); 
      chain(transformOptions.generators || transformOptions.deferredFunctions, GeneratorTransformPass.transformTree, identifierGenerator, reporter); 
      chain(transformOptions.privateNames && transformOptions.privateNameSyntax, AtNameMemberTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.privateNames && transformOptions.privateNameSyntax, PrivateNameSyntaxTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.destructuring, DestructuringTransformer.transformTree, identifierGenerator); 
      chain(transformOptions.spread, SpreadTransformer.transformTree, runtimeInliner); 
      chain(true, runtimeInliner.transformAny.bind(runtimeInliner)); 
      chain(transformOptions.blockBinding, BlockBindingTransformer.transformTree); 
      chain(transformOptions.cascadeExpression, CascadeExpressionTransformer.transformTree, identifierGenerator, reporter); 
      chain(transformOptions.trapMemberLookup || transformOptions.privateNames, CollectionTransformer.transformTree, identifierGenerator); 
      chain(options.freeVariableChecker, FreeVariableChecker.checkProgram, reporter); 
      return tree; 
    }, 
    transformModules_: function(tree, opt_module) { 
      if(opt_module) { 
        return ModuleTransformer.transformAsModule(this.project_, opt_module, tree); 
      } else { 
        return ModuleTransformer.transform(this.project_, tree); 
      } 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { ProgramTransformer: { 
      get: function() { 
        return ProgramTransformer; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_codegeneration_Compiler_js =(function() { 
  "use strict"; 
  var destructuring$ModuleAnalyzer = $src_semantics_ModuleAnalyzer_js, ModuleAnalyzer = destructuring$ModuleAnalyzer.ModuleAnalyzer; 
  var destructuring$Parser = $src_syntax_Parser_js, Parser = destructuring$Parser.Parser; 
  var destructuring$ProgramTransformer = $src_codegeneration_ProgramTransformer_js, ProgramTransformer = destructuring$ProgramTransformer.ProgramTransformer; 
  var destructuring$Project = $src_semantics_symbols_Project_js, Project = destructuring$Project.Project; 
  Compiler.compile = function(reporter, project) { 
    return new Compiler(reporter, project).compile_(); 
  }; 
  Compiler.compileFile = function(reporter, sourceFile, url) { 
    var project = new Project(url); 
    project.addFile(sourceFile); 
    return new Compiler(reporter, project).compileFile_(sourceFile); 
  }; 
  function Compiler(reporter, project) { 
    this.reporter_ = reporter; 
    this.project_ = project; 
  } 
  Compiler.prototype = { 
    compile_: function() { 
      this.parse_(); 
      this.analyze_(); 
      this.transform_(); 
      if(this.hadError_()) { 
        return null; 
      } 
      return this.results_; 
    }, 
    compileFile_: function(file) { 
      this.parseFile_(file); 
      this.analyzeFile_(file); 
      this.transformFile_(file); 
      if(this.hadError_()) { 
        return null; 
      } 
      return this.results_.get(file); 
    }, 
    transform_: function() { 
      if(this.hadError_()) { 
        return; 
      } 
      this.results_ = ProgramTransformer.transform(this.reporter_, this.project_); 
    }, 
    transformFile_: function(sourceFile) { 
      if(this.hadError_()) { 
        return; 
      } 
      this.results_ = ProgramTransformer.transformFile(this.reporter_, this.project_, sourceFile); 
    }, 
    analyze_: function() { 
      if(this.hadError_()) { 
        return; 
      } 
      var analyzer = new ModuleAnalyzer(this.reporter_, this.project_); 
      analyzer.analyze(); 
    }, 
    analyzeFile_: function(sourceFile) { 
      if(this.hadError_()) { 
        return; 
      } 
      var analyzer = new ModuleAnalyzer(this.reporter_, this.project_); 
      analyzer.analyzeFile(sourceFile); 
    }, 
    parse_: function() { 
      this.project_.getSourceFiles().forEach(this.parseFile_, this); 
    }, 
    parseFile_: function(file) { 
      if(this.hadError_()) { 
        return; 
      } 
      this.project_.setParseTree(file, new Parser(this.reporter_, file).parseProgram(true)); 
    }, 
    hadError_: function() { 
      return this.reporter_.hadError(); 
    } 
  }; 
  return Object.preventExtensions(Object.create(null, { Compiler: { 
      get: function() { 
        return Compiler; 
      }, 
      enumerable: true 
    } })); 
}).call(this); 
var $src_runtime_modules_js =(function() { 
  "use strict"; 
  var destructuring$ArrayMap = $src_util_ArrayMap_js, ArrayMap = destructuring$ArrayMap.ArrayMap; 
  var destructuring$ModuleAnalyzer = $src_semantics_ModuleAnalyzer_js, ModuleAnalyzer = destructuring$ModuleAnalyzer.ModuleAnalyzer; 
  var destructuring$ModuleRequireVisitor = $src_codegeneration_module_ModuleRequireVisitor_js, ModuleRequireVisitor = destructuring$ModuleRequireVisitor.ModuleRequireVisitor; 
  var destructuring$ModuleSymbol = $src_semantics_symbols_ModuleSymbol_js, ModuleSymbol = destructuring$ModuleSymbol.ModuleSymbol; 
  var destructuring$ModuleTransformer = $src_codegeneration_ModuleTransformer_js, ModuleTransformer = destructuring$ModuleTransformer.ModuleTransformer; 
  var destructuring$ObjectMap = $src_util_ObjectMap_js, ObjectMap = destructuring$ObjectMap.ObjectMap; 
  var destructuring$Parser = $src_syntax_Parser_js, Parser = destructuring$Parser.Parser; 
  var destructuring$ProgramTransformer = $src_codegeneration_ProgramTransformer_js, ProgramTransformer = destructuring$ProgramTransformer.ProgramTransformer; 
  var destructuring$Project = $src_semantics_symbols_Project_js, Project = destructuring$Project.Project; 
  var destructuring$SourceFile = $src_syntax_SourceFile_js, SourceFile = destructuring$SourceFile.SourceFile; 
  var destructuring$TreeWriter = $src_outputgeneration_TreeWriter_js, TreeWriter = destructuring$TreeWriter.TreeWriter; 
  var destructuring$canonicalizeUrl$resolveUrl = $src_util_url_js, canonicalizeUrl = destructuring$canonicalizeUrl$resolveUrl.canonicalizeUrl, resolveUrl = destructuring$canonicalizeUrl$resolveUrl.resolveUrl; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  var base = Object.freeze(Object.create(null, { 
    Array: { value: Array }, 
    Boolean: { value: Boolean }, 
    Date: { value: Date }, 
    Error: { value: Error }, 
    EvalError: { value: EvalError }, 
    Function: { value: Function }, 
    JSON: { value: JSON }, 
    Math: { value: Math }, 
    Number: { value: Number }, 
    Object: { value: Object }, 
    RangeError: { value: RangeError }, 
    ReferenceError: { value: ReferenceError }, 
    RegExp: { value: RegExp }, 
    String: { value: String }, 
    SyntaxError: { value: SyntaxError }, 
    TypeError: { value: TypeError }, 
    URIError: { value: URIError }, 
    undefined: { value: void 0 } 
  })); 
  var NOT_STARTED = 0; 
  var LOADING = 1; 
  var LOADED = 2; 
  var PARSED = 3; 
  var TRANSFORMED = 4; 
  var COMPLETE = 5; 
  var ERROR = 6; 
  function CodeUnit(loader, url, state) { 
    this.loader = loader; 
    this.url = url; 
    this.state = state; 
    this.uid = traceur.getUid(); 
  } 
  CodeUnit.prototype = { 
    state_: NOT_STARTED, 
    get state() { 
      return this.state_; 
    }, 
    set state(state) { 
      if(state < this.state_) { 
        throw new Error('Invalid state change'); 
      } 
      this.state_ = state; 
    }, 
    get reporter() { 
      return this.loader.reporter; 
    }, 
    get project() { 
      return this.loader.project; 
    }, 
    get tree() { 
      return this.project.getParseTree(this.file); 
    }, 
    get moduleSymbol() { 
      return this.project.getRootModule(); 
    }, 
    addListener: function(callback, errback) { 
      if(! this.listeners) { 
        this.listeners =[]; 
      } 
      this.listeners.push(callback, errback); 
    }, 
    dispatchError: function(value) { 
      this.dispatch_(value, 1); 
    }, 
    dispatchComplete: function(value) { 
      this.dispatch_(value, 0); 
    }, 
    dispatch_: function(value, error) { 
      var listeners = this.listeners; 
      if(! listeners) { 
        return; 
      } 
      listeners = listeners.concat(); 
      this.listeners =[]; 
      for(var i = error; i < listeners.length; i += 2) { 
        var f = listeners[i]; 
        if(f) { 
          f(value); 
        } 
      } 
    }, 
    parse: function() { 
      var reporter = this.reporter; 
      var project = this.project; 
      var url = this.url; 
      var program = this.text; 
      var file = new SourceFile(url, program); 
      project.addFile(file); 
      this.file = file; 
      var parser = new Parser(reporter, file); 
      var tree = parser.parseProgram(this.allowLoad); 
      if(reporter.hadError()) { 
        this.error = 'Parse error'; 
        return false; 
      } 
      project.setParseTree(file, tree); 
      this.state = PARSED; 
      return true; 
    }, 
    transform: function() { 
      return ProgramTransformer.transformFile(this.reporter, this.project, this.file); 
    } 
  }; 
  function LoadCodeUnit(loader, url) { 
    CodeUnit.call(this, loader, url, NOT_STARTED); 
  } 
  LoadCodeUnit.prototype = createObject(CodeUnit.prototype, { 
    allowLoad: true, 
    get moduleSymbol() { 
      return this.project.getModuleForUrl(this.url); 
    }, 
    parse: function() { 
      if(! CodeUnit.prototype.parse.call(this)) { 
        return false; 
      } 
      var project = this.loader.project; 
      var tree = this.tree; 
      var url = this.url; 
      var moduleSymbol = new ModuleSymbol(null, null, tree, url); 
      project.addExternalModule(moduleSymbol); 
      return true; 
    }, 
    transform: function() { 
      return ProgramTransformer.transformFileAsModule(this.reporter, this.project, this.moduleSymbol, this.file); 
    } 
  }); 
  function EvalCodeUnit(loader, code) { 
    CodeUnit.call(this, loader, loader.url, LOADED); 
    this.text = code; 
  } 
  EvalCodeUnit.prototype = createObject(CodeUnit.prototype, { allowLoad: false }); 
  function EvalLoadCodeUnit(loader, code) { 
    CodeUnit.call(this, loader, loader.url, LOADED); 
    this.text = code; 
  } 
  EvalLoadCodeUnit.prototype = createObject(CodeUnit.prototype, { allowLoad: true }); 
  function InternalLoader(reporter, project) { 
    this.reporter = reporter; 
    this.project = project; 
    this.cache = new ArrayMap(); 
    this.urlToKey = Object.create(null); 
  } 
  InternalLoader.prototype = { 
    get url() { 
      return this.project.url; 
    }, 
    loadTextFile: function(url, callback, errback) { 
      var xhr = new XMLHttpRequest(); 
      xhr.onload = function() { 
        if(xhr.status == 200 || xhr.status == 0) { 
          callback(xhr.responseText); 
        } else { 
          errback(); 
        } 
        xhr = null; 
      }; 
      xhr.onerror = function() { 
        errback(); 
      }; 
      xhr.open('GET', url, true); 
      xhr.send(); 
      return xhr; 
    }, 
    load: function(url) { 
      url = resolveUrl(this.url, url); 
      var codeUnit = this.getCodeUnit(url); 
      if(codeUnit.state != NOT_STARTED || codeUnit.state == ERROR) { 
        return codeUnit; 
      } 
      codeUnit.state = LOADING; 
      var loader = this; 
      var xhr = codeUnit.xhr = this.loadTextFile(url, function(text) { 
        codeUnit.text = text; 
        codeUnit.state = LOADED; 
        loader.handleCodeUnitLoaded(codeUnit); 
      }, function() { 
        codeUnit.state = ERROR; 
        loader.handleCodeUnitLoadError(codeUnit); 
      }); 
      return codeUnit; 
    }, 
    evalLoad: function(code) { 
      var codeUnit = new EvalLoadCodeUnit(this, code); 
      this.cache.put({ }, codeUnit); 
      return codeUnit; 
    }, 
    eval: function(code) { 
      var codeUnit = new EvalCodeUnit(this, code); 
      this.cache.put({ }, codeUnit); 
      this.handleCodeUnitLoaded(codeUnit); 
      return codeUnit; 
    }, 
    getKey: function(url) { 
      if(url in this.urlToKey) { 
        return this.urlToKey[url]; 
      } 
      return this.urlToKey[url]= { }; 
    }, 
    getCodeUnit: function(url) { 
      var key = this.getKey(url); 
      var cacheObject = this.cache.get(key); 
      if(! cacheObject) { 
        cacheObject = new LoadCodeUnit(this, url); 
        this.cache.put(key, cacheObject); 
      } 
      return cacheObject; 
    }, 
    areAll: function(state) { 
      return this.cache.values().every((function(codeUnit) { 
        return codeUnit.state >= state; 
      })); 
    }, 
    handleCodeUnitLoaded: function(codeUnit) { 
      if(! codeUnit.parse()) { 
        this.abortAll(); 
        return; 
      } 
      var requireVisitor = new ModuleRequireVisitor(this.reporter); 
      requireVisitor.visit(codeUnit.tree); 
      var baseUrl = codeUnit.url; 
      codeUnit.dependencies = requireVisitor.requireUrls.map((function(url) { 
        url = resolveUrl(baseUrl, url); 
        return this.load(url); 
      }).bind(this)); 
      if(this.areAll(PARSED)) { 
        this.analyze(); 
        this.transform(); 
        this.evaluate(); 
      } 
    }, 
    handleCodeUnitLoadError: function(codeUnit) { 
      this.error = codeUnit.error = 'Failed to load \'' + codeUnit.url + '\''; 
      this.abortAll(); 
    }, 
    abortAll: function() { 
      this.cache.values().forEach((function(codeUnit) { 
        if(codeUnit.xhr) { 
          codeUnit.xhr.abort(); 
          codeUnit.state = ERROR; 
        } 
      })); 
      this.cache.values().forEach((function(codeUnit) { 
        codeUnit.dispatchError(codeUnit.error); 
      })); 
    }, 
    analyze: function() { 
      var project = this.project; 
      var dependencies = this.cache.values(); 
      var trees =[]; 
      var modules =[]; 
      for(var i = 0; i < dependencies.length; i ++) { 
        var codeUnit = dependencies[i]; 
        traceur.assert(codeUnit.state >= PARSED); 
        if(codeUnit.state == PARSED) { 
          trees.push(codeUnit.tree); 
          modules.push(codeUnit.moduleSymbol); 
        } 
      } 
      var analyzer = new ModuleAnalyzer(this.reporter, this.project); 
      analyzer.analyzeModuleTrees(trees, modules); 
      if(this.reporter.hadError()) { 
        for(var i = 0; i < dependencies.length; i ++) { 
          var codeUnit = dependencies[i]; 
          if(codeUnit.state >= COMPLETE) { 
            continue; 
          } 
          codeUnit.state = ERROR; 
        } 
        for(var i = 0; i < dependencies.length; i ++) { 
          var codeUnit = dependencies[i]; 
          if(codeUnit.state == ERROR) { 
            codeUnit.dispatchError('Failed to analyze'); 
          } 
        } 
      } 
    }, 
    transform: function() { 
      var dependencies = this.cache.values(); 
      for(var i = 0; i < dependencies.length; i ++) { 
        var codeUnit = dependencies[i]; 
        if(codeUnit.state >= TRANSFORMED) { 
          continue; 
        } 
        codeUnit.transformedTree = this.transformCodeUnit(codeUnit); 
        codeUnit.state = TRANSFORMED; 
      } 
    }, 
    transformCodeUnit: function(codeUnit) { 
      var results = codeUnit.transform(); 
      return results.get(codeUnit.file); 
    }, 
    evaluate: function() { 
      var visited = new ObjectMap(); 
      var ordered =[]; 
      function orderCodeUnits(codeUnit) { 
        if(visited.has(codeUnit)) { 
          return; 
        } 
        visited.put(codeUnit, true); 
        codeUnit.dependencies.forEach(orderCodeUnits); 
        ordered.push(codeUnit); 
      } 
      this.cache.values().forEach(orderCodeUnits); 
      var dependencies = ordered; 
      for(var i = 0; i < dependencies.length; i ++) { 
        var codeUnit = dependencies[i]; 
        if(codeUnit.state >= COMPLETE) { 
          continue; 
        } 
        traceur.assert(currentCodeUnit === undefined); 
        currentCodeUnit = codeUnit; 
        var result; 
        try { 
          result = this.evalCodeUnit(codeUnit); 
        } catch(ex) { 
          codeUnit.error = ex.message; 
          this.abortAll(); 
          return; 
        } finally { 
          traceur.assert(currentCodeUnit === codeUnit); 
          currentCodeUnit = undefined; 
        } 
        codeUnit.result = result; 
        codeUnit.transformedTree = null; 
        codeUnit.text = null; 
      } 
      for(var i = 0; i < dependencies.length; i ++) { 
        var codeUnit = dependencies[i]; 
        if(codeUnit.state >= COMPLETE) { 
          continue; 
        } 
        codeUnit.state = COMPLETE; 
        codeUnit.dispatchComplete(codeUnit.result); 
      } 
    }, 
    evalCodeUnit: function(codeUnit) { 
      return traceur.strictGlobalEval(TreeWriter.write(codeUnit.transformedTree)); 
    } 
  }; 
  var currentCodeUnit; 
  var standardModuleUrlRegExp = /^@\w+$/; 
  function getModuleInstanceByUrl(url) { 
    if(standardModuleUrlRegExp.test(url)) return traceur.runtime.modules[url]|| null; 
    traceur.assert(currentCodeUnit); 
    url = resolveUrl(currentCodeUnit.url, url); 
    for(var i = 0; i < currentCodeUnit.dependencies.length; i ++) { 
      if(currentCodeUnit.dependencies[i].url == url) { 
        return currentCodeUnit.dependencies[i].result; 
      } 
    } 
    return null; 
  } 
  function CodeLoader(reporter, project, parentLoader, opt_resolver) { 
    this.internalLoader_ = new InternalLoader(reporter, project); 
  } 
  CodeLoader.prototype = { 
    load: function(url, callback, opt_errback) { 
      var codeUnit = this.internalLoader_.load(url); 
      codeUnit.addListener(callback, opt_errback); 
    }, 
    eval: function(program) { 
      var codeUnit = this.internalLoader_.eval(program); 
      return codeUnit.result; 
    }, 
    evalLoad: function(program, callback, opt_errback) { 
      var codeUnit = this.internalLoader_.evalLoad(program); 
      codeUnit.addListener(callback, opt_errback); 
      this.internalLoader_.handleCodeUnitLoaded(codeUnit); 
    }, 
    'import': function(moduleInstanceObject) { 
      throw Error('Not implemented'); 
    }, 
    defineGlobal: function(name, value) { 
      throw Error('Not implemented'); 
    }, 
    defineModule: function(name, moduleInstanceObject, opt_cacheKey) { 
      throw Error('Not implemented'); 
    }, 
    create: function(moduleInstanceObject, opt_resolver) { 
      var url = this.project_.url; 
      var project = new Project(url); 
      var loader = new CodeLoader(this.reporter, project, this, opt_resolver); 
      return loader; 
    }, 
    createBase: function() { 
      return base; 
    } 
  }; 
  var internals =(function() { 
    "use strict"; 
    return Object.preventExtensions(Object.create(null, { 
      CodeUnit: { 
        get: function() { 
          return CodeUnit; 
        }, 
        enumerable: true 
      }, 
      EvalCodeUnit: { 
        get: function() { 
          return EvalCodeUnit; 
        }, 
        enumerable: true 
      }, 
      EvalLoadCodeUnit: { 
        get: function() { 
          return EvalLoadCodeUnit; 
        }, 
        enumerable: true 
      }, 
      InternalLoader: { 
        get: function() { 
          return InternalLoader; 
        }, 
        enumerable: true 
      }, 
      LoadCodeUnit: { 
        get: function() { 
          return LoadCodeUnit; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  ; 
  return Object.preventExtensions(Object.create(null, { 
    getModuleInstanceByUrl: { 
      get: function() { 
        return getModuleInstanceByUrl; 
      }, 
      enumerable: true 
    }, 
    CodeLoader: { 
      get: function() { 
        return CodeLoader; 
      }, 
      enumerable: true 
    }, 
    internals: { 
      get: function() { 
        return internals; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
var traceur =(function() { 
  "use strict"; 
  var global = this; 
  var traceurRuntime = global.traceur.runtime; 
  var runtime = traceurRuntime; 
  var destructuring$options = $src_options_js, options = destructuring$options.options; 
  var destructuring$createObject = $src_util_util_js, createObject = destructuring$createObject.createObject; 
  function exportPath(name) { 
    var parts = name.split('.'); 
    var cur = traceur; 
    for(var part; parts.length &&(part = parts.shift());) { 
      if(part in cur) { 
        cur = cur[part]; 
      } else { 
        cur = cur[part]= { }; 
      } 
    } 
    return cur; 
  } 
  ; 
  function generateNameForUrl(url, commonPath) { 
    return '$' + url.replace(commonPath, '').replace(/[^\d\w$]/g, '_'); 
  } 
  ; 
  function getModuleForTesting(name) { 
    return global[$__2([false, '$src', true, name.split('.'), false, 'js']).join('_')]; 
  } 
  ; 
  function define(name, fun) { 
    var obj = exportPath(name); 
    var exports = fun(); 
    for(var propertyName in exports) { 
      var propertyDescriptor = Object.getOwnPropertyDescriptor(exports, propertyName); 
      if(propertyDescriptor) Object.defineProperty(obj, propertyName, propertyDescriptor); 
    } 
  } 
  function assert(b) { 
    if(! b && options.debug) throw Error('Assertion failed'); 
  } 
  function strictGlobalEval(code) { 
    return('global', eval)('"use strict";' + code); 
  } 
  var uidCounter = 0; 
  function getUid() { 
    return ++ uidCounter; 
  } 
  var semantics =(function() { 
    "use strict"; 
    var destructuring$ModuleAnalyzer = $src_semantics_ModuleAnalyzer_js, ModuleAnalyzer = destructuring$ModuleAnalyzer.ModuleAnalyzer; 
    var symbols =(function() { 
      "use strict"; 
      var destructuring$Project = $src_semantics_symbols_Project_js, Project = destructuring$Project.Project; 
      return Object.preventExtensions(Object.create(null, { Project: { 
          get: function() { 
            return Project; 
          }, 
          enumerable: true 
        } })); 
    }).call(this); 
    var destructuring$VariableBinder = $src_semantics_VariableBinder_js, VariableBinder = destructuring$VariableBinder.VariableBinder; 
    return Object.preventExtensions(Object.create(null, { 
      ModuleAnalyzer: { 
        get: function() { 
          return ModuleAnalyzer; 
        }, 
        enumerable: true 
      }, 
      symbols: { 
        get: function() { 
          return symbols; 
        }, 
        enumerable: true 
      }, 
      VariableBinder: { 
        get: function() { 
          return VariableBinder; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  var util =(function() { 
    "use strict"; 
    var destructuring$canonicalizeUrl$resolveUrl = $src_util_url_js, canonicalizeUrl = destructuring$canonicalizeUrl$resolveUrl.canonicalizeUrl, resolveUrl = destructuring$canonicalizeUrl$resolveUrl.resolveUrl; 
    var destructuring$evaluateStringLiteral = $src_util_util_js, evaluateStringLiteral = destructuring$evaluateStringLiteral.evaluateStringLiteral; 
    var destructuring$ErrorReporter = $src_util_ErrorReporter_js, ErrorReporter = destructuring$ErrorReporter.ErrorReporter; 
    var destructuring$TestErrorReporter = $src_util_TestErrorReporter_js, TestErrorReporter = destructuring$TestErrorReporter.TestErrorReporter; 
    var destructuring$SourcePosition = $src_util_SourcePosition_js, SourcePosition = destructuring$SourcePosition.SourcePosition; 
    var destructuring$MutedErrorReporter = $src_util_MutedErrorReporter_js, MutedErrorReporter = destructuring$MutedErrorReporter.MutedErrorReporter; 
    var destructuring$removeDotSegments = $src_util_url_js, removeDotSegments = destructuring$removeDotSegments.removeDotSegments; 
    return Object.preventExtensions(Object.create(null, { 
      canonicalizeUrl: { 
        get: function() { 
          return canonicalizeUrl; 
        }, 
        enumerable: true 
      }, 
      resolveUrl: { 
        get: function() { 
          return resolveUrl; 
        }, 
        enumerable: true 
      }, 
      evaluateStringLiteral: { 
        get: function() { 
          return evaluateStringLiteral; 
        }, 
        enumerable: true 
      }, 
      ErrorReporter: { 
        get: function() { 
          return ErrorReporter; 
        }, 
        enumerable: true 
      }, 
      TestErrorReporter: { 
        get: function() { 
          return TestErrorReporter; 
        }, 
        enumerable: true 
      }, 
      SourcePosition: { 
        get: function() { 
          return SourcePosition; 
        }, 
        enumerable: true 
      }, 
      MutedErrorReporter: { 
        get: function() { 
          return MutedErrorReporter; 
        }, 
        enumerable: true 
      }, 
      removeDotSegments: { 
        get: function() { 
          return removeDotSegments; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  var syntax =(function() { 
    "use strict"; 
    var destructuring$Scanner = $src_syntax_Scanner_js, Scanner = destructuring$Scanner.Scanner; 
    var destructuring$SourceFile = $src_syntax_SourceFile_js, SourceFile = destructuring$SourceFile.SourceFile; 
    var destructuring$trees = $src_syntax_trees_ParseTrees_js, trees = destructuring$trees.trees; 
    var destructuring$Parser = $src_syntax_Parser_js, Parser = destructuring$Parser.Parser; 
    var destructuring$Token = $src_syntax_Token_js, Token = destructuring$Token.Token; 
    var destructuring$TokenType = $src_syntax_TokenType_js, TokenType = destructuring$TokenType.TokenType; 
    var destructuring$IdentifierToken = $src_syntax_IdentifierToken_js, IdentifierToken = destructuring$IdentifierToken.IdentifierToken; 
    var destructuring$LiteralToken = $src_syntax_LiteralToken_js, LiteralToken = destructuring$LiteralToken.LiteralToken; 
    var destructuring$ParseTreeValidator = $src_syntax_ParseTreeValidator_js, ParseTreeValidator = destructuring$ParseTreeValidator.ParseTreeValidator; 
    return Object.preventExtensions(Object.create(null, { 
      Scanner: { 
        get: function() { 
          return Scanner; 
        }, 
        enumerable: true 
      }, 
      SourceFile: { 
        get: function() { 
          return SourceFile; 
        }, 
        enumerable: true 
      }, 
      trees: { 
        get: function() { 
          return trees; 
        }, 
        enumerable: true 
      }, 
      Parser: { 
        get: function() { 
          return Parser; 
        }, 
        enumerable: true 
      }, 
      Token: { 
        get: function() { 
          return Token; 
        }, 
        enumerable: true 
      }, 
      TokenType: { 
        get: function() { 
          return TokenType; 
        }, 
        enumerable: true 
      }, 
      IdentifierToken: { 
        get: function() { 
          return IdentifierToken; 
        }, 
        enumerable: true 
      }, 
      LiteralToken: { 
        get: function() { 
          return LiteralToken; 
        }, 
        enumerable: true 
      }, 
      ParseTreeValidator: { 
        get: function() { 
          return ParseTreeValidator; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  var outputgeneration =(function() { 
    "use strict"; 
    var destructuring$ProjectWriter = $src_outputgeneration_ProjectWriter_js, ProjectWriter = destructuring$ProjectWriter.ProjectWriter; 
    var destructuring$TreeWriter = $src_outputgeneration_TreeWriter_js, TreeWriter = destructuring$TreeWriter.TreeWriter; 
    var destructuring$SourceMapConsumer = $src_outputgeneration_SourceMapIntegration_js, SourceMapConsumer = destructuring$SourceMapConsumer.SourceMapConsumer; 
    var destructuring$SourceMapGenerator = $src_outputgeneration_SourceMapIntegration_js, SourceMapGenerator = destructuring$SourceMapGenerator.SourceMapGenerator; 
    return Object.preventExtensions(Object.create(null, { 
      ProjectWriter: { 
        get: function() { 
          return ProjectWriter; 
        }, 
        enumerable: true 
      }, 
      TreeWriter: { 
        get: function() { 
          return TreeWriter; 
        }, 
        enumerable: true 
      }, 
      SourceMapConsumer: { 
        get: function() { 
          return SourceMapConsumer; 
        }, 
        enumerable: true 
      }, 
      SourceMapGenerator: { 
        get: function() { 
          return SourceMapGenerator; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  var codegeneration =(function() { 
    "use strict"; 
    var ParseTreeFactory = $src_codegeneration_ParseTreeFactory_js; 
    var module =(function() { 
      "use strict"; 
      var destructuring$ModuleRequireVisitor = $src_codegeneration_module_ModuleRequireVisitor_js, ModuleRequireVisitor = destructuring$ModuleRequireVisitor.ModuleRequireVisitor; 
      return Object.preventExtensions(Object.create(null, { ModuleRequireVisitor: { 
          get: function() { 
            return ModuleRequireVisitor; 
          }, 
          enumerable: true 
        } })); 
    }).call(this); 
    var destructuring$ParseTreeTransformer = $src_codegeneration_ParseTreeTransformer_js, ParseTreeTransformer = destructuring$ParseTreeTransformer.ParseTreeTransformer; 
    var destructuring$ModuleTransformer = $src_codegeneration_ModuleTransformer_js, ModuleTransformer = destructuring$ModuleTransformer.ModuleTransformer; 
    var destructuring$ProgramTransformer = $src_codegeneration_ProgramTransformer_js, ProgramTransformer = destructuring$ProgramTransformer.ProgramTransformer; 
    var destructuring$Compiler = $src_codegeneration_Compiler_js, Compiler = destructuring$Compiler.Compiler; 
    return Object.preventExtensions(Object.create(null, { 
      ParseTreeFactory: { 
        get: function() { 
          return ParseTreeFactory; 
        }, 
        enumerable: true 
      }, 
      module: { 
        get: function() { 
          return module; 
        }, 
        enumerable: true 
      }, 
      ParseTreeTransformer: { 
        get: function() { 
          return ParseTreeTransformer; 
        }, 
        enumerable: true 
      }, 
      ModuleTransformer: { 
        get: function() { 
          return ModuleTransformer; 
        }, 
        enumerable: true 
      }, 
      ProgramTransformer: { 
        get: function() { 
          return ProgramTransformer; 
        }, 
        enumerable: true 
      }, 
      Compiler: { 
        get: function() { 
          return Compiler; 
        }, 
        enumerable: true 
      } 
    })); 
  }).call(this); 
  var destructuring$CodeLoader$getModuleInstanceByUrl$internals = $src_runtime_modules_js, internals = destructuring$CodeLoader$getModuleInstanceByUrl$internals.internals, getModuleInstanceByUrl = destructuring$CodeLoader$getModuleInstanceByUrl$internals.getModuleInstanceByUrl, CodeLoader = destructuring$CodeLoader$getModuleInstanceByUrl$internals.CodeLoader; 
  runtime.internals = internals; 
  runtime.getModuleInstanceByUrl = getModuleInstanceByUrl; 
  runtime.CodeLoader = CodeLoader; 
  return Object.preventExtensions(Object.create(null, { 
    runtime: { 
      get: function() { 
        return runtime; 
      }, 
      enumerable: true 
    }, 
    options: { 
      get: function() { 
        return options; 
      }, 
      enumerable: true 
    }, 
    createObject: { 
      get: function() { 
        return createObject; 
      }, 
      enumerable: true 
    }, 
    generateNameForUrl: { 
      get: function() { 
        return generateNameForUrl; 
      }, 
      enumerable: true 
    }, 
    getModuleForTesting: { 
      get: function() { 
        return getModuleForTesting; 
      }, 
      enumerable: true 
    }, 
    define: { 
      get: function() { 
        return define; 
      }, 
      enumerable: true 
    }, 
    assert: { 
      get: function() { 
        return assert; 
      }, 
      enumerable: true 
    }, 
    strictGlobalEval: { 
      get: function() { 
        return strictGlobalEval; 
      }, 
      enumerable: true 
    }, 
    getUid: { 
      get: function() { 
        return getUid; 
      }, 
      enumerable: true 
    }, 
    semantics: { 
      get: function() { 
        return semantics; 
      }, 
      enumerable: true 
    }, 
    util: { 
      get: function() { 
        return util; 
      }, 
      enumerable: true 
    }, 
    syntax: { 
      get: function() { 
        return syntax; 
      }, 
      enumerable: true 
    }, 
    outputgeneration: { 
      get: function() { 
        return outputgeneration; 
      }, 
      enumerable: true 
    }, 
    codegeneration: { 
      get: function() { 
        return codegeneration; 
      }, 
      enumerable: true 
    } 
  })); 
}).call(this); 
