# Convert DOM Definitions to JS

Convert the following definitions of DOM classes into javaScript BuiltinCollection objects. Here are the types:

```typescript
/** Represents a tuple of a parameter name and its type. */
export type NamedParameter = [name: string, type: ParameterType];

/** Describes the structure of a built-in definition, including its type, parameters, return value, and inheritance. */
export type BuiltinDefinition = {
  type: DefinitionType;
  parameters: Array<NamedParameter>;
  returnValue: ParameterType;
  inheritedFrom: BaseObjects;
};

/** An array of `BuiltinDefinition` objects. */
export type OverloadedBuiltinDefinition = Array<BuiltinDefinition>;

/** A record of built-in definitions indexed by string keys. */
export type BuiltinCollection = Record<string, (BuiltinDefinition | OverloadedBuiltinDefinition)>;

/** Categorizes different types of definitions such as constructors, static methods, etc */
export enum DefinitionType {
  Constructor = 'Constructor',
  StaticMethod = 'StaticMethod',
  StaticProperty = 'StaticProperty',
  InstanceMethod = 'InstanceMethod',
  InstanceProperty = 'InstanceProperty',
  Event = 'Event',
}
```

Here is the specification:

Given text in this form:

```
ClassName
Constructor
ClassName()
Instance methods
instanceMethod1()
instanceMethod2()
Instance properties
instanceProperty1
instanceProperty2
Static methods
staticMethod1()
staticMethod2()
Static properties
staticProperty1
staticProperty2
Events
eventName
Inheritance
ClassA
ClassB
```

The first line is the name of the class

**Constructor**

- Everything that follows the word constructor is a constructor
- Its key will be the value + `.new`, e.g. ClassName.new
- Its `type` property will be `types.DefinitionType.Constructor`
- its `parameters` property will be a list of tuples where `tuple[0]` is the name and `tuple[1]` is the type
- its `returnValue` property will be `new types.ConstructorFunctionParameter(types.BaseObjects.<ClassName>),`
- `inheritedFrom` will be types.BaseObjects.None,

**Static methods, Static properties, instance methods, and instance properties**

These values all follow the same pattern:

- Its key will be `ClassName.prototype.methodOrProperty` if it is an instance method or property
- If it is the key will be `ClassName.methodOrProperty`
- The type will be one of these: `types.DefintionType.(StaticMethod|StaticProperty|InstanceMethod|InstanceProperty)`
- its parameters property will be a list of tuples where `tuple[0]` is the name and `tuple[1]` is the type
- For properties the parameters will be an empty array
- its returnValue property will be an instance of `ParameterType`
- inheritedFrom will be `types.BaseObjects.None`,

**Events**

Events will follow the same form as above with these exceptions:

- The return type will always be `new types.UndefinedParameter()`
- The key will be `ClassName.<event>`
- Parameters define the inputs to the handler function

**Inheritance**

If, and only if there is an Inheritance section, include the names of the classes as a comment, like this: `// Inherits:
ClassA, ClassB

## Example

Given the value from above:

```
ClassName
Constructor
ClassName()
Instance methods
instanceMethod1()
Instance properties
instanceProperty1
Static methods
staticMethod1()
Static properties
staticProperty1
Events
eventName
Ineritance
FooBar
```

The output should be:

```typescript
const classNameBuiltin = {
  ['ClassName.new']: {
    type: types.DefinitionType.Constructor,
    parameters: [['parameter1', new types.SomeParameter()], ['parameter2', new types.SomeParameter()]],
    returnValue: new types.ConstructorFunctionParameter(types.BaseObjects.ClassName),
    inheritedFrom: types.BaseObjects.None,
  },  
  ['ClassName.prototype.instanceMethod1']: {
    type: types.DefinitionType.InstanceMethod,
    parameters: [['parameter1', new types.SomeParameter()], ['parameter2', new types.SomeParameter()]],
    returnValue: new types.SomeParameter(),
    inheritedFrom: types.BaseObjects.None,
  },  
  ['ClassName.prototype.instanceProperty1']: {
    type: types.DefinitionType.InstanceProperty,
    parameters: [],
    returnValue: new types.SomeParameter(),
    inheritedFrom: types.BaseObjects.None,
  },  
  ['ClassName.staticMethod1']: {
    type: types.DefinitionType.StaticMethod,
    parameters: [['parameter1', new types.SomeParameter()], ['parameter2', new types.SomeParameter()]],
    returnValue: new types.SomeParameter(),
    inheritedFrom: types.BaseObjects.None,
  },  
  ['ClassName.staticProperty1']: {
    type: types.DefinitionType.StaticProperty,
    parameters: [],
    returnValue: new types.SomeParameter(),
    inheritedFrom: types.BaseObjects.None,
  },    
  ['ClassName.eventName']: {
    type: types.DefinitionType.Event,
    parameters: [['parameter1', new types.SomeParameter()], ['parameter2', new types.SomeParameter()]],,
    returnValue: new types.UndefinedParameter(),
    inheritedFrom: types.BaseObjects.None,
  },
  // Inherits FooBar
};
```

Here are the available parameter types:

```typescript
export abstract class ParameterType {}
class AnyParameter extends ParameterType {}
export class ArrayParameter extends ParameterType {
  constructor(public type: ParameterType = new AnyParameter());
}
export class ArrayBufferParameter extends ParameterType {}
export class BigIntParameter extends ParameterType {}
export class BooleanParameter extends ParameterType {}
export class ConstructorFunctionParameter extends ParameterType {
  constructor(public builtin: BaseObjects = BaseObjects.Function);
}
export class ErrorParameter extends ParameterType {}
export class FunctionParameter extends ParameterType {
  constructor(public functionTypeDefinition?: string);
}
export class IterableParameter extends ParameterType {
  constructor(public type: ParameterType = new AnyParameter());
}
export class MapParameter extends ParameterType {
  constructor(public key: ParameterType = new StringParameter(), public value: ParameterType = new AnyParameter());
}
export class NullParameter extends ParameterType {}
export class NumberParameter extends ParameterType {}
export class ObjectParameter extends ParameterType {
  constructor(public key?: ParameterType, public value?: ParameterType);
}
export class PromiseParameter extends ParameterType {
  constructor(public type: ParameterType = new AnyParameter());
}
export class RegExpParameter extends ParameterType {
  constructor(public pattern?: string);
}
export class SetParameter extends ParameterType {
  constructor(public type: ParameterType = new AnyParameter());
}
export class StringParameter extends ParameterType {}
export class SymbolParameter extends ParameterType {}
export class TupleParameter extends ParameterType {
  public types: ParameterType[] = [];
  constructor(...types: ParameterType[]) {
    super();
    this.types = types;
  }
}
export class TypedArrayParameter extends ParameterType {
  constructor(
    public type:
      | 'BigInt64Array'
      | 'BigUint64Array'
      | 'Float32Array'
      | 'Float64Array'
      | 'Int16Array'
      | 'Int32Array'
      | 'Int8Array'
      | 'Uint16Array'
      | 'Uint32Array'
      | 'Uint8Array'
      | 'Uint8ClampedArray'
      | 'number' = 'number',
  );
}
export class UndefinedParameter extends ParameterType {}
export class UnionParameter extends ParameterType {
  public types: ParameterType[] = [];
  constructor(...types: ParameterType[]) {
    super();
    this.types = types;
  }
}
```
