Decorum [![Build Status](https://travis-ci.org/dflor003/decorum.svg?branch=master)](https://travis-ci.org/dflor003/decorum) [![Coverage Status](https://coveralls.io/repos/dflor003/decorum/badge.svg?branch=master&service=github)](https://coveralls.io/github/dflor003/decorum?branch=master)
=========

> *A "proper" ECMAScript 7 Decorator-Based Validation Library*

**This library is a work in progress and will likely change before the first major release.**

Are you fed up with having to solve the simple but tedious problem of client-side/server-side JavaScript validations over and over again? Then this library is for you!

Decorum gives you a quick, easy, declarative way of defining model validations on your JavaScript models without muddying up your HTML/JavaScript code with boilerplate validation code. 

It's main focus is around taking advantage of the ECMAScript 7 / ECMAScript 2016 [decorators proposal](https://github.com/wycats/javascript-decorators) to provide a robust, reusable validation mechanism. Since browser support for ES7 decorators is not quite there yet, this library is meant to be used with an ES7 transpiler such as [BabelJS](https://babeljs.io/) or [TypeScript](http://www.typescriptlang.org/).

**Note:** Despite being targeted for use with ES7 Decorators, you can still use this with ES5/ES6. Look further down for sample usage in ES5/ES6.

# Getting Started

Get the library via bower using the following command:

```sh
$ bower install decorum --save
```

Add a script tag to your markup referencing the decorum library such as the following:

```html
<script type="text/javascript" src="/bower_components/decorum/dist/decorum.js"></script>
```

# Why Model-Based Validations?

Some client-side libraries opt to put validations directly in markup. This is fine when you're working with a relatively small code-base or on a relatively small team. However, in larger projects, this can quickly become unmaintainable. Here are a few pitfalls with this approach:

1. If the model is reused across multiple pages (i.e. in an [AngularJS](https://angularjs.org/) or [KnockoutJS](http://knockoutjs.com/) app), you'll now have to duplicate the markup.
2. Users can easily modify markup using whatever dev tools their browsers provide to remove validation attributes.
3. It's much more difficult to test the DOM than it is to test JavaScript.
4. What if you're working on an [isomorphic application](http://isomorphic.net/) in [NodeJS](https://nodejs.org/en/) where you want to share model code across the server-side and client-side? Are you going to copy and paste validation logic across the two layers?
5. Defining validations in markup can become quite verbose.

With **decorum**, addressing those concerns becomes quite simple and straight forward.

# Documentation

## Supported Validations

TODO

## Language Specifics

* [TypeScript](#typescript)
* [Babel](#babel)
* [ES6 Without Decorators](#es6-without-decorators)
* [ES5 Without Decorators](#es5-without-decorators)

**Note:** Decorator syntax is implemented, but the package import semantics are still a work in progress. The library is currently only available as a global variable off of `window.decorum`.

### TypeScript

TypeScript 1.6+ supports decorator syntax. To enable this syntax you must add the `experimentalDecorators` to the `compilerOptions` section in your `tsconfig.json`.

Here's an example of setting up a model in TypeScript.

```ts
import {Required, FieldName, Email, Validation, Pattern, MinLength, MaxLength} from 'decorum';

export class MyModel {
	@Required()
	username: string;

	@FieldName('Email address')
	@Required()
	@Email()
	email: string;

	@FieldName('Password')
	@MinLength(10)
	@MaxLength(30)
	password: string;

	@FieldName('Confirm password')
	@Validation<RegistrationModel>(
	    'Passwords must match',
        (value, model) => value === model.password
    )
    confirmPassword: string;

    @Pattern(/^[a-z0-9-]+$/, 'Must be a valid slug tag')
    slug = '';

    private _myProp: string;

    constructor() {
        this.myProperty = 'foo';
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
    }

    @MaxLength(3)
    get myProperty(): string { return this._myProp; }
    set myProperty(value: string) { this._myProp = value; }
}
```

### Babel

Babel supports ES7 decorators, but they are hidden behind an experimental feature flag. Furthermore, you must also enable class properties to enable setting up decorators on anything other than properties.

The flags that enable this are: `es7.decorators` and `es7.classProperties`. This can be setup in babel by either enabling all stage 0 options (which will enable ALL experimental features) or individually enabling those two options.

Enable stage 0:

```sh
$ babel --stage 0
```

Enable just needed flags:

```sh
$ babel --optional es7.decorators,es7.classProperties
```

Here's an example of setting up a model in babel:

```js
import {Required, FieldName, Email, Validation, Pattern, MinLength, MaxLength} from 'decorum';

class MyModel {
    @Required()
    username = '';

    @FieldName('Email address')
    @Required()
    @Email()
    email = '';

    @FieldName('Password')
    @MinLength(10)
    @MaxLength(30)
    password = '';

    @FieldName('Confirm password')
    @Validation(
        'Passwords must match',
        (value, model) => value === model.password
    )
    confirmPassword = '';

    @Pattern(/^[a-z0-9-]+$/, 'Must be a valid slug tag')
    slug = '';

    constructor() {
        this.myProperty = 'foo';
    }

    @MaxLength(3)
    get myProperty() { return this._myProp; }
    set myProperty(value) { this._myProp = value; }
}
```

### ES6 Without Decorators

TODO:

### ES5 Without Decorators

TODO